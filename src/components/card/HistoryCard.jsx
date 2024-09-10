import PropTypes from "prop-types";
import { useContext, useEffect, useState } from "react";
import {
  currencyFormatter,
  dateFormatter,
  timeFormatter,
} from "../../utils/Formatter";
import { deleteItem, getItems, updateItem } from "../../api/items";
import { StateContext } from "../../context/StateContext";
import Loading from "../Loading";
import {
  BookMarkedIcon,
  CheckIcon,
  ChevronDown,
  ChevronUp,
  PencilIcon,
  TrashIcon,
} from "lucide-react";

const HistoryCard = ({
  type,
  name,
  date,
  category,
  wallet,
  amount,
  handleCardClick,
  id,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const {
    setItem,
    category: stateCategory,
    wallet: stateWallet,
  } = useContext(StateContext);
  const [isLoading, setIsLoading] = useState({
    delete: false,
    update: false,
  });
  const [localItem, setLocalItem] = useState({
    title: name,
    amount,
    wallet: "",
    category: "",
    flowType: type,
  });

  useEffect(() => {
    setLocalItem((prevItem) => ({
      ...prevItem,
      title: name,
      amount,
      flowType: type,
    }));
  }, [name, amount, type]);

  const handleDelete = async (e) => {
    e.stopPropagation();
    e.preventDefault();
    setIsLoading((prev) => ({ ...prev, delete: true }));
    try {
      await deleteItem(id);
      const data = await getItems();
      setItem(data.data);
    } finally {
      setIsLoading((prev) => ({ ...prev, delete: false }));
      setIsDeleting(false);
    }
  };

  const handleUpdate = async (e) => {
    e.stopPropagation();
    e.preventDefault();
    setIsEditing((prev) => !prev);
    if (isEditing) {
      setIsLoading((prev) => ({ ...prev, update: true }));
      try {
        await updateItem({ ...localItem, id });
        const data = await getItems();
        setItem(data.data);
      } finally {
        setIsLoading((prev) => ({ ...prev, update: false }));
        setIsEditing(false);
      }
    }
  };

  return (
    <div
      onClick={!isDeleting && !isEditing ? handleCardClick : undefined}
      className={`rounded-lg relative -z-0 transition-all flex gap-3 justify-between items-center w-full overflow-hidden ${isDeleting ? "shadow-lg shadow-black/40 bg-slate-700 border border-slate-700" : "shadow-none border border-slate-600"} ${isEditing ? "h-20" : "h-16"}`}
    >
      <div className="z-10 ml-8 grow">
        {isEditing ? (
          <>
            <input
              type="text"
              placeholder="Add item..."
              value={localItem.title}
              onChange={(e) =>
                setLocalItem((prev) => ({ ...prev, title: e.target.value }))
              }
              className="text-2xl font-medium line-clamp-1 bg-transparent p-1 px-3 bg-slate-600"
            />
            <div className="divide-x divide-gray-600 flex border-t border-slate-600 grow">
              <select
                name="flow"
                id="flow"
                value={localItem.flowType}
                onChange={(e) =>
                  setLocalItem((prev) => ({
                    ...prev,
                    flowType: e.target.value,
                  }))
                }
                className="bg-transparent px-3 border-r border-slate-600"
              >
                <option value="income">Income</option>
                <option value="outcome">Outcome</option>
              </select>
              <select
                name="category"
                id="category"
                disabled={stateCategory.length === 0}
                value={localItem.category}
                onChange={(e) =>
                  setLocalItem((prev) => ({
                    ...prev,
                    category: e.target.value,
                  }))
                }
                className="bg-transparent px-3 border-r border-slate-600 disabled:bg-slate-600 disabled:w-20"
              >
                <option disabled value="">
                  Select an option
                </option>
                {stateCategory.map((item) => (
                  <option key={item._id} value={item._id}>
                    {item.name}
                  </option>
                ))}
              </select>
              <select
                name="wallet"
                id="wallet"
                disabled={stateWallet.length === 0}
                value={localItem.wallet}
                onChange={(e) =>
                  setLocalItem((prev) => ({ ...prev, wallet: e.target.value }))
                }
                className="bg-transparent px-3 border-r border-slate-600 disabled:bg-slate-600 disabled:w-20"
              >
                <option disabled value="">
                  Select an option
                </option>
                {stateWallet.map((item) => (
                  <option key={item._id} value={item._id}>
                    {item.name}
                  </option>
                ))}
              </select>
              <input
                type="text"
                placeholder="Add amount..."
                value={localItem.amount}
                onChange={(e) =>
                  setLocalItem((prev) => ({ ...prev, amount: e.target.value }))
                }
                className="line-clamp-1 bg-transparent p-1 px-3 w-full"
              />
            </div>
          </>
        ) : (
          <>
            <h2 className="text-2xl font-medium line-clamp-1">
              {localItem.title}
            </h2>
            <p className="text-sm font-semibold text-gray-400">
              {wallet.name} • {category.name} • {timeFormatter(date)} •{" "}
              {dateFormatter(date)}
            </p>
          </>
        )}
      </div>
      <div
        className={`absolute -top-7 -left-7 rounded-full aspect-square h-20 ${type.includes("income") ? "bg-green-700" : "bg-red-500"} z-0 p-4`}
      >
        {type.includes("income") ? <ChevronDown /> : <ChevronUp />}
      </div>
      <div className="h-full flex justify-end items-center">
        {!isEditing && (
          <div className="me-3">
            <h3 className="text-2xl font-medium text-gray-400">
              {currencyFormatter(localItem.amount)}
            </h3>
          </div>
        )}
        <button
          onClick={handleUpdate}
          disabled={isDeleting}
          className={`bg-transparent h-full disabled:hover:bg-transparent disabled:text-slate-600 text-slate-300 p-5 aspect-square ${isEditing ? "hover:bg-green-600" : "hover:bg-orange-400"} hover:text-red-100 transition-all`}
        >
          {isEditing ? <CheckIcon /> : <PencilIcon />}
        </button>
        {isDeleting ? (
          <div className="flex h-full p-2 bg-slate-600 items-center">
            <p className="px-3">Are you sure?</p>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsDeleting(false);
              }}
              disabled={isEditing}
              className="bg-transparent h-full text-slate-300 p-3 rounded-l-lg aspect-square hover:bg-green-600 hover:text-red-100 transition-all"
            >
              <BookMarkedIcon className="aspect-auto" />
            </button>
            <button
              onClick={handleDelete}
              disabled={isEditing}
              className={`bg-transparent h-full text-slate-300 p-3 aspect-square hover:bg-red-600 hover:text-red-100 transition-all`}
            >
              {isLoading.delete ? <Loading /> : <TrashIcon />}
            </button>
          </div>
        ) : (
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsDeleting(true);
            }}
            disabled={isEditing}
            className="bg-transparent h-full text-slate-300 disabled:hover:bg-transparent disabled:text-slate-600 p-5 aspect-square hover:bg-red-700 hover:text-red-100 transition-all"
          >
            <TrashIcon className="aspect-auto" />
          </button>
        )}
      </div>
    </div>
  );
};

HistoryCard.propTypes = {
  type: PropTypes.oneOf(["income", "outcome"]).isRequired,
  name: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  category: PropTypes.object.isRequired,
  wallet: PropTypes.object.isRequired,
  amount: PropTypes.number.isRequired,
  handleCardClick: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
};

export default HistoryCard;
