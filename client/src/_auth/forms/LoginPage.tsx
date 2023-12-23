import axios from "axios";
import { ChangeEvent, FormEvent, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { addUser } from "../../slices/authSlice";
import { catchError } from "../../utils/service";
import { errorToeast, successToeast } from "../../utils/toast";

export default function LoginPage() {
  const [formdata, setFormdata] = useState({
    username: "",
    password: "",
  });
  // set formdata
  function onChangeFormData(event: ChangeEvent<HTMLInputElement>) {
    setFormdata((s) => ({ ...s, [event.target.name]: event.target.value }));
  }

  const dispatch = useDispatch();
  // Submit to server
  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const toastId = toast.loading("Please wait...");
    try {
      await axios
        .post("/api/auth/signin", formdata, {
          headers: { "Content-Type": "application/json" },
        })
        .then((response) => {
          successToeast(toastId, response.data.message);
          dispatch(addUser(response.data.user));
        });
    } catch (error) {
      errorToeast(toastId, catchError(error));
    }
    // dispatch(addUser(formdata));
  }
  return (
    <>
      <form
        onSubmit={onSubmit}
        className="flex flex-col gap-2 bg-white p-5 rounded"
      >
        <h2>Login please</h2>
        <input
          name="username"
          onChange={onChangeFormData}
          type="text"
          placeholder="Username"
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
        <Link to="/signup" className="text-sm flex flex-wrap gap-1">
          {`Don't`} have an account to
          <span className="text-blue-500">Signup</span>
        </Link>
      </form>
    </>
  );
}
