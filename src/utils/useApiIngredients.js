import { useState, useEffect } from 'react';

export const useApiIngredients = () => {
  const [ingredients, setIngredients] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchIngredients = async () => {
      try {
        const response = await fetch(
          'https://new-stellarburgers.education-services.ru/api/ingredients'
        );

        if (!response.ok) {
          console.error('Ошибка сети http status:', response.status);
          setError(`Ошибка сети http status: ${response.status}`);
          throw new Error(`Ошибка сети http status: ${response.status}`);
        }

        const data = await response.json();

        let result = [];
        if (Array.isArray(data)) {
          result = data;
        } else if (data.data && Array.isArray(data.data)) {
          result = data.data;
        }

        setIngredients(result);
      } catch (err) {
        console.error('Ошибка загрузки ингредиентов:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchIngredients();
  }, []);

  return { ingredients, loading, error };
};
