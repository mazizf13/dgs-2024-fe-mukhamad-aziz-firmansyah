import { useContext, useState } from "react";
import PropTypes from "prop-types";
import {
  deleteCategory,
  getCategory,
  updateCategory,
} from "../../api/category";
import { StateContext } from "../../context/StateContext";
import { deleteWallet, getWallets, updateWallet } from "../../api/wallet";
import Loading from "../Loading";
import {
  BookMarkedIcon,
  CheckIcon,
  EyeIcon,
  PencilIcon,
  TrashIcon,
} from "lucide-react";

const MiniCard = ({ name, uuid, type, handleCardClick }) => {
  const { setCategory, wallet, setWallet } = useContext(StateContext);
  const [localName, setLocalName] = useState(name);
  const [localWallet, setLocalWallet] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isLoading, setIsLoading] = useState({
    delete: false,
    update: false,
  });

  const updateData = async () => {
    setIsLoading((p) => ({ ...p, update: true }));
    try {
      if (type === "category") {
        await updateCategory({ id: uuid, name: localName });
        const data = await getCategory();
        setCategory(data.data);
      } else if (type === "wallet") {
        await updateWallet({ id: uuid, name: localName });
        const data = await getWallets();
        setWallet(data.data);
      } else {
        throw new Error("Unknown type!");
      }
    } catch (error) {
      alert(error.message);
    } finally {
      setIsLoading((p) => ({ ...p, update: false }));
    }
  };

  const deleteData = async () => {
    setIsLoading((p) => ({ ...p, delete: true }));
    try {
      if (type === "category") {
        await deleteCategory(uuid);
        const data = await getCategory();
        setCategory(data.data);
      } else if (type === "wallet") {
        await deleteWallet(uuid);
        const data = await getWallets();
        setWallet(data.data);
      } else {
        throw new Error("Unknown type!");
      }
    } catch (error) {
      alert(error.message);
    } finally {
      setIsLoading((p) => ({ ...p, delete: false }));
    }
  };

  const handleOnEdit = (e) => {
    e.stopPropagation();
    if (isEditing) {
      updateData();
    }
    setIsEditing(!isEditing);
  };

  const handleOnDelete = (e) => {
    e.stopPropagation();
    if (isDeleting) {
      deleteData();
    }
    setIsDeleting(!isDeleting);
  };

  return (
    <div className="bg-slate-800 relative w-full rounded-lg text-gray-400 text-xl overflow-hidden">
      <div
        className={`flex justify-between h-10 ${
          type === "category" && isEditing ? "border-b border-slate-700" : ""
        }`}
      >
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
          className={`bg-transparent h-full text-slate-300 ${
            isLoading.update ? "p-2" : "p-3"
          } aspect-square disabled:text-slate-700 disabled:bg-transparent ${
            isEditing ? "hover:bg-green-600" : "hover:bg-orange-400"
          } hover:text-red-100 transition-all`}
        >
          {isLoading.update ? (
            <Loading />
          ) : isEditing ? (
            <CheckIcon />
          ) : (
            <PencilIcon />
          )}
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
              className={`bg-transparent p-3 h-full text-slate-300 aspect-square disabled:hover:bg-transparent disabled:text-slate-700 hover:bg-red-700 hover:text-red-100 transition-all`}
            >
              {isLoading.delete ? <Loading /> : <TrashIcon />}
            </button>
          </div>
        ) : (
          <button
            onClick={handleOnDelete}
            disabled={isEditing}
            className={`${
              isLoading.delete ? "p-2" : "p-3"
            } bg-transparent h-full text-slate-300 aspect-square disabled:hover:bg-transparent disabled:text-slate-700 hover:bg-red-700 hover:text-red-100 transition-all`}
          >
            {isLoading.delete ? <Loading /> : <TrashIcon />}
          </button>
        )}
      </div>
      {type === "category" && isEditing && (
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

MiniCard.propTypes = {
  name: PropTypes.string.isRequired,
  uuid: PropTypes.string.isRequired,
  type: PropTypes.oneOf(["category", "wallet"]).isRequired,
  handleCardClick: PropTypes.func.isRequired,
};

export default MiniCard;
