import { Icon } from "@iconify/react";

const TextInput = ({
  type,
  placeholder,
  label,
  value,
  setValue,
  otherThanLoginPage,
  notAllowed,
}) => {
  return (
    <div className="flex flex-col w-full mt-5 mb-1">
      <label
        htmlFor={label}
        className={
          otherThanLoginPage
            ? label === "Search"
              ? "mb-1 text-white text-4xl"
              : "mb-1 text-white"
            : "mb-1"
        }
      >
        {label}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        className={
          !notAllowed
            ? "p-2 border-2 border-gray-400 rounded text-gray-500"
            : "p-2 border-2 border-gray-400 rounded text-gray-500 cursor-not-allowed"
        }
        id={label}
        value={value}
        onChange={(event) => {
          setValue(event.target.value);
        }}
        disabled={notAllowed ? true : false}
      />
    </div>
  );
};
export default TextInput;
