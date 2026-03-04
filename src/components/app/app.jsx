import { Preloader } from '@krgaa/react-developer-burger-ui-components';
import { nanoid } from 'nanoid';
import { useState, useCallback, useEffect } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useDispatch, useSelector } from 'react-redux';

import { fetchIngredients } from '@/services/ingredientsSlice';
import { createOrder, resetOrder } from '@/services/orderSlice';
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
  //function handleOpenModalOrder() {
  //  handleIngredientsEmpty();
  //  setVisibleModalOrder(true);
  //}
  //function handleCloseModalOrder() {
  //  setVisibleModalOrder(false);
  //}
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
        id: nanoid(),
      },
    ]);
  }, []);
  //Очистить ингредиентs из заказа
  //const handleIngredientsEmpty = useCallback(() => {
  //  //РазБлокируем отображения Кнопки Добавить
  //  setIsLockedBun(true);
  //  setIsLockedIngredients(false);
  //  setSelectedIngredients([]);
  //}, []);
  //Очистить ингредиент из заказа
  const handleIngredientDelete = useCallback((ingredient) => {
    //РазБлокируем отображения Кнопки Добавить
    if (ingredient.type === 'bun') {
      setIsLockedBun(false);
      setIsLockedIngredients(true);
    }

    setSelectedIngredients((prev) => prev.filter((item) => item.id !== ingredient.id));
  }, []);

  /* Заказ */
  // Данные заказа из хранилища
  const {
    //loading, // Статус загрузки
    status, // Статус операции
    number, // Номер заказа
    //error, // Сообщение об ошибке
    //orderData, // Полный ответ сервера
  } = useSelector((state) => state.order);
  // Обработчик оформления заказа
  const handleOrderSubmit = useCallback(() => {
    // Находим булочку среди выбранных ингредиентов
    const bun = selectedIngredients.find((item) => item.type === 'bun');

    // Извлекаем ID начинок (все ингредиенты, кроме булочки)
    const fillingIds = selectedIngredients
      .filter((item) => item.type !== 'bun')
      .map((item) => item._id);

    // Извлекаем ID ингредиентов для отправки на сервер
    //const ingredientIds = selectedIngredients.map((item) => item._id);
    // Формируем итоговый массив: булочка → начинки → булочка
    const ingredientIds = [
      bun._id, // ID булочки в начале
      ...fillingIds, // ID начинок
      bun._id, // ID булочки в конце
    ];

    // Отправляем асинхронный запрос на оформление заказа
    dispatch(createOrder(ingredientIds));
  }, [dispatch, selectedIngredients]);

  // Эффект для отслеживания статуса заказа и открытия модального окна
  useEffect(() => {
    if (status === 'succeeded') {
      setIsLockedBun(false);
      setIsLockedIngredients(true);
      setSelectedIngredients([]);
      setVisibleModalOrder(true); // Открываем модальное окно с номером заказа
    }
  }, [status]);

  // Функция для закрытия модального окна и сброса состояния заказа
  const handleCloseModalOrder = useCallback(() => {
    setVisibleModalOrder(false);
    dispatch(resetOrder()); // Сбрасываем состояние заказа
  }, [dispatch]);
  /* /Заказ */

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
              //onClick={handleOpenModalOrder}
              onClick={handleOrderSubmit}
              onDelete={handleIngredientDelete}
              onAdd={handleIngredientAdd}
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
            <OrderDetails order={number} />
          </Modal>
        )}
      </div>
    </DndProvider>
  );
};
