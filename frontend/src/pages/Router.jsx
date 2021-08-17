import { BrowserRouter, Switch, Route } from "react-router-dom";
import NotFound from "./NotFound";
import Home from "./Home";
import Vod from "./Vod";
import Chat from "./Chat";
import Login from "./Login";
import SearchHistory from "./SearchHistory";
import {
  NavBar,
  AuthShield,
  UserContextProvider,
  ApiContextProvider,
} from "../components";

const Router = () => (
  <BrowserRouter>
    <ApiContextProvider>
      <UserContextProvider>
        <NavBar />

        <Switch>
          <Route exact path="/search-history">
            <AuthShield>
              <SearchHistory />
            </AuthShield>
          </Route>

          <Route exact path="/login">
            <Login />
          </Route>

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
      </UserContextProvider>
    </ApiContextProvider>
  </BrowserRouter>
);

export default Router;
