import React, { useState, useEffect } from "react";
import axios from "axios";
import UploadForm from "./UploadForm";
import { BACKEND_URI } from "../config/constants";

const QuizCreationComp = () => {
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
        alert("Error happened!");
      });
  };

  return (
    <>
      <div className="row ">
        <div
          className="card"
          style={{
            height: "auto",
            width: "800px",
            marginTop: "50px",
            marginLeft: "250px",
            border: "1px solid black",
          }}
        >
          <div className="card-body">
            <UploadForm getAllMedias={getAllMedias} />
          </div>
        </div>
      </div>
    </>
  );
};

export default QuizCreationComp;
