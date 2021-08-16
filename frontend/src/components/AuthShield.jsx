import { Redirect } from "react-router-dom";
import { useUserContext } from "../hooks";

function AuthShield({ children, reversed }) {
  const { user } = useUserContext();

  const shouldRedirectAuthorizedUser = reversed && user;
  const shouldRedirectUnauthorizedUser = !reversed && !user;

  if (shouldRedirectAuthorizedUser || shouldRedirectUnauthorizedUser) {
    return <Redirect to="/" />;
  }

  return <>{children}</>;
}

export default AuthShield;
