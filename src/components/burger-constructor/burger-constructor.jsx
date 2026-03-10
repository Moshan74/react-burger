import { Button, CurrencyIcon } from '@krgaa/react-developer-burger-ui-components';
import { useState, useEffect } from 'react';
import { useDrop } from 'react-dnd';

import { BurgerConstructorItem } from '@components/burger-constructor-item/burger-constructor-item';

import styles from './burger-constructor.module.css';

export const BurgerConstructor = ({
  ingredients = [],
  onClick,
  onDelete,
  onAdd,
  onMove,
}) => {
  // Зона для перетаскивания ингредиентов из списка
  const [{ isHover, canDrop }, dropRef] = useDrop({
    accept: 'INGREDIENT',
    drop: (draggedItem) => {
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
  // Все ингредиенты кроме булок, в том порядке, в котором они были добавлены
  const otherIngredients = ingredients.filter((i) => i.type !== 'bun');

  //Отображаемые ингредиенты
  const [viewBuns, setViewBuns] = useState(buns);
  const [viewOtherIngredients, setViewOtherIngredients] = useState(otherIngredients);

  // Синхронизация состояний при изменении `ingredients`
  useEffect(() => {
    setViewBuns(buns);
    setViewOtherIngredients(otherIngredients);
  }, [ingredients]);

  //total
  const total = ingredients.reduce(
    (sum, ingredient) =>
      ingredient.type === 'bun' ? sum + ingredient.price * 2 : sum + ingredient.price,
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
        {viewBuns.length > 0 ? (
          <div>
            {viewBuns.map((ingredient) => (
              <div key={`${ingredient._id}-main`}>
                {/* Булочка сверху */}
                {ingredient.type === 'bun' && (
                  <div className={styles.bun}>
                    <BurgerConstructorItem
                      key={`${ingredient._id}-top`}
                      ingredient={ingredient}
                      type="top"
                      onDelete={onDelete}
                      isLocked={true} //viewOtherIngredients.length > 0
                      isDraggable={false} // Булочки не перетаскиваем
                    />
                  </div>
                )}

                <div
                  className={styles.ingredients}
                  style={{
                    minHeight: viewOtherIngredients.length > 0 ? 'auto' : '100px',
                  }}
                >
                  {viewOtherIngredients.length > 0 ? (
                    viewOtherIngredients.map((ingredient, index) => (
                      <BurgerConstructorItem
                        key={ingredient.id}
                        ingredient={ingredient}
                        type="middle"
                        onDelete={onDelete}
                        index={index}
                        moveIngredient={onMove}
                        isDraggable={true}
                      />
                    ))
                  ) : (
                    <div className="text text_type_main-default">
                      Перетащите сюда ингредиенты (кроме булок).
                    </div>
                  )}
                </div>

                {/* Булочка снизу */}
                {ingredient.type === 'bun' && (
                  <div className={styles.bun}>
                    <BurgerConstructorItem
                      key={`${ingredient._id}-bottom`}
                      ingredient={ingredient}
                      type="bottom"
                      onDelete={onDelete}
                      isLocked={true} //viewOtherIngredients.length > 0
                      isDraggable={false} // Булочки не перетаскиваем
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          // Если нет булок, показываем только зону для ингредиентов
          <div className={styles.ingredients}>
            {viewOtherIngredients.length > 0 ? (
              viewOtherIngredients.map((ingredient, index) => (
                <BurgerConstructorItem
                  key={ingredient.id}
                  ingredient={ingredient}
                  type="middle"
                  onDelete={onDelete}
                  index={index}
                  moveIngredient={onMove}
                  isDraggable={true}
                />
              ))
            ) : (
              <div>
                <div className="text text_type_main-default">
                  Перетащите сюда булочку.
                </div>
              </div>
            )}
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
