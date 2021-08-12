import { BrowserRouter, Switch, Route } from "react-router-dom";
import NotFound from "./NotFound";
import Home from "./Home";
import Vod from "./Vod";
import Chat from "./Chat";
import { NavBar } from "../components";

const Router = () => (
  <BrowserRouter>
    <NavBar />

    <Switch>
      <Route exact path="/vod/:id">
        <Vod />
      </Route>

      <Route exact path="/vod/:id/chat-search-result/:term">
        <Chat />
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
