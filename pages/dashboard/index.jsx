import { getCurrentUser_permissions } from "../../services/auth/getCurrentUser";
export async function getServerSideProps({ req, res }) {
  const cookieName = process.env.COOKIENAME;
  const { permissions } = await getCurrentUser_permissions(
    req.cookies[cookieName]
  );

  if (!permissions?.includes("DASHBOARD_SEE")) {
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
