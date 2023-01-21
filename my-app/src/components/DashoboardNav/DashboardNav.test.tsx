import DashboardNav, { DashboardNavItem } from './DashboardNav';
import { render, fireEvent } from '@testing-library/react';
import { useAppSelector } from '../../hooks/redux';
import { initialState } from '../../store/dashboard/dashboard';
import styles from './DashboardNav.module.scss';
import '@testing-library/jest-dom/extend-expect';
import { renderWithRouter } from '../../tests/helpers/renderWithRouter';
import { createMemoryHistory } from '@remix-run/router';

describe(DashboardNavItem, () => {
  it('should render a li element and p inside li with the correct name', async () => {
    const linkFromName: string = 'Category'.toLocaleLowerCase().replaceAll(' ', '-');

    const { getByTestId } = renderWithRouter({
      component: (
        <DashboardNavItem
          _id="412049"
          description="desciption"
          filters={[]}
          icon="icon.png"
          name="Category"
          subCategories={[]}
        />
      ),
      initialRoute: ['/'],
    });

    // const history = createMemoryHistory();
    // const navlink = getByTestId('navlink');
    // fireEvent.click(navlink);

    // expect(history.location.pathname).toEqual(linkFromName);

    const li = getByTestId('dashbordNavItemLi');
    expect(li).toBeInTheDocument();

    const p = getByTestId('name').textContent;
    expect(p).toEqual('Category');
  });
});
