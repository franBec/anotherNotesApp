import Home from "../components/home/home";
import Login from "../components/home/login";

import getJwtDecoded from "../services/auth/getJwtDecoded";

/*
  given a cookie (it lives in req.env.COOKIENAME)
  getServerSideProps will look for data about the current session
  in that info, we can check if loggedIn is true/false
*/
export async function getServerSideProps({ req }) {
  const cookieName = process.env.COOKIENAME;
  const { loggedIn } = await getJwtDecoded(req.cookies[cookieName]);

  return {
    props: { loggedIn },
  };
}

const Index = ({ loggedIn }) => {
  return (
    <div className="p-2">
      {/* <>{JSON.stringify(sessionData)}</> */}
      {loggedIn ? <Home /> : <Login />}
    </div>
  );
};

export default Index;
