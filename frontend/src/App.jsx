import { Router } from "./pages";
import { IconTheme } from "./components";

function App() {
  return (
    <div className="App bg-black text-gray-200 h-screen pt-2">
      <IconTheme>
        <Router />
      </IconTheme>
    </div>
  );
}

export default App;
