import axios from "axios";
import { ChangeEvent, FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { catchError } from "../../utils/service";
import { errorToeast, successToeast } from "../../utils/toast";

export default function SignupPage() {
  const navigate = useNavigate();
  const [formdata, setFormdata] = useState({
    name: "",
    password: "",
    email: "",
  });
  // set formdata
  function onChangeFormData(event: ChangeEvent<HTMLInputElement>) {
    setFormdata((s) => ({ ...s, [event.target.name]: event.target.value }));
  }

  // Submit to server
  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const toastId = toast.loading("Please wait...");
    try {
      await axios
        .post("/api/auth/signup", formdata, {
          headers: { "Content-Type": "application/json" },
        })
        .then((res) => {
          successToeast(toastId, res.data?.message);
          return navigate("/login");
        });
    } catch (error: any) {
      errorToeast(toastId, catchError(error));
    }
  }

  return (
    <>
      <form
        onSubmit={onSubmit}
        className="flex flex-col gap-2 bg-white p-5 rounded"
      >
        <h2>Signup please</h2>
        <input
          name="name"
          onChange={onChangeFormData}
          type="text"
          placeholder="Name"
          className="py-0.5 px-2 rounded outline-teal-600 border"
        />
        <input
          name="email"
          onChange={onChangeFormData}
          type="text"
          placeholder="Email Address"
          className="py-0.5 px-2 rounded outline-teal-600 border"
        />
        <input
          name="password"
          type="text"
          onChange={onChangeFormData}
          placeholder="Password"
          className="py-0.5 px-2 rounded outline-teal-600 border"
        />
        <button
          type="submit"
          className="bg-teal-600 rounded py-1 px-2 text-white  hover:bg-teal-700"
        >
          Login
        </button>
        <Link to="/signin" className="text-sm flex flex-wrap gap-1">
          Already have an account to
          <span className="text-blue-500">Login</span>
        </Link>
      </form>
    </>
  );
}
