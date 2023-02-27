import {
  IAirtableRecord,
  IBaseState,
  IIngredientFields,
  TAsyncState,
} from "@/interfaces";
import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import { AppState } from "./store";

export interface IIngredientState extends IBaseState {
  submitState: TAsyncState;
  selectedId?: string;
}

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

export const addIngredient = createAsyncThunk(
  "ingredients/add",
  async (ingredient: IIngredientFields) => {
    try {
      const data = await fetch("/api/airtable/ingredient", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": "token-value",
        },
        body: JSON.stringify(ingredient),
      });
      return (await data.json()) as IAirtableRecord<IIngredientFields>[];
    } catch (error) {
      console.error(error);
    }
  }
);

export const updateIngredient = createAsyncThunk(
  "ingredients/update",
  async (ingredient: IAirtableRecord<IIngredientFields>) => {
    try {
      const data = await fetch("/api/airtable/ingredient", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": "token-value",
        },
        body: JSON.stringify(ingredient),
      });
      return (await data.json()) as IAirtableRecord<IIngredientFields>[];
    } catch (error) {
      console.error(error);
    }
  }
);

export const deleteIngredient = createAsyncThunk(
  "ingredients/delete",
  async (ingredientId: string) => {
    try {
      const data = await fetch("/api/airtable/ingredient", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": "token-value",
        },
        body: JSON.stringify(ingredientId),
      });

      return (await data.json()) as IAirtableRecord<IIngredientFields>;
    } catch (error) {
      console.error(error);
    }
  }
);

const ingredientsAdapter =
  createEntityAdapter<IAirtableRecord<IIngredientFields>>();

const initialState: IIngredientState = {
  fetchState: "idle",
  submitState: "idle",
};

export const ingredientsSlice = createSlice({
  name: "ingredients",
  initialState: ingredientsAdapter.getInitialState(initialState),
  reducers: {
    setSelectedIngredientId: (state, action: PayloadAction<string | null>) => {
      state.selectedId = action.payload ?? undefined;
    },
    resetSubmitState: (state) => {
      state.submitState = "idle";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchIngredients.pending, (state, action) => {
      state.fetchState = "pending";
    });
    builder.addCase(fetchIngredients.fulfilled, (state, action) => {
      ingredientsAdapter.setAll(state, action.payload);
      state.fetchState = "fulfilled";
    });
    builder.addCase(fetchIngredients.rejected, (state, action) => {
      state.fetchState = "rejected";
    });

    builder.addCase(addIngredient.pending, (state, action) => {
      state.submitState = "pending";
    });
    builder.addCase(addIngredient.fulfilled, (state, action) => {
      if (action.payload) {
        ingredientsAdapter.addMany(state, action.payload);
        state.selectedId = action.payload[0].id;
      }

      state.submitState = "fulfilled";
    });
    builder.addCase(addIngredient.rejected, (state, action) => {
      state.submitState = "rejected";
    });

    builder.addCase(updateIngredient.pending, (state, action) => {
      state.submitState = "pending";
    });
    builder.addCase(updateIngredient.fulfilled, (state, action) => {
      if (action.payload) {
        ingredientsAdapter.upsertMany(state, action.payload);
      }

      state.submitState = "fulfilled";
    });
    builder.addCase(updateIngredient.rejected, (state, action) => {
      state.submitState = "rejected";
    });

    builder.addCase(deleteIngredient.pending, (state, action) => {
      state.submitState = "pending";
    });
    builder.addCase(deleteIngredient.fulfilled, (state, action) => {
      if (action.payload?.id) {
        ingredientsAdapter.removeOne(state, action.payload.id);
      }

      state.submitState = "fulfilled";
    });
    builder.addCase(deleteIngredient.rejected, (state, action) => {
      state.submitState = "rejected";
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
export const selectSubmitState = (state: AppState) =>
  state.ingredients.submitState;
export const { setSelectedIngredientId, resetSubmitState } =
  ingredientsSlice.actions;

export const selectByRecipeId = (state: AppState, recipeId: string) =>
  selectAllIngredients(state).filter((ingredient) =>
    ingredient.fields.Recipes.some((id) => id === recipeId)
  );

export const selectSelectedIngredient = (state: AppState) => {
  if (state.ingredients.selectedId) {
    return selectIngredientById(state, state.ingredients.selectedId);
  }
};

export default ingredientsSlice.reducer;
