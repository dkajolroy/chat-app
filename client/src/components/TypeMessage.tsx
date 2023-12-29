import { ChangeEvent, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useSocketContext } from "../context/SocketProvider";
import { RootState } from "../store/store";

import { mutate } from "swr";
export default function TypeMessage() {
  const { socket } = useSocketContext();
  const params = useParams();
  const { user } = useSelector((s: RootState) => s.auth);
  const [formdata, setFormdata] = useState({
    file: null as null | File,
    message: "",
    images: null as null | FileList,
  });

  function onChanage(event: ChangeEvent<HTMLInputElement>) {
    const files = event.target.files;
    const value = event.target.value;
    if (event.target.value) {
      setFormdata((s) => ({ ...s, message: value }));
    } else if (files && files[0].type.startsWith("image")) {
      // const image = files
    } else {
      // files
    }
  }

  function sendMessage() {
    socket.emit("send_message", {
      groupId: params.chatId, // groupe id
      message: formdata.message,
      senderId: user?.id,
    });
    setFormdata((s) => ({ ...s, message: "" }));
    mutate("/api/message/" + params.chatId);
  }

  // socket.on("resive_message", (val) => {
  //   console.log(val);
  // });

  return (
    <div className="flex h-12 border-t border-gray-300 items-center  justify-center relative">
      <div className="flex absolute h-full bg-white right-0  bottom-0 justify-between w-full items-center">
        <button className="border-x border-gray-300 px-5 h-full hover:text-teal-600 transition">
          Emoji
        </button>
        <input
          onChange={onChanage}
          onKeyUp={(e) => e.key === "Enter" && sendMessage()}
          value={formdata.message}
          type="text"
          placeholder="Type to message"
          className="outline-none bg-gray-200 text-black placeholder-gray-600 focus:bg-gray-300 h-full w-full px-5"
        />
        <button
          onClick={sendMessage}
          className=" h-full p-2 min-w-[200px] bg-gray-400 hover:bg-gray-500 hover:text-white transition"
        >
          Send Message
        </button>
      </div>
    </div>
  );
}
