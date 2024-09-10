import React, { useContext } from "react";
import { StateContext } from "../../context/StateContext";
import PropTypes from "prop-types";
import { addWallet, getWallets } from "../../api/wallet";
import { addCategory, getCategory } from "../../api/category";
import { BookMarkedIcon, CheckIcon } from "lucide-react";

const AddMiniCard = ({ type, closeCallback }) => {
  const { setCategory, setWallet } = useContext(StateContext);
  const [localName, setLocalName] = React.useState("");

  const handleAddWallet = async () => {
    console.log("Add Wallet", localName);
    await addWallet({ name: localName });
    const data = await getWallets();
    console.log("data in add wallet", data);
    setWallet(data.data);
    closeCallback();
  };

  const handleAddCategory = async () => {
    console.log("Add Category", localName);
    await addCategory({ name: localName });
    const data = await getCategory();
    console.log("data in add category", data);
    setCategory(data.data);
    closeCallback();
  };

  return (
    <div className="bg-slate-800 relative flex h-10 justify-between w-full rounded-lg text-gray-400 text-xl overflow-hidden">
      <input
        type="text"
        value={localName}
        placeholder={type === "wallet" ? "Add Wallet..." : "Add Category..."}
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
        disabled={localName.length === 0}
        className="bg-transparent h-full text-slate-300 p-3 aspect-square disabled:text-slate-700 disabled:bg-transparent hover:bg-green-600 hover:text-red-100 transition-all"
      >
        <CheckIcon />
      </button>
    </div>
  );
};

AddMiniCard.propTypes = {
  type: PropTypes.oneOf(["wallet", "category"]).isRequired,
  closeCallback: PropTypes.func.isRequired,
};

export default AddMiniCard;
