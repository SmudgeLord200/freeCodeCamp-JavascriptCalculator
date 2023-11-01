import './App.css';

const calcData = [
  { id: "clear", value: "AC" },
  { id: "divide", value: "/", className: 'operator' },
  { id: "multiply", value: "x", className: 'operator' },
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

function App() {
  return (
    <div className="wrapper">
      <div id="calculator">
        <div id="output">
          <div id="formula">Forumla</div>
          <div id="display">Display</div>
        </div>
        <div id="calculator-pad">
          {calcData.map((cal) => {
            return (
              <button id={cal.id} className={cal.className}>{cal.value}</button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default App;
