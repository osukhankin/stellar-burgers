import authReducer, {
  checkUserAuth,
  loginUser,
  logoutUser
} from '../auth-slice';
import { TUser } from '@utils-types';

const mockUser: TUser = {
  email: 'test@test.com',
  name: 'Test User'
};

const initialState = {
  user: null,
  isAuthenticated: false,
  isAuthChecked: false,
  isLoading: false,
  error: null,
  orders: [],
  ordersLoading: false
};

describe('authSlice', () => {
  describe('checkUserAuth', () => {
    it('fulfilled — должен записать пользователя и установить флаги аутентификации', () => {
      const action = { type: checkUserAuth.fulfilled.type, payload: mockUser };
      const state = authReducer(initialState, action);
      expect(state.user).toEqual(mockUser);
      expect(state.isAuthenticated).toBe(true);
      expect(state.isAuthChecked).toBe(true);
    });

    it('rejected — должен установить isAuthChecked: true без записи пользователя', () => {
      const action = { type: checkUserAuth.rejected.type };
      const state = authReducer(initialState, action);
      expect(state.isAuthChecked).toBe(true);
      expect(state.user).toBeNull();
      expect(state.isAuthenticated).toBe(false);
    });
  });

  describe('loginUser', () => {
    it('pending — должен установить isLoading: true и сбросить ошибку', () => {
      const action = { type: loginUser.pending.type };
      const state = authReducer(initialState, action);
      expect(state.isLoading).toBe(true);
      expect(state.error).toBeNull();
    });

    it('fulfilled — должен записать пользователя и установить isAuthenticated: true', () => {
      const action = { type: loginUser.fulfilled.type, payload: mockUser };
      const state = authReducer(initialState, action);
      expect(state.isLoading).toBe(false);
      expect(state.user).toEqual(mockUser);
      expect(state.isAuthenticated).toBe(true);
    });

    it('rejected — должен записать ошибку и установить isLoading: false', () => {
      const action = {
        type: loginUser.rejected.type,
        error: { message: 'Неверный логин или пароль' }
      };
      const state = authReducer(initialState, action);
      expect(state.isLoading).toBe(false);
      expect(state.error).toBe('Неверный логин или пароль');
    });
  });

  describe('logoutUser', () => {
    it('fulfilled — должен очистить пользователя и сбросить isAuthenticated', () => {
      const stateWithUser = {
        ...initialState,
        user: mockUser,
        isAuthenticated: true
      };
      const action = { type: logoutUser.fulfilled.type };
      const state = authReducer(stateWithUser, action);
      expect(state.user).toBeNull();
      expect(state.isAuthenticated).toBe(false);
    });
  });
});
