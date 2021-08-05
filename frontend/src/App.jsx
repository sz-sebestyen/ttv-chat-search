import Router from "./pages/Router";
import IconTheme from "./components/IconTheme";

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
