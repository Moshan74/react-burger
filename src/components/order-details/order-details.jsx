import { CurrencyIcon, Counter } from '@krgaa/react-developer-burger-ui-components';

import styles from './order-details.module.css';

export const OrderDetails = ({ ingredient, type, count }) => {

console.log("OrderDetails", ingredient, type, count)

  return (
    <div className="ingredient-card" data-type={type}>
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

    </div>
  );
};