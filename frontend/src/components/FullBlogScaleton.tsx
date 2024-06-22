export const FullBlogScaleton = () => {
  return (
    <div role="status" className="max-w-sm animate-pulse">
      <div className="flex justify-center">
        <div className="grid grid-cols-12 px-10 w-full max-w-screen-xl pt-200 pt-10 ">
          <div className="col-span-8">
            <div className="text-5xl font-extrabold">
              <div className="h-2.5 bg-gray-200 rounded-full w-48 mb-4"></div>
            </div>
            <div className="text-slate-500 pt-4">
            <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
            </div>
            <div className=" pt-4">
              <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
            </div>
          </div>
          <div>
            <div className=" col-span-4 flex justify-center ">
              <div className="pr-4">
                <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
              </div>
              <div className="flex flex-col justify-start">
                {" "}
                <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <span className="sr-only">Loading...</span>
    </div>
  );
};
