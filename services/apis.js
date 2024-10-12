/**@module api */
//export const BASE_URL = `http://192.168.0.148:8443`; //Tareque
//export const BASE_URL = `http://localhost:8443`; //Himel
export const BASE_URL = "https://server.abroadinquiry.com:8443"; // office

// export const BASE_URL = "http://192.168.11.238:8443"; // Unus

// export const REAL_TIME_URL = `http://localhost:2096`; // tareque
export const REAL_TIME_URL = `https://realtime.abroadinquiry.com:2096`;

// /**
//  * api list object
//  * @memberof module:api
//  * @property {Object} auth - User authentication
//  * @property {string} auth.login - User login api
//  * @property {string} auth.getInfo -Get User information api
//  * @property {string} auth.checkingEmailExistence -Check if any email exit in db, it is being used password reset system.
//  * @property {string} auth.checkingOTP -Check otp to reset password
//  *
//  */
export const api = {
  //Auth
  auth: {
    login: `${BASE_URL}/login`,
    getInfo: `${BASE_URL}/login_from_session`,
    checkEmailExistence: `${BASE_URL}/checking_email_existence`,
    checkingOTP: `${BASE_URL}/check_opt`,
    resetPassword: `${BASE_URL}/reset_password`,
  },

  student: {
    signup: `${BASE_URL}/student/signup`,
    signupSocial: `${BASE_URL}/one-click`,
    getInfo: `${BASE_URL}/student/v3/get-my-profile`,
    updateStudentInfo: `${BASE_URL}/student/v3/update-profile`,
    showAllMentors: `${BASE_URL}/student/get_all_mentors`,
    updateProfilePic: `${BASE_URL}/student/profile`,
    updatePassword: `${BASE_URL}/student/update_password`,
    requestAppointment: `${BASE_URL}/student/apply_for_appointment`,
    getAllApprovedAppointments: `${BASE_URL}/student/get_all_approved_appointments`,
    getAllAppointments: `${BASE_URL}/student/get_all_appointments`,
    showNotifications: `${BASE_URL}/student/get_notification`,
    showUpcomingAppointment: `${BASE_URL}/student/get_upcoming_appointments`,
    showAppointmentHistory: `${BASE_URL}/student/get_appointment_history`,
    showAppointmentApplication: `${BASE_URL}/student/get_appointment_application`,
    showTotalUnReadNotification: `${BASE_URL}/student/get_total_unread_notification`,
    profileView: `${BASE_URL}/student/profile_view`,
    studentUpdate: `${BASE_URL}/student-application/get-single-student-application`,
    studentApplyAbroad: `${BASE_URL}/apply-abroad/create`,

    officeVisitedStudent:`${BASE_URL}/office-visited-student/create`
  },
  blogs: {
    getBlogs: `${BASE_URL}/blog/get-blogs?page=`,
    getBlogDetails: `${BASE_URL}/blog/get-blog-details?bid=`,
  },
  mentor: {
    signup1: `${BASE_URL}/mentor/signup_page1`,
    signup2: `${BASE_URL}/mentor/signup_page2`,
    signup3: `${BASE_URL}/mentor/signup_page3`,
    signup4: `${BASE_URL}/mentor/signup_page4`,
    uploadProfilePic: `${BASE_URL}/mentor/upload_profile_pic`,
    updatePassword: `${BASE_URL}/mentor/update_password`,
    getInfo: `${BASE_URL}/mentor/v3/get-my-profile`,
    updateMentor: `${BASE_URL}/mentor/v3/profile-update-application`,
    getAllMentorsOverview: `${BASE_URL}/mentor/get_all_mentor_overview`,
    getMentorsOverview: `${BASE_URL}/mentor/short_profile`,
    profileView: `${BASE_URL}/mentor/profile_view`,
    //will be removed to appointment

    updateDisableStatus: `${BASE_URL}/mentor/disable_mentor`,

    getAllschedules: `${BASE_URL}/mentor/get_all_schedules`,
    appointmentDone: `${BASE_URL}/mentor/complete_appointment`,
    showNotifications: `${BASE_URL}/mentor/get_notification`,
    showTotalUnReadNotification: `${BASE_URL}/mentor/get_total_unread_notification`,
  },
  chat: {
    createNewConversation: `${BASE_URL}/conversation/create_conversation`,
    getOldConversation: `${BASE_URL}/conversation/get_conversation`,
    getMessage: `${BASE_URL}/conversation/get_previous_message`,
    searchConversation: `${BASE_URL}/conversation/search`,
    updateConversation:`${BASE_URL}/conversation/read-conversations`
  },

  countries: {
    getCountryName: `${BASE_URL}/country/get_country_name`,
    getCountryDetails: `${BASE_URL}/country/get_all_countries`,
    getContryInfo: `${BASE_URL}/country/get_one_country`,
    getMentorAccordingToCountry: `${BASE_URL}/country/get_mentor_from_country`,
  },

  careers: {
    getAllCareer: `${BASE_URL}/career/get-careers`,
    getCareerDetails: `${BASE_URL}/career/get-career-details`,
    apply: `${BASE_URL}/application/create-application`,
  },

  appointment: {
    scheduleAppointment: `${BASE_URL}/appointment/schedule_appointment`,
    completeAnAppointment: `${BASE_URL}/appointment/complete_appointment`,
    acceptOrDenyAppointment: `${BASE_URL}/appointment/accept_or_deny_appointment`,
    getMentorAppointmentSlots: `${BASE_URL}/appointment/get_appointment_time_slot`,
    requestAppointment: `${BASE_URL}/appointment/apply_for_appointment`,
    showAppointmentApplication: `${BASE_URL}/appointment/get_appointment_application`,
    getAllApprovedAppointments: `${BASE_URL}/appointment/get_scheduled_appointment`,
    getAppointmentInfo: `${BASE_URL}/appointment/get_appointment_info`,
    appointmentRecords: `${BASE_URL}/appointment/get_appointment_records`,
    getAllSchedule: `${BASE_URL}/appointment/get_all_schedule`,
    cancelAppointmentRequest: `${BASE_URL}/appointment/delete_appointment`,
    deleteSchedule: `${BASE_URL}/appointment/delete_schedule`,
  },
  notification: {
    readNotification: `${BASE_URL}/notification/read_notification`,
    addToCalender: `${BASE_URL}/notification/add_to_calender`,

    getPushNotification:`${BASE_URL}/push-notification/notifications`,
    updatePushNotification:`${BASE_URL}/push-notification/notifications`
  },
};
