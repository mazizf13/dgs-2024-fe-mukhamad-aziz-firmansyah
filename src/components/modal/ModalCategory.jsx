import PropTypes from "prop-types";
import { dateFormatter, timeFormatter } from "../../utils/Formatter";

const ModalCategory = ({ name, wallet, date }) => {
  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className="bg-slate-800 rounded-lg border border-slate-700 m-3 md:min-w-[30%] md:max-w-[40%]"
    >
      <div className="p-3 border-b border-slate-700 text-3xl font-medium text-gray-400">
        <h1>
          Detail Category{" "}
          <span className="bg-slate-600 px-2 rounded-lg border border-gray-500">
            {name}
          </span>
        </h1>
      </div>
      <div className="p-3">
        {wallet ? (
          <>
            <h2 className="text-2xl font-medium text-gray-400">
              Category {name}
            </h2>
            <p className="text-xl mt-3 font-medium text-gray-400">
              Assigned in {wallet.name}
            </p>
            <p className="text-xl font-medium text-gray-400">
              {timeFormatter(date)} • {dateFormatter(date)}
            </p>
          </>
        ) : (
          <p className="text-gray-400">This category has no wallet detail!</p>
        )}
      </div>
    </div>
  );
};

ModalCategory.propTypes = {
  name: PropTypes.string.isRequired,
  wallet: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }),
  date: PropTypes.instanceOf(Date).isRequired,
};

export default ModalCategory;
