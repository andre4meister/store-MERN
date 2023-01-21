import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AppInitialType {
  isLoading: boolean;
  appError: string;
}

export const appInitialState: AppInitialType = {
  isLoading: false,
  appError: '',
};

const appReducer = createSlice({
  name: 'app',
  initialState: appInitialState,
  reducers: {
    toggleIsLoading(state, action: PayloadAction<boolean>) {
      if (typeof action.payload !== 'boolean') {
        throw new Error('Incorrect boolean value');
      }
      state.isLoading = action.payload;
    },
    setError(state, action: PayloadAction<string>) {
      state.appError = action.payload;
    },
  },
});

export const { toggleIsLoading, setError } = appReducer.actions;

export default appReducer.reducer;
