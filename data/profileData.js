import { countries } from "./countryData";


const studentInputData = [
    {
      title: "Name",
      name: "name",
    },
    {
      title: "Email",
      name: "email",
      disabled: true,
    },
    {
      title: "Phone Number",
      name: "phone",
      type: "phoneInput",
    },
    {
      title: "Gender",
      name: "gender",
      type: "dropdown",
      options: [
        {
          name: "Male",
          value: "Male",
        },
        {
          name: "Female",
          value: "Female",
        },
        {
          name: "Other",
          value: "Other",
        },
      ],
    },
    {
      title: "Last Academic Qualification",
      name: "lastAcademicQualification",
    },
    {
      title: "Last Academic Result",
      name: "lastAcademicResult",
    },
    {
      title: "Institution Name",
      name: "institutionName",
    },
    {
      title: "Where do you want to study abroad?",
      name: "wantToGo",
      type: "countryDropdown",
      options: countries,
    },
    {
      title: "Which program do you want to apply to?",
      name: "wantToStudy",
    },
    {
      title:
        "IELTS/TOEFL/SAT/GRE/GMAT/Other with Result?If no, write your plan about it.",
      name: "englishProficiency",
    },
    {
      title: "Any job experience? if yes, write something about it.",
      name: "workingExperience",
    },
    {
      title:
        "Any extracurricular activities? if yes, write a little bit about it.",
      name: "extracurricularActivities",
    },
    {
      title: "Any publication? if yes, write something.",
      name: "publications",
    },
    {
      title: "Currently live in?",
      name: "currentlyLiveIn",
      type: "countryDropdown",
      options: countries,
    },
    {
      title: "Country of origin?",
      name: "countryOfOrigin",
      type: "countryDropdown",
      options: countries,
    },
    {
      title:
        "Involved with any community to help others? if yes, write about the community.",
      name: "communityWork",
    },
    {
      title: "About yourself.",
      name: "aboutYourself",
    },
  ];
  
  
  const mentorInputData = [
    { title: "Name", name: "name" },
    { title: "Email", name: "email", disabled: true },
    {
      title: "Phone Number",
      name: "phone",
      type: "phoneInput",
    },
    {
      title: "Gender",
      name: "gender",
      type: "dropdown",
      options: [
        {
          name: "Male",
          value: "Male",
        },
        {
          name: "Female",
          value: "Female",
        },
        {
          name: "Other",
          value: "Other",
        },
      ],
    },
    {
      title: "Present Address ",
      name: "presentAddress",
    },
    {
      title: "City",
      name: "city",
    },
    {
      title: "Country ",
      name: "country",
      type: "countryDropdown",
      options: countries,
    },
    {
      title: "Permanent Address ",
      name: "parmanentAddress",
    },
    {
      title: "Student or Employee Email Id",
      name: "studentEmail",
    },
    {
      title: "Bangladeshi bank account details",
      name: "bankAccount",
    },
    {
      title: "Whats app number with dial code *",
      name: "whatsapp",
      // type: "phoneInput",
    },
    {
      title: "Facebook Profile Links",
      name: "facebook",
    },
    {
      title: "Linkedin Profile Links",
      name: "linkedIn",
    },
    {
      title: "Instagram Username",
      name: "instagram",
    },
    {
      title: "Country Studying or Working",
      name: "currentLocation",
      type: "countryDropdown",
      options: countries,
    },
    {
      title: "Profession",
      name: "profession",
      type: "dropdown",
      options: [
        {
          name: "Student",
          value: "Student",
        },
        {
          name: "Employee",
          value: "Employee",
        },
      ],
    },
    {
      title: "Institution Studying or Studied ",
      name: "institutionName",
    },
    {
      title: "Program Studying/Studied ",
      name: "studyingIn",
    },
    {
      title: "Company Working for",
      name: "workingFor",
    },
    {
      title: "Position of working in your company",
      name: "position",
    },
    {
      title: "Previous Completed Education",
      name: "latestCertificate",
    },
    {
      title: "Awarded any Scholarship ?",
      name: "preScholarshipInfo",
    },
    {
      title: "Extracurricular Activities",
      name: "extraActivities",
    },
    {
      title: "Know about Abroad Inquiry ? *",
      name: "aboutUs",
    },
    {
      title: "Any Comment About Abroad Inquiry ? ",
      name: "comments",
    },
    {
      title: "About Yourself",
      name: "aboutYourself",
    },
    {
      title: "Mentoring For",
      name: "mentoringFor",
      type: "mentoringFor",
      multiple: true,
      options: [
        {
          name: "Student Visa/Permanent Residence(PR)",
          value: "Student Visa/Permanent Residence(PR)",
        },
        {
          name: "Dependent Visa(Spouse Visa)",
          value: "Dependent Visa(Spouse Visa)",
        },
      ],
    },
    {
      title: "Mentoring Country",
      name: "responsibleFor",
      type: "responsibleFor",
      multiple: true,
      
    },
    // {
    //   title: "Involved with Any Community Group ?",
    //   name: "community_group",
    // },
  ];
  
  export const profileInputData = (userStatus) => {
    return userStatus === "student" ? studentInputData : mentorInputData;
  };
  