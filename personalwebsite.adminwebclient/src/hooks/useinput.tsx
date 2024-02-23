import { useState } from "react";

export interface IUseInput {
  enteredValue: string;
  valueIsValid: boolean;
  invalidInput: boolean;
  changeInputHandler: (event: React.ChangeEvent<HTMLInputElement>) => void;
  blurInputHandler: () => void;
  reset: () => void;
}

const useInput = (
  validateValue: (val: string) => boolean,
  initialValue: string = ""
): IUseInput => {
  const [enteredValue, setEnteredValue] = useState<string>(initialValue);
  const [isTouched, setIsTouched] = useState<boolean>(false);

  const valueIsValid: boolean = validateValue(enteredValue);
  const invalidInput: boolean = !valueIsValid && isTouched;

  const changeInputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEnteredValue(event.target.value);
  };

  const blurInputHandler = () => {
    setIsTouched(true);
  };

  const reset = () => {
    setEnteredValue("");
    setIsTouched(false);
  };
  return {
    enteredValue,
    valueIsValid,
    invalidInput,
    changeInputHandler,
    blurInputHandler,
    reset,
  };
};

export default useInput;
