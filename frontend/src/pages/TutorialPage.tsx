import React from 'react';
import Main from '../components/main/Main';
import logo_dark from "../assets/img/icon/HTO DARK RECOLORED_crop_filled.png";
import logo_light from "../assets/img/icon/HTO LIGHT RECOLORED_crop_filled.png";
import '../assets/scss/etc/TutorialPage.scss';

const TutorialPage: React.FC = () => {
  const [isHovered, setIsHovered] = React.useState(false);

  return (
    <Main>
      <div className="tutorial-page-container">
        <div className="tutorial-page-top">
          <img 
            id="tutorialImg" 
            className="tutorial-page-img-dark" 
            alt="" 
            src={isHovered ? logo_light : logo_dark}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          />
        </div>
        <section className="tutorial-page-content-container">
          <article className="tutorial-page-content-intro">
            <h2>Introduction</h2>
            <p>
              <b>Hack This Out</b> is a web-based <a href="#">Hacking Lab</a>.<br />
              Cyber Security is hard and boring, but we believe that it can be <a href="#">Fun</a> and <a href="#">Exciting</a>.<br />
              The journey probably be boring and exhausting, so we prepare a <a href="#">Gaming experience</a> for you.
            </p>
          </article>
          <article className="tutorial-page-content-rules">
            <h2>Gaming Rules</h2>
            <ol>
              <li>You complete a machine by <a href="#">Hacking</a> and <a href="#">Capturing the Flag</a>.</li>
              <li>You get rewarded <a href="#">Experience Points (EXP)</a> by completing machines.</li>
              <li>You can get <a href="#">Hints</a> from each machine, but there will be a penalty.</li>
            </ol>
          </article>
          <article className="tutorial-page-content-gamemode">
            <h2>Game Modes</h2>
            <p>
              <strong>&nbsp;&nbsp;&nbsp;Machine</strong><br />
              <a href="#">&nbsp;The Basic!</a> You have to hack vulnerable machines.<br />
              Find the <a href="#">Flag</a> and complete the machine.<br /><br />
              <strong>&nbsp;&nbsp;&nbsp;Contest</strong><br />
              <a href="#">&nbsp;The Competition!</a> Compete against other players.
              Each contest has a <a href="#">Period</a>.<br />
              The <a href="#">Quickest</a> player who completes all given tasks in the period, gets to <a href="#">Win</a>.
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