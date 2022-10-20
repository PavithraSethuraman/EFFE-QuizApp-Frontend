import QuizComp from "./components/QuizComp";
import React from "react";
import "./App.css";
import QuizCreationComp from "./components/QuizCreationComp";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  
} from "react-router-dom";

const App = () => {
  return (
    <Router>
    
    <Routes>

    
      <Route path="/" element={<QuizComp />}/>
     
      <Route path="/quizCreationComp" element={<QuizCreationComp />}/>

    </Routes>
    
  </Router>
  
  );
};

export default App;
