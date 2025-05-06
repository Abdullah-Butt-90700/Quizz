import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import PhysicsArray from "../../utils/PhysicsArray";
import { useState } from "react";

const Result: React.FC = () => {
  const [EmptyArray, setEmptyArray] = useState<any[]>([]);
  const physicsArray = PhysicsArray;
  const physicsData = useSelector((state: any) => state.quizz); //getting data from the quizz
  let quizzInfo = physicsData.answers; //Getting inside array with multiple objects

  useEffect(() => {
    if (Array.isArray(quizzInfo) && quizzInfo.length >= physicsArray.length) {
      const latestAnswers = quizzInfo.slice(-physicsArray.length);
      setEmptyArray(latestAnswers);
    }
  }, [quizzInfo, physicsArray]);

  const marks = () => {
    let count = 0;

    for (let i = 0; i <= EmptyArray.length - 1; i++) {
      if (EmptyArray[i].answer === EmptyArray[i].correctAnswers) {
        count += 1;
      }
    }
    return count;
  };

  return (
    <div className="bg-sky-400 h-[100%] p-9">
      <div className="max-w-[80rem] mx-auto h-full gap-16 flex flex-col justify-center">
        <h1 className="text-white text-7xl font-semibold flex justify-center ">
          Quiz Result
        </h1>
        <ul>
          {EmptyArray.map((items: any, index: number) => (
            <li key={items.questionId}>
              <div className="flex flex-col p-4 h-full w-full">
                <div className="flex flex-col  bg-yellow-50 rounded-xl p-4 gap-4 ">
                  <div className="flex gap-2">
                    <p>{items.questionId + 1}:</p>
                    <h1 className="font-bold">{items.question}</h1>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <p
                      className={
                        physicsArray[index].a.check
                          ? "result-all-true-answer "
                          : "result-all-false-answer"
                      }
                    >
                      {physicsArray[index].a.a}
                    </p>
                    <p
                      className={
                        physicsArray[index].b.check
                          ? "result-all-true-answer"
                          : "result-all-false-answer"
                      }
                    >
                      {physicsArray[index].b.b}
                    </p>
                    <p
                      className={
                        physicsArray[index].c.check
                          ? "result-all-true-answer"
                          : "result-all-false-answer"
                      }
                    >
                      {physicsArray[index].c.c}
                    </p>
                    <p
                      className={
                        physicsArray[index].d.check
                          ? "result-all-true-answer"
                          : "result-all-false-answer"
                      }
                    >
                      {physicsArray[index].d.d}
                    </p>
                  </div>
                  <div className="flex flex-col gap-2">
                    <h1
                      className={
                        items.answer === items.correctAnswers
                          ? "result-all-true-answer"
                          : "result-all-false-answer"
                      }
                    >
                      <span className="font-bold text-black">
                        Your Answer :
                      </span>{" "}
                      {items.answer}
                      {items.answer === items.correctAnswers ? "✔" : "✘"}
                    </h1>
                    <p className="font-bold ">
                      Correct answer :{" "}
                      <span className="result-all-true-answer">
                        {items.correctAnswers}
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
        <div className="bg-black h-[20vh] flex justify-center items-center rounded-2xl text-white ">
          <h1 className="font-bold text-2xl">
            You Have Scored {marks()} Out of 8 ﾂ
          </h1>
        </div>
      </div>
    </div>
  );
};

export default Result;
