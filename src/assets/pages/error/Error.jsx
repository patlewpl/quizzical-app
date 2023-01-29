import Button from "../../components/button/Button";
import "./Error.scss";

const Error = () => {
  return (
    <div className="error">
      <h1>404 Not Found</h1>
      <Button isLink link="/quizzical-app">
        Back to Home Page
      </Button>
    </div>
  );
};

export default Error;
