
var React = require('react');

var Home = React.createClass({

  login() {
    R.FacebookStore.login();
  },

  render() {
    return <div>
      <section className='home-1'>
          <div className='grid-container'>
              <div className='grid-80 prefix-10 grid-parent'>
                  <div className='grid-30'>
                      <div className='logo'>
                          <img src='images/reminisce-logo-big.png' alt='Reminisce.me' width='220' height='216' />
                      </div>
                  </div>
                  <div className='grid-70'>
                      <h1>Who liked your post?<br />When did you post that interesting link?<br /> 
                          Who commented on that weird picture?<br /> Test you memory and win the game.
                      </h1>
                      <div className='call-to-action'>
                          <a href='#start' className='btn'>Start Playing</a>
                      </div>
                  </div>
              </div>
          </div>
      </section>
      <section className='home-2'>
          <div className='grid-container'>
              <div className='grid-80 prefix-10'>
                <h2>How to Play</h2>
                <div className='copy'>
                  Ever played <a href="https://en.wikipedia.org/wiki/Tic-tac-toe">Tic-Tac-Toe</a>?
                  Then you are already a master of reminisce.me! There is only one catch. If you
                  want to conquer a tile, you have to remember as much as you can of your Facebook
                  profile. Who liked your post? When did you post that interesting link?  Who
                  commented on that weird picture? Test you memory and win the game against a
                  random opponent, or your own friends!
                </div>
              </div>
              <div className='grid-40 prefix-10'>
                <div className=''>
                  <img src='images/home-1.jpg' alt='' width='650' height='590' />
                </div>
              </div>
              <div className='grid-40'>
                <div className=''>
                  <img src='images/home-2.jpg' alt='' width='650' height='590' />
                </div>
              </div>
          </div>
      </section>
      <section className='home-3'>
          <div className='grid-container'>
              <div className='grid-80 prefix-10'>
                  <h2>About Your Profile Data</h2>
                  <div className='copy'>
                    <i style={{float: 'left', marginRight: '10px'}} className='icon-lock icon-4x'></i>
                  We develop reminisce.me to make you have a lot of fun, and ultimately with the
                  scientific purpose of understanding how the human memory works. As such, we don&#8217;t
                  store permanently any of your personal data. We are so transparent about it that we
                  decided to release the whole game platform (client and server) as <a href="https://github.com/reminisceme/">open-source</a>!
                  </div>
              </div>
          </div>
      </section>
      <section className='home-4' id='start'>
          <div className='grid-container'>
              <div className='grid-80 prefix-10'>
                  <h2>OK, time to play!</h2>
                  <div className='connect-facebook'>
                      <p><i className='icon-facebook-sign icon-2x'></i>&ensp;
                      You&#8217;ll be asked to connect your Facebook profile first.</p>
                  </div>
                  <div className='call-to-action'>
                      <a onClick={this.login} className='btn btn-primary' type='submit'>Start Playing</a>
                  </div>
              </div>
          </div>
      </section>
    </div>;
  }
});

Reminisce.Home = Home;
