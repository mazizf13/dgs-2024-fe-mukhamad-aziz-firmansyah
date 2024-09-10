import PropTypes from "prop-types";

import {
  currencyFormatter,
  dateFormatter,
  timeFormatter,
} from "../../utils/Formatter";
import { ChevronDown, ChevronUp, PencilIcon, TrashIcon } from "lucide-react";

const HistoryCard = ({
  type,
  name,
  date,
  category,
  wallet,
  amount,
  handleCardClick,
}) => {
  return (
    <div
      onClick={handleCardClick}
      className="rounded-lg relative -z-0 flex gap-3 justify-between items-center bg-slate-700 w-full overflow-hidden h-16 max-h-32"
    >
      <div className="z-10 ml-8 grow">
        <h2 className="text-2xl font-medium line-clamp-1">{name}</h2>
        <p className="text-sm font-semibold text-gray-400">
          {wallet.name} • {category.name} • {timeFormatter(date)} •{" "}
          {dateFormatter(date)}
        </p>
      </div>
      <div
        className={`absolute -top-7 -left-7 rounded-full aspect-square h-20 ${
          type.includes("income") ? "bg-green-700" : "bg-red-500"
        }  z-0 p-4`}
      >
        {type.includes("income") ? <ChevronDown /> : <ChevronUp />}
      </div>
      <div className=" h-full flex justify-end items-center">
        <div className="me-3">
          <h3 className="text-2xl font-medium text-gray-400">
            {currencyFormatter(amount)}
          </h3>
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
            console.log("Edit");
          }}
          className="bg-transparent h-full text-slate-300 p-5 aspect-square hover:bg-orange-400 hover:text-red-100 transition-all"
        >
          <PencilIcon className="aspect-auto" />
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
            console.log("Delete");
          }}
          className="bg-transparent h-full text-slate-300 p-5 aspect-square hover:bg-red-700 hover:text-red-100 transition-all"
        >
          <TrashIcon className="aspect-auto" />
        </button>
      </div>
    </div>
  );
};

HistoryCard.propTypes = {
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  date: PropTypes.instanceOf(Date).isRequired,
  category: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }).isRequired,
  wallet: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }).isRequired,
  amount: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  handleCardClick: PropTypes.func.isRequired,
};

export default HistoryCard;
