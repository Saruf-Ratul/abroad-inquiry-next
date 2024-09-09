"use client";
import Iconify from "@/components/Iconify";

/**
 * Mentor profile data.
 * @memberof module:data
 * @type {Object}
 * @property {string} sectionName -
 * @property {Object} data -
 * @property {string} data.title -
 * @property {string} data.key -
 * @property {string} data.className -
 * @property {React.icons} data.icon -
 */

function formatPhoneNumber(phone) {
  if (!phone) return "Phone number not available";
  let parsedPhone;
  try {
    parsedPhone = JSON.parse(phone);
  } catch (error) {
    // console.error("Invalid phone data", error);
    return "Invalid phone data";
  }
  const { dialCode, phoneNumber } = parsedPhone;
  return `${dialCode} ${phoneNumber}`;
}


const mentorProfileData = [
  {
    sectionName: "Personal Info",
    data: [
      { title: "Name", key: "mentorName" },
      { title: "Gender", key: "mentorGender" },
      { title: "Present Address", key: "mentorPermanentAddress" },
      { title: "Permanent Address", key: "mentorPermanentAddress" },
      { title: "Country", key: "mentorCountry" },
      { title: "City", key: "mentorCity" },
    ],
  },
  {
    sectionName: "Professional Info",
    data: [
      { title: "Profession", key: "mentorProfession" },
      { title: "Institute Studying / Studied", key: "mentorInstitutionName" },
      { title: "Study Program", key: "mentorStudyingIn" },
      { title: "Company Working For", key: "mentorWorkingFor" },
      { title: "Working Position", key: "mentorPositionAtCompany" },
      { title: "About", key: "mentorAboutYourself" },
    ],
  },
  {
    sectionName: "Contact Info",
    data: [
      { title: "Email", key: "mentorEmail" },
      { title: "Phone", key: "mentorPhone", },
    ],
  },
  {
    sectionName: "Mentoring Info", // need to change the key
    data: [
      { title: "Countries Mentoring  For", key: "mentorAvailableFor" },
      { title: "Visa Mentoring For", key: "mentoringFor" },
    ],
  },
  {
    sectionName: "Social Media",
    type: "social",
    data: [
      {
        title: "Facebook",
        key: "mentorFacebook",
        className: "fb",
        icon: <Iconify icon={"uil:facebook"} width={24} height={24} />,
      },
      {
        title: "LinkedIn",
        key: "mentorLinkedIn",
        className: "lin",
        icon: <Iconify icon={"mingcute:linkedin-line"} width={24} height={24} />,
      },
      {
        title: "Instagram",
        key: "mentorInstagram",
        className: "insta",
        icon: <Iconify icon={"ri:instagram-line"} width={24} height={24} />,
      },
      {
        title: "WhatsApp",
        key: "mentorWhatsapp",
        className: "wp",
        icon: <Iconify icon={"ic:sharp-whatsapp"} width={24} height={24} />,
      },
    ],
  },
];

/**
 * Student profile data.
 * @memberof module:data
 * @type {Object}
 * @property {string} sectionName -
 * @property {Object<array>} data -
 * @property {string} data.title -
 * @property {string} data.key -
 */
const studentProfileData = [
  {
    sectionName: "Personal Info",
    data: [
      { title: "Name", key: "studentName" },
      { title: "Gender", key: "studentGender" },
      { title: "Address", key: "studentCurrentlyLive" },
      { title: "Address", key: "studentOrigin" },
      { title: "About", key: "studentAbout" },
    ],
  },
  {
    sectionName: "Education & Compitency",
    data: [
      { title: "Academic Qualification", key: "studentAcademicQualification" },
      { title: "Academic Result", key: "studentAcademicResult" },
      { title: "Institution Name", key: "studentInstitutionName" },
      {
        title: "IELTS/TOEFL/SAT/GRE/GMAT/Other with Result",
        key: "studentEnglishProficiency",
      },
      { title: "Publications", key: "studentPublications" },
      { title: "Working Experience", key: "studentWorkingExperience" },
      { title: "Extracurricular Activities", key: "studentExtraActivities" },
      { title: "Community Work", key: "studentCommunityWork" },
    ],
  },
  {
    sectionName: "Abroad Inquiry Info",
    data: [
      { title: "Prefered Country to Study", key: "studentWantToGo" },
      { title: "Program Want to Apply For", key: "studentWantToStudy" },
    ],
  },
  {
    sectionName: "Contact Info",
    data: [
      { title: "Email", key: "studentEmail" },
      { title: "Phone", key: "studentPhone" },
    ],
  },
];

export const profileViewData = (userStatus) => {
  return userStatus === "student" ? studentProfileData : mentorProfileData;
};
