export default function Header() {
  return (
    <>
      <h2 className="font-medium">Sender Name</h2>
      <input
        type="text"
        placeholder="Search..."
        className="border w-2/4 py-1 px-2 outline-none focus:border-teal-500 rounded"
      />
      <button className="rounded hover:bg-slate-200 p-2">Settings</button>
    </>
  );
}
