import { CurrencyIcon, Counter, Button } from '@krgaa/react-developer-burger-ui-components';

import styles from './ingredient-details.module.css';

export const IngredientDetails = ({ ingredient, type, count, onClick, onAdd }) => {

console.log("IngredientDetails", ingredient, type, count);

 const handleClick = () => {
    if (onClick) {
      onClick(ingredient);
    }
  };

  const handleAdd = () => {
    if (onAdd) {
      onAdd(ingredient);
    }
  };

  return (
    <div className="ingredient-card" data-type={type} onClick={handleClick}>
      <div className="ingredient-image-wrapper">
        <img 
          src={ingredient.image} 
          alt={ingredient.name} 
          className="ingredient-image"
        />
        {count > 0 && (
          <Counter count={count} size="default" />
        )}
      </div>
      
      <div className="ingredient-price">
        <span className="text text_type_digits-default">
          {ingredient.price}
        </span>
        <CurrencyIcon type="primary" />
      </div>
      
      <p className="text text_type_main-default ingredient-name">
        {ingredient.name}
      </p>     

      <Button
        onClick={handleAdd}
        size="small"
        type="primary"
      >
        Добавить
      </Button> 

    </div>
  );
};