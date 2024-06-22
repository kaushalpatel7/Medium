import { ChangeEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signupInput } from "@kaushal_patel_07/medium-common";
import { BACKEND_URL } from "../config";
import axios from "axios";
import { AppBar } from "./AppBar";

export const Auth = ({ type }: { type: "signup" | "signin" }) => {
  
  const navigate = useNavigate();
  const [postinputs, setpostinputs] = useState<signupInput>({
    name: "",
    email: "",
    password: "",
  });

  async function sendRequest() {
    try {
      const response = await axios.post(
        `${BACKEND_URL}/api/v1/user/${type === "signup" ? "signup" : "signin"}`,
        postinputs
      );
      const jwt = response.data;
      localStorage.setItem("token", jwt);
      navigate("/blogs");
    } catch (e) {
      alert("error while signin up");
    }
  }

  return (
    <div>
     
      <AppBar />
      <div className="bg-white h-screen flex justify-center flex-col">
        <div className="flex justify-center ">
          <div className="px-10 ">
            <div className=" text-4xl  font-extrabold ">Create an account</div>
            <div className="text-slate-400">
              {type === "signin"
                ? "Don't have an account ?"
                : "Already have an account ?"}
              <Link
                to={type === "signin" ? "/signup" : "/signin"}
                className="pl-2 underline"
              >
                {type === "signin" ? "sign up" : "sign in "}
              </Link>
            </div>

            <div className="pt-6">
              {type === "signup" ? (
                <LabeledInput
                  label="Name"
                  placeholder="Kaushal patel"
                  onChange={(e) => {
                    setpostinputs({
                      ...postinputs,
                      name: e.target.value,
                    });
                  }}
                />
              ) : null}

              <LabeledInput
                label="Username"
                placeholder="kp@gmail.com"
                onChange={(e) => {
                  setpostinputs({
                    ...postinputs,
                    email: e.target.value,
                  });
                }}
              />

              <LabeledInput
                label="Password"
                type={"password"}
                placeholder="Kaushal patel"
                onChange={(e) => {
                  setpostinputs({
                    ...postinputs,
                    password: e.target.value,
                  });
                }}
              />
              <button
                onClick={sendRequest}
                type="button"
                className="w-full focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900 mt-8"
              >
                {type === "signup" ? "Sign Up" : "Sign in"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

interface LabeledInputType {
  label: string;
  placeholder: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  type?: string;
}

function LabeledInput({
  label,
  placeholder,
  onChange,
  type,
}: LabeledInputType) {
  return (
    <div>
      <label className="block mb-2 pt-3 text-sm font-semibold text-black">
        {label}
      </label>

      <input
        onChange={onChange}
        type={type || "text"}
        id="first_name"
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder={placeholder}
        required
      />
    </div>
  );
}
