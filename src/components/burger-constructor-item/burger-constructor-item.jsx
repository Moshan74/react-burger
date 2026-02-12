import {
  ConstructorElement,
  DragIcon,
} from '@krgaa/react-developer-burger-ui-components';

import styles from './burger-constructor-item.module.css';

export const BurgerConstructorItem = ({ ingredient, type }) => {
  return (
    <div className={styles.control}>
      {/* Булочка сверху */}
      {type === 'top' && ingredient.type === 'bun' && (
        <ConstructorElement
          handleClose={function fee() {
            console.log('kjhkjh');
          }}
          isLocked
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
            handleClose={function fee() {
              console.log('kjhkjh');
            }}
            price={ingredient.price}
            text={ingredient.name}
            thumbnail={ingredient.image_mobile}
          />
        </div>
      )}

      {/* Булочка снизу */}
      {type === 'bottom' && ingredient.type === 'bun' && (
        <ConstructorElement
          handleClose={function fee() {
            console.log('kjhkjh');
          }}
          isLocked
          price={ingredient.price}
          text={ingredient.name}
          thumbnail={ingredient.image_mobile}
          type="bottom"
        />
      )}
    </div>
  );
};
