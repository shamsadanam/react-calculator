import React, { useState, useEffect } from "react";
import Number from "./Number";
import Operator from "./Operator";
import Result from "./Result";
import "./App.scss";

const App = () => {
  const [operator, setOperator] = useState(null);
  const [prevOperator, setPrevOperator] = useState(null);
  const [num, setNum] = useState(0);
  const [prevNum, setPrevNum] = useState(0);
  const [display, setDisplay] = useState("0");

  // this runs every time display changes
  useEffect(() => {
    // console.log(`${prevNum} ${operator} ${num} = ${display}`);
  }, [display]);

  const allClear = () => {
    setPrevNum(0);
    setNum(0);
    setDisplay("0");
    setOperator(null);
  };

  const displayHandler = (choosenNum) => {
    if (display === "0") {
      setDisplay(choosenNum.toString());
    } else {
      setDisplay(display + choosenNum.toString());
    }

    num === 0 && !prevNum
      ? setNum(parseFloat(choosenNum))
      : setNum(parseFloat(num.toString() + choosenNum));
  };

  const setOperatorHandler = (choice) => {
    if (!prevNum) {
      setPrevNum(num);
      setNum(0);
    } else {
      setPrevNum(parseFloat(display));
    }
    if (operator === null) {
      setDisplay(display + choice);
      setOperator(choice);
    } else if (operator !== choice) {
      setDisplay(display.slice(0, -1) + choice);
      setOperator(choice);
    }
    if (operator && prevNum && num) {
      calculate();
    }
  };

  const calculate = () => {
    const result = getResult(prevNum, num);
    setDisplay(result.toString());
    setPrevNum(parseFloat(result));
    setNum(0);
    setOperator(null);
    console.log(`${prevNum} ${operator} ${num}`);
  };

  const getResult = (prevNum, num) => {
    switch (operator) {
      case "%":
        return parseFloat(prevNum) / 100;
      case "÷":
        return parseFloat(prevNum) / parseFloat(num);
      case "×":
        return parseFloat(prevNum) * parseFloat(num);
      case "+":
        return parseFloat(prevNum) + parseFloat(num);
      case "-":
        return parseFloat(prevNum) - parseFloat(num);
      default:
        return 0;
    }
  };

  const togglePolarity = () => {
    setNum(parseFloat(num));
    num >= 0 ? setNum(-1 * Math.abs(num)) : setNum(Math.abs(num));
  };
  const getPercentage = () => {
    setNum(parseFloat(num) / 100);
  };
  return (
    <div className="container">
      <Result value={display} />
      <Operator operation="AC" onClick={() => allClear()} />
      <Operator operation="+/-" onClick={() => togglePolarity()} />
      <Operator operation="%" onClick={() => getPercentage()} />
      <Operator
        operation="÷"
        onClick={(operation) => setOperatorHandler(operation)}
      />
      <Number value="7" onClick={(choosenNum) => displayHandler(choosenNum)} />
      <Number value="8" onClick={(choosenNum) => displayHandler(choosenNum)} />
      <Number value="9" onClick={(choosenNum) => displayHandler(choosenNum)} />
      <Operator
        operation="×"
        onClick={(operation) => setOperatorHandler(operation)}
      />
      <Number value="4" onClick={(choosenNum) => displayHandler(choosenNum)} />
      <Number value="5" onClick={(choosenNum) => displayHandler(choosenNum)} />
      <Number value="6" onClick={(choosenNum) => displayHandler(choosenNum)} />
      <Operator
        operation="+"
        onClick={(operation) => setOperatorHandler(operation)}
      />
      <Number value="1" onClick={(choosenNum) => displayHandler(choosenNum)} />
      <Number value="2" onClick={(choosenNum) => displayHandler(choosenNum)} />
      <Number value="3" onClick={(choosenNum) => displayHandler(choosenNum)} />
      <Operator
        operation="-"
        onClick={(operation) => setOperatorHandler(operation)}
      />
      <Operator operation="=" onClick={() => calculate()} />
    </div>
  );
};

export default App;
