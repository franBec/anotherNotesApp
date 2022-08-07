import "../styles/globals.css";
import Layout from "../components/layout/layout";
import ErrorBoundary from "../components/utils/errors/errorBoundary";

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <ErrorBoundary>
        <Component {...pageProps} />
      </ErrorBoundary>
    </Layout>
  );
}

export default MyApp;
