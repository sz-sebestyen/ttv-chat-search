import { BrowserRouter, Switch, Route } from "react-router-dom";
import NotFound from "./NotFound";
import Home from "./Home";
import Menu from "../components/Menu";

const Router = () => (
  <BrowserRouter>
    <Menu />

    <Switch>
      <Route exact path="/">
        <Home />
      </Route>

      <Route path="/*">
        <NotFound />
      </Route>
    </Switch>
  </BrowserRouter>
);

export default Router;
