const INITIAL_STATE = {
  message: null,
  show: false,
  type: "success",
};

export const NotificationsActionTypes = {
  SET_NOTIFICATION: "SET_NOTIFICATION",
  SET_NOTIFICATION_TIMEOUT: "SET_NOTIFICATION_TIMEOUT",
};

export const setNotification = (message, type, show) => ({
  type: NotificationsActionTypes.SET_NOTIFICATION,
  payload: { message, type, show },
});

export const setNotificationTimeout = () => ({
  type: NotificationsActionTypes.SET_NOTIFICATION_TIMEOUT,
});

export const notificationsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case NotificationsActionTypes.SET_NOTIFICATION:
      const { message, type, show } = action.payload;
      return { ...state, message, type, show };
    case NotificationsActionTypes.SET_NOTIFICATION_TIMEOUT:
      return { ...state, show: false };
    default:
      return state;
  }
};

export const notificationSelector = (state) => state.notifications;
