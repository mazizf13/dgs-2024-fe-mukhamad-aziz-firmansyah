import { createContext } from "react";
import PropTypes from "prop-types";

export const StateContext = createContext();

const StateProvider = ({ children }) => {
  return <StateContext.Provider value={{}}>{children}</StateContext.Provider>;
};

export default StateProvider;

StateProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
