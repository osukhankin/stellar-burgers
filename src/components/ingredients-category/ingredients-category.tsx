import { forwardRef, useMemo } from 'react';
import { TIngredientsCategoryProps } from './type';
import { IngredientsCategoryUI } from '@ui';
import { useSelector } from '../../services/store';
import { selectConstructorItems } from '../../services/selectors/constructor-selectors';

export const IngredientsCategory = forwardRef<
  HTMLUListElement,
  TIngredientsCategoryProps
>(({ title, titleRef, ingredients }, ref) => {
  const { bun, ingredients: constructorIngredients } = useSelector(
    selectConstructorItems
  );

  const ingredientsCounters = useMemo(() => {
    const counters: Record<string, number> = {};
    constructorIngredients.forEach((item) => {
      counters[item._id] = (counters[item._id] ?? 0) + 1;
    });
    if (bun) {
      counters[bun._id] = 2;
    }
    return counters;
  }, [bun, constructorIngredients]);

  return (
    <IngredientsCategoryUI
      title={title}
      titleRef={titleRef}
      ingredients={ingredients}
      ingredientsCounters={ingredientsCounters}
      ref={ref}
    />
  );
});
