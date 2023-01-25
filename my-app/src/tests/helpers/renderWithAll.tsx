import { render } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { createReduxStore, RootState } from 'store/store';

interface RenderWithReduxAndRouterType {
  component: React.ReactNode;
  initialRoute?: Partial<Location>[];
  initialState?: RootState;
}
export const renderWithAll = ({
  component,
  initialState = {} as RootState,
  initialRoute = [{ pathname: '/' }],
}: RenderWithReduxAndRouterType) => {
  const store = createReduxStore(initialState);

  return render(
    <MemoryRouter initialEntries={initialRoute}>
      <Provider store={store}>{component}</Provider>
    </MemoryRouter>,
  );
};
