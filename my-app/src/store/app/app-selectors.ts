import { createSelector } from 'reselect';
import { AppStateType } from '../store';

const selectAppReducerState = (state: AppStateType) => state.appReducer;

export const selectAppError = createSelector(selectAppReducerState, (appReducerState) => appReducerState.appError);

export const selectIsLoading = createSelector(selectAppReducerState, (appReducerState) => appReducerState.isLoading);
