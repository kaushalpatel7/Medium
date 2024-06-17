import { useParams } from "react-router-dom";
import { useBlog } from "../hooks";
import { FullBlog } from "../components/FullBlog";
import { FullBlogScaleton } from "../components/FullBlogScaleton";
import { AppBar } from "../components/AppBar";
import { Footer } from "../components/Footer";

export const Blog = () => {
  // useParams returns an object of key/value pairs of URL parameters. In this case, it destructures the id parameter from the URL. For example, if your route is defined as /blog/:id, and the URL is /blog/123, then useParams will return { id: '123' }.

  const { id } = useParams();
  const { blog, loading } = useBlog({
    id: id || "",
  });
  if (loading || !blog) {
    return (
      <div>
        <AppBar />
        <div>
          <div>
            <FullBlogScaleton />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div>
        <FullBlog blog={blog} />
      </div>
      <div>
        <Footer/>
      </div>
    </div>
  );
};
