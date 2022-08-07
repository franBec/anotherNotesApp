import ErrorPage from "../components/utils/errors/errorPage";

const Custom404 = () => {
  return <ErrorPage status={404} message="Not found" />;
};

export default Custom404;
