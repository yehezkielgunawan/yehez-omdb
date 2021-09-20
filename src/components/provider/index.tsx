import { createContext, ReactNode, useContext } from "react";

import { APIKeyType } from "./types";

type APIProviderProps = {
  children: ReactNode;
};

export const APIKeyContext = createContext<APIKeyType>({
  api_key: "faf7e5bb",
});

export const useAPIKeyContext = () => {
  return useContext(APIKeyContext);
};

const APIProvider = ({ children }: APIProviderProps) => {
  return (
    <APIKeyContext.Provider value={{ api_key: "faf7e5bb" }}>
      {children}
    </APIKeyContext.Provider>
  );
};

export default APIProvider;
