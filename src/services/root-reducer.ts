import { combineReducers } from '@reduxjs/toolkit';
import ingredientsReducer from './slices/ingredients-slice';
import authReducer from './slices/auth-slice';
import feedReducer from './slices/feed-slice';
import constructorReducer from './slices/constructor-slice';

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  auth: authReducer,
  feed: feedReducer,
  burgerConstructor: constructorReducer
});
