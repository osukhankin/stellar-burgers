import { rootReducer } from '../root-reducer';
import ingredientsReducer from '../slices/ingredients-slice';
import authReducer from '../slices/auth-slice';
import feedReducer from '../slices/feed-slice';
import constructorReducer from '../slices/constructor-slice';

const unknownAction = { type: 'UNKNOWN_ACTION' };

describe('rootReducer', () => {
  it('должен вернуть корректное начальное состояние при вызове с undefined и неизвестным экшеном', () => {
    const state = rootReducer(undefined, unknownAction);

    const expectedState = {
      ingredients: ingredientsReducer(undefined, unknownAction),
      auth: authReducer(undefined, unknownAction),
      feed: feedReducer(undefined, unknownAction),
      burgerConstructor: constructorReducer(undefined, unknownAction)
    };

    expect(state).toEqual(expectedState);
  });
});
