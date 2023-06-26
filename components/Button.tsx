"use client";
import Image from "next/image";
import { type } from "os";
import { MouseEventHandler } from "react";

interface ButtonProps {
  title: string;
  containerStyles?: string ; 
  handleClick?: MouseEventHandler<HTMLButtonElement>;
  btnType?: "button" | "submit" ;
}


const Button =  ({title, containerStyles, handleClick, btnType}: ButtonProps) => {
  return (
    <button
    disabled={false}
    type={btnType}
    className={`custom-btn ${containerStyles}`}
    onClick={handleClick}>
      <span className={`flex-1`}>{title}</span>
    </button>
  )
}

export default Button