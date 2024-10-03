import {
  ACCEPT_OR_DENY_APPOINTMENT,
  COMPLETE_AN_APPOINTMENT,
  GET_ALL_APPROVED_APPOINTMENTS,
  GET_APPOINTMENT_INFO,
  GET_APPOINTMENT_RECORDS,
  GET_MENTOR_AVAILABLE_SLOTS,
  REQUEST_APPOINTMENT,
  SHOW_APPOINTMENT_APPLICATIONS,
} from "../appointmentRequest";


/**
 * Appointment Controller
 */
class AppointmentController {
  /**
   * Complete an appointment
   * @param {Object} data - 
   * @returns {Object}
   */
  COMPLETE_AN_APPOINTMENT(data) {
    return COMPLETE_AN_APPOINTMENT(data)
      .then((res) => {
        return res.data;
      })
      .catch((error) => {
        return error;
      });
  }

  /**
   * Accept or deny an appointment
   * @param {Object} data - 
   * @returns {Object}
   */
  ACCEPT_OR_DENY_APPOINTMENT = (data) => {
    ACCEPT_OR_DENY_APPOINTMENT(data)
      .then((res) => {
        alert("Accept appointment");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  /**
   * Retrive available time slot
   * @param {Object} data - 
   * @returns {Object}
   */
  GET_MENTOR_AVAILABLE_SLOTS(data) {
    GET_MENTOR_AVAILABLE_SLOTS(data)
      .then((res) => {
        console.l(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  /**
   * Send appointment request an appointment
   * @param {Object} data - 
   * @param {*} socket -
   * @param {Function} output -
   * @returns {Object}
   */
  REQUEST_APPOINTMENT = (data, socket, output) => {
    REQUEST_APPOINTMENT(data)
      .then((res) => {
        if (res.data.isAppointmentCreated) {
          socket?.emit("sendNotification", {
            receiver: "mentor".concat(res.data.mentorId.toString()),
            appointmentId: res.data.appointmentId,
            message: data.notification,
            notificationId: res.data.mentorsNotificationId,
            createdAt: res.data.createdAt,
            isRead: false,
            rootScreen: "Appointments",
            screen: "AppointmentApplications",
            fcmToken: res.data.fcmToken,
          });
        }
        output(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  /**
   * Showing an appointment
   * @param {Number} page - 
   * @param {Function} outputData -
   * @returns {Object}
   */
  SHOW_APPOINTMENT_APPLICATIONS = (page, outputData) => {
    return SHOW_APPOINTMENT_APPLICATIONS(page)
      .then((res) => {
        return outputData(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  /**
   * Retrive all approved an appointment
   * @param {Number} page - 
   * @param {Function} outputData -
   * @returns {Object}
   */
  GET_ALL_APPROVED_APPOINTMENTS = (page, outputData) => {
    return GET_ALL_APPROVED_APPOINTMENTS(page)
      .then((res) => {
        outputData(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

    /**
   * Retrive an appointment info
   * @param {Number} appointmentId - 
   * @param {Function} setLoading -
   * @param {Function} outputData -
   * @returns {Object}
   */
  GET_APPOINTMENT_INFO(appointmentId, setLoading, outputData) {
    setLoading(true);
    GET_APPOINTMENT_INFO(appointmentId)
      .then((res) => {
        outputData(res.data.appointmentInfo);
        setLoading(false);
      })

      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }

    /**
   * Retrive all appointment records
   * @param {Number} page - 
   * @param {Function} outputData -
   * @returns {Object}
   */
  GET_APPOINTMENT_RECORDS = (page, outputData) => {
    return GET_APPOINTMENT_RECORDS(page)
      .then((res) => {
        outputData(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
}
export default new AppointmentController();
