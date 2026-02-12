import { Tab } from '@krgaa/react-developer-burger-ui-components';
import { useState } from 'react';

import { BurgerIngredientItem } from '@components/burger-ingredients-item/burger-ingredients-item';

import styles from './burger-ingredients.module.css';

export const BurgerIngredients = ({ ingredients = [], onClick, onAdd }) => {
  //Активный первый Tab
  const [current, setCurrent] = useState('bun');
  //Фильтрация ingredients по типу
  const buns = ingredients.filter((i) => i.type === 'bun');
  const sauces = ingredients.filter((i) => i.type === 'sauce');
  const mains = ingredients.filter((i) => i.type === 'main');
  //Отображаемые ингредиенты
  const [viewIngredients, setViewIngredients] = useState(buns);

  function showIngredients(tab, ingredients) {
    setCurrent(tab);
    setViewIngredients(ingredients);
  }

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
      <div>
        {viewIngredients && (
          <div>
            {viewIngredients.map((ingredient) => (
              <BurgerIngredientItem
                key={ingredient._id}
                ingredient={ingredient}
                onClick={onClick}
                onAdd={onAdd}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
