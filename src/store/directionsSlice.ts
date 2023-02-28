import {
  IAirtableRecord,
  IBaseState,
  IDirectionFields,
  TAsyncState,
} from "@/interfaces";
import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import { AppState } from "./store";

export interface IDirectionState extends IBaseState {
  submitState: TAsyncState;
}

export const fetchDirections = createAsyncThunk(
  "directions/fetchDirections",
  async () => {
    try {
      const data = await fetch("/api/airtable/directions");
      return await data.json();
    } catch (error) {
      console.error(error);
    }
  }
);

export const addDirection = createAsyncThunk(
  "directions/add",
  async (direction: IDirectionFields) => {
    try {
      const data = await fetch("/api/airtable/direction", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": "token-value",
        },
        body: JSON.stringify(direction),
      });
      return (await data.json()) as IAirtableRecord<IDirectionFields>[];
    } catch (error) {
      console.error(error);
    }
  }
);

export const updateDirection = createAsyncThunk(
  "direction/update",
  async (direction: IAirtableRecord<IDirectionFields>) => {
    try {
      const data = await fetch("/api/airtable/direction", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": "token-value",
        },
        body: JSON.stringify(direction),
      });
      return (await data.json()) as IAirtableRecord<IDirectionFields>[];
    } catch (error) {
      console.error(error);
    }
  }
);

export const deleteDirection = createAsyncThunk(
  "directions/delete",
  async (directionId: string) => {
    try {
      const data = await fetch("/api/airtable/direction", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": "token-value",
        },
        body: JSON.stringify(directionId),
      });

      return (await data.json()) as IAirtableRecord<IDirectionFields>;
    } catch (error) {
      console.error(error);
    }
  }
);

const directionsAdapter =
  createEntityAdapter<IAirtableRecord<IDirectionFields>>();

const initialState: IDirectionState = {
  fetchState: "idle",
  submitState: "idle",
};

export const directionsSlice = createSlice({
  name: "directions",
  initialState: directionsAdapter.getInitialState(initialState),
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchDirections.pending, (state, action) => {
      state.fetchState = "pending";
    });
    builder.addCase(fetchDirections.fulfilled, (state, action) => {
      directionsAdapter.setAll(state, action.payload);

      state.fetchState = "fulfilled";
    });
    builder.addCase(fetchDirections.rejected, (state, action) => {
      state.fetchState = "rejected";
    });

    builder.addCase(addDirection.pending, (state, action) => {
      state.submitState = "pending";
    });
    builder.addCase(addDirection.fulfilled, (state, action) => {
      if (action.payload) {
        console.log(action.payload);

        directionsAdapter.addMany(state, action.payload);
      }

      state.submitState = "fulfilled";
    });
    builder.addCase(addDirection.rejected, (state, action) => {
      state.submitState = "rejected";
    });

    builder.addCase(updateDirection.pending, (state, action) => {
      state.submitState = "pending";
    });
    builder.addCase(updateDirection.fulfilled, (state, action) => {
      if (action.payload) {
        directionsAdapter.upsertMany(state, action.payload);
      }

      state.submitState = "fulfilled";
    });
    builder.addCase(updateDirection.rejected, (state, action) => {
      state.submitState = "rejected";
    });

    builder.addCase(deleteDirection.pending, (state, action) => {
      state.submitState = "pending";
    });
    builder.addCase(deleteDirection.fulfilled, (state, action) => {
      if (action.payload?.id) {
        directionsAdapter.removeOne(state, action.payload.id);
      }

      state.submitState = "fulfilled";
    });
    builder.addCase(deleteDirection.rejected, (state, action) => {
      state.submitState = "rejected";
    });
  },
});

export const directionSelectors = directionsAdapter.getSelectors<AppState>(
  (state) => state.directions
);
export const selectFetchState = (state: AppState) =>
  state.directions.fetchState;
export const selectAllDirections = directionSelectors.selectAll;
export const selectDirectionById = directionSelectors.selectById;
export const selectSubmitState = (state: AppState) =>
  state.directions.submitState;

export const selectByRecipeId = (state: AppState, recipeId: string) =>
  selectAllDirections(state)
    .filter((direction) =>
      direction.fields.Recipes.some((id) => id === recipeId)
    )
    .sort((a, b) => {
      if (a.fields.SortOrder > b.fields.SortOrder) {
        return 1;
      } else if (a.fields.SortOrder < b.fields.SortOrder) {
        return -1;
      }

      return 0;
    });

export default directionsSlice.reducer;
