import { BrowserRouter, Switch, Route } from "react-router-dom";
import NotFound from "./NotFound";
import Home from "./Home";

const Router = () => (
  <BrowserRouter>
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
