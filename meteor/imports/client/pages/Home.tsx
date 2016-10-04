import * as React from 'react';
import {Carousel, CarouselItem, Navbar, NavItem, Nav, Row, Col} from "react-bootstrap";
import {Routes} from '../../common/Routes';
import {FacebookStore} from "../stores/FacebookStore";

interface HomeState {
  index: number
}

export class Home extends React.Component<{}, HomeState> {

  constructor(props: any) {
    super(props);
    this.state = {
      index: 0
    };
  }

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
      "Screen shot",
      "Privacy",
      "Play"
    ];

    const items = sections.map((title, index) =>
      <NavItem key={index} active={this.state.index == index}
               onClick={this.handleSelect.bind(this, index)}>
        {title}
      </NavItem>
    );

    const brand = (
      <li key={-1}>
        <Navbar.Brand>
          <img src={Routes.Assets.at('images/reminisce-logo-ios.png')} alt='Reminisce.me' width='48' height='48' />
        </Navbar.Brand>
      </li>
    );

    return (
      <Navbar fluid={true} fixedTop={true}>
        <Nav>
          {[/*brand,*/ ...items]}
        </Nav>
      </Navbar>
    );
  }

  handleSelect(selectedIndex: number) {
    this.setState({
      index: selectedIndex,
    });
  }

  render() {
    return (
      <div id="home">
        <header id="main-header">
          {this.renderNav()}
        </header>
        <Carousel activeIndex={this.state.index} onSelect={this.handleSelect.bind(this)} wrap={false} interval={0}>
          <CarouselItem>
            <section title="Intro">
              <div className='logo'>
                <img src={Routes.Assets.at('images/reminisce-logo-big.png')} alt='Reminisce.me' width='220' height='216' />
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
                <p>
                  Ever played <a href="https://en.wikipedia.org/wiki/Tic-tac-toe">Tic-Tac-Toe</a>?
                  Then you are already a master of reminisce.me! There is only one catch. If you
                  want to conquer a tile, you have to remember as much as you can of your Facebook
                  profile. Who liked your post? When did you post that interesting link?  Who
                  commented on that weird picture? Test you memory and win the game against a
                  random opponent, or your own friends!
                </p>
              </div>
            </section>
          </CarouselItem>
          <CarouselItem>
            <section title="Screen shot">
              <img src={Routes.Assets.at('images/home-1.jpg')} alt='' width='650' height='590' />
            </section>
          </CarouselItem>
          <CarouselItem>
            <section title="Privacy">
              <h2>About Your Profile Data</h2>
              <div className='copy'>
                <p>
                  <i style={{float: 'left', marginRight: '10px'}} className='icon-lock icon-4x'></i>
                  We develop reminisce.me to make you have a lot of fun. As such, we don't
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
            <section title="Play">
            <Row>
              <h2>OK, time to play!</h2>
              <div className='connect-facebook'>
                  <p>You'll be asked to connect your Facebook profile first.</p>
              </div>
              </Row>
              <Row>
              <Col xs={6} xsOffset={3}>
                <a className="btn btn-block btn-social btn-lg btn-facebook facebook-login" onClick={this.login.bind(this)}>
                  <span className="fa fa-facebook"></span>
                  Sign in with Facebook
                </a>
              </Col>
              </Row>
              <Row>
              <br/>
              <small className="disclaimer">
                All the permissions are exlusively used to generate personalized questions for you,
                extracted from your activity on facebook.
                No other player will ever see any of your posts or other items,
                you will be the only one to see the generated questions.
              </small>
              </Row>
            </section>
          </CarouselItem>
        </Carousel>
      </div>
    );
  }

}

