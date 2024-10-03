
import {
  GET_MENTORS_OVERVIEW,
  GET_MENTOR_INFO_CALL,
  GET_NOTIFICATIONS,
  GET_PREVIOUS_ALL_SCHEDULES,
  GET_UNREAD_NOTIFICATIONS,
  MENTORS_PROFILE_VIEW,
} from "../mentorRequests";

class MentorController {
  dataMaker(id, field, label, value, type, options) {
    return { id, field, label, value, type, options };
  }

  GET_MENTORS_OVERVIEW = (pageId, setOutput, setLoading) => {
    GET_MENTORS_OVERVIEW(pageId)
      .then((res) => {
        setOutput((prev) => {
          return {
            totalMentor: res?.data?.totalMentor,
            mentor: [...prev?.mentor, ...res?.data?.mentor],
          };
        });
        setLoading(false);
      })
      .catch((error) => {
        console.log(error.data);
        setLoading(false);
      });
  };

  GET_MENTOR_INFO_CALL = (setOutput, setLoading, setError) => {
    setLoading(true);
    GET_MENTOR_INFO_CALL()
      .then((res) => {
        // console.log(res.data.data);
        setOutput({
          ...res.data.data,
          phone: JSON.parse(res?.data?.data?.phone),
          mentoringFor: JSON.parse(res?.data?.data?.mentoringFor),
        });

        setLoading(false);
        setError(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
        setError(true);
      });
  };

  MENTORS_PROFILE_VIEW = (mentorId, setLoading, setOutput) => {
    setLoading(true);
    MENTORS_PROFILE_VIEW(mentorId)
      .then((res) => {
        setOutput({
          ...res.data,
          mentorPhone:
            JSON.parse(res.data.mentorPhone).dialCode +
            JSON.parse(res.data.mentorPhone).phoneNumber,
        });

        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };

  GET_UNREAD_NOTIFICATIONS = (setOutput) => {
    GET_UNREAD_NOTIFICATIONS()
      .then((res) => {
        setOutput(res.data.totalNotification);
      })
      .catch((error) => {});
  };

  GET_NOTIFICATIONS = (mentorId, pageNumber, outputData, setLoading) => {
    setLoading(true);
    GET_NOTIFICATIONS(mentorId, pageNumber)
      .then((res) => {
        outputData(res.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };
}
export default new MentorController();
