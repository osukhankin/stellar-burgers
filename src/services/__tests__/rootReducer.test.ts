import { rootReducer } from '../root-reducer';

describe('rootReducer', () => {
  it('должен вернуть корректное начальное состояние при вызове с undefined и неизвестным экшеном', () => {
    const state = rootReducer(undefined, { type: 'UNKNOWN_ACTION' });

    expect(state).toEqual({
      ingredients: {
        ingredients: [],
        isLoading: false,
        error: null
      },
      auth: {
        user: null,
        isAuthenticated: false,
        isAuthChecked: false,
        isLoading: false,
        error: null,
        orders: [],
        ordersLoading: false
      },
      feed: {
        orders: [],
        total: 0,
        totalToday: 0,
        isLoading: false,
        error: null,
        selectedOrder: null,
        selectedOrderLoading: false
      },
      burgerConstructor: {
        bun: null,
        ingredients: [],
        orderRequest: false,
        orderModalData: null
      }
    });
  });
});
