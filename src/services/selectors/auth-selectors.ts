import { RootState } from '../store';

export const selectIsAuthenticated = (state: RootState) =>
  state.auth.isAuthenticated;

export const selectIsAuthChecked = (state: RootState) =>
  state.auth.isAuthChecked;

export const selectUser = (state: RootState) => state.auth.user;

export const selectAuthLoading = (state: RootState) => state.auth.isLoading;

export const selectAuthError = (state: RootState) => state.auth.error;
export const selectUserOrders = (state: RootState) => state.auth.orders;
export const selectUserOrdersLoading = (state: RootState) =>
  state.auth.ordersLoading;
