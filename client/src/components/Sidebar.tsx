import { useGroup } from "../hooks/useGroup";
import GroupItem from "./GroupItem";

export default function Sidebar() {
  const { data, isLoading } = useGroup();

  return (
    <div className="md:w-[300px] w-[80px]  flex-col gap-2  overflow-y-scroll  h-screen">
      <div className="flex flex-col gap-4 p-2">
        <h2 className="text-center text-2xl ">
          <span className="md:block hidden">Mesenger</span>
          <span className="md:hidden block">M</span>
        </h2>

        <input
          type="text"
          placeholder="Search..."
          className="border w-full text-xs md:text-base p-1.5 outline-none focus:border-teal-500 rounded"
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
