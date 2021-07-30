import "./App.css";
import Router from "./pages/Router";
import IconTheme from "./components/IconTheme";

function App() {
  return (
    <div className="App">
      <IconTheme>
        <Router />
      </IconTheme>
    </div>
  );
}

export default App;
