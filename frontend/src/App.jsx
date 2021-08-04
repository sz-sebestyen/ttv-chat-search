import Router from "./pages/Router";
import IconTheme from "./components/IconTheme";

function App() {
  return (
    <div className="App bg-background text-white h-screen">
      <IconTheme>
        <Router />
      </IconTheme>
    </div>
  );
}

export default App;
