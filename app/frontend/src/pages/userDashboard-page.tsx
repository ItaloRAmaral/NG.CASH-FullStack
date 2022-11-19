import useIsUserLoggedIn from "../hooks/useIsUserLoggedIn";

function UserDashboardPage() {
  useIsUserLoggedIn();
  return <span>userdash</span>;
}

export default UserDashboardPage;
