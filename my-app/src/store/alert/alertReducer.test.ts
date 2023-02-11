import alertReducer, { initialAlertState, NotificationsType } from './alert';

describe('alert reducer', () => {
  it('should return the initial state', () => {
    expect(alertReducer(undefined, { type: 'any' })).toEqual(initialAlertState);
  });

  it('should handle toggleAlertIsOpen', () => {
    expect(
      alertReducer(initialAlertState, {
        type: 'alert/toggleAlertIsOpen',
        payload: true,
      }),
    ).toEqual({
      ...initialAlertState,
      alertIsOpen: true,
    });
  });

  it('should handle addNotification', () => {
    const notification = {
      message: 'Test notification',
      type: 'success',
    };
    expect(
      alertReducer(initialAlertState, {
        type: 'alert/addNotification',
        payload: notification,
      }),
    ).toEqual({
      ...initialAlertState,
      notifications: [notification],
    });
  });

  it('should handle deleteNotification', () => {
    const notification: NotificationsType = {
      message: 'Test notification',
      type: 'success',
    };
    const stateWithNotification: typeof initialAlertState = {
      ...initialAlertState,
      notifications: [notification],
    };
    expect(
      alertReducer(stateWithNotification, {
        type: 'alert/deleteNotification',
        payload: notification,
      }),
    ).toEqual({
      ...initialAlertState,
      notifications: [],
    });
  });
});
