import constructorReducer, {
  addIngredient,
  removeIngredient,
  moveIngredient,
  createOrder
} from '../constructor-slice';
import { TIngredient } from '@utils-types';

const mockBun: TIngredient = {
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
};

const mockIngredient: TIngredient = {
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
};

const mockOrder = {
  _id: 'order-1',
  status: 'done',
  name: 'Бургер',
  createdAt: '',
  updatedAt: '',
  number: 12345,
  ingredients: []
};

const initialState = {
  bun: null,
  ingredients: [],
  orderRequest: false,
  orderModalData: null
};

describe('constructorSlice', () => {
  describe('addIngredient', () => {
    it('должен добавить булку в bun', () => {
      const state = constructorReducer(initialState, addIngredient(mockBun));
      expect(state.bun).toMatchObject({ _id: 'bun-1', type: 'bun' });
    });

    it('должен заменить булку при добавлении новой', () => {
      const anotherBun: TIngredient = {
        ...mockBun,
        _id: 'bun-2',
        name: 'Другая булка'
      };
      const stateWithBun = constructorReducer(
        initialState,
        addIngredient(mockBun)
      );
      const state = constructorReducer(stateWithBun, addIngredient(anotherBun));
      expect(state.bun?._id).toBe('bun-2');
    });

    it('должен добавить начинку в массив ingredients с уникальным id', () => {
      const state = constructorReducer(
        initialState,
        addIngredient(mockIngredient)
      );
      expect(state.ingredients).toHaveLength(1);
      expect(state.ingredients[0]).toMatchObject({ _id: 'ing-1' });
      expect(state.ingredients[0].id).toBeDefined();
    });
  });

  describe('removeIngredient', () => {
    it('должен удалить ингредиент по id', () => {
      const stateWithIngredient = constructorReducer(
        initialState,
        addIngredient(mockIngredient)
      );
      const addedId = stateWithIngredient.ingredients[0].id;
      const state = constructorReducer(
        stateWithIngredient,
        removeIngredient(addedId)
      );
      expect(state.ingredients).toHaveLength(0);
    });

    it('не должен удалять другие ингредиенты', () => {
      const anotherIngredient: TIngredient = {
        ...mockIngredient,
        _id: 'ing-2'
      };
      let state = constructorReducer(
        initialState,
        addIngredient(mockIngredient)
      );
      state = constructorReducer(state, addIngredient(anotherIngredient));
      const idToRemove = state.ingredients[0].id;
      state = constructorReducer(state, removeIngredient(idToRemove));
      expect(state.ingredients).toHaveLength(1);
      expect(state.ingredients[0]._id).toBe('ing-2');
    });
  });

  describe('moveIngredient', () => {
    it('должен поменять местами ингредиенты', () => {
      const ing2: TIngredient = { ...mockIngredient, _id: 'ing-2' };
      const ing3: TIngredient = { ...mockIngredient, _id: 'ing-3' };
      let state = constructorReducer(
        initialState,
        addIngredient(mockIngredient)
      );
      state = constructorReducer(state, addIngredient(ing2));
      state = constructorReducer(state, addIngredient(ing3));

      state = constructorReducer(
        state,
        moveIngredient({ fromIndex: 0, toIndex: 2 })
      );

      expect(state.ingredients[0]._id).toBe('ing-2');
      expect(state.ingredients[1]._id).toBe('ing-3');
      expect(state.ingredients[2]._id).toBe('ing-1');
    });
  });

  describe('createOrder async', () => {
    it('pending — должен установить orderRequest: true', () => {
      const action = { type: createOrder.pending.type };
      const state = constructorReducer(initialState, action);
      expect(state.orderRequest).toBe(true);
    });

    it('fulfilled — должен записать данные заказа и очистить конструктор', () => {
      const action = { type: createOrder.fulfilled.type, payload: mockOrder };
      const stateWithItems = {
        ...initialState,
        bun: { ...mockBun, id: 'uuid-1' },
        ingredients: [{ ...mockIngredient, id: 'uuid-2' }],
        orderRequest: true
      };
      const state = constructorReducer(stateWithItems, action);
      expect(state.orderRequest).toBe(false);
      expect(state.orderModalData).toMatchObject({ number: 12345 });
      expect(state.bun).toBeNull();
      expect(state.ingredients).toHaveLength(0);
    });

    it('rejected — должен сбросить orderRequest: false', () => {
      const action = { type: createOrder.rejected.type };
      const stateWithRequest = { ...initialState, orderRequest: true };
      const state = constructorReducer(stateWithRequest, action);
      expect(state.orderRequest).toBe(false);
    });
  });
});
