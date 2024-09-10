import PropTypes from "prop-types";
import {
  currencyFormatter,
  dateFormatter,
  timeFormatter,
} from "../../utils/Formatter";

const ModalItem = ({ type, name, date, category, wallet, amount }) => {
  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className="bg-slate-800 rounded-lg border cursor-pointer border-slate-700 m-3 md:min-w-[30%] md:max-w-[40%]"
    >
      <div className="p-3 border-b border-slate-700 text-3xl font-medium text-gray-400">
        <h1>Detail History</h1>
      </div>
      <div className="p-3">
        <h2 className="text-2xl font-medium text-gray-400">{name}</h2>
        <p className="text-xl font-medium text-gray-400">
          {wallet ? wallet.name : "Uncategorized"} •{" "}
          {category ? category.name : "Uncategorized"}
        </p>
        <p className="text-xl font-medium text-gray-400">Money type {type}</p>
        <p className="text-xl font-medium text-gray-400">
          {timeFormatter(date)} • {dateFormatter(date)}
        </p>
        <h3 className="text-xl font-medium text-gray-400">
          Total Amount : {currencyFormatter(amount)}
        </h3>
      </div>
    </div>
  );
};

ModalItem.propTypes = {
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  date: PropTypes.instanceOf(Date).isRequired,
  category: PropTypes.shape({
    name: PropTypes.string,
  }),
  wallet: PropTypes.shape({
    name: PropTypes.string,
  }),
  amount: PropTypes.number.isRequired,
};

export default ModalItem;
