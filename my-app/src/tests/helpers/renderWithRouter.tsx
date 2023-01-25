import { render } from '@testing-library/react';
import React from 'react';
import { Location, MemoryRouter } from 'react-router-dom';

interface RenderWithRouterType {
  component: React.ReactNode;
  initialRoute?: Partial<Location>[];
}
export const renderWithRouter = ({ component, initialRoute = [{ pathname: '/' }] }: RenderWithRouterType) => {
  return render(<MemoryRouter initialEntries={initialRoute}>{component}</MemoryRouter>);
};
