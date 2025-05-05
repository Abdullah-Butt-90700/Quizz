import React from "react";
import { useSelector } from "react-redux";
import PhysicsArray from "../../utils/PhysicsArray";

const Result: React.FC = () => {
  const physicsArray = PhysicsArray;
  const physicsData = useSelector((state: any) => state.quizz); //getting data from the quizz
  const quizzInfo = physicsData.answers; //Getting inside array with multiple objects

  const marks = () => {
    let count = 0;

    for (let i = 0; i <= quizzInfo.length - 1; i++) {
      if (quizzInfo[i].answer === quizzInfo[i].correctAnswers) {
        count += 1;
      } else if (!quizzInfo[i].answer === quizzInfo[i].correctAnswers) {
        count;
      }
    }
    return count;
  };

  return (
    <div className="bg-sky-400 h-[200vh]">
      <div className="max-w-[80rem] mx-auto flex flex-col justify-center">
        <h1 className="text-white text-7xl font-semibold flex justify-center ">
          Quiz Results
        </h1>
        <ul>
          {quizzInfo.map((items: any, index: number) => (
            <li key={items.questionId}>
              <div className="flex flex-col p-4">
                <div className="flex flex-col gap-2">
                  <div className="flex gap-2">
                    <p>{items.questionId + 1}</p>
                    <h1 className="font-bold">{items.question}</h1>
                  </div>
                  <div className="flex flex-col">
                    <p>{physicsArray[index].a.a}</p>
                    <p>{physicsArray[index].b.b}</p>
                    <p>{physicsArray[index].c.c}</p>
                    <p>{physicsArray[index].d.d}</p>
                  </div>
                  <div>
                    <h1>
                      <span className="font-bold">Your Answer :</span>{" "}
                      {items.answer}
                    </h1>
                    <p>correct anser :{items.correctAnswers}</p>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
        <p>Your score will be displayed here.</p>
        <p>{marks()}/8</p>
      </div>
    </div>
  );
};

export default Result;
