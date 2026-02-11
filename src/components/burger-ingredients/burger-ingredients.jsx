import { useState, useRef, useEffect } from 'react';

import { Tab } from '@krgaa/react-developer-burger-ui-components';
import { IngredientDetails } from '@components/ingredient-details/ingredient-details';

import styles from './burger-ingredients.module.css';

export const BurgerIngredients = ({ ingredients, onClick, onAdd }) => {
  console.log('BurgerIngredients', ingredients);

  //Активный первый Tab
  const [current, setCurrent] = useState('bun');  
  //Ссылки на DOM элементы Tab
  const bunRef = useRef(null);
  const sauceRef = useRef(null);
  const mainRef = useRef(null);
  //Фильтрация ingredients по типу
  const buns = ingredients.filter(i => i.type === 'bun');
  const sauces = ingredients.filter(i => i.type === 'sauce');
  const mains = ingredients.filter(i => i.type === 'main');
  //Отображаемые ингредиенты
  const [view, setView] = useState(buns);

  console.log('buns', buns);
  console.log('sauces', sauces);
  console.log('mains', mains);

  function show(tab, ingredients){
    console.log('show', tab);
    setCurrent(tab);
    setView(ingredients);
  }

  return (
    <section className={styles.burger_ingredients}>
      <nav>
        <ul className={styles.menu}>
          <Tab
            value="bun"
            active={current === "bun"}
            onClick={(tab) => {
              /* TODO */
              show(tab, buns)
            }}
          >
            Булки
          </Tab>
          <Tab
            value="main"
            active={current === "main"}
            onClick={(tab) => {
              /* TODO */
              show(tab, mains)
            }}
          >
            Начинки
          </Tab>
          <Tab
            value="sauce"
            active={current === "sauce"}
            onClick={(tab) => {
              /* TODO */
              show(tab, sauces)
            }}
          >
            Соусы
          </Tab>
        </ul>
      </nav>

      {/* Загруженные ингредиенты */}
      <div className="ingredients-list">
        {view && (
          <div className="ingredients-category">
            <div className="ingredients-grid">
              {view.map(ingredient => (
                <IngredientDetails   
                  key={ingredient._id}                  
                  ingredient={ingredient}  
                  onClick={onClick}
                  onAdd={onAdd}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
