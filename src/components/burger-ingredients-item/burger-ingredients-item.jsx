import { CurrencyIcon, Button } from '@krgaa/react-developer-burger-ui-components';

import styles from './burger-ingredients-item.module.css';

export const BurgerIngredientItem = ({
  ingredient,
  onClick,
  onAdd,
  isLockedAdd = false,
}) => {
  const handleClick = () => {
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
    <div className={styles.items} onClick={handleClick} key={ingredient._id}>
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
