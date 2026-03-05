import { Tab } from '@krgaa/react-developer-burger-ui-components';
import { useState, useEffect, useCallback } from 'react';

import { BurgerIngredientItem } from '@components/burger-ingredients-item/burger-ingredients-item';

import styles from './burger-ingredients.module.css';

export const BurgerIngredients = ({
  ingredients = [],
  onClick,
  onAdd,
  isLockedBun = false,
  isLockedIngredients = false,
}) => {
  //Активный первый Tab
  const [current, setCurrent] = useState('bun');
  //Фильтрация ingredients по типу
  const buns = ingredients.filter((i) => i.type === 'bun');
  const sauces = ingredients.filter((i) => i.type === 'sauce');
  const mains = ingredients.filter((i) => i.type === 'main');
  //Отображаемые ингредиенты
  const [viewIngredients, setViewIngredients] = useState(ingredients);
  //Блокировка кнопки добавить
  const [isLockedAdd, setIsLockedAdd] = useState(false);

  // Синхронизация состояний при изменении блокировок кнопок
  useEffect(() => {
    //Разблокировка Кнопки Добавить
    if (current === 'bun') setIsLockedAdd(isLockedBun);
    else setIsLockedAdd(isLockedIngredients);
  }, [isLockedBun, isLockedIngredients]);

  //Показать ингредиенты от выбора категорий
  function showIngredients(tab, ingredients) {
    //Разблокировка Кнопки Добавить
    if (tab === 'bun') setIsLockedAdd(isLockedBun);
    else setIsLockedAdd(isLockedIngredients);
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
              isLockedAdd={isLockedAdd}
              onSectionChange={handleSectionChange}
            />
          ))}
        </div>
      )}
    </section>
  );
};
