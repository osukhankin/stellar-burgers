import { FC, useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { Preloader } from '@ui';
import { OrderInfoUI } from '@ui';
import { TIngredient } from '@utils-types';
import { useDispatch, useSelector } from '../../services/store';
import { fetchOrderByNumber } from '@slices';
import {
  selectSelectedOrder,
  selectSelectedOrderLoading
} from '../../services/selectors/feed-selectors';
import { selectIngredients } from '../../services/selectors/ingredients-selectors';

export const OrderInfo: FC = () => {
  const { number } = useParams<{ number: string }>();
  const dispatch = useDispatch();

  const orderData = useSelector(selectSelectedOrder);
  const isLoading = useSelector(selectSelectedOrderLoading);
  const ingredients: TIngredient[] = useSelector(selectIngredients);

  useEffect(() => {
    if (number) {
      dispatch(fetchOrderByNumber(Number(number)));
    }
  }, [number]);

  const orderInfo = useMemo(() => {
    if (!orderData || !ingredients.length) return null;

    const date = new Date(orderData.createdAt);

    type TIngredientsWithCount = {
      [key: string]: TIngredient & { count: number };
    };

    const ingredientsInfo = orderData.ingredients.reduce(
      (acc: TIngredientsWithCount, item) => {
        if (acc[item]) {
          acc[item].count++;
        } else {
          const ingredient = ingredients.find((ing) => ing._id === item);
          if (ingredient) {
            acc[item] = {
              ...ingredient,
              count: 1
            };
          }
        }

        return acc;
      },
      {}
    );

    const total = Object.values(ingredientsInfo).reduce(
      (acc, item) => acc + item.price * item.count,
      0
    );

    return {
      ...orderData,
      ingredientsInfo,
      date,
      total
    };
  }, [orderData, ingredients]);

  if (isLoading || !orderInfo) {
    return <Preloader />;
  }

  return <OrderInfoUI orderInfo={orderInfo} />;
};
