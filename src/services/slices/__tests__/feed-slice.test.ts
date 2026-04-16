import feedReducer, { fetchFeeds } from '../feed-slice';
import { TOrder } from '@utils-types';

const mockOrders: TOrder[] = [
  {
    _id: 'order-1',
    status: 'done',
    name: 'Краторный бургер',
    createdAt: '2024-01-01T00:00:00.000Z',
    updatedAt: '2024-01-01T00:00:00.000Z',
    number: 12345,
    ingredients: ['bun-1', 'ing-1', 'bun-1']
  }
];

const initialState = {
  orders: [],
  total: 0,
  totalToday: 0,
  isLoading: false,
  error: null,
  selectedOrder: null,
  selectedOrderLoading: false
};

describe('feedSlice', () => {
  describe('fetchFeeds', () => {
    it('pending — должен установить isLoading: true и сбросить ошибку', () => {
      const action = { type: fetchFeeds.pending.type };
      const state = feedReducer(initialState, action);
      expect(state.isLoading).toBe(true);
      expect(state.error).toBeNull();
    });

    it('fulfilled — должен записать заказы, total, totalToday и установить isLoading: false', () => {
      const action = {
        type: fetchFeeds.fulfilled.type,
        payload: { orders: mockOrders, total: 100, totalToday: 10 }
      };
      const state = feedReducer(initialState, action);
      expect(state.isLoading).toBe(false);
      expect(state.orders).toEqual(mockOrders);
      expect(state.total).toBe(100);
      expect(state.totalToday).toBe(10);
    });

    it('rejected — должен записать ошибку и установить isLoading: false', () => {
      const action = {
        type: fetchFeeds.rejected.type,
        error: { message: 'Ошибка загрузки ленты заказов' }
      };
      const state = feedReducer(initialState, action);
      expect(state.isLoading).toBe(false);
      expect(state.error).toBe('Ошибка загрузки ленты заказов');
    });
  });
});
