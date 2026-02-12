import { CurrencyIcon, Button } from '@krgaa/react-developer-burger-ui-components';

import styles from './burger-ingredients-item.module.css';

export const BurgerIngredientItem = ({ ingredient, onClick, onAdd }) => {
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
    <div onClick={handleClick} key={ingredient._id}>
      <div>
        <img src={ingredient.image} alt={ingredient.name} />
      </div>

      <p className="text text_type_main-default ingredient-name">{ingredient.name}</p>

      <div>
        <div className={styles.items}>
          <div className={styles.item}>
            <span className="text text_type_digits-medium">{ingredient.price}</span>
            <CurrencyIcon type="primary" />
          </div>

          <div className={styles.button}>
            {
              <Button onClick={handleAdd} size="small" type="primary">
                Добавить
              </Button>
            }
          </div>
        </div>
      </div>
    </div>
  );
};
