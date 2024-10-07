import Image from "next/image";
import { ImageResponse } from "next/og";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
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
          background: "linear-gradient(135deg, #1e293b, #64748b)",
          color: "#ffffff",
          padding: "40px",
          fontFamily: "Arial, sans-serif",
          position: "relative",
        }}
      >
        {/* Mentor's Profile Picture */}
        {profilePic && (
          <Image
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
