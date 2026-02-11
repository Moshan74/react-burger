import { useState, useRef, useEffect } from 'react';

import { OrderDetails } from '@components/order-details/order-details';

import styles from './burger-constructor.module.css';

export const BurgerConstructor = ({ ingredients = [] }) => {
  console.log('BurgerConstructor', ingredients);

  //Отображаемые ингредиенты
  const [view, setView] = useState(ingredients);
  // Синхронизируем view при изменении ingredients
  useEffect(() => {
    console.log("useEffect", ingredients)
    setView(ingredients);
  }, [ingredients]);

  return <section className={styles.burger_constructor}>

    {/* Выбранные ингредиенты */}
    <h3>Ваш собранный Бургер</h3>
    <div className="ingredients-list">
      {view && (
        <div className="ingredients-category">
          <div className="ingredients-grid">
            {view.map(ingredient => (
              <OrderDetails 
                key={ingredient._id} 
                ingredient={ingredient}  
              />
            ))}
          </div>
        </div>
      )}
    </div>

  </section>;
};
