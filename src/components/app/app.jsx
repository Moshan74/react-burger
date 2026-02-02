import { AppHeader } from '@components/app-header/app-header';
import { BurgerConstructor } from '@components/burger-constructor/burger-constructor';
import { BurgerIngredients } from '@components/burger-ingredients/burger-ingredients';
//import { ingredients } from '@utils/ingredients';
import { useApiIngredients } from '@utils/useApiIngredients';

import styles from './app.module.css';

export const App = () => {
  //Данные от api
  const { ingredients, loading, error } = useApiIngredients();

  if (loading) {
    return <div className={styles.title}>Загрузка...</div>;
  }

  if (error) {
    return <div>Ошибка: {error}</div>;
  }

  return (
    <div className={styles.app}>
      <AppHeader />
      <h1 className={`${styles.title} text text_type_main-large mt-10 mb-5 pl-5`}>
        Соберите бургер
      </h1>
      {loading ? (
        <div className={styles.title}>Загрузка...</div>
      ) : (
        <main className={`${styles.main} pl-5 pr-5`}>
          <BurgerIngredients ingredients={ingredients} />
          <BurgerConstructor ingredients={ingredients} />
        </main>
      )}
    </div>
  );
  //<ApiIingredients />
};
