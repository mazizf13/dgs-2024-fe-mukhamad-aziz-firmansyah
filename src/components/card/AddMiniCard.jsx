import React, { useContext } from "react";
import PropTypes from "prop-types";
import { StateContext } from "../../context/StateContext";
import { addWallet, getWallets } from "../../api/wallet";
import { addCategory, getCategory } from "../../api/category";
import Loading from "../Loading";
import { BookMarkedIcon, CheckIcon } from "lucide-react";

const AddMiniCard = ({ type, closeCallback }) => {
  const { setCategory, setWallet, wallet } = useContext(StateContext);
  const [localname, setLocalName] = React.useState("");
  const [localWallet, setLocalWallet] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);

  const handleAddWallet = async () => {
    setIsLoading(true);
    try {
      await addWallet({ name: localname });
      const data = await getWallets();
      setWallet(data.data);
    } finally {
      setIsLoading(false);
      closeCallback();
    }
  };

  const handleAddCategory = async () => {
    setIsLoading(true);
    try {
      await addCategory({ name: localname, wallet: localWallet });
      const data = await getCategory();
      setCategory(data.data);
    } finally {
      setIsLoading(false);
      closeCallback();
    }
  };

  return (
    <div className="bg-slate-800 relative w-full rounded-lg text-gray-400 text-xl overflow-hidden">
      <div
        className={`flex justify-between h-10 ${type === "category" ? "border-b border-slate-700" : ""}`}
      >
        <input
          type="text"
          value={localname}
          placeholder={
            type === "wallet" ? "Add Wallet name..." : "Add Category name..."
          }
          onChange={(e) => setLocalName(e.target.value)}
          className="bg-transparent w-full p-3 text-xl font-medium text-ellipsis"
        />
        <button
          onClick={closeCallback}
          className="bg-transparent h-full text-slate-300 p-3 aspect-square disabled:text-slate-700 disabled:bg-transparent hover:bg-red-600 hover:text-red-100 transition-all"
        >
          <BookMarkedIcon />
        </button>
        <button
          onClick={type === "wallet" ? handleAddWallet : handleAddCategory}
          disabled={localname.length === 0}
          className={`bg-transparent h-full text-slate-300 ${isLoading ? "p-2" : "p-3"} aspect-square disabled:text-slate-700 disabled:bg-transparent hover:bg-green-600 hover:text-red-100 transition-all`}
        >
          {isLoading ? <Loading /> : <CheckIcon />}
        </button>
      </div>
      {type === "category" && (
        <select
          name="wallet"
          id="wallet"
          disabled={wallet.length === 0}
          value={localWallet}
          onChange={(e) => setLocalWallet(e.target.value)}
          className="bg-transparent px-3 w-full disabled:bg-slate-600 disabled:w-20 h-10"
        >
          <option disabled value="">
            Select an option
          </option>
          {wallet.map((item) => (
            <option key={item._id} value={item._id}>
              {item.name}
            </option>
          ))}
        </select>
      )}
    </div>
  );
};

AddMiniCard.propTypes = {
  type: PropTypes.oneOf(["wallet", "category"]).isRequired,
  closeCallback: PropTypes.func.isRequired,
};

export default AddMiniCard;
