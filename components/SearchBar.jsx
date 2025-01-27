import { Search } from "lucide-react";

export default function SearchBar() {
  return (
    <div className="relative w-full max-w-2xl mx-auto my-12">
      <input
        type="text"
        placeholder="Paste the link"
        className="w-full px-4 py-2 text-lg min-h-20 text-white bg-black border-2 border-dashed border-white rounded-2xl outline-none focus:outline-none focus:ring-0"
      />

      <button className="absolute top-1/2 right-8 -translate-y-1/2 text-gray-400 hover:text-white">
        <Search size={25} />
      </button>
    </div>
  );
}
