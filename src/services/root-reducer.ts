import { combineReducers } from '@reduxjs/toolkit';
import ingredientsReducer from './slices/ingredients-slice';
import authReducer from './slices/auth-slice';

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  auth: authReducer
});
