import React, { useState } from "react";
import axios from "axios";
import { BACKEND_URI } from "../config/constants";

const UploadForm = ({ getAllMedias }) => {
  const [name, setName] = useState("");
  const [videos, setVideos] = useState([]);
  const [question, setQuestion] = useState("");
  const [option1, setOption1] = useState("");
  const [option2, setOption2] = useState("");
  const [option3, setOption3] = useState("");
  const [option4, setOption4] = useState("");
  const [option5, setOption5] = useState("");
  const [option6, setOption6] = useState("");
  const [input, setInput] = useState("");
  const [brief, setBrief] = useState("");
  const [answer, setAnswer] = useState("");
  const [modalInput, setModalInput] = useState(false);
  const [modalBrief, setModalBrief] = useState(false);
  const [modalOptions, setModalOptions] = useState(false);
  const [option1Modal, setOption1Modal] = useState(false);
  const [option2Modal, setOption2Modal] = useState(false);
  const [option3Modal, setOption3Modal] = useState(false);
  const [option4Modal, setOption4Modal] = useState(false);
  const [option5Modal, setOption5Modal] = useState(false);
  const [option6Modal, setOption6Modal] = useState(false);

  const [inputValue, setInputValue] = useState("");

  const handleSelect = () => {
    if (inputValue == 1) {
      setOption2Modal(false);
      setOption3Modal(false);
      setOption4Modal(false);
      setOption5Modal(false);
      setOption6Modal(false);
      return setOption1Modal(true);
    }
    if (inputValue == 2) {
      setOption1Modal(false);
      setOption3Modal(false);
      setOption4Modal(false);
      setOption5Modal(false);
      setOption6Modal(false);
      return setOption2Modal(true);
    }
    if (inputValue == 3) {
      setOption2Modal(false);
      setOption1Modal(false);
      setOption4Modal(false);
      setOption5Modal(false);
      setOption6Modal(false);
      return setOption3Modal(true);
    }
    if (inputValue == 4) {
      setOption2Modal(false);
      setOption3Modal(false);
      setOption1Modal(false);
      setOption5Modal(false);
      setOption6Modal(false);
      return setOption4Modal(true);
    }
    if (inputValue == 5) {
      setOption2Modal(false);
      setOption3Modal(false);
      setOption4Modal(false);
      setOption1Modal(false);
      setOption6Modal(false);
      return setOption5Modal(true);
    }
    if (inputValue == 6) {
      setOption2Modal(false);
      setOption3Modal(false);
      setOption4Modal(false);
      setOption5Modal(false);
      setOption1Modal(false);
      return setOption6Modal(true);
    }
  };

  const optionModalClick = () => {
    setModalOptions(true);
    setModalBrief(false);
    setModalInput(false);
  };
  const inputModalClick = () => {
    setModalOptions(false);
    setModalBrief(false);
    setModalInput(true);
  };
  const briefModalClick = () => {
    setModalOptions(false);
    setModalBrief(true);
    setModalInput(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let formdata = new FormData();
    for (let key in videos) {
      formdata.append("videos", videos[key]);
    }

    formdata.append("name", name);
    formdata.append("question", question);
    formdata.append("option1", option1);
    formdata.append("option2", option2);
    formdata.append("option3", option3);
    formdata.append("option4", option4);
    formdata.append("option5", option5);
    formdata.append("option6", option6);
    formdata.append("input", input);
    formdata.append("brief", brief);
    formdata.append("answer", answer);

    axios
      .post(`${BACKEND_URI}/api/v1/media/create`, formdata)
      .then((success) => {
        getAllMedias();
        console.log("Submitted successfully");
        window.location.reload()
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">File Type</label>
          <select
            name="name"
            id="name"
            className="form-control"
            onChange={(e) => setName(e.target.value)}
          >
            <option defaultValue="Select Option">--Select Option--</option>
            <option>video</option>
            <option>audio</option>
            <option>pdf</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="videos">Upload</label>
          <input
            type="file"
            name="videos"
            id="videos"
            multiple
            className="form-control"
            accept=".mp4, .mkv, .pdf, .mp3"
            onChange={(e) => {
              setVideos(e.target.files);
            }}
          />
        </div>
        <div className="form-group">
          <label htmlFor="question">Question</label>
          <input
            type="text"
            name="question"
            id="question"
            className="form-control"
            onChange={(e) => {
              setQuestion(e.target.value);
            }}
            placeholder="Enter Question"
          />
        </div>
        <div className="form-group">
          <div className="row" style={{ marginTop: "5px", marginLeft: "10px" }}>
            <input
              type="text"
              className="col-md-3 btn btn-sm btn-success"
              style={{ margin: "5px", caretColor: "transparent" }}
              onClick={optionModalClick}
              defaultValue="Options"
            />
            <input
              type="text"
              className="col-md-3 btn btn-sm btn-success "
              style={{ margin: "5px", caretColor: "transparent" }}
              onClick={inputModalClick}
              defaultValue="Input"
            />
            <input
              type="text"
              className="col-md-3 btn btn-sm btn-success"
              style={{ margin: "5px", caretColor: "transparent" }}
              onClick={briefModalClick}
              defaultValue="Brief"
            />
          </div>
        </div>
        {modalOptions && (
          <div className="form-group">
            <div className="row">
              <div className="col-md-4">
                <input
                  type="number"
                  className="form-control"
                  min="1"
                  max="6"
                  placeholder="select max options"
                  onChange={(e) => setInputValue(e.target.value)}
                />
              </div>
              <div className="col-md-4">
                <input
                  type="text"
                  className="btn btn-sm btn-warning"
                  style={{ margin: "5px", caretColor: "transparent" }}
                  onClick={handleSelect}
                  defaultValue="Select"
                />
              </div>
            </div>
          </div>
        )}

        {option1Modal && (
          <div className="form-group">
            <div className="row">
              <div className="col-md-6">
                <input
                  type="text"
                  name="option1"
                  id="option1"
                  className="form-control"
                  onChange={(e) => setOption1(e.target.value)}
                  placeholder="Option 1"
                />
              </div>
            </div>
          </div>
        )}

        {option2Modal && (
          <div className="form-group">
            <div className="row">
              <div className="col-md-6">
                <input
                  type="text"
                  name="option1"
                  id="option1"
                  className="form-control"
                  onChange={(e) => setOption1(e.target.value)}
                  placeholder="Option 1"
                />
              </div>
              <div className="col-md-6">
                <input
                  type="text"
                  name="option2"
                  id="option2"
                  className="form-control"
                  onChange={(e) => setOption2(e.target.value)}
                  placeholder="Option 2"
                />
              </div>
            </div>
          </div>
        )}

        {option3Modal && (
          <div className="form-group">
            <div className="row">
              <div className="col-md-6">
                <input
                  type="text"
                  name="option1"
                  id="option1"
                  className="form-control"
                  onChange={(e) => setOption1(e.target.value)}
                  placeholder="Option 1"
                />
              </div>
              <div className="col-md-6">
                <input
                  type="text"
                  name="option2"
                  id="option2"
                  className="form-control"
                  onChange={(e) => setOption2(e.target.value)}
                  placeholder="Option 2"
                />
              </div>
              <div className="col-md-6">
                <input
                  type="text"
                  name="option3"
                  id="option3"
                  className="form-control"
                  onChange={(e) => setOption3(e.target.value)}
                  placeholder="Option 3"
                />
              </div>
            </div>
          </div>
        )}

        {option4Modal && (
          <div className="form-group">
            <div className="row">
              <div className="col-md-6">
                <input
                  type="text"
                  name="option1"
                  id="option1"
                  className="form-control"
                  onChange={(e) => setOption1(e.target.value)}
                  placeholder="Option 1"
                />
              </div>
              <div className="col-md-6">
                <input
                  type="text"
                  name="option2"
                  id="option2"
                  className="form-control"
                  onChange={(e) => setOption2(e.target.value)}
                  placeholder="Option 2"
                />
              </div>
              <div className="col-md-6">
                <input
                  type="text"
                  name="option3"
                  id="option3"
                  className="form-control"
                  onChange={(e) => setOption3(e.target.value)}
                  placeholder="Option 3"
                />
              </div>
              <div className="col-md-6">
                <input
                  type="text"
                  name="option4"
                  id="option4"
                  className="form-control"
                  onChange={(e) => setOption4(e.target.value)}
                  placeholder="Option 4"
                />
              </div>
            </div>
          </div>
        )}

        {option5Modal && (
          <div className="form-group">
            <div className="row">
              <div className="col-md-6">
                <input
                  type="text"
                  name="option1"
                  id="option1"
                  className="form-control"
                  onChange={(e) => setOption1(e.target.value)}
                  placeholder="Option 1"
                />
              </div>
              <div className="col-md-6">
                <input
                  type="text"
                  name="option2"
                  id="option2"
                  className="form-control"
                  onChange={(e) => setOption2(e.target.value)}
                  placeholder="Option 2"
                />
              </div>
              <div className="col-md-6">
                <input
                  type="text"
                  name="option3"
                  id="option3"
                  className="form-control"
                  onChange={(e) => setOption3(e.target.value)}
                  placeholder="Option 3"
                />
              </div>
              <div className="col-md-6">
                <input
                  type="text"
                  name="option4"
                  id="option4"
                  className="form-control"
                  onChange={(e) => setOption4(e.target.value)}
                  placeholder="Option 4"
                />
              </div>
              <div className="col-md-6">
                <input
                  type="text"
                  name="option5"
                  id="option5"
                  className="form-control"
                  onChange={(e) => setOption5(e.target.value)}
                  placeholder="Option 5"
                />
              </div>
            </div>
          </div>
        )}

        {option6Modal && (
          <div className="form-group">
            <div className="row">
              <div className="col-md-6">
                <input
                  type="text"
                  name="option1"
                  id="option1"
                  className="form-control"
                  onChange={(e) => setOption1(e.target.value)}
                  placeholder="Option 1"
                />
              </div>
              <div className="col-md-6">
                <input
                  type="text"
                  name="option2"
                  id="option2"
                  className="form-control"
                  onChange={(e) => setOption2(e.target.value)}
                  placeholder="Option 2"
                />
              </div>
              <div className="col-md-6">
                <input
                  type="text"
                  name="option3"
                  id="option3"
                  className="form-control"
                  onChange={(e) => setOption3(e.target.value)}
                  placeholder="Option 3"
                />
              </div>
              <div className="col-md-6">
                <input
                  type="text"
                  name="option4"
                  id="option4"
                  className="form-control"
                  onChange={(e) => setOption4(e.target.value)}
                  placeholder="Option 4"
                />
              </div>
              <div className="col-md-6">
                <input
                  type="text"
                  name="option5"
                  id="option5"
                  className="form-control"
                  onChange={(e) => setOption5(e.target.value)}
                  placeholder="Option 5"
                />
              </div>
              <div className="col-md-6">
                <input
                  type="text"
                  name="option6"
                  id="option6"
                  className="form-control"
                  onChange={(e) => setOption6(e.target.value)}
                  placeholder="Option 6"
                />
              </div>
            </div>
          </div>
        )}
        {modalInput && (
          <div className="form-group">
            <input
              type="text"
              name="input"
              id="input"
              className="form-control"
              onChange={(e) => {
                setInput(e.target.value);
              }}
            />
          </div>
        )}

        {modalBrief && (
          <div className="form-group">
            <textarea
              name="brief"
              id="brief"
              className="form-control"
              onChange={(e) => {
                setBrief(e.target.value);
              }}
            ></textarea>
          </div>
        )}

        <div className="form-group">
          <div className="row">
            <div className="col-md-4">
              <label htmlFor="answer">Answer</label>
              <input
                type="text"
                name="answer"
                id="answer"
                className="form-control"
                onChange={(e) => {
                  setAnswer(e.target.value);
                }}
                placeholder="Answer"
              />
            </div>
          </div>
        </div>

        <button type="submit" className="btn btn-primary mt-2">
          Submit
        </button>
      </form>
    </>
  );
};

export default UploadForm;
