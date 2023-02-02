import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";

import recipesReducer from "./recipesSlice";
import ingredientsReducer from "./ingredientSlice";
import directionsReducer from "./directionsSlice";

export function makeStore() {
  return configureStore({
    reducer: {
      recipes: recipesReducer,
      ingredients: ingredientsReducer,
      directions: directionsReducer,
    },
  });
}

const store = makeStore();

export type AppState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action<string>
>;

export default store;
