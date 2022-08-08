import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

import Swal from "sweetalert2";

const Signup = () => {
  const router = useRouter();

  const [form, setForm] = useState({});

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const doesFormHasErrors = () => {
    if (!form.firstName || form.firstName.trim() === "") {
      return "First name required";
    }

    if (form.firstName.length > 50) {
      return "First name too long";
    }

    if (!form.lastName || form.lastName.trim() === "") {
      return "Last name required";
    }

    if (form.lastName.length > 50) {
      return "Last name too long";
    }

    if (!form.mail || form.mail.trim() === "") {
      return "Mail required";
    }

    if (form.mail.length > 254) {
      return "Mail too long";
    }

    if (!form.password || form.password.trim() === "") {
      return "Password required";
    }

    if (form.password.length < 8) {
      return "Password too short";
    }

    if (form.password.length > 127) {
      return "Password too long";
    }

    if (form.repeatPassword !== form.password) {
      return "Password and repeated password are not the same";
    }

    return false;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const error = doesFormHasErrors();
    if (error) {
      Swal.fire({
        text: error,
        icon: "error",
      });
      return;
    }

    const res = await fetch("/api/signup", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(form),
    });

    const resjson = await res.json();

    if (resjson.status !== 200) {
      Swal.fire({
        text: resjson.errorMessage,
        icon: "error",
      });
      return;
    }
    Swal.fire({
      text: "Sign up successfull",
      icon: "success",
    });
    router.push("/");
  };

  return (
    <div className="flex justify-center">
      <div className="rounded-lg border border-gray-300 p-4 shadow-xl">
        <form className="space-y-6" onSubmit={(e) => handleSubmit(e)}>
          <h3 className="text-xl">Sign up</h3>
          <div>
            <label
              htmlFor="firstName"
              className="mb-2 block text-sm font-medium"
            >
              First Name
            </label>
            <input
              type="text"
              name="firstName"
              id="firstName"
              className="block w-full rounded-lg border border-gray-300 p-2"
              placeholder="first name"
              required={true}
              minLength="3"
              maxlength="50"
              value={form.firstName ?? ""}
              onChange={(e) => handleFormChange(e)}
            />
          </div>
          <div>
            <label
              htmlFor="lastName"
              className="mb-2 block text-sm font-medium"
            >
              Last Name
            </label>
            <input
              type="text"
              name="lastName"
              id="lastName"
              className="block w-full rounded-lg border border-gray-300 p-2"
              placeholder="last name"
              required={true}
              minLength="3"
              maxlength="50"
              value={form.lastName ?? ""}
              onChange={(e) => handleFormChange(e)}
            />
          </div>
          <div>
            <label htmlFor="mail" className="mb-2 block text-sm font-medium">
              Mail
            </label>
            <input
              type="email"
              name="mail"
              id="mail"
              className="block w-full rounded-lg border border-gray-300 p-2"
              placeholder="mail"
              required={true}
              maxlength="254"
              value={form.mail ?? ""}
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
              required={true}
              minLength="8"
              maxlength="127"
              value={form.password ?? ""}
              onChange={(e) => handleFormChange(e)}
            />
          </div>
          <div>
            <label
              htmlFor="repeatPassword"
              className="mb-2 block text-sm font-medium"
            >
              Repeat password
            </label>
            <input
              type="password"
              name="repeatPassword"
              id="repeatPassword"
              placeholder="••••••••"
              className="block w-full rounded-lg border border-gray-300 p-2"
              required={true}
              minLength="8"
              maxlength="127"
              value={form.repeatPassword ?? ""}
              onChange={(e) => handleFormChange(e)}
            />
          </div>
          <div className="text-sm font-medium">
            Already have an account?{" "}
            <Link href="/">
              <a className="text-blue-700 hover:underline dark:text-blue-500">
                Go to login
              </a>
            </Link>
          </div>
          <button
            type="submit"
            className="w-full rounded-lg bg-blue-500 px-5 py-2.5 text-center  text-white hover:bg-blue-600 "
          >
            Sign up
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
