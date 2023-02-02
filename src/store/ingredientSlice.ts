import { IAirtableRecord, IBaseState, IIngredientFields } from "@/interfaces";
import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import { AppState } from "./store";

export interface IIngredientState extends IBaseState {}

export const fetchIngredients = createAsyncThunk(
  "ingredients/fetchIngredients",
  async () => {
    try {
      const data = await fetch("/api/airtable/ingredients");
      return await data.json();
    } catch (error) {
      console.error(error);
    }
  }
);

const ingredientsAdapter =
  createEntityAdapter<IAirtableRecord<IIngredientFields>>();

const initialState: IIngredientState = {
  fetchState: "idle",
};

export const ingredientsSlice = createSlice({
  name: "ingredients",
  initialState: ingredientsAdapter.getInitialState(initialState),
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchIngredients.pending, (state, action) => {
      state.fetchState = "pending";
    });
    builder.addCase(fetchIngredients.fulfilled, (state, action) => {
      ingredientsAdapter.setAll(state, action.payload);

      state.fetchState = "fulfilled";
    });
  },
});

export const ingredientSelectors = ingredientsAdapter.getSelectors<AppState>(
  (state) => state.ingredients
);
export const selectFetchState = (state: AppState) =>
  state.ingredients.fetchState;
export const selectAllIngredients = ingredientSelectors.selectAll;
export const selectIngredientById = ingredientSelectors.selectById;

export default ingredientsSlice.reducer;
