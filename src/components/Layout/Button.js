import classes from "./Button.module.css";

const Button = ({ buttonText, type, onClick }) => {
  const buttonType = ["positive", "negative"].includes(type) ? type : "default";

  return (
    <button
      onClick={onClick}
      className={[classes.Button, classes[buttonType]].join(" ")}
    >
      {buttonText}
    </button>
  );
};

Button.defaultProps = {
  type: "default",
};

export default Button;
