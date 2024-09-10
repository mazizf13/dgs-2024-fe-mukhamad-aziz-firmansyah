import { useRef } from "react";
import PropTypes from "prop-types";

const MainInput = ({
  name = "Name",
  type = "text",
  value,
  setValue,
  className = "",
  disabled = false,
  error,
  placeholder,
}) => {
  const inputRef = useRef(null);

  const handleChange = () => {
    if (setValue) {
      setValue(inputRef.current.value);
    }
  };

  return (
    <div className={`transition-all ${error ? "pb-7" : "pb-0"}`}>
      <label htmlFor={name} className="text-gray-500 text-xs font-medium">
        {name.charAt(0).toUpperCase() + name.slice(1)}
      </label>
      <div className="relative grow">
        <input
          ref={inputRef}
          value={value}
          type={type}
          placeholder={placeholder}
          id={name}
          onChange={handleChange}
          name={name}
          disabled={disabled}
          className={`w-full disabled:bg-gray-300 disabled:text-gray-400 relative z-30 p-2 border border-gray-300 dark:bg-gray-900 dark:border-gray-600 ease-in-out transition-all duration-300 ${className} ${
            error
              ? "border-red-500 ring-2 ring-red-500 rounded-bl-none rounded-t-lg rounded-br-lg"
              : "rounded-lg"
          }`}
        />
        <span
          className={`text-red-50 bg-red-500 text-xs transition-all ease-in-out duration-300 font-medium ring-2 ring-red-500 rounded-b-md px-2 py-1 absolute left-0 max-w-[95%] ${
            error ? "top-[105%] z-40" : "hidden top-[0%] opacity-0 min-w-[10%]"
          }`}
        >
          {error}
        </span>
      </div>
    </div>
  );
};

// PropTypes validation
MainInput.propTypes = {
  name: PropTypes.string,
  type: PropTypes.string,
  value: PropTypes.string.isRequired,
  setValue: PropTypes.func.isRequired,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  error: PropTypes.string,
  placeholder: PropTypes.string,
};

export default MainInput;
