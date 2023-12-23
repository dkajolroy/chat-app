import { useParams } from "react-router-dom";
import Header from "../../../components/Header";
import Sidebar from "../../../components/Sidebar";
import TypeMessage from "../../../components/TypeMessage";

interface Props {
  children: React.ReactNode;
}
export default function ChatLayout({ children }: Props) {
  // Check selected chats ids
  const params = useParams();
  return (
    <div className=" flex justify-center ">
      <Sidebar />
      <div className="md:w-[calc(100vw-300px)] bg-white">
        {!params.chatId ? (
          <div className="flex justify-center flex-col items-center min-h-screen">
            <h2 className="text-2xl font-medium">No chats selected</h2>
          </div>
        ) : (
          <div className="min-h-screen flex flex-col justify-between">
            <>
              <div className="border-b px-5 h-12 flex items-center justify-between">
                <Header />
              </div>

              {/* Scroll message */}
              {children}
            </>
            {/* Bottom message input */}
            <TypeMessage />
          </div>
        )}
      </div>
    </div>
  );
}
