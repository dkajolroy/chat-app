import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import TimeAgo from "timeago-react";
import { useSocketContext } from "../context/SocketProvider";
import { RootState } from "../store/store";

export default function GroupItem({ item }: { item: Group }) {
  const { user } = useSelector((s: RootState) => s.auth);
  const params = useParams();
  const { onlineUsers } = useSocketContext();

  // find friends
  const friends = item.members.filter((member) => member.id !== user?.id);
  if (friends.length > 1) {
    // groups
    return (
      <Group item={item} params={params} members={item.members} user={user} />
    );
  } else if (friends.length) {
    // Friends
    const fuser = friends[0];
    const isOnline = onlineUsers.some((user) => user.userId === fuser.id);

    return (
      <Group
        item={item}
        params={params}
        members={item.members}
        fUser={fuser}
        isOnline={isOnline}
        user={user}
      />
    );
  }
}

interface Props {
  item: Group;
  params: { chatId?: string };
  fUser?: User;
  isOnline?: boolean;
  members: User[];
  user: User | null;
}
function Group({ item, params, fUser, isOnline, members, user }: Props) {
  const lastMessageBy = members.find((x) => x.id === item.lastMessageBy);
  return (
    <Link
      to={`/${item.id}`}
      className={`flex ${
        params?.chatId === item.id ? "bg-slate-100" : "bg-white"
      } p-2 gap-2 items-center hover:ps-5 transition-all  hover:bg-slate-100 border-y`}
    >
      <div className="h-10 w-10 rounded-full bg-slate-400"></div>
      <div className="flex flex-col w-[calc(100%-40px)]">
        <div className="flex justify-between items-center">
          {fUser ? (
            <h2 className="text-lg">{fUser.name}</h2>
          ) : (
            <h2 className="text-lg">This is Group</h2>
          )}
          <span
            className={`h-2 w-2 rounded-full ${
              isOnline ? "bg-green-500" : "bg-slate-300"
            }`}
          ></span>
        </div>
        <div className="flex justify-between flex-wrap ">
          {lastMessageBy && (
            <span className="text-sm text-gray-500">
              {`${lastMessageBy.id === user?.id ? "You : " : ""}${
                item.lastMessage && item.lastMessage.length > 16
                  ? item.lastMessage.slice(0, 16) + "..."
                  : item.lastMessage
              }`}
            </span>
          )}
          <span className="text-sm text-gray-500">
            <TimeAgo datetime={item.updated_at} />
          </span>
        </div>
      </div>
    </Link>
  );
}
