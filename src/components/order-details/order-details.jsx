import styles from './order-details.module.css';

export const OrderDetails = ({ order }) => {
  return (
    <div className={styles.order}>
      <div className="text text_type_digits-medium">{order}</div>

      <div className="text text_type_main-small">Ваш заказ начали готовить!</div>

      <div className="text text_type_main-default text_color_inactive">
        Дождитесь готовность наорбитальной станции.
      </div>
    </div>
  );
};
