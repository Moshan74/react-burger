import { Button, CurrencyIcon } from '@krgaa/react-developer-burger-ui-components';
import { useState, useEffect } from 'react';

import { BurgerConstructorItem } from '@components/burger-constructor-item/burger-constructor-item';

import styles from './burger-constructor.module.css';

export const BurgerConstructor = ({ ingredients = [], onClick }) => {
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
  }, [buns, mains, sauces]);
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
                  <BurgerConstructorItem
                    key={`${ingredient._id}-itop`}
                    ingredient={ingredient}
                    type="top"
                  />
                )}

                {viewMains.length > 0 && (
                  <div>
                    {viewMains.map((ingredient) => (
                      <div key={`${ingredient._id}-mains`}>
                        {/* Начинки */}
                        {ingredient.type != 'bun' && (
                          <BurgerConstructorItem
                            key={`${ingredient._id}-imains`}
                            ingredient={ingredient}
                            type="middle"
                          />
                        )}
                      </div>
                    ))}
                  </div>
                )}

                {viewSauces.length > 0 && (
                  <div>
                    {viewSauces.map((ingredient) => (
                      <div key={`${ingredient._id}-sause`}>
                        {/* Начинки */}
                        {ingredient.type != 'bun' && (
                          <BurgerConstructorItem
                            key={`${ingredient._id}-isause`}
                            ingredient={ingredient}
                            type="middle"
                          />
                        )}
                      </div>
                    ))}
                  </div>
                )}

                {/* Булочка снизу */}
                {ingredient.type === 'bun' && (
                  <BurgerConstructorItem
                    key={`${ingredient._id}-bottom`}
                    ingredient={ingredient}
                    type="bottom"
                  />
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      <div className={styles.control}>
        {ingredients.length > 0 && total > 0 && (
          <div className={styles.items}>
            <div className={styles.item}>
              <span className="text text_type_digits-medium">{total}</span>
              <CurrencyIcon type="primary" />
            </div>

            <div>
              <div className={styles.button}>
                {
                  <Button onClick={handleOrder} size="small" type="primary">
                    Оформить заказ
                  </Button>
                }
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
