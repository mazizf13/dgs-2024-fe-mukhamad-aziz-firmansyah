import React, { useContext, useEffect } from "react";
import HistoryCard from "../components/card/HistoryCard";
import MiniCard from "../components/card/MiniCard";
import { getItems } from "../api/items";
import { StateContext } from "../context/StateContext";
import { getWallets } from "../api/wallet";
import { getCategory } from "../api/category";
import ModalItem from "../components/modal/ModalItem";
import { currencyFormatter } from "../utils/Formatter";
import ModalWallet from "../components/modal/ModalWallet";
import ModalCategory from "../components/modal/ModalCategory";
import AddMiniCard from "../components/card/AddMiniCard";
import AddItemCard from "../components/card/AddItemCard";
import { PlusIcon } from "lucide-react";

const Home = () => {
  const { category, setCategory, item, setItem, wallet, setWallet } =
    useContext(StateContext);

  const [showModal, setShowModal] = React.useState({
    status: false,
    type: "",
    data: {},
  });

  const [isAddingWallet, setIsAddingWallet] = React.useState(false);
  const [isAddingItem, setIsAddingItem] = React.useState(false);
  const [isAddingCategory, setIsAddingCategory] = React.useState(false);

  useEffect(() => {
    getItems().then((res) => {
      if (!res) return;
      setItem(res.data);
    });
    getWallets().then((res) => {
      if (!res) return;
      setWallet(res.data);
    });
    getCategory().then((res) => {
      if (!res) return;
      setCategory(res.data);
    });
  }, [setCategory, setItem, setWallet]);

  return (
    <div className="container h-screen rounded-2xl mx-auto p-3 flex">
      <div className="grow bg-slate-800 relative rounded-l-2xl border-y border-slate-700 overflow-auto border-l">
        <div className="border-b sticky transition-all top-0 left-0 z-10 bg-slate-800 border-b-slate-700 pb-3">
          <h1 className="text-3xl bg-slate-700/50 backdrop-blur-lg w-fit py-3 px-4 font-bold text-slate-200 rounded-br-2xl">
            Wollet
          </h1>
          <div className="flex justify-between items-center pr-3">
            <div>
              <h3 className="px-3 pt-1 text-3xl font-medium text-gray-400">
                History
              </h3>
              <h5 className="px-3 text-lg font-normal leading-5 text-gray-400">
                Let`s see what have you been spent on
              </h5>
            </div>
            <button
              onClick={() => setIsAddingItem(true)}
              className="aspect-square h-14 hover:bg-slate-700 text-slate-400 hover:text-slate-300 transition-colors rounded-lg"
            >
              <PlusIcon className="aspect-auto " />
            </button>
          </div>
        </div>
        <div className="flex flex-col h-full ">
          <div className="grow px-3 self-stretch justify-self-stretch my-3 space-y-3">
            {isAddingItem && (
              <AddItemCard closeCallback={() => setIsAddingItem(false)} />
            )}
            {item && item.length > 0 ? (
              item.map((item, i) => (
                <HistoryCard
                  key={i}
                  amount={item.amount}
                  category={
                    item.category ? item.category : { name: "Uncategorized" }
                  }
                  wallet={item.wallet ? item.wallet : { name: "Uncategorized" }}
                  name={item.title}
                  id={item._id}
                  date={item.updatedAt}
                  type={item.flowType}
                  handleCardClick={() => {
                    setShowModal({
                      status: true,
                      type: "item",
                      data: item,
                    });
                  }}
                />
              ))
            ) : (
              <p className="text-gray-400">No History</p>
            )}
          </div>
          <div className="flex sticky bottom-0 left-0 bg-slate-800 z-10 justify-between items-center border-t border-t-slate-700 pt-2 p-3">
            <h3 className="text-2xl font-medium text-gray-400">Total</h3>
            <h3 className="text-2xl font-medium text-gray-400">
              {item.length > 0
                ? currencyFormatter(
                    item.reduce((acc, curr) => {
                      let amount = 0;
                      if (typeof acc !== "number") {
                        amount = acc.amount;
                      } else {
                        amount = acc;
                      }
                      return amount + parseInt(curr.amount);
                    }),
                  )
                : currencyFormatter(0)}
            </h3>
          </div>
        </div>
      </div>
      <div className="w-[30%] divide-y divide-slate-700 bg-slate-900 rounded-r-2xl border-slate-700 border-y border-r overflow-hidden">
        <div className="h-1/2 overflow-auto">
          <div className=" px-3 py-2 flex justify-between z-10 items-center sticky top-0 left-0 bg-slate-900">
            <h3 className="text-2xl font-medium text-gray-400">Wollets</h3>
            <button
              onClick={() => setIsAddingWallet(true)}
              disabled={isAddingCategory}
              className="bg-transparent rounded-xl text-slate-300 transition-colors hover:bg-slate-800 disabled:text-slate-700 disabled:hover:bg-transparent p-1"
            >
              <PlusIcon className="aspect-auto h-8" />
            </button>
          </div>
          <div className="p-3 space-y-2">
            {isAddingWallet && !isAddingCategory && (
              <AddMiniCard
                type={"wallet"}
                closeCallback={() => setIsAddingWallet(false)}
              />
            )}
            {wallet && wallet.length > 0 ? (
              wallet.map((cat, i) => (
                <MiniCard
                  key={`wallet-${i}`}
                  name={cat.name}
                  uuid={cat._id}
                  type={"wallet"}
                  handleCardClick={() => {
                    setShowModal({
                      status: true,
                      type: "wallet",
                      data: cat,
                    });
                  }}
                />
              ))
            ) : (
              <p className="text-gray-400">No wallet</p>
            )}
          </div>
        </div>
        <div className="h-1/2 overflow-auto">
          <div className="flex px-3 py-2 justify-between items-center z-10 sticky top-0 left-0 bg-slate-900">
            <h3 className="text-2xl font-medium text-gray-400">Categories</h3>
            <button
              onClick={() => setIsAddingCategory(true)}
              disabled={isAddingWallet}
              className="bg-transparent rounded-xl text-slate-300 transition-colors hover:bg-slate-800 disabled:text-slate-700 disabled:hover:bg-transparent p-1"
            >
              <PlusIcon className="aspect-auto h-8" />
            </button>
          </div>
          <div className="p-3 space-y-2">
            {isAddingCategory && !isAddingWallet && (
              <AddMiniCard
                type={"category"}
                closeCallback={() => setIsAddingCategory(false)}
              />
            )}
            {category && category.length > 0 ? (
              category.map((cat, i) => (
                <MiniCard
                  key={`category-${i}`}
                  name={cat.name}
                  uuid={cat._id}
                  type={"category"}
                  handleCardClick={() => {
                    setShowModal({
                      status: true,
                      type: "category",
                      data: cat,
                    });
                  }}
                />
              ))
            ) : (
              <p className="text-gray-400">No Category</p>
            )}
          </div>
        </div>
      </div>
      <div
        onClick={() => setShowModal({ status: false, type: "", data: {} })}
        className={`fixed transition-all duration-500 ${
          showModal.status
            ? "backdrop-blur-sm z-50 bg-black/60"
            : "backdrop-blur-none -z-50 bg-transparent"
        }  top-0 left-0 w-screen h-screen flex items-center justify-center`}
      >
        {showModal.type === "item" && (
          <ModalItem
            amount={showModal.data.amount}
            category={showModal.data.category}
            date={showModal.data.updatedAt}
            name={showModal.data.title}
            type={showModal.data.flowType}
            wallet={showModal.data.wallet}
          />
        )}
        {showModal.type === "wallet" && (
          <ModalWallet
            name={showModal.data.name}
            expenseItems={showModal.data.expenseItems}
            date={showModal.data.updatedAt}
          />
        )}
        {showModal.type === "category" && (
          <ModalCategory
            name={showModal.data.name}
            date={showModal.data.updatedAt}
            wallet={showModal.data.wallet}
          />
        )}
      </div>
    </div>
  );
};

export default Home;
