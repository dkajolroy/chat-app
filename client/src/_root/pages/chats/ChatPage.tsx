import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useSWRConfig } from "swr";
import TimeAgo from "timeago-react";
import { useSocketContext } from "../../../context/SocketProvider";
import { useMessage } from "../../../hooks/useMessage";
import { RootState } from "../../../store/store";
import ChatLayout from "./ChatLayout";

export default function ChatPage() {
  const { socket } = useSocketContext();
  const { mutate } = useSWRConfig();
  const params = useParams();
  socket.emit("join_group", params.chatId as string); // socket join

  useEffect(() => {
    socket.on("resive_message", () => {
      console.log("resive called");
      mutate(`/api/message/${params.chatId}`);
      mutate(`/api/group`);
    });
    var objDiv = document.getElementById("scroll");
    objDiv?.scrollTo({ top: objDiv?.scrollHeight });
  }, [socket]);

  // get my data
  const { user } = useSelector((s: RootState) => s.auth);
  // get older messages
  const { data, isLoading } = useMessage(params.chatId as string);

  return (
    <ChatLayout>
      <div
        id="scroll"
        className="flex flex-col p-5 h-[calc(100vh-96px)] gap-2 overflow-y-scroll"
      >
        {isLoading ? (
          <div className="h-20 flex items-center justify-center">
            <h2 className="text-3xl">Loading</h2>
          </div>
        ) : !data ? (
          <div className="h-full flex justify-center items-center text-2xl">
            <h2>Message empty</h2>
          </div>
        ) : (
          data.map((item, index) => (
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
