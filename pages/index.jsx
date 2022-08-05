import Home from "../components/home/home";
import Login from "../components/home/login";

import getSessionData from "../services/auth/getSessionData";

/*
  given a cookie (it lives in req.env.COOKIENAME)
  getServerSideProps will look for data about the current session
  in that info, we can check if loggedIn is true/false
*/
export async function getServerSideProps({ req }) {
  const cookieName = process.env.COOKIENAME;
  const sessionData = await getSessionData(req.cookies[cookieName]);

  return {
    props: { sessionData },
  };
}

const Index = ({ sessionData }) => {
  return (
    <>
      {/* <>{JSON.stringify(sessionData)}</> */}
      {sessionData.loggedIn ? <Home /> : <Login />}
    </>
  );
};

export default Index;
