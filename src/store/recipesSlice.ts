import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import { AppState } from "./store";
import {
  IAirtableRecord,
  IBaseState,
  IRecipeFields,
  IRecipeRecord,
  TAsyncState,
} from "@/interfaces";
import build from "next/dist/build";

export interface IRecipeState extends IBaseState {
  postState: TAsyncState;
  deleteState: TAsyncState;
}

export const fetchRecipes = createAsyncThunk(
  "recipes/fetchRecipes",
  async () => {
    try {
      const data = await fetch("/api/airtable/recipes");
      return (await data.json()) as IAirtableRecord<IRecipeFields>[];
    } catch (error) {
      console.error(error);
    }
  }
);

export const addRecipe = createAsyncThunk(
  "recipes/addRecipe",
  async (recipe: IRecipeFields) => {
    try {
      const data = await fetch("/api/airtable/recipe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": "token-value",
        },
        body: JSON.stringify(recipe),
      });
      return (await data.json()) as IAirtableRecord<IRecipeFields>[];
    } catch (error) {
      console.error(error);
    }
  }
);

export const deleteRecipe = createAsyncThunk(
  "recipes/deleteRecipe",
  async (recipeId: string) => {
    try {
      const data = await fetch("/api/airtable/recipe", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": "token-value",
        },
        body: JSON.stringify(recipeId),
      });
      return (await data.json()) as IAirtableRecord<IRecipeFields>;
    } catch (error) {
      console.error(error);
    }
  }
);

const recipesAdapter = createEntityAdapter<IAirtableRecord<IRecipeFields>>();

const initialState: IRecipeState = {
  fetchState: "idle",
  postState: "idle",
  deleteState: "idle",
};

export const recipesSlice = createSlice({
  name: "recipes",
  initialState: recipesAdapter.getInitialState(initialState),
  reducers: {
    recipiesReceived(state, action) {
      recipesAdapter.setAll(state, action.payload);
    },
    resetDeleteState(state) {
      state.deleteState = "idle";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchRecipes.pending, (state) => {
      state.fetchState = "pending";
    });
    builder.addCase(fetchRecipes.fulfilled, (state, action) => {
      if (action.payload) {
        recipesAdapter.setAll(state, action.payload);
      }

      state.fetchState = "fulfilled";
    });
    builder.addCase(fetchRecipes.rejected, (state) => {
      state.fetchState = "rejected";
    });

    builder.addCase(addRecipe.pending, (state) => {
      state.postState = "pending";
    });
    builder.addCase(addRecipe.fulfilled, (state, action) => {
      if (action.payload) {
        recipesAdapter.addMany(state, action.payload);
      }
      state.postState = "fulfilled";
    });
    builder.addCase(addRecipe.rejected, (state) => {
      state.postState = "rejected";
    });

    builder.addCase(deleteRecipe.pending, (state) => {
      state.deleteState = "pending";
    });
    builder.addCase(deleteRecipe.fulfilled, (state, action) => {
      if (action.payload?.id) {
        recipesAdapter.removeOne(state, action.payload.id);
      }
      state.deleteState = "fulfilled";
    });
    builder.addCase(deleteRecipe.rejected, (state) => {
      state.deleteState = "rejected";
    });
  },
});

export const recipeSelectors = recipesAdapter.getSelectors<AppState>(
  (state) => state.recipes
);
export const selectFetchState = (state: AppState) => state.recipes.fetchState;
export const selectPostState = (state: AppState) => state.recipes.postState;
export const selectDeleteState = (state: AppState) => state.recipes.deleteState;
export const allRecipes = recipeSelectors.selectAll;
export const selectRecipeById = recipeSelectors.selectById;

export const { resetDeleteState } = recipesSlice.actions;

export default recipesSlice.reducer;
