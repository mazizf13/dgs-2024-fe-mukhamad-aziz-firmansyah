import PropTypes from "prop-types";
import { useState } from "react";
import {
  currencyFormatter,
  dateFormatter,
  timeFormatter,
} from "../../utils/Formatter";
import ModalItem from "./ModalItem";
import { EyeIcon } from "lucide-react";

const ModalWallet = ({ name, expenseItems, date }) => {
  const [showModal, setShowModal] = useState({ show: false, data: {} });

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className="bg-slate-800 rounded-lg border border-slate-700 m-3 md:min-w-[30%] md:max-w-[40%]"
    >
      <div className="p-3 border-b border-slate-700 text-3xl overflow-hidden font-medium text-gray-400">
        <h1 className="break-words text-nowrap text-ellipsis w-full">
          Detail wallet{" "}
          <span className="bg-slate-600 px-2 rounded-lg border border-gray-500">
            {name}
          </span>
        </h1>
      </div>
      <div className="p-3">
        <h2 className="text-2xl font-medium text-gray-400">Wallet {name}</h2>
        <p className="text-xl mt-3 font-medium text-gray-400">
          Total Expense : {expenseItems.length}
        </p>
        <p className="text-xl font-medium text-gray-400">
          {timeFormatter(date)} • {dateFormatter(date)}
        </p>
        <h3 className="text-xl font-medium text-gray-400">
          Total Amount :{" "}
          {expenseItems && expenseItems.length > 0
            ? currencyFormatter(
                expenseItems.reduce((acc, curr) => {
                  let amount = 0;
                  if (typeof acc !== "number") {
                    amount = parseInt(acc.amount);
                  } else {
                    amount = acc;
                  }
                  return amount + parseInt(curr.amount);
                }, 0),
              )
            : currencyFormatter(0)}
        </h3>
      </div>
      <div className="p-3 border-t border-slate-700">
        <h2 className="text-2xl font-medium text-gray-400">
          History in wallet
        </h2>
        <div className="mt-2 space-y-2">
          {expenseItems && expenseItems.length > 0 ? (
            expenseItems.map((item, i) => (
              <div
                key={i}
                className="flex justify-between items-center border border-slate-600 rounded-md bg-slate-700 h-10 overflow-hidden"
              >
                <div className="px-3 py-1 flex justify-between items-center grow">
                  <p className="text-xl font-medium text-gray-400 line-clamp-1">
                    {item.title}
                  </p>
                  <p className="text-xl font-medium text-gray-400">
                    {currencyFormatter(item.amount)}
                  </p>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowModal({ show: true, data: item });
                  }}
                  className="bg-transparent h-full text-slate-300 p-2 aspect-square hover:bg-gray-400 hover:text-gray-100 transition-all"
                >
                  <EyeIcon />
                </button>
              </div>
            ))
          ) : (
            <p className="text-gray-400">No History</p>
          )}
        </div>
      </div>
      <div
        onClick={() => setShowModal({ show: false, data: {} })}
        className={`transition-all duration-300 ${
          showModal.show
            ? "backdrop-blur-sm z-10 bg-black/60 opacity-100"
            : "backdrop-blur-none -z-[100] bg-transparent opacity-0 hidden"
        } flex justify-center items-center fixed top-0 left-0 w-screen h-screen`}
      >
        <ModalItem
          amount={showModal.data.amount}
          date={showModal.data.updatedAt}
          name={showModal.data.title}
          type={showModal.data.flowType}
          category={
            showModal.data.category
              ? { name: `ID-${showModal.data.category.toUpperCase()}` }
              : { name: "No Category" }
          }
          wallet={{ name: name }}
        />
      </div>
    </div>
  );
};

ModalWallet.propTypes = {
  name: PropTypes.string.isRequired,
  expenseItems: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      amount: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
        .isRequired,
      category: PropTypes.string,
      flowType: PropTypes.string,
      updatedAt: PropTypes.instanceOf(Date).isRequired,
    }),
  ).isRequired,
  date: PropTypes.instanceOf(Date).isRequired,
};

export default ModalWallet;
