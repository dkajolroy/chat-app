import { useGroup } from "../hooks/useGroup";
import GroupItem from "./GroupItem";

export default function Sidebar() {
  const { data, isLoading } = useGroup();

  return (
    <div className="w-[300px] hidden md:flex flex-col gap-2  overflow-y-scroll  h-screen">
      <div className="flex flex-col gap-4 p-2">
        <h2 className="text-center text-2xl ">Mesenger</h2>

        <input
          type="text"
          placeholder="Search..."
          className="border w-full p-1.5 outline-none focus:border-teal-500 rounded"
        />
      </div>
      {isLoading ? (
        Array.from("abcdefghijk").map((item) => (
          <div key={item} className="py-8 bg-gray-300 rounded "></div>
        ))
      ) : !data ? (
        <div className="flex justify-center ">
          <h2 className="text-xl">No chats</h2>
        </div>
      ) : (
        data.map((item, index) => {
          return <GroupItem item={item} key={index} />;
        })
      )}
    </div>
  );
}
