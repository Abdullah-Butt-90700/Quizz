import { RootState } from "../../redux/Store";
import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Home: React.FC = () => {
  const data = useSelector((state: RootState) => state.from);
  const navigate = useNavigate();

  const SubmitPhysics = () => {
    navigate("/Quizz/physics");
  };
  const SubmitChemistry = () => {
    navigate("/Quizz/chemistry");
  };

  return (
    <div className="h-[100vh]  bg-blue-300">
      <div className="h-full p-5 mx-auto max-w-[90rem]">
        <div className="flex h-[30%]  justify-center items-center">
          <h1 className="text-7xl font-bold text-white ">
            Welcome to the Quizz
          </h1>
        </div>
        <div className=" bg-yellow-50 h-[60%] flex flex-col gap-7 text-black rounded-lg ">
          <div className="flex p-5 justify-between">
            <div className="flex flex-col gap-4">
              <h1 className=" text-2xl font-medium"> User info</h1>
              <p className=" font-medium">
                <span className="font-bold text-lg">User : </span> {data.name}{" "}
              </p>
              <p className="  font-medium">
                {" "}
                <span className="font-bold text-lg">Email : </span> {data.email}{" "}
              </p>
            </div>
            <div className="flex flex-col gap-4">
              <h1 className=" text-2xl font-medium">
                Select the quizz subject
              </h1>
              <div className="flex flex-col gap-2">
                <button onClick={SubmitPhysics} className="home-button ">
                  Physics
                </button>
                <button onClick={SubmitChemistry} className="home-button ">
                  Chemistry
                </button>
              </div>
            </div>
          </div>
          <div className="w-full bg-black p-4 h-full flex flex-col gap-7  rounded-b-xl ">
            <div>
              {" "}
              <h1 className="text-red-600 text-2xl font-bold">
                DO READ THIS BEFORE MOVING FORWARD !!!
              </h1>
            </div>
            <ul className="text-white">
              <li>
                - After picking the subject you will be redirected to Quizz
                page.
              </li>
              <li>
                - Make sure to select a answer before going to next page
                otherwise the answer will be null and you will get no marks for
                it.
              </li>
              <li>- You will have 30 seconds to solve a qestion.</li>
              <li>
                - After 30 seconds end you will automatically go to next
                question if you haven't done that manually{" "}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
