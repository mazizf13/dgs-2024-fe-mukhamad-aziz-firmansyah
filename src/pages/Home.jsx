import { History, PlusIcon } from "lucide-react";

const Home = () => {
  const handleAddWollet = () => {};
  const handleAddCategory = () => {};
  return (
    <div className="container min-h-screen rounded-2xl mx-auto p-3 flex">
      <div className="grow bg-slate-800 relative rounded-l-2xl border-y border-slate-700 overflow-auto border-l">
        <h1 className="text-3xl absolute top-0 left-0 bg-slate-700/50 backdrop-blur-lg z-10 w-fit py-3 px-4 font-bold text-slate-200 rounded-br-2xl">
          Wollet
        </h1>

        <div className="p-3 flex flex-col h-full pt-16">
          <h3 className="text-3xl font-medium text-gray-400">History</h3>
          <h5 className="text-lg font-normal leading-5 text-gray-400">
            Let`s see what have you been spent on
          </h5>
          <div className="grow self-stretch justify-self-stretch my-3 space-y-3">
            <History />
          </div>
          <div className="flex justify-between items-center">
            <h3 className="text-2xl font-medium text-gray-400">Total</h3>
            <h3 className="text-2xl font-medium text-gray-400">Rp 0.00</h3>
          </div>
        </div>
      </div>
      <div className="w-[30%] divide-y divide-slate-700 bg-slate-900 rounded-r-2xl border-slate-700 border-y border-r">
        <div className="p-3 h-1/2">
          <div className="flex justify-between items-center">
            <h3 className="text-2xl font-medium text-gray-400">Wollets</h3>
            <button
              onClick={handleAddWollet}
              className="bg-transparent rounded-xl text-slate-300 transition-colors hover:bg-slate-800  p-1"
            >
              <PlusIcon className="aspect-auto h-8" />
            </button>
          </div>
        </div>
        <div className="p-3 h-1/2">
          <div className="flex justify-between items-center">
            <h3 className="text-2xl font-medium text-gray-400">Categories</h3>
            <button
              onClick={handleAddCategory}
              className="bg-transparent rounded-xl text-slate-300 transition-colors hover:bg-slate-800  p-1"
            >
              <PlusIcon className="aspect-auto h-8" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
