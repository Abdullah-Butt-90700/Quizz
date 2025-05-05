import React, { useMemo, useRef } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import PhysicsArray from "../../utils/PhysicsArray";
import { saveAnswer } from "../../redux/QuizSlice";
import { useEffect } from "react";

const Physics: React.FC = () => {
  const questions = PhysicsArray; //Array with data
  const renderRef = useRef<boolean | null>(null);

  const [currentIndex, setCurrentIndex] = useState(0); //For changing questions one by one

  const [checkAnswer, setCheckAnswer] = useState(false); //For checking if the user has selected an answer

  const [selectedAnswer, setSelectedAnswer] = useState(""); //For saving answers

  const [progress, setProgress] = useState(100);

  //progress bar
  useEffect(() => {
    if (renderRef.current) return;
    renderRef.current = true;
    const timer = setInterval(() => {
      setProgress((prevProgress) => {
        let newProgress = prevProgress - 3;
        if (newProgress <= 0) {
          clearInterval(timer);
          renderRef.current = false;
          return 0;
        }
        return newProgress;
      });
    }, 1000);
  }, []); // Restart the timer when the current question changes\
  console.log(progress);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  //Next button
  const next = () => {
    setProgress(0);
    const currentQuestion = questions[currentIndex];

    //storing all the info needed
    const answer = selectedAnswer; //all the selected aswers
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
      <div className="w-[600px] border-black border-2">
        <div
          className={`bg-red-500 h-5  transition duration-300 ease-in-out `}
          style={{
            width: `${progress}%`,
          }}
        />
      </div>
    );
  }, [progress]);

  return (
    <div className="h-[100vh] bg-blue-400">
      <div className="flex h-full flex-col gap-6  items-center">
        {progressBar}
        <div>
          <h1 className="text-white font-black text-6xl">Question Number 1</h1>
        </div>
        <div className="h-[100%] border-black rounded-2xl w-full">
          <ul>
            {questions.map((items) => (
              <div className="bg-yellow-50 flex flex-col gap-2">
                <li className="" key={items.id}>
                  {items.id === currentIndex && (
                    <div>
                      {items.questionNumber} {items.question}
                      <div className="grid grid-cols-2 gap-4 ">
                        <p
                          className="cursor-pointer"
                          onClick={() =>
                            trueAnswer({
                              value: items.a.a,
                              isCorrect: items.a.check,
                            })
                          }
                        >
                          {" "}
                          A: {items.a.a}
                        </p>
                        <p
                          className="cursor-pointer"
                          onClick={() =>
                            trueAnswer({
                              value: items.b.b,
                              isCorrect: items.b.check,
                            })
                          }
                        >
                          B:{items.b.b}
                        </p>
                        <p
                          className="cursor-pointer"
                          onClick={() =>
                            trueAnswer({
                              value: items.c.c,
                              isCorrect: items.c.check,
                            })
                          }
                        >
                          C:{items.c.c}
                        </p>
                        <p
                          className="cursor-pointer"
                          onClick={() =>
                            trueAnswer({
                              value: items.d.d,
                              isCorrect: items.d.check,
                            })
                          }
                        >
                          D:{items.d.d}
                        </p>
                      </div>
                    </div>
                  )}
                </li>
              </div>
            ))}
          </ul>
          <button onClick={next} className="h-11 bg-yellow-50">
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Physics;
