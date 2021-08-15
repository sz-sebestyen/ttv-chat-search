import { Router } from "./pages";
import { IconTheme, UserContextProvider } from "./components";

function App() {
  return (
    <UserContextProvider>
      <div className="App bg-black text-gray-200 pt-2 h-screen flex flex-col">
        <IconTheme>
          <Router />
        </IconTheme>
      </div>
    </UserContextProvider>
  );
}

export default App;
