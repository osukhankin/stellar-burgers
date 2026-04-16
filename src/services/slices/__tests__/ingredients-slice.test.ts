import ingredientsReducer, { fetchIngredients } from '../ingredients-slice';
import { TIngredient } from '@utils-types';

const mockIngredients: TIngredient[] = [
  {
    _id: 'bun-1',
    name: 'Краторная булка',
    type: 'bun',
    proteins: 80,
    fat: 24,
    carbohydrates: 53,
    calories: 420,
    price: 1255,
    image: 'bun.png',
    image_large: 'bun_large.png',
    image_mobile: 'bun_mobile.png'
  },
  {
    _id: 'ing-1',
    name: 'Биокотлета из марсианской Магнолии',
    type: 'main',
    proteins: 420,
    fat: 142,
    carbohydrates: 242,
    calories: 4242,
    price: 424,
    image: 'ing.png',
    image_large: 'ing_large.png',
    image_mobile: 'ing_mobile.png'
  }
];

const initialState = {
  ingredients: [],
  isLoading: false,
  error: null
};

describe('ingredientsSlice', () => {
  describe('fetchIngredients', () => {
    it('pending — должен установить isLoading: true и сбросить ошибку', () => {
      const action = { type: fetchIngredients.pending.type };
      const state = ingredientsReducer(initialState, action);
      expect(state.isLoading).toBe(true);
      expect(state.error).toBeNull();
    });

    it('fulfilled — должен записать ингредиенты и установить isLoading: false', () => {
      const action = {
        type: fetchIngredients.fulfilled.type,
        payload: mockIngredients
      };
      const state = ingredientsReducer(initialState, action);
      expect(state.isLoading).toBe(false);
      expect(state.ingredients).toEqual(mockIngredients);
    });

    it('rejected — должен записать ошибку и установить isLoading: false', () => {
      const action = {
        type: fetchIngredients.rejected.type,
        error: { message: 'Ошибка сети' }
      };
      const state = ingredientsReducer(initialState, action);
      expect(state.isLoading).toBe(false);
      expect(state.error).toBe('Ошибка сети');
    });
  });
});
