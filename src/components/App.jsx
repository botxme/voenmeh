import React, { Component } from 'react';
import connect from '@vkontakte/vk-connect-promise';
import '@vkontakte/vkui/dist/vkui.css';
import { Epic, Tabbar, TabbarItem, View, Panel, PanelHeader } from '@vkontakte/vkui';

import Icon28RecentOutline from '@vkontakte/icons/dist/28/recent_outline';
import Icon24Newsfeed from '@vkontakte/icons/dist/24/newsfeed';
import Icon20CalendarOutline from '@vkontakte/icons/dist/20/calendar_outline';
import Icon28InfoOutline from '@vkontakte/icons/dist/28/info_outline';
import Icon28SettingsOutline from '@vkontakte/icons/dist/28/settings_outline';

import Schedule from './Schedule.jsx';

connect.send('VKWebAppInit', {});

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activePage: 'schedule'
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
        ><Icon28RecentOutline /></TabbarItem>

        <TabbarItem
          onClick={() => this.changePage('schedule')}
          selected={this.state.activePage == 'schedule'}
        ><Icon20CalendarOutline width={28} height={28} /></TabbarItem>

        <TabbarItem
          onClick={() => this.changePage('info')}
          selected={this.state.activePage == 'info'}
        ><Icon28InfoOutline /></TabbarItem>

        <TabbarItem
          onClick={() => this.changePage('settings')}
          selected={this.state.activePage == 'settings'}
        ><Icon28SettingsOutline /></TabbarItem>
      </Tabbar>
    );

    return (
      <Epic activeStory={this.state.activePage} tabbar={tabbar}>
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
          <Schedule id="schedule"/>
        </View>

        <View id="info" activePanel="info">
          <Panel id="info">
            <PanelHeader>FAQ</PanelHeader>
          </Panel>
        </View>

        <View id="settings" activePanel="settings">
          <Panel id="settings">
            <PanelHeader>Настройки</PanelHeader>
          </Panel>
        </View>
      </Epic>
    );
  }
}

export default App;
