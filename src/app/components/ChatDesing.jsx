/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
"use client";
import { useEffect, useState } from "react";
import { axiosInstance } from "../../libs/BasedUrl";
import Cookies from "js-cookie";
import { io } from "socket.io-client";

const socket = io("http://localhost:9000");

const ChatDesing = () => {
  const [users, setUsers] = useState([]);
  const token = Cookies.get("token");
  const _id = Cookies.get("_id");
  const [chatShow, setChatShow] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const fetchMessages = async (recipient) => {
    try {
      const response = await axiosInstance.get("/api/message", {
        params: { recipient },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setMessages(response?.data?.messages);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await axiosInstance.get("/api/users");
      const filter = data.users?.filter((user) => user?._id !== _id);
      setUsers(filter);
      console.log(filter, _id, "filter");
    };
    fetchData();
  }, []);

  const messageSubmit = async (e) => {
    e.preventDefault();
    await axiosInstance
      .post(
        "/api/message",
        { message: message, recipient: chatShow?._id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        socket.emit("message", message);
        fetchMessages(chatShow?._id);
        document.getElementById("myform").reset();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <form onSubmit={messageSubmit} id="myform">
        <div className="flex min-h-screen w-full bg-primary-bg">
          <div className="w-[400px] border-r border-r-slate-700 px-4 py-4">
            <div className="relative flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="absolute ml-2 h-5 w-5 text-slate-400"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                />
              </svg>
              <input
                type="text"
                placeholder="Search"
                className="w-full rounded-md border-none bg-[#343143] py-2 pl-9 pr-3 text-slate-200 focus:outline-none"
              />
            </div>
            <div className="mt-4 flex gap-2 overflow-hidden">
              {users?.map((user, index) => (
                <>
                  <div key={index} className="flex flex-col items-center gap-1">
                    <div className="h-[42px] w-[42px] rounded-full">
                      <img
                        src="https://picsum.photos/400/400"
                        className="h-full w-full rounded-full object-cover"
                        alt=""
                      />
                    </div>
                    <h2 className="text-xs text-slate-300">
                      {user?.name?.slice(0, 8)}
                    </h2>
                  </div>
                </>
              ))}
            </div>
            <div className="mt-5 flex items-center">
              <div className="flex items-center gap-2 text-slate-200">
                <p className="font-medium">Messages</p>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="h-4 w-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                  />
                </svg>
              </div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="ml-auto h-5 w-5 text-slate-300"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 01-.923 1.785A5.969 5.969 0 006 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337z"
                />
              </svg>
            </div>
            <div className="mt-5 flex flex-col gap-2">
              {users?.map((user, index) => (
                <>
                  <div
                    onClick={() => {
                      setChatShow(user);
                      fetchMessages(user?._id);
                    }}
                    key={index}
                    className="flex items-center cursor-pointer gap-2 rounded-md px-2 py-2 transition-colors duration-300 hover:bg-[#343143]"
                  >
                    <div className="h-[42px] w-[42px] shrink-0 rounded-full">
                      <img
                        src="https://picsum.photos/1000/960"
                        className="h-full w-full rounded-full object-cover"
                        alt=""
                      />
                    </div>
                    <div className="overflow-hidden text-left">
                      <h2 className="truncate text-sm font-medium text-slate-200">
                        {user?.name}
                      </h2>
                      <p className="truncate text-sm text-slate-400">
                        Lets meet today ?
                      </p>
                    </div>
                    <div className="ml-auto flex flex-col items-end gap-1">
                      <p className="text-xs text-slate-400">11:30</p>
                      <svg
                        className="h-4 w-4 fill-green-500"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                      >
                        <path d="M11.602 13.7599L13.014 15.1719L21.4795 6.7063L22.8938 8.12051L13.014 18.0003L6.65 11.6363L8.06421 10.2221L10.189 12.3469L11.6025 13.7594L11.602 13.7599ZM11.6037 10.9322L16.5563 5.97949L17.9666 7.38977L13.014 12.3424L11.6037 10.9322ZM8.77698 16.5873L7.36396 18.0003L1 11.6363L2.41421 10.2221L3.82723 11.6352L3.82604 11.6363L8.77698 16.5873Z" />
                      </svg>
                    </div>
                  </div>
                </>
              ))}
            </div>
          </div>
          {chatShow && (
            <div className="flex-1 flex flex-col">
              <div className="flex items-center gap-2 px-3 py-2 border-b border-b-slate-700">
                <div className="h-[42px] w-[42px] shrink-0 rounded-full">
                  <img
                    src="https://picsum.photos/750/740"
                    className="h-full w-full rounded-full object-cover"
                    alt=""
                  />
                </div>
                <div>
                  <h2 className="text-base text-slate-200">{chatShow?.name}</h2>
                  <p className="text-xs text-slate-400">Online 3 min ago</p>
                </div>
                <div className="ml-auto flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="h-6 w-6 shrink-0 text-slate-400"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                    />
                  </svg>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="ml-3 h-6 w-6 fill-slate-400"
                    viewBox="0 0 24 24"
                  >
                    <path d="M4.5 10.5C3.675 10.5 3 11.175 3 12C3 12.825 3.675 13.5 4.5 13.5C5.325 13.5 6 12.825 6 12C6 11.175 5.325 10.5 4.5 10.5ZM19.5 10.5C18.675 10.5 18 11.175 18 12C18 12.825 18.675 13.5 19.5 13.5C20.325 13.5 21 12.825 21 12C21 11.175 20.325 10.5 19.5 10.5ZM12 10.5C11.175 10.5 10.5 11.175 10.5 12C10.5 12.825 11.175 13.5 12 13.5C12.825 13.5 13.5 12.825 13.5 12C13.5 11.175 12.825 10.5 12 10.5Z" />
                  </svg>
                </div>
              </div>
              <div className="flex flex-col flex-1 overflow-y-auto px-3 py-5">
                {/* Chat messages */}
                <div className="flex flex-col gap-3">
                  {messages?.map((msg) => (
                    <div
                      key={msg?._id}
                      className={`flex gap-3 py-2 ${
                        msg?.sender === _id ? "flex-row-reverse" : ""
                      }`}
                    >
                      <div className="h-[45px] w-[45px] shrink-0 rounded-full">
                        <img
                          src="https://picsum.photos/750/710"
                          className="h-full w-full rounded-full object-cover"
                          alt=""
                        />
                      </div>
                      <div className="overflow-hidden text-left">
                        <h2 className="truncate text-sm text-slate-200">
                          {msg.senderName}{" "}
                          <span className="text-xs text-slate-400">
                            {msg.time}
                          </span>
                        </h2>
                        <div className="mt-2 flex flex-col gap-2">
                          <div
                            className={`rounded-md px-2 py-1.5 ${
                              msg?.sender === _id
                                ? "bg-[#343143]"
                                : "bg-indigo-600"
                            }`}
                          >
                            <p className="truncate text-sm text-slate-100">
                              {msg?.message}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex items-center border-t border-t-slate-700 px-3 py-2">
                <input
                  type="text"
                  required
                  placeholder="Type your message..."
                  className="flex-1 border border-slate-600 rounded-full px-3 py-2 text-slate-100 bg-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
                <button
                  type="submit"
                  className="ml-3 p-2 rounded-full bg-indigo-600 text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="h-5 w-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M17.25 6.75L6.75 12l10.5 5.25L17.25 6.75z"
                    />
                  </svg>
                </button>
              </div>
            </div>
          )}
        </div>
      </form>
    </>
  );
};

export default ChatDesing;
