import DashboardNav, { DashboardNavItem } from './DashboardNav';
import { fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { renderWithRouter } from '../../tests/helpers/renderWithRouter';
import { createMemoryHistory } from '@remix-run/router';
import { renderWithRedux } from '../../tests/helpers/renderWithRedux';
import { RootState } from 'store/store';
import { initialDashboardState } from 'store/dashboard/dashboard';
import { initialItemState } from 'store/item/item';
import { initialUserState } from 'store/user/user';
import { initialAppState } from 'store/app/app';
import { renderWithAll } from '../../tests/helpers/renderWithAll';
import { initialStore } from 'store/initialStore';

describe(DashboardNavItem, () => {
  it('should render a li element and p inside li with the correct name', () => {
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
      initialRoute: [{ pathname: '/test' }],
    });

    const li = getByTestId('dashbordNavItemLi');
    expect(li).toBeInTheDocument();

    const p = getByTestId('name').textContent;
    expect(p).toEqual('Category');

    const history = createMemoryHistory();
    const navlink = getByTestId('navlink');
    fireEvent.click(navlink);
    history.push('/category');
    expect(history.location.pathname).toEqual('/' + linkFromName);
  });
});

describe(DashboardNav, () => {
  it('should not render a DashboardNav element when there are no categories', () => {
    const { queryByTestId } = renderWithRedux({
      component: <DashboardNav />,
      initialState: {} as RootState,
    });

    const ul = queryByTestId('dashbordNavItemUl');
    expect(ul).not.toBeInTheDocument();
  });

  it('should render a DashboardNav element when there are categories', () => {
    const categories = [
      {
        name: 'Electronics',
        icon: 'electronics.jpg',
        subCategories: [],
        _id: '1',
        description: 'description',
        filters: [],
      },
    ];

    const { getByTestId, getAllByTestId } = renderWithAll({
      component: <DashboardNav />,
      initialState: { ...initialStore, dashboardReducer: { ...initialDashboardState, categories } },
    });

    const ul = getByTestId('dashbordNavItemUl');
    expect(ul).toBeInTheDocument();

    const li = getAllByTestId('dashbordNavItemLi');
    expect(li.length).toBe(categories.length);
  });
});
