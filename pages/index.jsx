import Home from "../components/home/home";
import Login from "../components/home/login";

import { getCurrentUser_permissions } from "../services/auth/getCurrentUser";
/*
  given a cookie (it lives in req.env.COOKIENAME)
  getServerSideProps will look for data about the current session
  in that info, we can check if loggedIn is true/false
*/
export async function getServerSideProps({ req }) {
  const cookieName = process.env.COOKIENAME;
  const { permissions } = await getCurrentUser_permissions(
    req.cookies[cookieName]
  );

  return {
    props: { permissions },
  };
}

const Index = ({ permissions }) => {
  return permissions ? <Home permissions={permissions} /> : <Login />;
};

export default Index;
