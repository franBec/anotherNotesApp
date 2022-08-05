//https://tailwindcomponents.com/component/tailwind-css-login-card

//https://youtu.be/T6fRWZWrJzI
//https://youtu.be/DHZSYYTCTbA

import { useState, useEffect } from "react";
import { useRouter } from "next/router";

import { useUsername } from "../../zustand/sessionStore";

const Login = () => {
  const [form, setForm] = useState({});
  const router = useRouter();

  const setUsername = useUsername((state) => state.setUsername);

  //if this component mounts, is because there's no current session
  //this useEffect catch cases like 'my cookie expired'
  useEffect(() => {
    setUsername(null);
  }, []);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(form),
    });
    if (res.status === 200) {
      setUsername(form.username);
      router.push("/");
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <>
      <div className="flex justify-center">
        <div className="rounded-lg border border-gray-300 p-4 shadow-xl">
          <form className="space-y-6" onSubmit={(e) => handleLogin(e)}>
            <h3 className="text-xl">Login</h3>
            <div>
              <label
                htmlFor="username"
                className="mb-2 block text-sm font-medium"
              >
                Username
              </label>
              <input
                type="text"
                name="username"
                id="username"
                className="block w-full rounded-lg border border-gray-300 p-2"
                placeholder="username"
                required=""
                value={form.username ?? ""}
                onChange={(e) => handleFormChange(e)}
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="mb-2 block text-sm font-medium"
              >
                Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="••••••••"
                className="block w-full rounded-lg border border-gray-300 p-2"
                required=""
                value={form.password ?? ""}
                onChange={(e) => handleFormChange(e)}
              />
            </div>

            <button
              type="submit"
              className="w-full rounded-lg bg-blue-500 px-5 py-2.5 text-center  text-white hover:bg-blue-600 "
            >
              Login
            </button>
            {/* <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
            Not registered?{' '}
            <a
              href="#"
              className="text-blue-700 hover:underline dark:text-blue-500"
            >
              Create account
            </a>
          </div> */}
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
