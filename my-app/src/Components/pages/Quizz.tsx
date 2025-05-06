import React, { useMemo } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import PhysicsArray from "../../utils/PhysicsArray";
import { saveAnswer } from "../../redux/QuizSlice";
import { useEffect } from "react";
import ChemistryArray from "../../utils/ChemistryArray";
import { useParams } from "react-router-dom";

const Physics: React.FC = () => {
  const { subject } = useParams();

  const questions = subject === "physics" ? PhysicsArray : ChemistryArray;

  const [currentIndex, setCurrentIndex] = useState(0); //For changing questions one by one

  const [checkAnswer, setCheckAnswer] = useState(false); //For checking if the user has selected an answer

  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(""); //For saving answers

  const [progress, setProgress] = useState(100);

  //progress bar
  useEffect(() => {
    const timer = setInterval(() => {
      if (progress > 0) {
        setProgress(progress - 3);
      }

      if (progress <= 0) {
        next();
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [progress]); // Restart the timer when the current question changes\

  const dispatch = useDispatch();
  const navigate = useNavigate();

  //Next button
  const next = () => {
    const currentQuestion = questions[currentIndex];
    setProgress(100);

    //storing all the info needed
    const answer = checkAnswer ? selectedAnswer : "null"; //all the selected aswers
    const question = currentQuestion.question; //saving questions
    // const validity = questions[currentIndex].a.check; //Checking validity
    const questionId = currentQuestion.id; //questions id
    let correctAnswers = "";

    if (currentQuestion.a.check) {
      correctAnswers = currentQuestion.a.a;
    } else if (currentQuestion.b.check) {
      correctAnswers = currentQuestion.b.b;
    } else if (currentQuestion.c.check) {
      correctAnswers = currentQuestion.c.c;
    } else if (currentQuestion.d.check) {
      correctAnswers = currentQuestion.d.d;
    }

    //saving data to redux store
    dispatch(
      saveAnswer({
        answer,
        question,
        questionId,
        correctAnswers,
      })
    );

    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setCheckAnswer(false);
      setSelectedAnswer(null);
    } else if (currentIndex === questions.length - 1) {
      navigate("/Result");
    }
  };

  //checking if user selected something//store user selection
  const trueAnswer = (items: { value: string; isCorrect: boolean }) => {
    setCheckAnswer(true);
    setSelectedAnswer(items.value);

    if (items.isCorrect == true) {
      console.log("im true");
    } else if (items.isCorrect == false) {
      console.log("i ma  false");
    }
  };

  const progressBar = useMemo(() => {
    return (
      <div className="w-[600px] rounded-xl border-black border-2">
        <div
          className={`bg-red-500 h-5 rounded-xl transition-width duration-300 ease-in-out `}
          style={{
            width: `${progress}%`,
          }}
        />
      </div>
    );
  }, [progress]);

  return (
    <div className="h-[100vh] bg-blue-400">
      <div className="flex h-full flex-col gap-12 justify-center  items-center">
        <div className="flex flex-col justify-center items-center gap-5">
          <h1 className="text-white font-black text-4xl">
            Question Number {questions[currentIndex].questionNumber}
          </h1>
          {progressBar}
        </div>
        <div className="h-[35vh] p-4 border-black relative bg-yellow-50 shadow-xl rounded-2xl flex flex-col gap-48 mx-auto max-w-[77rem] w-full">
          <ul>
            {questions.map((items) => (
              <div className="flex  flex-col gap-2">
                <li className=" " key={items.id}>
                  {items.id === currentIndex && (
                    <div className="flex flex-col gap-5 ">
                      <div>
                        <span className="font-bold">
                          {items.questionNumber} :{" "}
                        </span>{" "}
                        <span className="font-medium">{items.question}</span>
                      </div>
                      <div className="grid grid-cols-2 gap-4 ">
                        <div className="label-div">
                          <input
                            type="radio"
                            name="radioDefault"
                            id="radioDefault1"
                            onClick={() =>
                              trueAnswer({
                                value: items.a.a,
                                isCorrect: items.a.check,
                              })
                            }
                          />
                          <label className=" label" htmlFor="radioDefault1">
                            {items.a.a}
                          </label>
                        </div>
                        <div className="label-div">
                          <input
                            type="radio"
                            name="radioDefault"
                            className="cursor-pointer"
                            id="radioDefault2"
                            onClick={() =>
                              trueAnswer({
                                value: items.b.b,
                                isCorrect: items.b.check,
                              })
                            }
                          />
                          <label className=" label" htmlFor="radioDefault2">
                            {" "}
                            {items.b.b}
                          </label>
                        </div>
                        <div className="label-div">
                          <input
                            id="radioDefault3"
                            type="radio"
                            name="radioDefault"
                            className="cursor-pointer"
                            onClick={() =>
                              trueAnswer({
                                value: items.c.c,
                                isCorrect: items.c.check,
                              })
                            }
                          />
                          <label className="label" htmlFor="radioDefault3">
                            {" "}
                            {items.c.c}
                          </label>
                        </div>
                        <div className="label-div">
                          <input
                            id="radioDefault4"
                            type="radio"
                            name="radioDefault"
                            className="cursor-pointer"
                            onClick={() =>
                              trueAnswer({
                                value: items.d.d,
                                isCorrect: items.d.check,
                              })
                            }
                          />
                          <label className="label" htmlFor="radioDefault4">
                            {items.d.d}
                          </label>
                        </div>
                      </div>
                    </div>
                  )}
                </li>
              </div>
            ))}
          </ul>
          <button
            onClick={next}
            className="h-11 bottom-0 duration-500 ease-in-out left-0 absolute w-full rounded-b-2xl hover:bg-black hover:text-white text-white font-bold bg-blue-600  "
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Physics;
