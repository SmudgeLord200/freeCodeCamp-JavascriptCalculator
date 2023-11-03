import { useState } from 'react';
import './App.css';

const calcData = [
  { id: "clear", value: "AC" },
  { id: "divide", value: "/", className: 'operator' },
  { id: "multiply", value: "*", className: 'operator' },
  { id: "seven", value: 7 },
  { id: "eight", value: 8 },
  { id: "nine", value: 9 },
  { id: "subtract", value: "-", className: 'operator' },
  { id: "four", value: 4 },
  { id: "five", value: 5 },
  { id: "six", value: 6 },
  { id: "add", value: "+", className: 'operator' },
  { id: "one", value: 1 },
  { id: "two", value: 2 },
  { id: "three", value: 3 },
  { id: "equals", value: "=" },
  { id: "zero", value: 0 },
  { id: "decimal", value: "." },
];

// Code mostly follow to Landon345
function App() {
  const [answer, setAnswer] = useState("");
  const [expression, setExpression] = useState("");
  const et = expression.trim();

  const isOperator = (button) => {
    return /[*/+-]/.test(button);
  };  

  const onButtonPressed = (button) => {
    // clear button
    if (button === "AC") {
      setAnswer("");
      setExpression("0");
    } 
    // if one of the operators is clicked
    else if (isOperator(button)) {
      setExpression(et + " " + button + " ");
    } 
    //calculate the expression
    else if (button === "=") {
      if (!expression) return;
      calculate();
    } 
    // preevent the leading zero button problem
    else if (button === "0") {
      if (expression.charAt(0) !== "0") {
        setExpression(expression + button);
      }
    }
    // if the decimal button is clicked 
    else if (button === ".") {
      // split by operators and get last number
      const lastNumber = expression.split(/[-+/*]/g).pop();
      if (!lastNumber) return;
      // if last number already has a decimal, don't add another
      if (lastNumber?.includes(".")) return;
      setExpression(expression + button);
    } else {
      // remove if there is leading zero
      if (expression.charAt(0) === "0") {
        setExpression(expression.slice(1) + button);
      } 
      // append the expression
      else {
        setExpression(expression + button);
      }
    }
    console.log("expression is ", expression)
  };

  const calculate = () => {
    //if the last char is an operator, do nothing
    if (isOperator(et.charAt(et.length - 1))) return;
    //clear the experssion so that two operators in a row uses the last operator
    // ex: 5 * - + 5 = 10
    const parts = et.split(" ");
    const newParts = [];
    
    // go through backwards
    for (let i = parts.length - 1; i >= 0; i--) {
      //if the current part is an operator and also its previous
      if (["*", "/", "+"].includes(parts[i]) && isOperator(parts[i - 1])) {
        //shift the current aka the last operator to the start of the array
        newParts.unshift(parts[i]);
        let j = 0;
        let k = i - 1;
        // for this while loop, 
        // it checks if the remaining are a bunch of operators,
        // if yes, j will store the number of them
        // then i will be substracted by the number of j, i.e., effectively skipping the remaining operator and to the first number
        while (isOperator(parts[k])) {
          k--;
          j++;
        }
        i -= j;
      } else {
        //shift the current part to the start of the array
        newParts.unshift(parts[i])
      }
    }
    //join all of them together
    const newExpression = newParts.join(" ");
    //add the new expression to the previous answer
    if (isOperator(newExpression.charAt(0))) {
      setAnswer(eval(answer + newExpression).toString());
    } else {
      setAnswer(eval(newExpression).toString());
    }
    //clear expression at last
    setExpression("");
  };
  
  return (
    <div className="wrapper">
      <div id="calculator">
        <div id="display">
          <div id="answer">{answer}</div>
          <div id="expression">{expression}</div>
        </div>
        <div id="calculator-pad">
          {calcData.map((cal) => {
            return (
              <button
                key={cal.id}
                id={cal.id}
                className={cal.className}
                onClick={() => onButtonPressed(cal.value.toString())}
              >
                {cal.value}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default App;
