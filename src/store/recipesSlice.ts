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
  TAsyncState,
} from "@/interfaces";
import build from "next/dist/build";

export interface IRecipeState extends IBaseState {
  submitState: TAsyncState;
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

export const updateRecipe = createAsyncThunk(
  "recipes/updateRecipe",
  async (recipe: IAirtableRecord<IRecipeFields>) => {
    try {
      const data = await fetch("/api/airtable/recipe", {
        method: "PUT",
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
  submitState: "idle",
};

export const recipesSlice = createSlice({
  name: "recipes",
  initialState: recipesAdapter.getInitialState(initialState),
  reducers: {
    recipiesReceived(state, action) {
      recipesAdapter.setAll(state, action.payload);
    },
    resetSubmitState(state) {
      state.submitState = "idle";
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
      state.submitState = "pending";
    });
    builder.addCase(addRecipe.fulfilled, (state, action) => {
      if (action.payload) {
        recipesAdapter.addMany(state, action.payload);
      }
      state.submitState = "fulfilled";
    });
    builder.addCase(addRecipe.rejected, (state) => {
      state.submitState = "rejected";
    });

    builder.addCase(updateRecipe.pending, (state) => {
      state.submitState = "pending";
    });
    builder.addCase(updateRecipe.fulfilled, (state, action) => {
      if (action.payload) {
        recipesAdapter.upsertMany(state, action.payload);
      }
      state.submitState = "fulfilled";
    });
    builder.addCase(updateRecipe.rejected, (state) => {
      state.submitState = "rejected";
    });

    builder.addCase(deleteRecipe.pending, (state) => {
      state.submitState = "pending";
    });
    builder.addCase(deleteRecipe.fulfilled, (state, action) => {
      if (action.payload?.id) {
        recipesAdapter.removeOne(state, action.payload.id);
      }
      state.submitState = "fulfilled";
    });
    builder.addCase(deleteRecipe.rejected, (state) => {
      state.submitState = "rejected";
    });
  },
});

export const recipeSelectors = recipesAdapter.getSelectors<AppState>(
  (state) => state.recipes
);
export const selectFetchState = (state: AppState) => state.recipes.fetchState;
export const selectSubmitState = (state: AppState) => state.recipes.submitState;
export const selectAllRecipes = recipeSelectors.selectAll;
export const sortedRecipes = (state: AppState) =>
  selectAllRecipes(state).sort((a, b) => {
    if (a.fields.Name > b.fields.Name) {
      return 1;
    } else if (a.fields.Name < b.fields.Name) {
      return -1;
    }
    return 0;
  });

export const selectRecipeById = recipeSelectors.selectById;

export const { resetSubmitState } = recipesSlice.actions;

export default recipesSlice.reducer;
