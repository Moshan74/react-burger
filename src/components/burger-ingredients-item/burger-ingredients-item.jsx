import { CurrencyIcon, Button } from '@krgaa/react-developer-burger-ui-components';
import { useEffect } from 'react';
import { useDrag } from 'react-dnd';
import { useInView } from 'react-intersection-observer';

import styles from './burger-ingredients-item.module.css';

export const BurgerIngredientItem = ({
  ingredient,
  onClick,
  onAdd,
  isLockedAdd = false,
  onSectionChange,
}) => {
  // Перетаскиваемый ингредиент
  const [{ isDragging }, dragRef] = useDrag({
    type: 'INGREDIENT',
    item: ingredient, // Передаём объект напрямую

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

  // Обработчик изменения видимой секции при скролле
  const { ref, inView } = useInView({
    threshold: 0, //области видимости
  });
  useEffect(() => {
    if (inView) {
      onSectionChange(ingredient.type);
    }
  }, [inView]);

  return (
    <section ref={ref} id={ingredient._id}>
      <div
        className={`${styles.items}`}
        onClick={handleClick}
        key={ingredient._id}
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
    </section>
  );
};
