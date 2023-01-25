import { render } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';
import { createReduxStore, RootState } from 'store/store';

interface RenderWithReduxType {
  component: React.ReactNode;
  initialState?: RootState;
}
export const renderWithRedux = ({ component, initialState = {} as RootState }: RenderWithReduxType) => {
  const store = createReduxStore(initialState);

  return render(<Provider store={store}>{component}</Provider>);
};
