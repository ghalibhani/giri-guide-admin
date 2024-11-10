import React from "react";
import { Input } from "@nextui-org/react";
import { FaRegEyeSlash } from "react-icons/fa";
import { FaRegEye } from "react-icons/fa";

export default function InputPassword({ ...props }) {
  const [isVisible, setIsVisible] = React.useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);

  return (
    <Input
      label="Password"
      variant="bordered"
      placeholder="Enter your password"
      classNames="w-full"
      {...props}
      endContent={
        <button
          className="focus:outline-none"
          type="button"
          onClick={toggleVisibility}
          aria-label="toggle password visibility">
          {isVisible ? (
            <FaRegEyeSlash className="text-2xl text-default-400 pointer-events-none" />
          ) : (
            <FaRegEye className="text-2xl text-default-400 pointer-events-none" />
          )}
        </button>
      }
      type={isVisible ? "text" : "password"}
      className="w-full"
    />
  );
}
