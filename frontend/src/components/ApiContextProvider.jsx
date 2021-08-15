import { ApiContext } from "../contexts";

function ApiContextProvider({ children }) {
  return <ApiContext.Provider value={""}>{children}</ApiContext.Provider>;
}

export default ApiContextProvider;
