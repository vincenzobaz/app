
'use strict';

import {Welcome} from './Welcome';
import {About} from './About';
import {Account} from './Account';
import {PlayGame} from './PlayGame';
import {Home} from './Home';
import {Dashboard} from './Dashboard';
import * as reactMixin from "react-mixin";
import {getAppState} from "../appState";
import {Page} from "../components/facebook/Page";
import {Game} from "../models/Game";
import {JoinRequest} from "../models/JoinRequest";
import {Friend} from "../../common/models/Friend";
import {User} from "../models/User";


interface MainProps {
  
}

interface PageDictionary {
  [index: string]: React.ComponentClass<any>;
}

interface MainState {
  pages: PageDictionary;
}
interface Data {
  user: User;
  isLoggedIn: boolean;
  page: string;
  currentGame: Game;
  games: Game[];
  joinRequests: JoinRequest[];
  friends: Friend[];
}


@reactMixin.decorate(ReactMeteorData)
export class Main extends React.Component<MainProps, MainState> {
  
  data: Data;
  
  constructor(props: MainProps) {
    super(props);
    let pages: PageDictionary = {};
    pages['welcome'] = Welcome;
    pages['about'] = About;
    pages['account'] = Account;
    pages['game'] = PlayGame;
    this.state = {
      pages: pages
    };
  }


  getMeteorData() {
    return getAppState();
  }

  render() {
    if (this.data.isLoggedIn) {
      return this.renderDashboard();
    }
    
    return this.renderHome();
  }

  renderHome() {
    return <Home />;
  }

  renderDashboard() {
    return (
      <Dashboard {...this.data}>
        {this.renderInner()}
      </Dashboard>
    );
  }

  renderInner() {
    var page = (this.state.pages[this.data.page]) ? this.data.page : 'welcome';

    if (page == 'game' && this.data.currentGame == null) {
      page = 'welcome';
    }

    const Page = this.state.pages[page];

    return <Page {...this.data} />;
  }

}
