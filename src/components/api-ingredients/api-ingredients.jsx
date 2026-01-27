import { useState, useEffect } from 'react';

function ApiIngredients() {
  const [ingredients, setIngredients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // Для обработки ошибок

  useEffect(async () => {
    // Запрос к API при первом рендере компонента
    await fetch('https://new-stellarburgers.education-services.ru/api/ingredients')
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      }) // Преобразуем ответ в JSON
      .then((data) => {
        // Проверяем, что data — массив
        if (Array.isArray(data)) {
          console.log('True');
          setIngredients(data);
        } else if (data.data && Array.isArray(data.data)) {
          // Если API возвращает { data: [...] }
          console.log('False');
          setIngredients(data.data);
        } else {
          setError('Данные не являются массивом');
        }
        console.log(data);
        setLoading(false); // Отключаем индикатор загрузки
      })
      .catch((err) => {
        console.error('Ошибка загрузки ингредиентов:', err);
        setError(err.message);
        setLoading(false);
      });
  }, []); // Пустой массив зависимостей - вызов только при монтировании

  if (loading) return <div>Загрузка...</div>;
  if (error) return <div>Ошибка: {error}</div>;

  return (
    <ul>
      {ingredients.map((ingredient) => (
        <li key={ingredient._id}>
          {ingredient.type}-{ingredient.name}
        </li> // Выводим названия задач
      ))}
    </ul>
  );
}

export default ApiIngredients;
