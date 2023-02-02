import { IAirtableRecord, IBaseState, IDirectionFields } from "@/interfaces";
import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import { AppState } from "./store";

export interface IDirectionState extends IBaseState {}

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

const directionsAdapter =
  createEntityAdapter<IAirtableRecord<IDirectionFields>>();

const initialState: IDirectionState = {
  fetchState: "idle",
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
  },
});

export const directionSelectors = directionsAdapter.getSelectors<AppState>(
  (state) => state.directions
);
export const selectFetchState = (state: AppState) =>
  state.directions.fetchState;
export const selectAllDirections = directionSelectors.selectAll;
export const selectDirectionById = directionSelectors.selectById;

export default directionsSlice.reducer;
