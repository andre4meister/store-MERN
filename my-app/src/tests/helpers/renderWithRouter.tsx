import { render } from '@testing-library/react';
import App from 'App';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';

interface RenderWithRouterType {
  component: React.ReactNode;
  initialRoute: string[];
}
export const renderWithRouter = ({ component, initialRoute = ['/'] }: RenderWithRouterType) => {
  return render(
    <MemoryRouter initialEntries={initialRoute}>
      <App />
      {component}
    </MemoryRouter>,
  );
};
