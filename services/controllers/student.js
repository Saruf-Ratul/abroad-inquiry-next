
import {
  GET_ALL_MENTORS_CALL,
  GET_NOTIFICATIONS,
  GET_STUDENT_INFO_CALL,
  GET_UNREAD_NOTIFICATIONS,
  STUDENT_PROFILE_VIEW_CALL,
  UPDATE_ALL_STUDENT_DATA_CALL,
} from "../studentRequests";

class StudentController {
  dataMaker(id, field, label, value, type, options) {
    return { id, field, label, value, type, options };
  }

  GET_STUDENT_INFO_CALL = (setOutput, setLoading, setError) => {
    GET_STUDENT_INFO_CALL()
      .then((res) => {
        setOutput({ ...res.data.data, phone: JSON.parse(res.data.data.phone) });
        setLoading(false);
        setError(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  GET_NOTIFICATIONS = (studentId, pageNumber, outputData, setLoading) => {
    setLoading(true);
    GET_NOTIFICATIONS(studentId, pageNumber)
      .then((res) => {
        setLoading(false);
        outputData(res.data);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };

  UPDATE_ALL_STUDENT_DATA_CALL(data, setOutput, setLoading, setError) {
    UPDATE_ALL_STUDENT_DATA_CALL(data)
      .then((res) => {
        setOutput([
          this.dataMaker(1, "Name", res.data.studentName),
          this.dataMaker(2, "Email", res.data.studentEmail),
          this.dataMaker(3, "Phone", res.data.studentPhone),
          this.dataMaker(4, "Gender", res.data.studentGender),
          this.dataMaker(
            5,
            "Last Academic Qualification",
            res.data.studentAcademicQualification
          ),
          this.dataMaker(
            6,
            "Last Academic Result",
            res.data.studentAcademicResult
          ),
          this.dataMaker(
            7,
            "Institution Name",
            res.data.studentInstitutionName
          ),
          this.dataMaker(
            8,
            "Where do you want to study abroad?",
            res.data.studentWantToGo
          ),
          this.dataMaker(
            9,
            "Which program do you want to apply to?",
            res.data.studentWantToStudy
          ),
          this.dataMaker(
            10,
            "IELTS/TOEFL/SAT/GRE/GMAT/Other with Result?If no, write your plan about it.",
            res.data.studentEnglishProficiency
          ),
          this.dataMaker(
            11,
            "Any job experience? if yes, write something about it.",
            res.data.studentWorkingExperience
          ),
          this.dataMaker(
            12,
            "Any extracurricular activities? if yes, write a little bit about it.",
            res.data.studentExtraActivities
          ),
          this.dataMaker(
            13,
            "Any publication? if yes, write something.",
            res.data.studentPublications
          ),
          this.dataMaker(
            14,
            "Currently live in?",
            res.data.studentCurrentlyLive
          ),
          this.dataMaker(15, "Country of origin?", res.data.studentOrigin),
          this.dataMaker(
            16,
            "Involved with any community to help others? if yes, write about the community",
            res.data.studentCommunityWork
          ),
          this.dataMaker(17, "About yourself.", res.data.studentAbout),
        ]);
        setLoading(false);
        setError(false);
      })
      .catch((error) => {
        setLoading(false);
        setError(true);
      });
  }

  GET_UNREAD_NOTIFICATIONS = (setOutput) => {
    GET_UNREAD_NOTIFICATIONS()
      .then((res) => {
        setOutput(res.data.totalNotification);
      })
      .catch((error) => {});
  };

  STUDENT_PROFILE_VIEW = (studentId, setLoading, setOutput) => {
    setLoading(true);
    STUDENT_PROFILE_VIEW_CALL(studentId)
      .then((res) => {
        setOutput({
          ...res.data,
          studentPhone:
            JSON.parse(res.data.studentPhone).dialCode +
            JSON.parse(res.data.studentPhone).phoneNumber,
        });

        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };
}
export default new StudentController();
