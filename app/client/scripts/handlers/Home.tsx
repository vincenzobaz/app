import * as React from 'react';
import {Carousel, CarouselItem, Navbar, NavItem, Nav} from "react-bootstrap";

import {FacebookStore} from "../stores/FacebookStore";

export class Home extends React.Component<{}, {}> {

  componentDidMount() {
    jQuery.getScript("//cdn.iubenda.com/iubenda.js");
  }

  login() {
    FacebookStore.login();
  }

  renderNav() {
    const sections = [
      "Intro",
      "How to play",
      "Images",
      "Privacy",
      "Play"
    ];

    const items = sections.map((title, index) =>
      <NavItem key={index}>{title}</NavItem>);

    const brand = (
      <li key={-1}>
        <Navbar.Brand>
          <img src='images/reminisce-logo-ios.png' alt='Reminisce.me' width='48' height='48' />
        </Navbar.Brand>
      </li>
    );

    return (
      <Navbar fluid={true} fixedTop={true}>
        <Nav>
          {[brand, ...items]}
        </Nav>
      </Navbar>
    );
  }

  render() {
    return (
      <div id="home">
        <header id="main-header">
          {this.renderNav()}
        </header>
        <Carousel wrap={false} interval={0}>
          <CarouselItem>
            <section title="Intro">
              <div className='logo'>
                <img src='images/reminisce-logo-big.png' alt='Reminisce.me' width='220' height='216' />
              </div>
              <h2>
                Who liked your post?<br />
                When did you post that interesting link?<br />
                Who commented on that weird picture?<br />
                Test you memory and win the game.
              </h2>
            </section>
          </CarouselItem>
          <CarouselItem>
            <section title="How to play">
              <h2>How to play</h2>
              <div className='copy'>
                Ever played <a href="https://en.wikipedia.org/wiki/Tic-tac-toe">Tic-Tac-Toe</a>?
                Then you are already a master of reminisce.me! There is only one catch. If you
                want to conquer a tile, you have to remember as much as you can of your Facebook
                profile. Who liked your post? When did you post that interesting link?  Who
                commented on that weird picture? Test you memory and win the game against a
                random opponent, or your own friends!
              </div>
            </section>
          </CarouselItem>
          <CarouselItem>
            <section title="Images">
              <img src='images/home-1.jpg' alt='' width='650' height='590' />
            </section>
          </CarouselItem>
          <CarouselItem>
            <section title="Privacy">
              <h2>About Your Profile Data</h2>
              <div className='copy'>
                <p>
                  <i style={{float: 'left', marginRight: '10px'}} className='icon-lock icon-4x'></i>
                  We develop reminisce.me to make you have a lot of fun, and ultimately with the
                  scientific purpose of understanding how the human memory works. As such, we don&#8217;t
                  store permanently any of your personal data. We are so transparent about it that we
                  decided to release the whole game platform (client and server) as <a href="https://github.com/reminisceme/">open-source</a>!
                </p>
                <p className="privacy">
                  <a className="iubenda-nostyle no-brand iubenda-embed" title="Privacy Policy" href="//www.iubenda.com/privacy-policy/348136">Privacy Policy</a>
                </p>
              </div>
            </section>
          </CarouselItem>
          <CarouselItem>
            <section title="Start">
              <h2>OK, time to play!</h2>
              <div className='connect-facebook'>
                  <p><i className='icon-facebook-sign icon-2x'></i>&ensp;
                  You&#8217;ll be asked to connect your Facebook profile first.</p>
              </div>
              <div className='call-to-action'>
                  <a onClick={this.login} className='btn btn-primary' type='submit'>Start Playing</a>
              </div>
            </section>
          </CarouselItem>
        </Carousel>
      </div>
    );
  }

}
