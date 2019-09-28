import React, { Component } from 'react';
import connect from '@vkontakte/vk-connect';
import { Epic, Tabbar, TabbarItem, View, Panel, PanelHeader, FormLayout, FormLayoutGroup, Avatar, Select, Div, Button } from '@vkontakte/vkui';

import '@vkontakte/vkui/dist/vkui.css';
import '../css/main.css';
import '../css/first.css';

import Icon24Newsfeed from '@vkontakte/icons/dist/24/newsfeed';
import Icon16Fire from '@vkontakte/icons/dist/16/fire';
import Icon20CalendarOutline from '@vkontakte/icons/dist/20/calendar_outline';
import Icon24Favorite from '@vkontakte/icons/dist/24/favorite';
import Icon28Delete from '@vkontakte/icons/dist/28/delete';
import Icon28SettingsOutline from '@vkontakte/icons/dist/28/settings_outline';


import Schedule from './Schedule.jsx';
import Archive from './Archive.jsx';
import Settings from './Settings.jsx';
import FirstScr from './FirstScr.jsx';
import NewsFeed from './NewsFeed.jsx';

// Sends event to client
connect.send('VKWebAppInit');

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activePage: localStorage.group != undefined ? 'schedule' : 'first',
    };
  }

  changePage(name) {
    this.setState({ activePage: name });
  }

  render() {
    const tabbar = (
      <Tabbar>
        <TabbarItem
          onClick={() => this.changePage('feed')}
          selected={this.state.activePage == 'feed'}
        ><Icon24Newsfeed /></TabbarItem>

        <TabbarItem
          onClick={() => this.changePage('time')}
          selected={this.state.activePage == 'time'}
        ><Icon16Fire width={24} height={24} /></TabbarItem>

        <TabbarItem
          onClick={() => this.changePage('schedule')}
          selected={this.state.activePage == 'schedule'}
        ><Icon20CalendarOutline width={28} height={28} /></TabbarItem>

        <TabbarItem
          onClick={() => this.changePage('archive')}
          selected={this.state.activePage == 'archive'}
        ><Icon28Delete /></TabbarItem>

        <TabbarItem
          onClick={() => this.changePage('settings')}
          selected={this.state.activePage == 'settings'}
        ><Icon28SettingsOutline /></TabbarItem>
      </Tabbar>
    );

    return (
      <Epic activeStory={this.state.activePage} tabbar={(this.state.activePage != "first") ? tabbar : false}>
        <View id="feed" activePanel="feed">
          <NewsFeed id="feed" />
        </View>

        <View id="time" activePanel="time">
          <Panel id="time">
            <PanelHeader>Дедлайны</PanelHeader>
          </Panel>
        </View>

        <View id="schedule" activePanel="schedule">
          <Schedule id="schedule" />
        </View>

        <View id="archive" activePanel="archive">
          <Archive id="archive" />
        </View>

        <View id="settings" activePanel="settings">
          <Settings id="settings" />
        </View>

        <View id="first" activePanel="first">
          <FirstScr id="first" variable={this}/>
        </View>
      </Epic >
    );
  }
}

export default App;
