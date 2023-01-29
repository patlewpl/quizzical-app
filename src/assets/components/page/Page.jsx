import "./Page.scss";
import blob_yellow from "./blob-yellow.svg";
import blob_blue from "./blob-blue.svg";

const Page = ({ children }) => {
  return (
    <main className="container">
      {children}
      <img className="blob blob-yellow" src={blob_yellow} alt="" />
      <img className="blob blob-blue" src={blob_blue} alt="" />
    </main>
  );
};

export default Page;
