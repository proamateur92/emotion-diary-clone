import classes from "./Header.module.css";

const Header = ({ headerText, leftChild, rightChild }) => {
  return (
    <header className={classes.Header}>
      <div className={classes.leftChild}>{leftChild}</div>
      <div className={classes.headerText}>{headerText}</div>
      <div className={classes.rightChild}>{rightChild}</div>
    </header>
  );
};

export default Header;
