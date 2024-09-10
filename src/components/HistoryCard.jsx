import { TrashIcon } from "lucide-react";

const HistoryCard = () => {
  return (
    <div className="rounded-lg flex gap-3 justify-between items-center bg-slate-700 px-3 py-2 w-full">
      <div>
        <h2 className="text-2xl font-medium">Makan di warmindo</h2>
        <p className="text-sm font-semibold text-gray-400">
          24.53 • 22 Oktober 2024
        </p>
      </div>
      <div>
        <button className="bg-transparent text-slate-300 rounded-lg p-1 aspect-square hover:bg-red-700 hover:text-red-100 transition-all">
          <TrashIcon className="aspect-auto h-6" />
        </button>
      </div>
    </div>
  );
};

export default HistoryCard;
