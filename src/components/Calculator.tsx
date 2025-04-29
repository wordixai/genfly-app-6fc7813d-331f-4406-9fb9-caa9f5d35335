import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function Calculator() {
  const [display, setDisplay] = useState("0");
  const [previousValue, setPreviousValue] = useState<string | null>(null);
  const [operation, setOperation] = useState<string | null>(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);

  const clearAll = () => {
    setDisplay("0");
    setPreviousValue(null);
    setOperation(null);
    setWaitingForOperand(false);
  };

  const inputDigit = (digit: string) => {
    if (waitingForOperand) {
      setDisplay(digit);
      setWaitingForOperand(false);
    } else {
      setDisplay(display === "0" ? digit : display + digit);
    }
  };

  const inputDecimal = () => {
    if (waitingForOperand) {
      setDisplay("0.");
      setWaitingForOperand(false);
      return;
    }

    if (!display.includes(".")) {
      setDisplay(display + ".");
    }
  };

  const toggleSign = () => {
    setDisplay(display.startsWith("-") ? display.slice(1) : "-" + display);
  };

  const inputPercent = () => {
    const value = parseFloat(display) / 100;
    setDisplay(String(value));
  };

  const performOperation = (nextOperation: string) => {
    const inputValue = parseFloat(display);

    if (previousValue === null) {
      setPreviousValue(display);
    } else if (operation) {
      const currentValue = parseFloat(previousValue);
      let newValue: number;

      switch (operation) {
        case "+":
          newValue = currentValue + inputValue;
          break;
        case "-":
          newValue = currentValue - inputValue;
          break;
        case "×":
          newValue = currentValue * inputValue;
          break;
        case "÷":
          newValue = currentValue / inputValue;
          break;
        default:
          newValue = inputValue;
      }

      setPreviousValue(String(newValue));
      setDisplay(String(newValue));
    }

    setWaitingForOperand(true);
    setOperation(nextOperation);
  };

  const calculateResult = () => {
    if (!previousValue || !operation) return;

    performOperation("=");
    setOperation(null);
  };

  return (
    <div className="w-full max-w-md mx-auto p-4 bg-gray-800 rounded-lg shadow-lg">
      <div className="bg-gray-900 p-4 mb-4 rounded-md">
        <div className="text-right text-white text-3xl font-medium overflow-hidden">
          {display}
        </div>
      </div>

      <div className="grid grid-cols-4 gap-2">
        <Button
          variant="secondary"
          className="bg-gray-600 hover:bg-gray-700 text-white text-xl"
          onClick={clearAll}
        >
          AC
        </Button>
        <Button
          variant="secondary"
          className="bg-gray-600 hover:bg-gray-700 text-white text-xl"
          onClick={toggleSign}
        >
          +/-
        </Button>
        <Button
          variant="secondary"
          className="bg-gray-600 hover:bg-gray-700 text-white text-xl"
          onClick={inputPercent}
        >
          %
        </Button>
        <Button
          variant="secondary"
          className={cn(
            "bg-amber-500 hover:bg-amber-600 text-white text-xl",
            operation === "÷" && "bg-white text-amber-500"
          )}
          onClick={() => performOperation("÷")}
        >
          ÷
        </Button>

        {[7, 8, 9].map((num) => (
          <Button
            key={num}
            variant="ghost"
            className="bg-gray-700 hover:bg-gray-600 text-white text-xl"
            onClick={() => inputDigit(num.toString())}
          >
            {num}
          </Button>
        ))}
        <Button
          variant="secondary"
          className={cn(
            "bg-amber-500 hover:bg-amber-600 text-white text-xl",
            operation === "×" && "bg-white text-amber-500"
          )}
          onClick={() => performOperation("×")}
        >
          ×
        </Button>

        {[4, 5, 6].map((num) => (
          <Button
            key={num}
            variant="ghost"
            className="bg-gray-700 hover:bg-gray-600 text-white text-xl"
            onClick={() => inputDigit(num.toString())}
          >
            {num}
          </Button>
        ))}
        <Button
          variant="secondary"
          className={cn(
            "bg-amber-500 hover:bg-amber-600 text-white text-xl",
            operation === "-" && "bg-white text-amber-500"
          )}
          onClick={() => performOperation("-")}
        >
          -
        </Button>

        {[1, 2, 3].map((num) => (
          <Button
            key={num}
            variant="ghost"
            className="bg-gray-700 hover:bg-gray-600 text-white text-xl"
            onClick={() => inputDigit(num.toString())}
          >
            {num}
          </Button>
        ))}
        <Button
          variant="secondary"
          className={cn(
            "bg-amber-500 hover:bg-amber-600 text-white text-xl",
            operation === "+" && "bg-white text-amber-500"
          )}
          onClick={() => performOperation("+")}
        >
          +
        </Button>

        <Button
          variant="ghost"
          className="bg-gray-700 hover:bg-gray-600 text-white text-xl col-span-2"
          onClick={() => inputDigit("0")}
        >
          0
        </Button>
        <Button
          variant="ghost"
          className="bg-gray-700 hover:bg-gray-600 text-white text-xl"
          onClick={inputDecimal}
        >
          .
        </Button>
        <Button
          variant="secondary"
          className="bg-amber-500 hover:bg-amber-600 text-white text-xl"
          onClick={calculateResult}
        >
          =
        </Button>
      </div>
    </div>
  );
}