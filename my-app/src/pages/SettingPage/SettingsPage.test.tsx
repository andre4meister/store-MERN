import '../../jestGlobalMocks';
import SettingPage from './SettingsPage';
import '@testing-library/jest-dom/extend-expect';
import { renderWithAll } from '../../tests/helpers/renderWithAll';
import { initialStore } from 'store/initialStore';
import { UserType } from 'store/user/user-types';
import { renderWithRedux } from '../../tests/helpers/renderWithRedux';
import { MemoryRouter } from 'react-router-dom';

describe(SettingPage, () => {
  it('should render a SettingPage', () => {
    const { getByTestId } = renderWithRedux({
      component: (
        <MemoryRouter>
          <SettingPage />
        </MemoryRouter>
      ),
      initialState: {
        ...initialStore,
        userReducer: {
          ...initialStore.userReducer,
          isAuth: true,
          userData: { email: 'mock email', userName: 'mock userName' } as UserType,
        },
      },
    });

    const container = getByTestId('settings-container');
    expect(container).toBeInTheDocument();
  });

  // it('should render correct name and email from store in Settings sidebar ', () => {
  //   const { getByTestId } = renderWithAll({
  //     component: <SettingPage />,
  //     initialState: {
  //       ...initialStore,
  //       userReducer: {
  //         ...initialStore.userReducer,
  //         isAuth: true,
  //         userData: { email: 'mock email', userName: 'mock userName' } as UserType,
  //       },
  //     },
  //  });

  //   const name = getByTestId('auth-userName');
  //   expect(name).toBeInTheDocument();

  //   const email = getByTestId('auth-email');
  //   expect(email).toBeInTheDocument();
  // });

  it('should see warning for unauthrized users', () => {
    const { getByText } = renderWithAll({
      component: <SettingPage />,
    });

    const name = getByText('You should login to see this page');
    expect(name).toBeInTheDocument();
  });
});
