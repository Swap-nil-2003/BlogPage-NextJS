import Link from "next/link";

async function fetchBlogs(){
  const res= await fetch("http://localhost:3000/api/blog",{
    next:{
      revalidate:5,
    },
  });
  const data = await res.json();
  return data.posts;

}

export default async function Home() {

  const posts = await fetchBlogs();
  console.log(posts);

  return (
    <main className="w-full h-full">
    <div className="md:w-2/4 sm:w-3/4 m-auto p-4 my-4 rounded-xl bg-teal-700 drop-shadow-xl">
     <h1 className="text-white text-center text-2xl font-bold font-[baloo bhai]">Technical Blog Page</h1>
    </div>
     {/* Link*/}
    <div className="flex my-3">
      <Link href={"/blog/add"} className="md:w-1/5 sm:w-1/2 text-center rounded-lg p-2 m-auto bg-teal-200 hover:bg-teal-500 font-semibold">
        Add New Blog 🚀
      </Link>
    </div>
    {/* Blogs */}
    <div className="w-full flex flex-col justify-center items-center">
        {posts?.map((post: any) => (
          <div className="w-3/4 p-4 rounded-md mx-3 my-2 bg-teal-200 flex flex-col justify-center">
            <div className="flex items-center my-3">
              <div className="mr-auto">
                <h2 className="mr-auto font-semibold">{post.title}</h2>
              </div>
              <Link
                href={`/blog/edit/${post.id}`}
                className="px-2 py-1 text-center bg-teal-600 hover:bg-teal-800 rounded-md font-semibold text-white">
                Edit
              </Link>
            </div>
            <div className="mr-auto my-1">
              <blockquote className="font-bold text-slate-700">
                {new Date(post.date).toDateString()}
              </blockquote>
            </div>
            <div className=" mr-auto my-1">
              <h2>{post.description}</h2>
            </div>
          </div>
        ))}
      </div>
  </main>
  );
}
