import Home from "../components/home/home";
import Login from "../components/home/login";

import getPermissions from "../services/auth/getPermissions_byJwt";
/*
  given a cookie (it lives in req.env.COOKIENAME)
  getServerSideProps will look for data about the current session
  in that info, we can check if loggedIn is true/false
*/
export async function getServerSideProps({ req }) {
  const cookieName = process.env.COOKIENAME;
  const sessionData = await getPermissions(req.cookies[cookieName]);

  return {
    props: { sessionData },
  };
}

const Index = ({ sessionData }) => {
  return (
    <>
      {/* <>{JSON.stringify(sessionData)}</> */}
      {sessionData?.loggedIn ? (
        <Home permissions={sessionData.permissions} />
      ) : (
        <Login />
      )}
    </>
  );
};

export default Index;
