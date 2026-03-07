import { Tab } from '@krgaa/react-developer-burger-ui-components';
import { useState, useCallback } from 'react';

import { BurgerIngredientItem } from '@components/burger-ingredients-item/burger-ingredients-item';

import styles from './burger-ingredients.module.css';

export const BurgerIngredients = ({
  ingredients = [],
  onClick,
  onAdd,
  isLockedBun = false,
  isLockedIngredients = true,
  ingredientCounts = {},
}) => {
  //Активный первый Tab
  const [current, setCurrent] = useState('bun');

  //Фильтрация ingredients по типу
  const buns = ingredients.filter((i) => i.type === 'bun');
  const sauces = ingredients.filter((i) => i.type === 'sauce');
  const mains = ingredients.filter((i) => i.type === 'main');
  //Отображаемые ингредиенты
  const [viewIngredients, setViewIngredients] = useState(ingredients);

  //Проверка блокировки кнопки добавить
  function checkBlockAdd(ingredient) {
    //Разблокировка Кнопки Добавить
    if (ingredient.type === 'bun') return isLockedBun;
    else return isLockedIngredients;
  }

  //Показать ингредиенты от выбора категорий
  function showIngredients(tab, ingredients) {
    setCurrent(tab);
    setViewIngredients(ingredients);
  }

  // Обработчик изменения видимой секции при скролле
  const handleSectionChange = useCallback((tab) => {
    setCurrent(tab);
  }, []);

  return (
    <section className={styles.burger_ingredients}>
      <nav>
        <ul className={styles.menu}>
          <Tab
            value="bun"
            active={current === 'bun'}
            onClick={(tab) => {
              /* TODO */
              showIngredients(tab, buns);
            }}
          >
            Булки
          </Tab>
          <Tab
            value="main"
            active={current === 'main'}
            onClick={(tab) => {
              /* TODO */
              showIngredients(tab, mains);
            }}
          >
            Начинки
          </Tab>
          <Tab
            value="sauce"
            active={current === 'sauce'}
            onClick={(tab) => {
              /* TODO */
              showIngredients(tab, sauces);
            }}
          >
            Соусы
          </Tab>
        </ul>
      </nav>

      {/* Загруженные ингредиенты */}
      {viewIngredients && (
        <div className={styles.ingredients}>
          {viewIngredients.map((ingredient) => (
            <BurgerIngredientItem
              key={ingredient._id}
              ingredient={ingredient}
              onClick={onClick}
              onAdd={onAdd}
              isLockedAdd={checkBlockAdd(ingredient)}
              onSectionChange={handleSectionChange}
              count={ingredientCounts[ingredient._id] || 0}
            />
          ))}
        </div>
      )}
    </section>
  );
};
