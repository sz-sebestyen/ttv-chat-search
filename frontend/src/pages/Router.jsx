import { BrowserRouter, Switch, Route } from "react-router-dom";
import NotFound from "./NotFound";
import Home from "./Home";
import Vod from "./Vod";
import NavBar from "../components/NavBar";

const Router = () => (
  <BrowserRouter>
    <NavBar />

    <Switch>
      <Route exact path="/vod/:id">
        <Vod />
      </Route>

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
