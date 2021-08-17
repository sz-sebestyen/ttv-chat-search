import { Router } from "./pages";
import { IconTheme } from "./components";

function App() {
  return (
    <div className="App bg-black text-gray-200 pt-2 h-screen flex flex-col">
      <IconTheme>
        <Router />
      </IconTheme>
    </div>
  );
}

export default App;
