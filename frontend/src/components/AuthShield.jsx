import { useUserContext } from "../hooks";

function AuthShield({ children, reversed }) {
  const { user } = useUserContext();

  const shouldProtectFromAuthorizedUser = reversed && user;
  const shouldProtectFromUnauthorizedUser = !reversed && !user;

  const isUnauthorized =
    shouldProtectFromAuthorizedUser || shouldProtectFromUnauthorizedUser;

  return <>{isUnauthorized ? <div>Please sign in</div> : <>{children}</>}</>;
}

export default AuthShield;
