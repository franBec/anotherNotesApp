import getPermissions from "../../services/auth/getPermissions_byJwt";
export async function getServerSideProps({ req, res }) {
  const cookieName = process.env.COOKIENAME;
  const sessionData = await getPermissions(req.cookies[cookieName]);

  if (!sessionData?.permissions?.includes("DASHBOARD_SEE")) {
    res.setHeader("location", "/");
    res.statusCode = 302;
    res.end();
  }

  return {
    props: {},
  };
}

const Index = () => {
  return <div>Index</div>;
};

export default Index;
