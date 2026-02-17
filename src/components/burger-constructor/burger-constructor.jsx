import { Button, CurrencyIcon } from '@krgaa/react-developer-burger-ui-components';
import { useState, useEffect } from 'react';

import { BurgerConstructorItem } from '@components/burger-constructor-item/burger-constructor-item';

import styles from './burger-constructor.module.css';

export const BurgerConstructor = ({ ingredients = [], onClick, onDelete }) => {
  const handleOrder = () => {
    if (onClick) {
      onClick();
    }
  };

  //Фильтрация ingredients по типу
  const buns = ingredients.filter((i) => i.type === 'bun');
  const mains = ingredients.filter((i) => i.type === 'main');
  const sauces = ingredients.filter((i) => i.type === 'sauce');

  //Отображаемые ингредиенты
  const [viewBuns, setViewBuns] = useState(buns);
  const [viewMains, setViewMains] = useState(mains);
  const [viewSauces, setViewSauces] = useState(sauces);

  // Синхронизация состояний при изменении `ingredients`
  useEffect(() => {
    setViewBuns(buns);
    setViewMains(mains);
    setViewSauces(sauces);
  }, [ingredients]);

  //total
  const total = [...viewBuns, ...viewMains, ...viewSauces].reduce(
    (sum, ingredient) => sum + ingredient.price,
    0
  );

  return (
    <section className={styles.burger_constructor}>
      {/* Выбранные ингредиенты */}
      <h3>Ваш собранный Бургер</h3>
      <div>
        {viewBuns && (
          <div>
            {viewBuns.map((ingredient) => (
              <div key={`${ingredient._id}-top`}>
                {/* Булочка сверху */}
                {ingredient.type === 'bun' && (
                  <div className={styles.bun}>
                    <BurgerConstructorItem
                      key={`${ingredient._id}-itop`}
                      ingredient={ingredient}
                      type="top"
                      onDelete={onDelete}
                      isLocked={viewMains.length > 0 || viewSauces.length > 0}
                    />
                  </div>
                )}

                <div className={styles.ingredients}>
                  {viewMains.length > 0 &&
                    viewMains.map((ingredient) => (
                      <div key={`${ingredient._id}-mains`}>
                        {/* Начинки */}
                        {ingredient.type != 'bun' && (
                          <BurgerConstructorItem
                            key={`${ingredient._id}-imains`}
                            ingredient={ingredient}
                            type="middle"
                            onDelete={onDelete}
                          />
                        )}
                      </div>
                    ))}

                  {viewSauces.length > 0 &&
                    viewSauces.map((ingredient) => (
                      <div key={`${ingredient._id}-sause`}>
                        {/*  Соусы */}
                        {ingredient.type != 'bun' && (
                          <BurgerConstructorItem
                            key={`${ingredient._id}-isause`}
                            ingredient={ingredient}
                            type="middle"
                            onDelete={onDelete}
                          />
                        )}
                      </div>
                    ))}
                </div>

                {/* Булочка снизу */}
                {ingredient.type === 'bun' && (
                  <div className={styles.bun}>
                    <BurgerConstructorItem
                      key={`${ingredient._id}-bottom`}
                      ingredient={ingredient}
                      type="bottom"
                      onDelete={onDelete}
                      isLocked={viewMains.length > 0 || viewSauces.length > 0}
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Оформит заказ */}
      <div className={styles.control}>
        {ingredients.length > 0 && total > 0 && (
          <div className={styles.items}>
            <div className={styles.item}>
              <span className="text text_type_digits-medium">{total}</span>
              <CurrencyIcon type="primary" />
            </div>

            <div className={styles.button}>
              {
                <Button onClick={handleOrder} size="medium" type="primary">
                  Оформить заказ
                </Button>
              }
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
