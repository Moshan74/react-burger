import { Button, CurrencyIcon } from '@krgaa/react-developer-burger-ui-components';
import { nanoid } from 'nanoid';
import { useState, useEffect } from 'react';
import { useDrop } from 'react-dnd';

import { BurgerConstructorItem } from '@components/burger-constructor-item/burger-constructor-item';

import styles from './burger-constructor.module.css';

export const BurgerConstructor = ({ ingredients = [], onClick, onDelete, onAdd }) => {
  // Зона для перетаскивания ингредиентов
  const [{ isHover, canDrop }, dropRef] = useDrop({
    accept: 'INGREDIENT',
    drop: (draggedItem) => {
      console.log('BurgerConstructor draggedItem', draggedItem);
      // Проверяем, что перетаскивается ингредиент
      //if (!draggedItem || !draggedItem.type) return;

      // Предотвращаем добавление булочки, если она уже есть
      //if (draggedItem.type === 'bun') {
      //  const existingBuns = ingredients.filter(i => i.type === 'bun');
      //  if (existingBuns.length > 0) return; // Булочка уже добавлена
      //}

      // Добавляем ингредиент через пропс onAdd
      onAdd(draggedItem);
    },
    collect: (monitor) => ({
      isHover: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });

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

  const dropStyle = {
    border: isHover
      ? '3px dashed lightgreen'
      : canDrop
        ? '2px dashed #4CAF50'
        : '2px dashed #ccc',
    backgroundColor: isHover ? '#f0fff0' : 'transparent',
    padding: '20px',
    minHeight: '200px',
    transition: 'all 0.2s ease',
  };

  return (
    <section className={styles.burger_constructor}>
      {/* Выбранные ингредиенты */}
      <h3>Ваш собранный Бургер</h3>
      <div ref={dropRef} style={dropStyle}>
        {viewBuns && (
          <div>
            {viewBuns.map((ingredient) => (
              <div key={`${nanoid()}-top`}>
                {/* Булочка сверху */}
                {ingredient.type === 'bun' && (
                  <div className={styles.bun}>
                    <BurgerConstructorItem
                      key={`${nanoid()}-itop`}
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
                      <div key={`${nanoid()}-mains`}>
                        {/* Начинки */}
                        {ingredient.type != 'bun' && (
                          <BurgerConstructorItem
                            key={`${nanoid()}-imains`}
                            ingredient={ingredient}
                            type="middle"
                            onDelete={onDelete}
                          />
                        )}
                      </div>
                    ))}

                  {viewSauces.length > 0 &&
                    viewSauces.map((ingredient) => (
                      <div key={`${nanoid()}-sause`}>
                        {/*  Соусы */}
                        {ingredient.type != 'bun' && (
                          <BurgerConstructorItem
                            key={`${nanoid()}-isause`}
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
                      key={`${nanoid()}-bottom`}
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
