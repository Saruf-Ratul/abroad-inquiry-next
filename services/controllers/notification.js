import {
  READ_NOTIFICATION_CALL,
  ADD_TO_CALENDER_CALL,
} from "../notificationRequest"

class NotificationController {
  readNotification(data) {
    return READ_NOTIFICATION_CALL(data)
      .then((res) => {
        return res.data
      })
      .catch((error) => {
        return error
      })
  }

  addToCalender(data, setSnackbar) {
    ADD_TO_CALENDER_CALL(data)
      .then((res) => {
        setSnackbar({
          open: true,
          severity: "success",
          text: `Added to ${res.data.calender} calender. Check your email.`,
        })
      })
      .catch((error) => {
        console.log(error)
      })
  }
}

export default new NotificationController()
