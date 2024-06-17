import { AppBar } from "../components/AppBar";
import { BlogCard } from "../components/BlogCard";
import { Footer } from "../components/Footer";
import { Scaleton } from "../components/ScaletonCard";
import { useBlogs } from "../hooks";

export const Blogs = () => {
  const { loading, blogs } = useBlogs();
  if (loading) {
    return (
      <div>
        <AppBar />
        <div className="flex justify-center">
          <div>
            <Scaleton />
            <Scaleton />
            <Scaleton />
            <Scaleton />
            <Scaleton />
            <Scaleton />

          </div>
        </div>
        <Footer/>
      </div>
    );
  }

  return (
    <div>
      <AppBar />
      <div className="flex justify-center">
        <div className=" ">
          {blogs.map((blog) => (
            <BlogCard
              id={blog.id}
              authorName={blog.author.name || "anonyms"}
              title={blog.title}
              content={blog.content}
              publishedDate={"14 june 2024"}
            />
          ))}
        </div>
      </div>
      <Footer/>

    </div>
  );
};
