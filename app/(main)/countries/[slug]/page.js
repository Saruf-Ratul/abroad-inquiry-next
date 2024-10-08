import { getCountryDetails } from "@/redux/features/country/countryAPI";
import CountryDetails from "@/sections/countries/CountryDetails";
import { BASE_URL } from "@/utils/axios";

export async function generateMetadata({ params }) {
  const country = await getCountryDetails(params.slug);

  return {
    title: `Study and Work Opportunities in ${country?.countryName} | Top Universities & Visa Information`,

    description:
      country?.description?.[0]?.["Country Descriptions"] ||
      "Discover details about the country.",
    openGraph: {
      title:
        `Study and Work in ${country?.countryName} | Visa & University Info` ||
        "Country Information",
      description:
        country?.description?.[0]?.["Country Descriptions"] ||
        "Learn about the country's top cities, universities, and opportunities.",
      images: [
        {
          url: `${BASE_URL}/${country?.countryImage}`,
        },
      ],
    },
  };
}

const SingleCountryPage = ({ params }) => {
  return (
    <>
      <CountryDetails params={params} />
    </>
  );
};

export default SingleCountryPage;
