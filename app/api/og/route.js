import { ImageResponse } from "next/og";

export async function GET(request) {
  const { searchParams, protocol, host } = new URL(request.url);

  const title = searchParams.get("title") || "";
  const price = searchParams.get("price") || "";
  const discounted_price = searchParams.get("discounted-price") || "";
  const cover = searchParams.get("cover");

  const coverUrl =
    cover &&
    `${protocol}//${host}/_next/image?url=${encodeURIComponent(
      cover
    )}&w=1200&q=75`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          backgroundColor: "#e2e8f0",
          position: "relative",
        }}
      >
        {coverUrl && (
          <img
            src={coverUrl}
            alt=""
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        )}

        <div
          style={{
            backgroundColor: "rgba(0, 0, 0, 0.6)",
            display: "flex",
            flexDirection: "column",
            padding: "32px",
            position: "absolute",
            bottom: 0,
            width: "100%",
          }}
        >
          {title && (
            <div
              style={{ fontSize: "40px", color: "#ffffff", fontWeight: "bold" }}
            >
              {title}
            </div>
          )}
          {price && (
            <div
              style={{
                display: "flex",
                alignItems: "baseline",
                gap: "8px",
                fontFamily: "Roboto",
                marginTop: "16px",
              }}
            >
              <p
                style={{
                  fontSize: "32px",
                  color: "#f87171",
                  fontWeight: "bold",
                }}
              >
                ${discounted_price}
              </p>
              <p
                style={{
                  fontSize: "32px",
                  color: "#ffffff",
                  textDecoration: "line-through",
                  marginLeft: "8px",
                }}
              >
                ${price}
              </p>
            </div>
          )}
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 600,
    }
  );
}
