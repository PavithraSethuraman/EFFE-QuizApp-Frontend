import axios from "axios";
import React, { useEffect, useState } from "react";
import { BACKEND_URI } from "../config/constants";
import { Document, Page } from "react-pdf/dist/esm/entry.webpack";

const QuizComp = () => {
  const [medias, setMedias] = useState([]);

  useEffect(() => {
    getAllMedias();
  }, []);

  const getAllMedias = () => {
    axios
      .get(`${BACKEND_URI}/api/v1/media/all`)
      .then((result) => {
        setMedias(result.data);
      })
      .catch((error) => {
        setMedias([]);
        console.log(error);
      });
  };

  const [id, setId] = useState(0);
  const [inputAnswer, setInputAnswer] = useState("");
  const [briefAnswer, setBriefAnswer] = useState("");

  const oneData = medias[id];
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);

  const handleAnswer = (value) => {
    if (oneData.answer.toLowerCase() === value.toLowerCase()) {
      setScore(score + 1);
    }
    const nextQ = id + 1;
    if (nextQ < medias.length) {
      setId(id + 1);
    } else {
      setShowScore(true);
    }
  };

  const reset = () => {
    setId(0);
    setScore(0);
    setShowScore(false);
  };

  const [numPage, setNumPage] = useState(null);
  const [pageNum, setPageNum] = useState(1);

  function onDocument({ numPage }) {
    setNumPage(numPage);
    setPageNum(1);
  }

  return (
    <div className="quiz-container">
      {showScore ? (
        <>
          <h1>Your Score is :{score}</h1>
          <button className="btn btn-sm btn-warning" onClick={reset}>
            Restart Quiz
          </button>
        </>
      ) : (
        <div className="quiz-container__question">
          {oneData?.name === "video" ? (
            <div>
              {" "}
              <video preload="auto" width="600" height="400" controls>
                <source src={`${BACKEND_URI}${oneData?.videos[0]}`} />
                ;Your browser does not support the video tag.
              </video>
            </div>
          ) : (
            ""
          )}

          {oneData?.name === "audio" ? (
            <div>
              {" "}
              <audio controls>
                <source src={`${BACKEND_URI}${oneData?.videos[0]}`} />
              </audio>
            </div>
          ) : (
            ""
          )}
          {oneData?.name === "pdf" ? (
            <div>
              {" "}
              <Document
                file={`${BACKEND_URI}${oneData?.videos[0]}`}
                onLoadSuccess={onDocument}
              >
                <Page height="500" pageNumber={pageNum} />
              </Document>
            </div>
          ) : (
            ""
          )}
          <p>{oneData?.question}</p>
          <div className="quiz-container__options">
            {oneData?.input ? (
              <>
                <input
                  type="text"
                  placeholder="Enter your answer"
                  onChange={(e) => setInputAnswer(e.target.value)}
                />
                <button
                  className="btn btn-sm btn-primary"
                  onClick={() => handleAnswer(inputAnswer)}
                >
                  Submit
                </button>
              </>
            ) : (
              ""
            )}
            {oneData?.brief ? (
              <>
                <textarea onChange={(e) => setBriefAnswer(e.target.value)}>
                  Explain
                </textarea>
                <button
                  className="btn btn-sm btn-primary"
                  onClick={() => handleAnswer(briefAnswer)}
                >
                  Submit
                </button>
              </>
            ) : (
              ""
            )}
            <ul className="quiz-container__ul">
              {oneData?.option1 ? (
                <li
                  className="quiz-container__li"
                  onClick={() => handleAnswer(oneData?.option1)}
                >
                  {oneData?.option1}
                </li>
              ) : (
                ""
              )}
              {oneData?.option2 ? (
                <li
                  className="quiz-container__li"
                  onClick={() => handleAnswer(oneData?.option2)}
                >
                  {oneData?.option2}
                </li>
              ) : (
                ""
              )}
              {oneData?.option3 ? (
                <li
                  className="quiz-container__li"
                  onClick={() => handleAnswer(oneData?.option3)}
                >
                  {oneData?.option3}
                </li>
              ) : (
                ""
              )}
              {oneData?.option4 ? (
                <li
                  className="quiz-container__li"
                  onClick={() => handleAnswer(oneData?.option4)}
                >
                  {oneData?.option4}
                </li>
              ) : (
                ""
              )}
              {oneData?.option5 ? (
                <li
                  className="quiz-container__li"
                  onClick={() => handleAnswer(oneData?.option5)}
                >
                  {oneData?.option5}
                </li>
              ) : (
                ""
              )}
              {oneData?.option6 ? (
                <li
                  className="quiz-container__li"
                  onClick={() => handleAnswer(oneData?.option6)}
                >
                  {oneData?.option6}
                </li>
              ) : (
                ""
              )}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuizComp;
