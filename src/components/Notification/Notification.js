import React from "react";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";
import { useDispatch, useSelector } from "react-redux";
import {
  notificationSelector,
  setNotificationTimeout,
} from "../../redux/notifications/ducks";

const Notification = () => {
  const dispatch = useDispatch();
  const notification = useSelector(notificationSelector);

  const handleClose = () => dispatch(setNotificationTimeout());

  return (
    <Snackbar
      open={notification.show}
      autoHideDuration={3000}
      onClose={handleClose}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
    >
      <Alert
        variant="filled"
        onClose={handleClose}
        severity={notification.type}
      >
        {notification.message}
      </Alert>
    </Snackbar>
  );
};

export default Notification;
