import { Link } from "react-router-dom";
import "./Button.scss";

const Button = ({ children, onClick, isLink = false, link }) => {
  if (isLink) {
    return (
      <Link to={link}>
        <button className="btn" onClick={onClick}>
          {children}
        </button>
      </Link>
    );
  } else {
    return (
      <button className="btn" onClick={onClick}>
        {children}
      </button>
    );
  }
};

export default Button;
