import { Preloader } from '@krgaa/react-developer-burger-ui-components';
import { useState, useCallback } from 'react';

import { AppHeader } from '@components/app-header/app-header';
import { BurgerConstructor } from '@components/burger-constructor/burger-constructor';
import { BurgerIngredients } from '@components/burger-ingredients/burger-ingredients';
import { IngredientDetails } from '@components/ingredient-details/ingredient-details';
import { Modal } from '@components/modal/modal';
import { OrderDetails } from '@components/order-details/order-details';
import { useApiIngredients } from '@utils/useApiIngredients';

import styles from './app.module.css';

export const App = () => {
  //Modal окно
  const [visibleModalIngredient, setVisibleModalIngredient] = useState(false);
  const [visibleModalOrder, setVisibleModalOrder] = useState(false);
  //Данные от api
  const { ingredients, loading, error } = useApiIngredients();
  //Выбранные ингредиенты
  const [selectedIngredient, setSelectedIngredient] = useState();
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  //Блокировка кнопки добавить
  const [isLockedBun, setIsLockedBun] = useState(false);
  const [isLockedIngredients, setIsLockedIngredients] = useState(true);

  //***Обработчики событий***//
  //Modal Ingredient
  function handleOpenModalIngredient(ingredient) {
    setSelectedIngredient(ingredient);
    setVisibleModalIngredient(true);
  }
  function handleCloseModalIngredient() {
    setVisibleModalIngredient(false);
  }
  //Modal Order
  function handleOpenModalOrder() {
    handleIngredientsEmpty();
    setVisibleModalOrder(true);
  }
  function handleCloseModalOrder() {
    setVisibleModalOrder(false);
  }
  //Добавиьт ингредиент в заказ
  const handleIngredientAdd = useCallback((ingredient) => {
    //Блокируем отображения Кнопки Добавить
    if (ingredient.type === 'bun') {
      setIsLockedBun(true);
      setIsLockedIngredients(false);
    }

    setSelectedIngredients((prev) => [
      ...prev,
      {
        ...ingredient,
      },
    ]);
  }, []);
  //Очистить ингредиентs из заказа
  const handleIngredientsEmpty = useCallback(() => {
    //РазБлокируем отображения Кнопки Добавить
    setIsLockedBun(true);
    setIsLockedIngredients(false);
    setSelectedIngredients([]);
  }, []);
  //Очистить ингредиент из заказа
  const handleIngredientDelete = useCallback((ingredient) => {
    //РазБлокируем отображения Кнопки Добавить
    if (ingredient.type === 'bun') {
      setIsLockedBun(false);
      setIsLockedIngredients(true);
    }

    setSelectedIngredients((prev) => prev.filter((item) => item._id !== ingredient._id));
  }, []);

  return (
    <div className={styles.app}>
      <AppHeader />
      <h1 className={`${styles.title} text text_type_main-large mt-10 mb-5 pl-5`}>
        Соберите бургер
      </h1>

      {loading || error ? (
        <Preloader />
      ) : (
        <main className={`${styles.main} pl-5 pr-5`}>
          <BurgerIngredients
            ingredients={ingredients}
            onClick={handleOpenModalIngredient}
            onAdd={handleIngredientAdd}
            isLockedBun={isLockedBun}
            isLockedIngredients={isLockedIngredients}
          />
          <BurgerConstructor
            ingredients={selectedIngredients}
            onClick={handleOpenModalOrder}
            onDelete={handleIngredientDelete}
          />
        </main>
      )}

      {/* Модальное окно error */}
      {error && (
        <Modal title="Ошибка сети Internet">
          <div>{error}</div>
        </Modal>
      )}

      {/* Модальное окно с деталями ингредиента */}
      {visibleModalIngredient && selectedIngredient && (
        <Modal title="Детали ингредиента" onClose={handleCloseModalIngredient}>
          <IngredientDetails
            ingredient={selectedIngredient}
            onAdd={handleIngredientAdd}
            isLockedBun={isLockedBun}
            isLockedIngredients={isLockedIngredients}
          />
        </Modal>
      )}

      {/* Модальное окно с заказом */}
      {visibleModalOrder && selectedIngredients && (
        <Modal title="Детали заказа" onClose={handleCloseModalOrder}>
          <OrderDetails order={'034536'} />
        </Modal>
      )}
    </div>
  );
};
