import React, { Component } from 'react';
import connect from '@vkontakte/vk-connect';
import { Epic, Tabbar, TabbarItem, View, Panel, PanelHeader, FormLayout, FormLayoutGroup, Avatar, Select, Div, Button, IS_PLATFORM_ANDROID } from '@vkontakte/vkui';

import '@vkontakte/vkui/dist/vkui.css';
import '../css/main.css';
import '../css/first.css';

import Icon28ArticleOutline from '@vkontakte/icons/dist/28/article_outline';
import Icon28FireOutline from '@vkontakte/icons/dist/28/fire_outline';
import Icon20CalendarOutline from '@vkontakte/icons/dist/20/calendar_outline';
import Icon28ArchiveOutline from '@vkontakte/icons/dist/28/archive_outline';
import Icon28Profile from '@vkontakte/icons/dist/28/profile';


import Schedule from './Schedule.jsx';
import Archive from './Archive.jsx';
import Profile from './Profile.jsx';
import FirstScr from './FirstScr.jsx';
import NewsFeed from './NewsFeed.jsx';
import Deadlines from './Deadlines.jsx';
import Page from './Page.jsx';

import Onboarding from './onboardingPanels/Onboarding.jsx';
import phone0 from './onboardingPanels/phone0.png';
import phone1 from './onboardingPanels/phone1.png';
import phone2 from './onboardingPanels/phone2.png';
import phone3 from './onboardingPanels/phone3.png';
import phone4 from './onboardingPanels/phone4.png';
import phone5 from './onboardingPanels/phone5.png';
import phone6 from './onboardingPanels/phone6.png';

// Sends event to client
connect.send('VKWebAppInit');

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activePage: localStorage.group != undefined ? 'schedule' : 'onbording',
      activePanel: 'feed',
      history: ['feed'],
      data: '',
      classTab: '',
      height: 0
    };

    this.updateDimensions = this.updateDimensions.bind(this);
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
        ><Icon28FireOutline /></TabbarItem>

        <TabbarItem
          onClick={() => this.changePage('schedule')}
          selected={this.state.activePage == 'schedule'}
        ><Icon20CalendarOutline width={28} height={28} /></TabbarItem>

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
      <Epic activeStory={this.state.activePage} tabbar={(this.state.activePage === "first" || this.state.activePage === "onbording") ? null : tabbar}>
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

        <View id="first" activePanel="first">
          <FirstScr id="first" variable={this} />
        </View>

        <View id="onbording" activePanel="onbording">
          <Onboarding
            variable={this}
            id="onbording"
            pages={[
              { image: phone0, title: `Встречайте —\nВоенмех ВКонтакте`, subtitle: 'Первый локальный студенческий сервис\nвнутри социальной сети.\nНе нужно ничего скачивать и устанавливать —\nэто чудесно, не правда ли?' },
              { image: phone1, title: 'Следи за новостями!', subtitle: 'В этом разделе у нас царит гармония и порядок:\nвсе новости отсортированы по факультетам,\nпоэтому ты не пропустишь ничего важного.' },
              { image: phone2, title: 'Создавай дедлайны!', subtitle: 'Укажи название задачи, комментарий и время.\nКогда сроки начнут гореть —\nсервис пришлет уведомление ВКонтакте.' },
              { image: phone3, title: 'Смотри расписание!', subtitle: 'Свайпни календарь и выбери дату,\nчтобы посмотреть расписание на другой день.' },
              { image: phone4, title: 'Самое важное в архиве!', subtitle: 'Здесь размещена полезная информация\nдля каждого студента Военмеха.\nНе отвлекай никого — посмотри в архиве.' },
              { image: phone5, title: 'Настрой сервис под себя!', subtitle: 'По умолчанию включены все виды уведомлений\nи сортировка новостной ленты по факультетам.' },
              { image: phone6, title: 'Почти готово!', subtitle: 'Осталось дело за малым:\nдобавь сервис в избранное и разреши\nприсылать уведомления, чтобы наслаждаться\nфункционалом сервиса в полной мере.' },
            ]}
          />
        </View>
      </Epic >
    );
  }
}

export default App;
