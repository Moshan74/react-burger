import { CurrencyIcon, Button } from '@krgaa/react-developer-burger-ui-components';
import { useDrag } from 'react-dnd';

import styles from './burger-ingredients-item.module.css';

export const BurgerIngredientItem = ({
  ingredient,
  onClick,
  onAdd,
  isLockedAdd = false,
}) => {
  // Перетаскиваемый ингредиент
  const [{ isDragging }, dragRef] = useDrag({
    type: 'INGREDIENT',
    item: ingredient, // Передаём объект напрямую

    end: (item, monitor) => {
      const dropResult = monitor.getDropResult();
      if (monitor.didDrop()) {
        console.log('✔️ Drag completed, dropped on:', dropResult);
      } else {
        console.log('❌ Drag cancelled');
      }
    },

    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
      canDrag: monitor.canDrag(),
    }),
    canDrag: !isLockedAdd, // Блокируем перетаскивание, если кнопка заблокирована
  });

  const borderColor = isDragging ? 'lightgreen' : 'transparent';

  const handleClick = () => {
    // Предотвращаем клик при начале перетаскивания
    if (isDragging) return;
    if (onClick) {
      onClick(ingredient);
    }
  };

  const handleAdd = (event) => {
    event.stopPropagation(); // Останавливаем всплытие
    if (onAdd) {
      onAdd(ingredient);
    }
  };

  return (
    <div
      //className={styles.items}
      className={`${styles.items}`}
      onClick={handleClick}
      //key={ingredient._id}
      ref={dragRef}
      style={{ border: `2px solid ${borderColor}` }}
    >
      <div>
        <img src={ingredient.image} alt={ingredient.name} />
      </div>

      <div className={styles.item}>
        <span className="text text_type_digits-default">{ingredient.price}</span>
        <CurrencyIcon type="primary" />
      </div>

      <p className="text text_type_main-default ingredient-name">{ingredient.name}</p>

      {!isLockedAdd && (
        <div className={styles.button}>
          {
            <Button onClick={handleAdd} size="small" type="primary">
              Добавить
            </Button>
          }
        </div>
      )}
    </div>
  );
};
