import { Button, Counter } from '@krgaa/react-developer-burger-ui-components';
import { useState, useEffect } from 'react';

import styles from './ingredient-details.module.css';

export const IngredientDetails = ({
  ingredient,
  onAdd,
  isLockedBun = false,
  isLockedIngredients = false,
  count = 0,
}) => {
  const handleAdd = () => {
    if (onAdd) {
      onAdd(ingredient);
    }
  };

  //Блокировка кнопки добавить
  const [isLockedAdd, setIsLockedAdd] = useState(false);

  // Синхронизация состояний при изменении блокировок кнопок
  useEffect(() => {
    //Разблокировка Кнопки Добавить
    if (ingredient.type === 'bun') setIsLockedAdd(isLockedBun);
    else setIsLockedAdd(isLockedIngredients);
  }, [isLockedBun, isLockedIngredients]);

  return (
    <div className={styles.card} style={{ position: 'relative' }}>
      <div>
        <img src={ingredient.image_large} alt={ingredient.name} />
      </div>

      <div>{count > 0 && <Counter count={count} size="default" />}</div>

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
