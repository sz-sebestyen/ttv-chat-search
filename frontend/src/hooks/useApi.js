import { useContext } from "react";
import { ApiContext } from "../contexts";

const useApi = () => useContext(ApiContext);

export default useApi;
