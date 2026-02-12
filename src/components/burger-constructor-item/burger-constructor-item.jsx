import {
  ConstructorElement,
  DragIcon,
} from '@krgaa/react-developer-burger-ui-components';

import styles from './burger-constructor-item.module.css';

export const BurgerConstructorItem = ({
  ingredient,
  type,
  onDelete,
  isLocked = false,
}) => {
  const handleDelete = () => {
    if (onDelete) {
      onDelete(ingredient);
    }
  };

  return (
    <div className={styles.control}>
      {/* Булочка сверху */}
      {isLocked && type === 'top' && ingredient.type === 'bun' && (
        <ConstructorElement
          handleClose={handleDelete}
          isLocked
          price={ingredient.price}
          text={ingredient.name}
          thumbnail={ingredient.image_mobile}
          type="top"
        />
      )}
      {!isLocked && type === 'top' && ingredient.type === 'bun' && (
        <ConstructorElement
          handleClose={handleDelete}
          price={ingredient.price}
          text={ingredient.name}
          thumbnail={ingredient.image_mobile}
          type="top"
        />
      )}

      {/* Начинки */}
      {type === 'middle' && ingredient.type !== 'bun' && (
        <div>
          <DragIcon type="primary" />
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
          text={ingredient.name}
          thumbnail={ingredient.image_mobile}
          type="bottom"
        />
      )}
      {!isLocked && type === 'bottom' && ingredient.type === 'bun' && (
        <ConstructorElement
          handleClose={handleDelete}
          price={ingredient.price}
          text={ingredient.name}
          thumbnail={ingredient.image_mobile}
          type="bottom"
        />
      )}
    </div>
  );
};
