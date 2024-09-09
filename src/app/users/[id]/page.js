import Link from "next/link";
import React from "react";

export async function generateStaticParams() {
    const posts = await fetch("http://localhost:3000/api/users").then((res) =>
      res.json()
    );
    return posts?.users?.map((post) => ({
      id: post._id,
    }));
  }

const page = async ({ params }) => {
  const fetchData = async () => {
    const getUser = await fetch(
      `http://localhost:3000/api/users/${params?.id}`
    );
    const data = await getUser.json();
    return data;
  };
  const data = await fetchData();
  return (
    <>
      <div className="flex justify-center items-center h-screen">
        <div
          key={data?.data?._id}
          className="bg-slate-100 p-5 rounded-lg cursor-pointer w-96"
        >
          <Link
            href={`/users/${data?.data?._id}`}
            className="flex justify-between"
          >
            <p>Name</p>
            <p>{data?.data?.name}</p>
          </Link>
          <Link
            href={`/users/${data?.data?._id}`}
            className="flex justify-between"
          >
            <p>Email</p>
            <p>{data?.data?.email}</p>
          </Link>
          <Link
            href={`/users/${data?.data?._id}`}
            className="flex justify-between"
          >
            <p>Password</p>
            <p>{data?.data?.password}</p>
          </Link>
          <div className="flex justify-between text-center">
            <Link
              href={`/editUser/${data?.data?._id}`}
              className="w-20 bg-blue-800 text-white py-2"
            >
              Edit
            </Link>
            <button className="w-20 bg-red-800 text-white py-2">Delete</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default page;
