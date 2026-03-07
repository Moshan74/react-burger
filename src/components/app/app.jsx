import { Preloader } from '@krgaa/react-developer-burger-ui-components';
import { nanoid } from 'nanoid';
import { useState, useCallback, useEffect } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useDispatch, useSelector } from 'react-redux';

import { fetchIngredients } from '@/services/ingredientsSlice';
import { createOrder, resetOrder } from '@/services/orderSlice';
import { selectIngredientCounts, selectIngredientCountById } from '@/services/selectors';
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

  //Данные от api
  useEffect(() => {
    dispatch(fetchIngredients()); // Отправляем экшен для загрузки ингредиентов
  }, [dispatch]); // Зависимость от dispatch

  // Получаем данные из хранилища
  const {
    items: ingredients,
    loading,
    error,
  } = useSelector((state) => state.ingredients);

  //Modal окно
  const { selectedIngredient, visibleModalIngredient } = useSelector(
    (state) => state.modal
  );
  const [visibleModalOrder, setVisibleModalOrder] = useState(false);

  //Выбранные ингредиенты
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  //Блокировка кнопки добавить
  const [isLockedBun, setIsLockedBun] = useState(false);
  const [isLockedIngredients, setIsLockedIngredients] = useState(true);

  // Вычисляем количество каждого ингредиента
  const ingredientCounts = selectIngredientCounts(selectedIngredients);
  // Получаем количество для текущего ингредиента в модальном окне
  const modalIngredientCount = selectedIngredient
    ? selectIngredientCountById(ingredientCounts, selectedIngredient.data._id)
    : 0;

  // Фильтрация ингредиентов по типу
  const filterIngredients = useCallback((ingredients) => {
    // Порядок типов: булка, начинки, соусы
    const typeShow = {
      bun: 1,
      main: 2,
      sauce: 3,
    };

    // Сортируем отфильтрованные ингредиенты по порядку из typeShow
    return ingredients
      ? [...ingredients].sort((a, b) => typeShow[a.type] - typeShow[b.type])
      : [];
  }, []);

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
    //РазБлокируем Кнопки Добавить для ингредиентов
    if (ingredient.type === 'bun') {
      //  setIsLockedBun(true);
      setIsLockedIngredients(false);
    }

    //Замена булочки
    //if (ingredient.type === 'bun') {
    //  setSelectedIngredients((prev) => prev.filter((item) => item.type === 'bun'));
    //}

    //setSelectedIngredients((prev) => [
    //  ...prev,
    //  {
    //    ...ingredient,
    //    id: nanoid(),
    //  },
    //]);

    setSelectedIngredients((prev) => {
      // Если добавляем булку, удаляем предыдущую булку из массива
      if (ingredient.type === 'bun') {
        // Удаляем все булки из массива (должна быть только одна)
        const filtered = prev.filter((item) => item.type !== 'bun');
        // Добавляем новую булку
        return [
          ...filtered,
          {
            ...ingredient,
            id: nanoid(),
          },
        ];
      } else {
        // Для остальных ингредиентов просто добавляем в конец
        return [
          ...prev,
          {
            ...ingredient,
            id: nanoid(),
          },
        ];
      }
    });
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
      //  setIsLockedBun(false);
      setIsLockedIngredients(true);
    }

    setSelectedIngredients((prev) => prev.filter((item) => item.id !== ingredient.id));
  }, []);

  // Перемещение ингредиента внутри конструктора
  const handleIngredientMove = useCallback((dragIndex, hoverIndex) => {
    setSelectedIngredients((prev) => {
      const items = [...prev];

      // Находим только ингредиенты, которые можно перетаскивать (не булки)
      const draggableItems = items.filter((item) => item.type !== 'bun');
      const bunItems = items.filter((item) => item.type === 'bun');

      // Если пытаемся переместить недрагируемый элемент или индексы вне диапазона
      if (
        dragIndex < 0 ||
        dragIndex >= draggableItems.length ||
        hoverIndex < 0 ||
        hoverIndex >= draggableItems.length
      ) {
        return prev;
      }

      // Получаем перетаскиваемый элемент
      const draggedItem = draggableItems[dragIndex];

      // Удаляем элемент из старой позиции
      draggableItems.splice(dragIndex, 1);
      // Вставляем элемент в новую позицию
      draggableItems.splice(hoverIndex, 0, draggedItem);

      // Объединяем обратно с булками (булки в начале массива)
      return [...bunItems, ...draggableItems];
    });
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
              ingredients={filterIngredients(ingredients)}
              onClick={handleOpenModalIngredient}
              onAdd={handleIngredientAdd}
              isLockedBun={isLockedBun}
              isLockedIngredients={isLockedIngredients}
              ingredientCounts={ingredientCounts}
            />
            <BurgerConstructor
              ingredients={selectedIngredients}
              //onClick={handleOpenModalOrder}
              onClick={handleOrderSubmit}
              onDelete={handleIngredientDelete}
              onAdd={handleIngredientAdd}
              onMove={handleIngredientMove}
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
              count={modalIngredientCount}
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
