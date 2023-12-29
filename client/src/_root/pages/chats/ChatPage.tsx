import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import TimeAgo from "timeago-react";
import { useSocketContext } from "../../../context/SocketProvider";
import { RootState } from "../../../store/store";
import ChatLayout from "./ChatLayout";

export default function ChatPage() {
  const { socket } = useSocketContext();
  const params = useParams();
  const [messages, setmessages] = useState<Message[]>([]);
  socket.emit("join_group", params.chatId as string); // socket join

  useEffect(() => {
    socket.emit("get_massases", params.chatId); // intialil get messages event

    socket.on("resive_message", (response) => {
      // initial get messages response
      setmessages(response);
    });
  }, []);

  // get my data
  const { user } = useSelector((s: RootState) => s.auth);

  return (
    <ChatLayout>
      <div className="flex flex-col-reverse p-5 h-[calc(100vh-96px)] gap-2 overflow-y-scroll">
        {!messages.length ? (
          <div className="flex justify-center items-center">Message Empty</div>
        ) : (
          messages.map((item, index) => (
            <div
              key={index}
              className={`flex ${
                item.user?.id === user?.id ? "justify-end" : ""
              }`}
            >
              <div
                className={`${
                  item.user?.id === user?.id
                    ? "bg-slate-700 rounded-l-2xl"
                    : "bg-cyan-800 rounded-r-2xl"
                } md:max-w-xl flex flex-col p-2 text-white rounded-t-2xl w-fit`}
              >
                <h2 className="text">{item.user?.name}</h2>
                <span className="text-sm text-gray-200">{item.message}</span>
                <span className="flex justify-end text-xs text-gray-300">
                  <TimeAgo datetime={item.updated_at} />
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </ChatLayout>
  );
}
