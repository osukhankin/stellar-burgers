import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { fetchIngredients } from '@slices';
import {
  selectIngredients,
  selectIngredientsLoading,
  selectIngredientsError
} from '../../services/selectors/ingredients-selectors';

import styles from './constructor-page.module.css';

import { BurgerConstructor, BurgerIngredients } from '@components';
import { Preloader } from '@ui';

export const ConstructorPage: FC = () => {
  const dispatch = useDispatch();
  const ingredients = useSelector(selectIngredients);
  const isLoading = useSelector(selectIngredientsLoading);
  const error = useSelector(selectIngredientsError);

  useEffect(() => {
    dispatch(fetchIngredients());
  }, []);

  if (isLoading) return <Preloader />;
  if (error)
    return (
      <div className={`${styles.error} text text_type_main-medium pt-4`}>
        {error}
      </div>
    );
  if (!ingredients.length)
    return (
      <div className={`${styles.title} text text_type_main-medium pt-4`}>
        Нет ингредиентов
      </div>
    );

  return (
    <main className={styles.containerMain}>
      <h1
        className={`${styles.title} text text_type_main-large mt-10 mb-5 pl-5`}
      >
        Соберите бургер
      </h1>
      <div className={`${styles.main} pl-5 pr-5`}>
        <BurgerIngredients />
        <BurgerConstructor />
      </div>
    </main>
  );
};
