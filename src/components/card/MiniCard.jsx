import PropTypes from "prop-types";
import { useContext, useState } from "react";
import {
  deleteCategory,
  getCategory,
  updateCategory,
} from "../../api/category";
import { StateContext } from "../../context/StateContext";
import { deleteWallet, getWallets, updateWallet } from "../../api/wallet";
import {
  BookMarkedIcon,
  CheckIcon,
  PencilIcon,
  EyeIcon,
  TrashIcon,
} from "lucide-react";

const MiniCard = ({ name, uuid, type, handleCardClick }) => {
  const { setCategory, setWallet } = useContext(StateContext);
  const [localName, setLocalName] = useState(name);
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleOnEdit = async (e) => {
    e.stopPropagation();
    setIsEditing(!isEditing);
    if (isEditing) {
      console.log("Saved", uuid);
      try {
        switch (type) {
          case "category": {
            await updateCategory({ id: uuid, name: localName });
            const categoryData = await getCategory();
            console.log("data in edit category", categoryData);
            setCategory(categoryData.data);
            break;
          }
          case "wallet": {
            await updateWallet({ id: uuid, name: localName });
            const walletData = await getWallets();
            console.log("data in edit wallet", walletData);
            setWallet(walletData.data);
            break;
          }
          default:
            alert("Unknown type!");
            break;
        }
      } catch (error) {
        console.error("Error updating item:", error);
      }
    }
  };

  const handleOnDelete = async (e) => {
    e.stopPropagation();
    setIsDeleting(!isDeleting);
    if (isDeleting) {
      console.log("Deleted", uuid);
      try {
        switch (type) {
          case "category": {
            await deleteCategory(uuid);
            const categoryData = await getCategory();
            console.log("data in delete category", categoryData);
            setCategory(categoryData.data);
            break;
          }
          case "wallet": {
            await deleteWallet(uuid);
            const walletData = await getWallets();
            console.log("data in delete wallet", walletData);
            setWallet(walletData.data);
            break;
          }
          default:
            alert("Unknown type!");
            break;
        }
      } catch (error) {
        console.error("Error deleting item:", error);
      }
    }
  };

  return (
    <div className="bg-slate-800 relative flex h-10 justify-between w-full rounded-lg text-gray-400 text-xl overflow-hidden">
      <input
        type="text"
        value={localName}
        onChange={(e) => setLocalName(e.target.value)}
        disabled={!isEditing}
        className={`bg-transparent w-full p-3 text-xl font-medium text-ellipsis ${
          isEditing ? "text-gray-400" : "text-gray-300"
        }`}
      />
      <button
        onClick={handleCardClick}
        disabled={isDeleting || isEditing}
        className="bg-transparent h-full text-slate-300 p-3 aspect-square disabled:text-slate-700 disabled:bg-transparent hover:bg-gray-600 hover:text-gray-100 transition-all"
      >
        <EyeIcon />
      </button>
      <button
        onClick={handleOnEdit}
        disabled={isDeleting}
        className={`bg-transparent h-full text-slate-300 p-3 aspect-square disabled:text-slate-700 disabled:bg-transparent ${
          isEditing ? "hover:bg-green-600" : "hover:bg-orange-400"
        } hover:text-red-100 transition-all`}
      >
        {isEditing ? <CheckIcon /> : <PencilIcon />}
      </button>
      {isDeleting ? (
        <div className="h-full flex items-center bg-slate-600 ps-3">
          <p className="break-keep text-nowrap text-xs me-3 font-medium">
            Are you sure?
          </p>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsDeleting(false);
            }}
            disabled={isEditing}
            className="bg-transparent h-full text-slate-300 p-3 aspect-square hover:bg-green-700 disabled:hover:bg-transparent disabled:text-slate-700 hover:text-red-100 transition-all"
          >
            <BookMarkedIcon />
          </button>
          <button
            onClick={handleOnDelete}
            disabled={isEditing}
            className="bg-transparent h-full text-slate-300 p-3 aspect-square disabled:hover:bg-transparent disabled:text-slate-700 hover:bg-red-700 hover:text-red-100 transition-all"
          >
            <TrashIcon />
          </button>
        </div>
      ) : (
        <button
          onClick={handleOnDelete}
          disabled={isEditing}
          className="bg-transparent h-full text-slate-300 p-3 aspect-square disabled:hover:bg-transparent disabled:text-slate-700 hover:bg-red-700 hover:text-red-100 transition-all"
        >
          <TrashIcon />
        </button>
      )}
    </div>
  );
};

// Define prop types
MiniCard.propTypes = {
  name: PropTypes.string.isRequired,
  uuid: PropTypes.string.isRequired,
  type: PropTypes.oneOf(["category", "wallet"]).isRequired,
  handleCardClick: PropTypes.func.isRequired,
};

export default MiniCard;
