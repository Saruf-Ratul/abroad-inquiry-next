import { mentorProfileView } from "@/redux/features/mentor/mentorAPI";
import MentorProfileTabs from "@/sections/mentors/MentorProfileTabs";
import { BASE_URL } from "@/utils/axios";
import { headers } from "next/headers"; // Import headers to get the current domain

export async function generateMetadata({ params }) {
  const mentorDetails = await mentorProfileView(params.slug);

  // Get the current host from headers
  const host = headers().get("host");
  const protocol = process.env.NODE_ENV === "production" ? "https" : "http";
  const currentURL = `https://www.abroadinquiry.com`;

  // Ensure the profilePicUrl is an absolute URL
  const profilePicUrl = mentorDetails?.mentorProfilePic
    ? `${BASE_URL}/${mentorDetails.mentorProfilePic}`
    : null;

  // Use the current base URL dynamically
  const ogImageUrl = `${currentURL}/api/og/mentor?name=${encodeURIComponent(
    mentorDetails?.mentorName || "Mentor"
  )}&position=${encodeURIComponent(
    mentorDetails?.mentorPositionAtCompany || "Position"
  )}&institution=${encodeURIComponent(
    mentorDetails?.mentorInstitutionName || "Institution"
  )}&course=${encodeURIComponent(
    mentorDetails?.mentorStudyingIn || "Course"
  )}&country=${encodeURIComponent(
    mentorDetails?.mentorCity || "Country"
  )}&profilePic=${encodeURIComponent(profilePicUrl)}`;

  return {
    title: `${mentorDetails?.mentorName} - Abroad Inquiry`,
    description:
      mentorDetails?.mentorAboutYourself || "Career details at our company.",
    openGraph: {
      images: [
        {
          url: ogImageUrl,
        },
      ],
    },
  };
}

function ProfileView({ params }) {
  const { slug } = params;

  return (
    <>
      <MentorProfileTabs slug={slug} />
    </>
  );
}

export default ProfileView;
