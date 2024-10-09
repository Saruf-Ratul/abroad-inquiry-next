import MentorsBanner from "@/public/assets/bannerImage/mentorProfile.jpg";
import { ImageResponse } from "next/og";

export async function GET(request) {
  const { searchParams, origin } = new URL(request.url); // Get the base URL dynamically
  const name = searchParams.get("name") || "Mentor";
  const position = searchParams.get("position") || "Position";
  const institution = searchParams.get("institution") || "Institution";
  const course = searchParams.get("course") || "Course";
  const country = searchParams.get("country") || "Country";
  const profilePic = searchParams.get("profilePic");

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          background: `url(${origin}${MentorsBanner.src})`, // Dynamically set the image URL
          backgroundSize: "cover",
          backgroundPosition: "center",
          color: "#ffffff",
          padding: "40px",
          fontFamily: "Arial, sans-serif",
          position: "relative",
        }}
      >
        {/* Overlay with full height and width */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "linear-gradient(135deg, #0D0D0D, #0D0D0D)",
            opacity: 0.8,
          }}
        />

        {/* Mentor's Profile Picture */}
        {profilePic && (
          <img
            src={profilePic}
            alt="Mentor Avatar"
            width={250}
            height={250}
            style={{
              borderRadius: "50%",
              width: "250px",
              height: "250px",
              objectFit: "cover",
              border: "6px solid #ffffff",
              marginBottom: "20px",
              boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
            }}
          />
        )}

        {/* Mentor's Name */}
        <h1
          style={{
            fontSize: "52px",
            fontWeight: "bold",
            margin: "0 0 10px 0",
            textAlign: "center",
            lineHeight: "1.2",
            textShadow: "2px 2px 4px rgba(0, 0, 0, 0.8)",
          }}
        >
          {name}
        </h1>

        {/* Mentor's Position */}
        <p
          style={{
            fontSize: "32px",
            fontWeight: "500",
            margin: "5px 0",
            textAlign: "center",
            opacity: 0.85,
            textShadow: "1px 1px 3px rgba(0, 0, 0, 0.6)",
          }}
        >
          {position}
        </p>

        {/* Mentor's Institution and Course */}
        <p
          style={{
            fontSize: "28px",
            margin: "5px 0",
            textAlign: "center",
            opacity: 0.75,
            textShadow: "1px 1px 3px rgba(0, 0, 0, 0.6)",
          }}
        >
          {institution} - {course}
        </p>

        {/* Mentor's Country */}
        <p
          style={{
            fontSize: "28px",
            marginTop: "5px",
            textAlign: "center",
            opacity: 0.75,
            textShadow: "1px 1px 3px rgba(0, 0, 0, 0.6)",
          }}
        >
          {country}
        </p>

        {/* Bottom decorative line */}
        <div
          style={{
            position: "absolute",
            bottom: "30px",
            width: "60%",
            height: "4px",
            background: "#ffffff",
            borderRadius: "2px",
          }}
        />
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
