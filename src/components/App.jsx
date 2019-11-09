import React, { Component } from 'react';
import connect from '@vkontakte/vk-connect';
import { Epic, Tabbar, TabbarItem, View, Panel, PanelHeader, FormLayout, FormLayoutGroup, Avatar, Select, Div, Button, IS_PLATFORM_ANDROID } from '@vkontakte/vkui';

import '@vkontakte/vkui/dist/vkui.css';
import '../css/main.css';
import '../css/first.css';

import Icon28ArticleOutline from '@vkontakte/icons/dist/28/article_outline';
import Icon16Fire from '@vkontakte/icons/dist/16/fire';
import Icon56EventOutline from '@vkontakte/icons/dist/56/event_outline';
import Icon28ArchiveOutline from '@vkontakte/icons/dist/28/archive_outline';
import Icon28Profile from '@vkontakte/icons/dist/28/profile';


import Schedule from './Schedule.jsx';
import Archive from './Archive.jsx';
import Profile from './Profile.jsx';
import FirstScr from './FirstScr.jsx';
import NewsFeed from './NewsFeed.jsx';
import Deadlines from './Deadlines.jsx';
import Page from './Page.jsx';
import Panel0 from './onboardingPanels/Panel0.jsx';
import Panel1 from './onboardingPanels/Panel1.jsx';
import Panel2 from './onboardingPanels/Panel2.jsx';
import Panel3 from './onboardingPanels/Panel3.jsx';
import Panel4 from './onboardingPanels/Panel4.jsx';
import Panel5 from './onboardingPanels/Panel5.jsx';

// Sends event to client
connect.send('VKWebAppInit');

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activePage: localStorage.group != undefined ? 'schedule' : 'first',
      activePanelOnBoarding: 'panel0',
      activePanel: 'feed',
      history: ['feed'],
      data: '',
      classTab: '',
      height: 0
    };

    this.updateDimensions = this.updateDimensions.bind(this);
    this.changePanelOnBoarding = this.changePanelOnBoarding.bind(this);
  }


  updateDimensions() {
    this.setState({ classTab: (IS_PLATFORM_ANDROID && (window.innerHeight < this.state.height)) ? 'tabbarDisable' : '' })
  }

  changePage(name) {
    this.setState({ height: window.innerHeight });
    this.updateDimensions();
    this.setState({ activePage: name });
  }

  changePanel(name) {
    this.setState({ activePanel: name });
  }

  changePanelOnBoarding(name) {
    this.setState({ activePanelOnBoarding: name });
  }

  updateData(value) {
    this.setState({ data: value });
  };

  componentDidMount() {
    window.addEventListener("resize", this.updateDimensions);
    window.addEventListener('popstate', (event) => {
      console.log("назад")
      const his = [...this.state.history];
      his.pop();
      const active = his[his.length - 1];
      if (active === 'feed') {
        connect.send('VKWebAppDisableSwipeBack');
      }
      this.setState({ history: his, activePanel: active });
    }, false);
  }

  goBack() {
    window.history.back();
  }

  // метод добавления перехода из истории аппы
  goForward(activePanel) {
    const history = [...this.state.history];
    history.push(activePanel);
    if (this.state.activePanel === 'feed') {
      connect.send('VKWebAppEnableSwipeBack');
    }
    window.history.pushState({}, '', activePanel)

    this.setState({ history, activePanel });
  }

  render() {
    const tabbar = (
      <Tabbar className={this.state.classTab}>
        <TabbarItem
          onClick={() => this.changePage('feed')}
          selected={this.state.activePage == 'feed'}
        ><Icon28ArticleOutline /></TabbarItem>

        <TabbarItem
          onClick={() => this.changePage('time')}
          selected={this.state.activePage == 'time'}
        ><Icon16Fire width={24} height={24} /></TabbarItem>

        <TabbarItem
          onClick={() => this.changePage('schedule')}
          selected={this.state.activePage == 'schedule'}
        ><Icon56EventOutline width={28} height={28} /></TabbarItem>

        <TabbarItem
          onClick={() => this.changePage('archive')}
          selected={this.state.activePage == 'archive'}
        ><Icon28ArchiveOutline /></TabbarItem>

        <TabbarItem
          onClick={() => this.changePage('profile')}
          selected={this.state.activePage == 'profile'}
        ><Icon28Profile /></TabbarItem>
      </Tabbar>
    );

    return (
      <Epic activeStory={this.state.activePage} tabbar={(this.state.activePage != "first") ? tabbar : false}>
        <View
          id="feed"
          activePanel={this.state.activePanel}
          history={this.state.history}
          onSwipeBack={this.goBack} // для свайпа на iOS
        >
          <NewsFeed id="feed" variable={this} updateData={this} />
          <Page id="page" variable={this} data={this.state.data} />
        </View>

        <View id="time" activePanel="time">
          <Deadlines id="time" />
        </View>

        <View id="schedule" activePanel="schedule">
          <Schedule id="schedule" />
        </View>

        <View id="archive" activePanel="archive">
          <Archive id="archive" />
        </View>

        <View id="profile" activePanel="profile">
          <Profile id="profile" />
        </View>

        <View id="first" activePanel={this.state.activePanelOnBoarding}>
          <Panel0 id="panel0" variable={this} />
          <Panel1 id="panel1" variable={this} />
          <Panel2 id="panel2" variable={this} />
          <Panel3 id="panel3" variable={this} />
          <Panel4 id="panel4" variable={this} />
          <Panel5 id="panel5" variable={this} />
          <FirstScr id="first" variable={this} />
        </View>
      </Epic >
    );
  }
}

export default App;
