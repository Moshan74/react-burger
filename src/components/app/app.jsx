import { Preloader } from '@krgaa/react-developer-burger-ui-components';
import { useState, useCallback, useEffect } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useDispatch, useSelector } from 'react-redux';

import { fetchIngredients } from '@/services/ingredientsSlice';
import { AppHeader } from '@components/app-header/app-header';
import { BurgerConstructor } from '@components/burger-constructor/burger-constructor';
import { BurgerIngredients } from '@components/burger-ingredients/burger-ingredients';
import { IngredientDetails } from '@components/ingredient-details/ingredient-details';
import { Modal } from '@components/modal/modal';
import { OrderDetails } from '@components/order-details/order-details';

import { openModal, closeModal } from '../../services/modalSlice';

import styles from './app.module.css';

export const App = () => {
  const dispatch = useDispatch(); // Получаем функцию dispatch

  //Modal окно
  const { selectedIngredient, visibleModalIngredient } = useSelector(
    (state) => state.modal
  );
  const [visibleModalOrder, setVisibleModalOrder] = useState(false);

  // Получаем данные из хранилища
  const {
    items: ingredients,
    loading,
    error,
  } = useSelector((state) => state.ingredients);
  //Данные от api
  useEffect(() => {
    dispatch(fetchIngredients()); // Отправляем экшен для загрузки ингредиентов
  }, [dispatch]); // Зависимость от dispatch

  //Выбранные ингредиенты
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  //Блокировка кнопки добавить
  const [isLockedBun, setIsLockedBun] = useState(false);
  const [isLockedIngredients, setIsLockedIngredients] = useState(true);

  //***Обработчики событий***//
  //Modal Ingredient
  function handleOpenModalIngredient(ingredient) {
    dispatch(
      openModal({
        modalType: 'ingredient',
        data: ingredient,
      })
    );
  }
  function handleCloseModalIngredient() {
    dispatch(closeModal());
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
    <DndProvider backend={HTML5Backend}>
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
              ingredient={selectedIngredient.data}
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
    </DndProvider>
  );
};
