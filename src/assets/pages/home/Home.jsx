import Settings from "../../components/settings/Settings";
import Button from "../../components/button/Button";
import Page from "../../components/page/Page";
import { useState, useEffect } from "react";
import "./Home.scss";

const Home = () => {
  const localSettings = JSON.parse(localStorage.getItem("settings"));
  const [showSettings, setShowSettings] = useState(false);
  // eslint-disable-next-line
  const [settings, setSettings] = useState({
    numberOfQuestions: localSettings?.numberOfQuestions ?? "5",
    category: localSettings?.category ?? "any",
    difficulty: localSettings?.difficulty ?? "any",
    type: localSettings?.type ?? "any",
  });

  useEffect(() => {
    localStorage.setItem("settings", JSON.stringify(settings));
    // eslint-disable-next-line
  }, []);

  return (
    <Page>
      {showSettings ? (
        <Settings closeSettings={() => setShowSettings(false)} />
      ) : (
        <section className="home">
          <h1 className="page-title">Quizzical</h1>
          <p className="page-description">Funny quiz application</p>
          <Button isLink link="/quizzical-app/quiz">
            <i className="fa-solid fa-play"></i> Start quiz
          </Button>
          <Button secondary styles={{ marginTop: "8px" }} onClick={() => setShowSettings(true)}>
            <i className="fa fa-gear"></i> Settings
          </Button>
        </section>
      )}
    </Page>
  );
};

export default Home;
