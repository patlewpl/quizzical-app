import Button from "../../components/button/Button";
import Page from "../../components/page/Page";
import "./Home.scss";

const Home = () => {
  return (
    <Page>
      <section className="home">
        <h1 className="page-title">Quizzical</h1>
        <p className="page-description">Funny quiz application</p>
        <Button isLink link="/quiz">
          Start quiz
        </Button>
      </section>
    </Page>
  );
};

export default Home;
