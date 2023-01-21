import { render } from '@testing-library/react';
import App from 'App';
import React from 'react';
import { Provider } from 'react-redux';
import { createReduxStore, RootState } from 'store/store';

interface RenderWithRouterType {
  component: React.ReactNode;
  initialState: RootState;
}
export const renderWithRedux = ({ component, initialState = {} as RootState }: RenderWithRouterType) => {
  const store = createReduxStore(initialState);

  return render(
    <Provider store={store}>
      <App />
      {component}
    </Provider>,
  );
};
