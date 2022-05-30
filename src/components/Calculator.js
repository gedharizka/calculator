import React, { useState } from 'react'

const Calculator = () => {

  const [prevAnswer, setPevAnswer] = useState("")
  const [answer, setAnswer] = useState(0)
  const [operand, setOperand] = useState("")

  const handleOperhand =(e)=>{
    const value = e.target.value

    setOperand(op => op + value)
  }

  const handleOperator =(e)=>{
    const value = e.target.value;


    if (value === "=") {
      if (operand === "") return;
    }

    // if no value in operand stop 
    if (value === "ac") {
      setOperand("");
      setAnswer(0);

      // Check if we have a prev answer > 0
      if (answer > 0)
        setPevAnswer(answer);
      return;
    }

    // handle plush and minus sign
    if (value === "pm") {
      if (operand === "") return;
      //get the last char
      let calculated;
      if (Number(operand.slice(-1))) {
        calculated = eval(operand);

        if (Math.sign(calculated) < 0) {
          calculated = Math.abs(calculated);
          setOperand(calculated.toString());
        } else {
          setOperand(`-` + calculated.toString());
        }

      } else {
        calculated = (eval(operand.slice(0, -1)));
        if (Math.sign(calculated)) {
          setOperand((`-` + calculated.toString()))
        } else {
          setOperand((calculated.toString()))
        }
      }
      return;
    }


    /* last test for users */
    if (value === "%") {
      if (operand === "") return;
    }

    let newOperand;
    // get last operand value
    if (operand.slice(-1) === value) {
      newOperand = operand.slice(0, -1);
      setOperand(newOperand + value);
    } else {
      // get the last input operator & check if is a number
      if (!Number(operand.slice(-1))) {
        // remove the last selected char
        newOperand = operand.slice(0, -1);

        // checks if the last operand contains a zero
        if (Number(operand.slice(-1)) === 0) {
          setOperand(newOperand + `0` + value); return
        } else {
          setOperand(newOperand + value);
          return;
        }

      } else if (operand.slice(-1) === "ac") {

        setOperand("");
        // Check if we have a prev answer > 0
        if (answer > 0)
          setAnswer(0)
      }
      else if (operand.includes("/")) {
        newOperand = eval(operand);
        setOperand(newOperand);
      }
    }


    // if the last inputed digit is not a number stop
    const lastDigit = operand.slice(-1);
    if (!Number(lastDigit)) return;

    // if Dot(.) exists don't add again
    if (!(operand === "." || operand.includes("."))) {
      setOperand(operand => operand + value);
    }

    // Swicth for some arithmetic operations
    switch (value) {
      case "ac":
        setOperand("");
        break;
      case "+":
        setOperand(eval(operand) + value)
        break;
      case "-":
        setOperand(`${eval(operand)}${value}`)
        break;
      case "*":
        setOperand(`${eval(operand)}${value}`)
        break;
      case "%":
        console.log('percentage + Test for all viewers')
        break;
      case "/":
        setOperand(`${eval(operand)}${value}`);
        break;
      case "=":
        setOperand("");
        setAnswer(eval(operand));
        if (answer > 0)
          setPevAnswer(answer);
        break;
      default:
        return;
    }

  }

  const handleClear =()=>{
    if(operand.length > 0){
      setOperand(op => op.slice(0,-1))
    }
  }

  return (
    <div className='calculator'>
      <div className="c-wrapper">

        <div className="ctc c-type" style={{visibility:"hidden"}}>
          <button className='active'>Calculator</button>
          <button>Converter</button>
        </div>

        <div className="ctc c-screen">
          <div className="c-history-answer">
          <i className="fa-solid fa-clock"></i><span>{prevAnswer}</span>
          </div>

          <div className="c-answer">
            <span>{answer}</span>
          </div>
        </div>

        <div className="ctc c-compute">
          <button className='c-reverse' onClick={handleClear}><i className="fa-solid fa-delete-left"></i></button>
          <span> {operand ? operand : '0'}</span>
        </div>

        <div className="c-grid">
          <button type='button' className='top-btn' onClick={handleOperator} value="ac" >ac</button>
          <button type='button' className='top-btn' onClick={handleOperator} value="pm">&plusmn;</button>
          <button type='button' className='top-btn' onClick={handleOperator} value="%">%</button>
          <button type='button' className='top-btn special' onClick={handleOperator} value="/">/</button>

          <button type='button' className='normal' onClick={handleOperhand} value="7">7</button>
          <button type='button' className='normal' onClick={handleOperhand} value="8">8</button>
          <button type='button' className='normal' onClick={handleOperhand} value="9">9</button>

          <button type='button' className='special' onClick={handleOperator} value="*">x</button>
          <button type='button' className='normal' onClick={handleOperhand} value="4">4</button>
          <button type='button' className='normal' onClick={handleOperhand} value="5">5</button>
          <button type='button' className='normal' onClick={handleOperhand} value="6">6</button>

          <button type='button' className='spesial' onClick={handleOperator}   value="-">-</button>
          <button type='button' className='normal'  onClick={handleOperhand} value="1">1</button>
          <button type='button' className='normal'  onClick={handleOperhand} value="2">2</button>
          <button type='button' className='normal'  onClick={handleOperhand} value="3">3</button>
          <button type='button' className='spesial' onClick={handleOperator}   value="+">+</button>

          <button type='button' className='span-two normal' value="0" onClick={handleOperhand}>0</button>
          <button type='button' className='normal' value="." onClick={handleOperator}>.</button>
          <button type='button' className='spesial' value="=" onClick={handleOperator}  >=</button>
        </div>
        
      </div>
    </div>
  )
}

export default Calculator