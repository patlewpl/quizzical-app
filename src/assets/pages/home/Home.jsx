import Button from "../../components/button/Button";
import Page from "../../components/page/Page";
import { useState } from "react";
import "./Home.scss";

const Home = () => {
  const [showSettings, setShowSettings] = useState(false);

  const Settings = () => {
    const saveSettings = () => {
      localStorage.setItem(
        "settings",
        JSON.stringify({
          numberOfQuestions: "",
        })
      );
      setShowSettings(false);
    };
    return (
      <>
        <h2>Quiz Settings</h2>
        <Button onClick={saveSettings}>Save</Button>
      </>
    );
  };

  return (
    <Page>
      {/* {showSettings ? (
        <Settings />
      ) : ( */}
      <section className="home">
        <h1 className="page-title">Quizzical</h1>
        <p className="page-description">Funny quiz application</p>
        <Button isLink link="/quiz">
          Start quiz
        </Button>
        {/* <Button
          secondary
          styles={{ marginTop: "8px" }}
          onClick={() => setShowSettings(true)}
        >
          <i className="fa fa-gear"></i> Settings
        </Button> */}
      </section>
      {/* )} */}
    </Page>
  );
};

export default Home;
