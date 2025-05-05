import React from "react";
import { setUser } from "../../redux/userSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useFormContext } from "react-hook-form";
interface UserInfo {
  name: string;
  email: string;
}

const Login: React.FC = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const {
    register,
    getValues,
    trigger,
    formState: { errors },
  } = useFormContext();

  const Submit = async () => {
    const isValid = await trigger(["name", "email"]);
    if (!isValid) return;
    console.log("i ma not");

    const values = getValues() as UserInfo;
    dispatch(setUser(values));
    navigate("/Home");
  };

  return (
    <>
      <div className="h-[100vh] bg-sky-300  flex justify-center items-center ">
        <div>
          <img className="cloud-img" src="/images/Cloud.png" alt="" />
        </div>
        <div className=" h-[40vh] w-[30%]  p-5 border-black rounded-2xl bg-white">
          <div className=" flex h-full w-full flex-col items-center gap-8 ">
            <div className=" text-sky-300 font-black  drop-shadow-2xl	 text-5xl ">
              LOGIN PAGE
            </div>
            <div className="flex flex-col h-full  w-[80%] gap-4 ">
              <input
                {...register("name")}
                className="input"
                placeholder="Name"
                type="text"
              />
              {errors.name?.message && (
                <p className="text-red-600">{String(errors.name.message)}</p>
              )}

              <input
                {...register("email")}
                className="input"
                placeholder="Email"
                type="text"
              />
              {errors.email?.message && (
                <p className="text-red-600">{String(errors.email.message)}</p>
              )}
            </div>
            <button onClick={Submit} className="button">
              Login In
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
