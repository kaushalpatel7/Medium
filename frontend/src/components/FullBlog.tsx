import { Blog } from "../hooks";
import { AppBar } from "./AppBar";
import { Avatar } from "./BlogCard";

export const FullBlog = ({ blog }: { blog: Blog }) => {
  return (
    <div>
      <AppBar />
      <div className="flex justify-center">
        <div className="grid grid-cols-12 px-10 w-full max-w-screen-xl pt-200 pt-10 ">
          <div className="col-span-8">
            <div className="text-5xl font-extrabold">{blog.title}</div>
            <div className="text-slate-500 pt-4">
              Published on 2nd december 2001
            </div>
            <div className=" pt-4">{blog.content}</div>
          </div>
          <div><div className=" col-span-4 flex justify-center ">
            <div className="pr-4">
              <Avatar size={"big"} name="kaushal" />
            </div>
            <div className="flex flex-col justify-start">Anonyms</div>
          </div>
          
          </div>
        </div>
      </div>
    </div>
  );
};
