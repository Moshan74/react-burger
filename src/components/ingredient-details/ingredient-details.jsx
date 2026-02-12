import { Button } from '@krgaa/react-developer-burger-ui-components';

import styles from './ingredient-details.module.css';

export const IngredientDetails = ({ ingredient, onAdd }) => {
  const handleAdd = () => {
    if (onAdd) {
      onAdd(ingredient);
    }
  };

  return (
    <div className={styles.card}>
      <div>
        <img src={ingredient.image_large} alt={ingredient.name} />
      </div>

      <h3 className="text text_type_main-medium mt-4 mb-8">{ingredient.name}</h3>

      <div className={styles.items}>
        <div className={styles.item}>
          <span className="text text_type_main-default text_color_inactive">
            Калории,ккал
          </span>
          <span className="text text_type_digits-default text_color_inactive mt-2">
            {ingredient.calories}
          </span>
        </div>

        <div className={styles.item}>
          <span className="text text_type_main-default text_color_inactive">
            Белки, г
          </span>
          <span className="text text_type_digits-default text_color_inactive mt-2">
            {ingredient.proteins}
          </span>
        </div>

        <div className={styles.item}>
          <span className="text text_type_main-default text_color_inactive">
            Жиры, г
          </span>
          <span className="text text_type_digits-default text_color_inactive mt-2">
            {ingredient.fat}
          </span>
        </div>

        <div className={styles.item}>
          <span className="text text_type_main-default text_color_inactive">
            Углеводы, г
          </span>
          <span className="text text_type_digits-default text_color_inactive mt-2">
            {ingredient.carbohydrates}
          </span>
        </div>
      </div>

      <div className={styles.button}>
        <Button onClick={handleAdd} size="small" type="primary">
          Добавить
        </Button>
      </div>
    </div>
  );
};
