
var React = require('react');

var Home = React.createClass({

  login() {
    Meteor.loginWithFacebook();
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
                      <h1>Who did like what? When did you posted that interesting link? Who did comment that weird picture?<br />Test you memory and win the game.
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
                     Cras mattis consectetur purus sit amet fermentum. Donec sed odio dui. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nullam id dolor id nibh ultricies vehicula ut id elit. Cras mattis consectetur purus sit amet fermentum. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.
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
                     <i style={{float: 'left', marginRight: '10px'}} className='icon-lock icon-4x'></i>Cras mattis consectetur purus sit amet fermentum. Donec sed odio dui. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nullam id dolor id nibh ultricies vehicula ut id elit. Cras mattis consectetur purus sit amet fermentum. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.
                     </div>
              </div>
          </div>
      </section>
      <section className='home-4' id='start'>
          <div className='grid-container'>
              <div className='grid-80 prefix-10'>
                  <h2>OK, Enough Chit-Chat</h2>
                  <div className='connect-facebook'>
                      <p><i className='icon-facebook-sign icon-2x'></i>&ensp;
                      You'll be asked to connect your Facebook profile first.</p>
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

module.exports = Home;
