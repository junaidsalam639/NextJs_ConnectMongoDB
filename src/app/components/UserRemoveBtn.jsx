"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import React from "react";

const UserRemoveBtn = ({ id }) => {
  const router = useRouter();
  const handlerDelete = () => {
    axios
      .delete(`http://localhost:3000/api/users?id=${id}`)
      .then((res) => {
        console.log(res);
        router.refresh();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <>
      <button
        onClick={handlerDelete}
        className="w-20 bg-red-800 text-white py-2"
      >
        Delete
      </button>
    </>
  );
};

export default UserRemoveBtn;
