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
import Icon16Lock from '@vkontakte/icons/dist/16/lock';
import Icon28SettingsOutline from '@vkontakte/icons/dist/28/settings_outline';

import Schedule from './Schedule.jsx';
import Info from './Info.jsx';
import Settings from './Settings.jsx';
import FirstScr from './FirstScr.jsx';

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
          onClick={() => this.changePage('info')}
          selected={this.state.activePage == 'info'}
        ><Icon16Lock width={24} height={24} /></TabbarItem>

        <TabbarItem
          onClick={() => this.changePage('settings')}
          selected={this.state.activePage == 'settings'}
        ><Icon28SettingsOutline /></TabbarItem>
      </Tabbar>
    );

    return (
      <Epic activeStory={this.state.activePage} tabbar={(this.state.activePage != "first") ? tabbar : false}>
        <View id="feed" activePanel="feed">
          <Panel id="feed">
            <PanelHeader>Новости</PanelHeader>
          </Panel>
        </View>

        <View id="time" activePanel="time">
          <Panel id="time">
            <PanelHeader>Дедлайны</PanelHeader>
          </Panel>
        </View>

        <View id="schedule" activePanel="schedule">
          <Schedule id="schedule" />
        </View>

        <View id="info" activePanel="info">
          <Info id="info" />
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
