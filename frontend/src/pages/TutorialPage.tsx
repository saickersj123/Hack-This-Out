import React from 'react';
import Main from '../components/main/Main';
import logo_dark from "../assets/img/icon/HTO DARK RECOLORED_crop_filled.png";
import '../assets/scss/etc/TutorialPage.scss';

const TutorialPage: React.FC = () => {
  return (
    <Main>
      <div className="tutorial-page-container">
        <div className="tutorial-page-top">
          <img id="tutorialImg" className="tutorial-page-img-dark" alt="" src={logo_dark} />
        </div>
        <section className="tutorial-page-content-container">
          <article className="tutorial-page-content-intro">
            <h2>Introduction</h2>
            <p>
              <b>Hack This Out</b> is a Web-based <a href="#">Hacking Lab</a>.<br />
              &nbsp;We provide a <a href="#">Secured Network</a> and <a href="#">Virtual Environment</a> for your journey to become a hacker or cyber security enthusiast.<br />
              The journey can be boring and exhausting, so we provide a <a href="#">Gaming experience</a> for you.
            </p>
          </article>
          <article className="tutorial-page-content-rules">
            <h2>Gaming Rules</h2>
            <ol>
              <li>You complete a machine by <a href="#">Hacking</a> and <a href="#">Capture the Flag</a>.</li>
              <li>You get rewards as <a href="#">Experience Points (EXP)</a> by completing machines.</li>
              <li>You can get <a href="#">Hints</a> from each machine, but there will be a penalty.</li>
            </ol>
          </article>
          <article className="tutorial-page-content-gamemode">
            <h2>Game Modes</h2>
            <p>
              <strong><b>Machine</b></strong><br />
              The Basic, You can play machines whenever you want.<br />
              <strong><b>Contest</b></strong><br />
              The Competition, Compete against other users.<br />
              Each contest has a duration.<br />
              The quickest user to complete all given machines during the contest wins.
            </p>
          </article>

          <article className="tutorial-page-content-add">
            <h2>Game Modes</h2>
            <p>
              <strong><b>Machine</b></strong><br />
              The Basic, You can play machines whenever you want.<br />
              <strong><b>Contest</b></strong><br />
              The Competition, Compete against other users.<br />
              Each contest has a duration.<br />
              The quickest user to complete all given machines during the contest wins.
            </p>
          </article>
        </section>
      </div>
    </Main>
  );
};

export default TutorialPage;