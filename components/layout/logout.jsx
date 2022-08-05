import { toast } from "react-hot-toast";
import { useRouter } from "next/router";

const Logout = () => {
  const router = useRouter();

  const handleLogout = async () => {
    toast.promise(toastLogout(), {
      loading: "Logging out...",
      success: <b>Logged out!</b>,
      error: <b>Something went wrong</b>,
    });

    /*
      let's force hard refresh to '/', so
        -> triggers getServerSideProps of index.jsx
        -> sessionData.loggedIn is now false
        -> login.jsx is mounted
        -> its useEffect will clean up the username from the zustand store
    */
    router
      .replace({
        pathname: "/",
      })
      .then(() => router.reload());
  };

  const toastLogout = async () => {
    const res = await fetch("/api/auth/logout");
    if (res.status !== 200) {
      console.error(res.message);
      throw new Error(res.message);
    }
  };

  return (
    <button className="text-xl" onClick={handleLogout}>
      Logout
    </button>
  );
};

export default Logout;
