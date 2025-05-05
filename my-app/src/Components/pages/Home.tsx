import { RootState } from "../../redux/Store";
import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Home: React.FC = () => {
  const data = useSelector((state: RootState) => state.from);
  const navigate = useNavigate();

  const SubmitPhysics = () => {
    navigate("/PhysicsQuizz");
  };
  const SubmitChemistry = () => {
    navigate("/ChemistryQuizz");
  };

  return (
    <div className="h-[100vh]  bg-blue-300">
      <form>
        <div className="h-full p-5 w-ful">
          <div className="flex h-[50%]  justify-center items-center">
            <h1 className="text-7xl font-bold text-white ">
              Welcome to the Quizz
            </h1>
          </div>
          <div className="flex justify-between">
            <div className="flex flex-col gap-4">
              <h1 className="text-white text-3xl font-medium">User info</h1>
              <p className="text-white text-xl font-medium">
                User: {data.name}{" "}
              </p>
              <p className="text-white text-xl font-medium">
                Email :{data.email}{" "}
              </p>
            </div>
            <div className="flex flex-col gap-4">
              <h1 className="text-white text-3xl font-medium">
                Select the quizz subject
              </h1>
              <div className="flex flex-col gap-2">
                <button
                  onClick={SubmitPhysics}
                  className="h-7 bg-black text-white rounded-2xl "
                >
                  Physics
                </button>
                <button
                  onClick={SubmitChemistry}
                  className="h-7 bg-black text-white rounded-2xl"
                >
                  Chemistry
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Home;
