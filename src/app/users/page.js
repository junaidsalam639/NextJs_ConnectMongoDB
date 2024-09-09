"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import UserRemoveBtn from "../components/UserRemoveBtn";

const UsersPage = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("http://localhost:3000/api/users");
      const data = await response.json();
      setUsers(data.users);
    };

    fetchData();
  }, []); 

  return (
    <>
      <div className="flex justify-between items-center">
        <h1 className="font-bold py-10 text-2xl">
          Next.js 14 CRUD Create, Read, Update and Delete - MongoDB Tailwind CSS
        </h1>
      </div>
      <div className="text-right mb-10">
        <Link className="bg-blue-800 text-white py-4 px-4" href="/addUser">
          Add User
        </Link>
      </div>
      <div className="grid md:grid-cols-2 gap-6">
        {users.map((user) => (
          <div
            key={user._id}
            className="bg-slate-100 p-5 rounded-lg cursor-pointer"
          >
            <Link href={`/users/${user._id}`} className="flex justify-between">
              <p>Name</p>
              <p>{user.name}</p>
            </Link>
            <Link href={`/users/${user._id}`} className="flex justify-between">
              <p>Email</p>
              <p>{user.email}</p>
            </Link>
            <Link href={`/users/${user._id}`} className="flex justify-between">
              <p>Password</p>
              <p>{user.password?.slice(0 , 12)}</p>
            </Link>
            <div className="flex justify-between text-center">
              <Link
                href={`/editUser/${user._id}`}
                className="w-20 bg-blue-800 text-white py-2"
              >
                Edit
              </Link>
              <UserRemoveBtn id={user._id} />
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default UsersPage;
