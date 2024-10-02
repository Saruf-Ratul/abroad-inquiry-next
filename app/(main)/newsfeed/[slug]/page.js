import { getblogPostDetails } from "@/redux/features/newsfeed/newsfeedAPI";
import NewsfeedSinglePost from "@/sections/newsfeed/NewsfeedSinglPost";
import { BASE_URL } from "@/utils/axios";

function stripHtml(html) {
  return html.replace(/<[^>]+>/g, "");
}

export async function generateMetadata({ params }) {
  const blog = await getblogPostDetails(params.slug);

  const defaultDescription = "Read the latest article from Abroad Inquiry.";

  const description = blog?.data?.blogBody
    ? stripHtml(blog.data.blogBody).slice(0, 160) + "..."
    : defaultDescription;

  return {
    title: blog?.data?.blogTitle || "Blog Post",
    description: description,
    openGraph: {
      title: blog?.data?.blogTitle || "Blog Post",
      description: description,
      images: [
        {
          url: `${BASE_URL}/${blog?.data?.blogFeaturedImage}`,
        },
      ],
    },
  };
}

const BlogPostDetails = ({ params }) => {
  const { slug } = params;

  return <NewsfeedSinglePost blogId={slug} />;
};

export default BlogPostDetails;
