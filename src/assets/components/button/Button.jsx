import { Link } from "react-router-dom";
import "./Button.scss";

const Button = ({
  children,
  styles,
  onClick,
  type,
  link,
  isLink = false,
  secondary = false,
}) => {
  if (isLink) {
    return (
      <Link to={link}>
        <button className={secondary ? "btn secondary" : "btn"} style={styles}>
          {children}
        </button>
      </Link>
    );
  } else {
    return (
      <button
        className={secondary ? "btn secondary" : "btn"}
        type={type}
        style={styles}
        onClick={onClick}
      >
        {children}
      </button>
    );
  }
};

export default Button;
