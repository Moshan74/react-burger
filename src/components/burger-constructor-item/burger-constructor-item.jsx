import {
  ConstructorElement,
  DragIcon,
} from '@krgaa/react-developer-burger-ui-components';
import { useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';

import styles from './burger-constructor-item.module.css';

export const BurgerConstructorItem = ({
  ingredient,
  type,
  onDelete,
  isLocked = false,
  index,
  moveIngredient,
  isDraggable = true,
}) => {
  const ref = useRef(null);

  // Настройка drag для перетаскивания ингредиента
  const [, drag] = useDrag({
    type: 'CONSTRUCTOR_INGREDIENT',
    item: () => {
      return { id: ingredient.id, index };
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
    canDrag: isDraggable && ingredient.type !== 'bun',
  });

  // Настройка drop для определения позиции при наведении
  const [, drop] = useDrop({
    accept: 'CONSTRUCTOR_INGREDIENT',
    hover(item, monitor) {
      if (!ref.current) {
        return;
      }

      const dragIndex = item.index;
      const hoverIndex = index;

      // Не заменяем элементы сами с собой
      if (dragIndex === hoverIndex) {
        return;
      }

      // Определяем положение курсора
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;

      // Перетаскиваем вниз
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }

      // Перетаскиваем вверх
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      // Выполняем перемещение
      if (moveIngredient) {
        moveIngredient(dragIndex, hoverIndex);
      }

      // Обновляем индекс для drag объекта
      item.index = hoverIndex;
    },
  });

  // Связываем ref с drag и drop
  drag(drop(ref));

  const handleDelete = () => {
    if (onDelete) {
      onDelete(ingredient);
    }
  };

  const cursor = isDraggable && ingredient.type !== 'bun' ? 'move' : 'default';

  return (
    <div ref={ref} className={styles.control} style={{ cursor }}>
      {/* Булочка сверху */}
      {isLocked && type === 'top' && ingredient.type === 'bun' && (
        <ConstructorElement
          handleClose={handleDelete}
          isLocked
          price={ingredient.price}
          text={`${ingredient.name} (верхняя)`}
          thumbnail={ingredient.image_mobile}
          type="top"
        />
      )}
      {!isLocked && type === 'top' && ingredient.type === 'bun' && (
        <ConstructorElement
          handleClose={handleDelete}
          price={ingredient.price}
          text={`${ingredient.name} (верхняя)`}
          thumbnail={ingredient.image_mobile}
          type="top"
        />
      )}

      {/* Начинки и соусы */}
      {type === 'middle' && ingredient.type !== 'bun' && (
        <div className={styles.middle}>
          {isDraggable && <DragIcon type="primary" />}
          <ConstructorElement
            handleClose={handleDelete}
            price={ingredient.price}
            text={ingredient.name}
            thumbnail={ingredient.image_mobile}
          />
        </div>
      )}

      {/* Булочка снизу */}
      {isLocked && type === 'bottom' && ingredient.type === 'bun' && (
        <ConstructorElement
          handleClose={handleDelete}
          isLocked
          price={ingredient.price}
          text={`${ingredient.name} (нижняя)`}
          thumbnail={ingredient.image_mobile}
          type="bottom"
        />
      )}
      {!isLocked && type === 'bottom' && ingredient.type === 'bun' && (
        <ConstructorElement
          handleClose={handleDelete}
          price={ingredient.price}
          text={`${ingredient.name} (нижняя)`}
          thumbnail={ingredient.image_mobile}
          type="bottom"
        />
      )}
    </div>
  );
};
