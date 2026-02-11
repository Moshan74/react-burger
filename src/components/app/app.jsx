import { useState, useRef, useEffect, useCallback } from 'react';

import { AppHeader } from '@components/app-header/app-header';
import { BurgerConstructor } from '@components/burger-constructor/burger-constructor';
import { BurgerIngredients } from '@components/burger-ingredients/burger-ingredients';
import Modal from '../modal/modal.jsx';

//import { ingredients } from '@utils/ingredients';
import { useApiIngredients } from '@utils/useApiIngredients';

import { Preloader } from '@krgaa/react-developer-burger-ui-components';

import styles from './app.module.css';

export const App = () => {
  //Modal окно
  const [visibleModal, setVisibleModal] = useState(false);
  //Данные от api
  const { ingredients, loading, error } = useApiIngredients();
  //Выбранные ингредиенты
  const [selectedIngredients, setSelectedIngredients] = useState([]);

  //Обработчики событий
  //Modal
  function handleOpenModal(ingredient) {
    console.log("handleOpenModal", ingredient)
    setVisibleModal(true);
  }
  function handleCloseModal() {
    setVisibleModal(false);
  }
  //Добавиьт ингредиент в заказ
  const handleIngredientAdd = useCallback((ingredient) => {
    console.log("handleIngredientAdd", ingredient);
    setSelectedIngredients(prev => [...prev, { 
      ...ingredient
    }]);
  }, []);

  if (error) {
    return <div>Ошибка: {error}</div>;
  }

  return (
    <div className={styles.app}>
      <AppHeader />
      <h1 className={`${styles.title} text text_type_main-large mt-10 mb-5 pl-5`}>
        Соберите бургер
      </h1>
      {error && (
        <div>Ошибка: {error}</div>        
      )}
      {loading ? (
        <Preloader />        
      ) : (
        <main className={`${styles.main} pl-5 pr-5`}>
          <BurgerIngredients ingredients={ingredients} onClick={handleOpenModal} onAdd={handleIngredientAdd}/>
          <BurgerConstructor ingredients={selectedIngredients} />
        </main>
      )}

      <div style={{ overflow: 'hidden' }}>
        {/*<button onClick={handleOpenModal}>Открыть модальное окно</button>*/}
        {visibleModal && (
          <Modal header="Внимание!" onClose={handleCloseModal} onAdd={handleIngredientAdd}>
            <p>Спасибо за внимание!</p>
            <p>Открывай меня, если станет скучно :)</p>
          </Modal>
        )}
      </div>

    </div>

    
  );
};
