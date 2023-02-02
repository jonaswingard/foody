import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import { AppState } from "./store";
import { IAirtableRecord, IBaseState, IRecipeFields } from "@/interfaces";

export interface IRecipeState extends IBaseState {}

export const fetchRecipes = createAsyncThunk(
  "recipes/fetchRecipes",
  async () => {
    try {
      const data = await fetch("/api/airtable/recipes");
      return await data.json();
    } catch (error) {
      console.error(error);
    }
  }
);

const recipesAdapter = createEntityAdapter<IAirtableRecord<IRecipeFields>>();

const initialState: IRecipeState = {
  fetchState: "idle",
};

export const recipesSlice = createSlice({
  name: "recipes",
  initialState: recipesAdapter.getInitialState(initialState),
  reducers: {
    recipiesReceived(state, action) {
      recipesAdapter.setAll(state, action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchRecipes.pending, (state, action) => {
      state.fetchState = "pending";
    });
    builder.addCase(fetchRecipes.fulfilled, (state, action) => {
      recipesAdapter.setAll(state, action.payload);
      state.fetchState = "fulfilled";
    });
  },
});

export const recipeSelectors = recipesAdapter.getSelectors<AppState>(
  (state) => state.recipes
);
export const selectFetchState = (state: AppState) => state.recipes.fetchState;
export const allRecipes = recipeSelectors.selectAll;
export const selectRecipeById = recipeSelectors.selectById;

export default recipesSlice.reducer;
