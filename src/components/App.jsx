/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-lonely-if */
/* eslint-disable class-methods-use-this */

import React, { Component } from 'react';
import connect from '@vkontakte/vk-connect';
import {
  Epic, Tabbar, TabbarItem, View, IS_PLATFORM_ANDROID, Spinner
} from '@vkontakte/vkui';

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
import API from '../helpers/API.js';

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

if (connect.supports('VKWebAppResizeWindow')) {
  connect.send('VKWebAppResizeWindow', { width: 800, height: 1000 });
}

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activePage: localStorage.group !== undefined ? 'schedule' : 'onbording',
      activePanel: 'feed',
      history: ['feed'],
      data: '',
      classTab: '',
      height: 0,
      isLoaded: false,
      news: [],
      banners: [],
      schedule: {}
    };

    this.updateDimensions = this.updateDimensions.bind(this);
  }

  componentDidMount() {
    window.addEventListener('resize', this.updateDimensions);
    window.addEventListener('popstate', () => {
      const his = [...this.state.history];
      his.pop();
      const active = his[his.length - 1];
      if (active === 'feed') {
        connect.send('VKWebAppDisableSwipeBack');
      }
      this.setState({ history: his, activePanel: active });
    }, false);

    if (localStorage.getItem('group')) this.setSchedule();

    API.request('getBanners', null, 'GET', 1).then((banners) => {
      this.setState({ banners });
      API.request('getNews', null, 'GET', 1).then((news) => {
        this.setState({ news });
        this.setState({ isLoaded: true });
      }).catch((e) => {
        console.error(e);
        this.setState({ isLoaded: true });
      });
    }).catch((e) => {
      console.error(e);
      this.setState({ isLoaded: true });
    });

    this.pool(180);
  }

  setSchedule(group = localStorage.getItem('group')) {
    API.request(`getSchedule/${JSON.parse(group).id}`, null, 'GET', 1).then((schedule) => {
      this.setState({ schedule });
    }).catch(console.error);
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
  }

  pool(interval) {
    return setInterval(() => {
      if (localStorage.getItem('group')) this.apiCall(`getSchedule/${JSON.parse(localStorage.getItem('group')).id}`);
      this.apiCall('getNews');
    }, interval * 1000);
  }

  updateDimensions() {
    const { height } = this.state;
    this.setState({ classTab: (IS_PLATFORM_ANDROID && (window.innerHeight < height)) ? 'tabbarDisable' : '' });
  }

  apiCall(method) {
    let name;
    switch (method) {
      case 'getBanners':
        name = 'banners';
        break;
      case 'getNews':
        name = 'news';
        break;
      default:
        name = 'schedule';
        break;
    }

    API.request(method, null, 'GET', 1).then((value) => {
      this.setState({ [name]: value });
    }).catch(console.error);
  }

  goBack() {
    window.history.back();
  }

  // метод добавления перехода из истории аппы
  goForward(activePanel) {
    const history = [...this.state.history];
    history.push(activePanel);
    // eslint-disable-next-line react/destructuring-assignment
    if (this.state.activePanel === 'feed') {
      connect.send('VKWebAppEnableSwipeBack');
    }
    window.history.pushState({}, '', activePanel);

    this.setState({ history, activePanel });
  }

  render() {
    const {
      isLoaded, banners, news, schedule, activePage, activePanel, history, data, classTab
    } = this.state;

    const tabbar = (
      <Tabbar className={classTab}>
        <TabbarItem
          onClick={() => this.changePage('feed')}
          selected={activePage === 'feed'}
        >
          <Icon28ArticleOutline />
        </TabbarItem>

        <TabbarItem
          onClick={() => this.changePage('time')}
          selected={activePage === 'time'}
        >
          <Icon28FireOutline />
        </TabbarItem>

        <TabbarItem
          onClick={() => this.changePage('schedule')}
          selected={activePage === 'schedule'}
        >
          <Icon20CalendarOutline width={28} height={28} />
        </TabbarItem>

        <TabbarItem
          onClick={() => this.changePage('archive')}
          selected={activePage === 'archive'}
        >
          <Icon28ArchiveOutline />
        </TabbarItem>

        <TabbarItem
          onClick={() => this.changePage('profile')}
          selected={activePage === 'profile'}
        >
          <Icon28Profile />
        </TabbarItem>
      </Tabbar>
    );

    if (localStorage.getItem('group')) {
      // расписание
      if (!(isLoaded && 'GroupName' in schedule)) return <Spinner size="large" />;
    } else {
      // онбординг
      if (!isLoaded) return <Spinner size="large" />;
    }

    return (
      <Epic activeStory={activePage} tabbar={(activePage === 'first' || activePage === 'onbording') ? null : tabbar}>
        <View
          id="feed"
          activePanel={activePanel}
          history={history}
          onSwipeBack={this.goBack} // для свайпа на iOS
        >
          <NewsFeed id="feed" variable={this} updateData={this} banners={banners} News={news} />
          <Page id="page" variable={this} data={data} />
        </View>

        <View id="time" activePanel="time">
          <Deadlines id="time" />
        </View>

        <View id="schedule" activePanel="schedule">
          <Schedule id="schedule" schedule={schedule} />
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
              { image: phone0, title: 'Встречайте —\nВоенмех ВКонтакте', subtitle: 'Первый локальный студенческий сервис\nвнутри социальной сети.\nНе нужно ничего скачивать и устанавливать —\nэто чудесно, не правда ли?' },
              { image: phone1, title: 'Следи за новостями!', subtitle: 'В этом разделе у нас царит гармония и порядок:\nвсе новости отсортированы по факультетам,\nпоэтому ты не пропустишь ничего важного.' },
              { image: phone2, title: 'Создавай дедлайны!', subtitle: 'Укажи название задачи, комментарий и время.\nКогда сроки начнут гореть —\nсервис пришлет уведомление ВКонтакте.' },
              { image: phone3, title: 'Смотри расписание!', subtitle: 'Свайпни календарь и выбери дату,\nчтобы посмотреть расписание на другой день.' },
              { image: phone4, title: 'Самое важное в архиве!', subtitle: 'Здесь размещена полезная информация\nдля каждого студента Военмеха.\nНе отвлекай никого — посмотри в архиве.' },
              { image: phone5, title: 'Настрой сервис под себя!', subtitle: 'По умолчанию включены все виды уведомлений\nи сортировка новостной ленты по факультетам.' },
              { image: phone6, title: 'Почти готово!', subtitle: 'Осталось дело за малым:\nдобавь сервис в избранное и разреши\nприсылать уведомления, чтобы наслаждаться\nфункционалом сервиса в полной мере.' },
            ]}
          />
        </View>
      </Epic>
    );
  }
}

export default App;
