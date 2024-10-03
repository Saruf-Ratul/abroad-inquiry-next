// app/(main)/career/[slug]/page.js
import { getSingleCareer } from "@/redux/features/career/careerAPI";
import CareerDetails from "@/sections/career/CareerDetails";
import { BASE_URL } from "@/utils/axios";

export async function generateMetadata({ params }) {
  const career = await getSingleCareer(params.slug);

  return {
    title: career?.data?.title,
    description: career?.data?.jobContext || "Career details at our company.",
    openGraph: {
      images: [
        {
          url: `${BASE_URL}/${career?.data?.image}`,
        },
      ],
    },
  };
}

export default async function CareerDetailPage({ params }) {
  return (
    <div>
      <CareerDetails slug={params.slug} />
    </div>
  );
}
