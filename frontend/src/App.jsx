import { Router } from "./pages";
import {
  IconTheme,
  UserContextProvider,
  ApiContextProvider,
} from "./components";

function App() {
  return (
    <ApiContextProvider>
      <UserContextProvider>
        <div className="App bg-black text-gray-200 pt-2 h-screen flex flex-col">
          <IconTheme>
            <Router />
          </IconTheme>
        </div>
      </UserContextProvider>
    </ApiContextProvider>
  );
}

export default App;
