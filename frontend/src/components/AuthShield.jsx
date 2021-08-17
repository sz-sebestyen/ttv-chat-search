import { useUserContext } from "../hooks";
import SignInLink from "./SignInLink";

function AuthShield({ children, reversed }) {
  const { user } = useUserContext();

  const shouldProtectFromAuthorizedUser = reversed && user;
  const shouldProtectFromUnauthorizedUser = !reversed && !user;

  const isUnauthorized =
    shouldProtectFromAuthorizedUser || shouldProtectFromUnauthorizedUser;

  return (
    <>
      {isUnauthorized ? (
        <div className="flex flex-col items-center">
          <p className="my-4">Please sign in</p>
          <div className="border border-surface rounded p-2">
            <SignInLink />
          </div>
        </div>
      ) : (
        <>{children}</>
      )}
    </>
  );
}

export default AuthShield;
