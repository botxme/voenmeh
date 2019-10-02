import React, { Component } from 'react';
import { Root, Panel, PanelHeader, FormLayout, Search, Alert, View, List, Cell, HeaderButton, platform, IOS, Button } from '@vkontakte/vkui';
import '../css/newsfeed.css';
import Groups from './groups.js';
import Page from './Page.jsx';

import Icon24Back from '@vkontakte/icons/dist/24/back';
import Icon28ChevronBack from '@vkontakte/icons/dist/28/chevron_back';

const osname = platform();

const News = [
  {
    id: 1,
    title: 'Тестовый запуск сервиса на кафедре И5',
    link: 'тест',
    date: '11.11.2019',
    time: '11:11',
    tags: ['общее', 'кафедраИ5']
  },
  {
    id: 2,
    title: 'Как это было — #студлидер2019',
    link: `Учеба уже успела потрепать нервы новоиспеченным студентам, так что 25 и 26 сентября ребята направляли свои силы в другое русло.
          И действительно, эти дни прошли насыщенно: буквально через час после заселения студенты проходили испытания на выявления лидерских качеств.
          После погружения в стрессовые ситуации обстановку разрядил песенный вечер у костра. Тематикой песен была выбрана «любовь и барды». Многие услышали знакомые песни и с радостью подпевали выступавшим.
          На следующий день команды уже представляли свои проекты, которые комментировались и корректировались организаторами мероприятия.
          До встречи на следующих этапах!`,
    date: '27.09.2019',
    time: '15:56',
    tags: ['общее', 'мероприятие']
  },
  {
    id: 3,
    title: 'В стенах ВУЗа прошёл трёхчасовой квест для первокурсников',
    link: 'тест',
    date: '14.09.2019',
    time: '23:50',
    tags: ['общее', 'мероприятие']
  },
  {
    id: 4,
    title: 'Тестовый пост #4',
    link: 'тест',
    date: '14.09.2019',
    time: '23:50',
    tags: ['тест', 'danyadev']
  },
  {
    id: 5,
    title: 'Тестовый пост #5',
    link: 'тест',
    date: '14.09.2019',
    time: '23:50',
    tags: ['text', 'данядев']
  },
  {
    id: 6,
    title: 'Тестовый пост #6',
    link: 'тест',
    date: '14.09.2019',
    time: '23:50',
    tags: ['похоже', 'на', 'инсту']
  },
  {
    id: 7,
    title: 'Тестовый пост #7',
    link: 'тест',
    date: '14.09.2019',
    time: '23:50',
    tags: ['или', 'не', 'похоже']
  }
];

class NewsFeed extends Component {
  constructor(props) {
    super(props);

    this.state = {
      popout: null,
      search: '',
      activeView: 'feed',
      activePanel: 'feed'
    };

    this.changePage = this.changePage.bind(this);
    this.onChange = this.onChange.bind(this);
    this.openDefault = this.openDefault.bind(this);
    this.closePopout = this.closePopout.bind(this);
  }

  /* поиск */
  onChange(search) { this.setState({ search }); }

  get sposts() {
    const search = this.state.search.toLowerCase();
    if (search.substr(0, 1) == "#") {
      return News.filter(({ tags }) => tags.join(' ').toLowerCase().indexOf(search.substr(1)) > -1)
    } else {
      return News.filter(({ title }) => title.toLowerCase().indexOf(search) > -1)
    }
  }

  /* попап */
  closePopout() {
    this.setState({ popout: null });
  }

  openDefault(text) {
    this.setState({
      popout:
        <Alert actions={[{
          title: 'Закрыть',
          autoclose: true,
          style: 'cancel'
        }]}
          onClose={this.closePopout}
        >
          <p>{text}</p>
        </Alert>
    });
  }

  changePage(name) {
    this.setState({ activeView: name });
  }

  render() {
    const posts = this.sposts.length > 0 &&
      this.sposts.map(({ id, title, link, date, time, tags }) => (
        <div className="post" key={id}>
          <div className="post_td">
            <div className="post_tags">
              {tags.map((tag) => (
                <div className="post_tag" key={tag} onClick={() => this.onChange('#' + tag)}>{'#' + tag}</div>
              ))}
            </div>
            <div className="post_date">
              {date + ' ' + time}
            </div>
          </div>
          <div className="post_title" onClick={() => this.openDefault(link)}>{title}</div>
        </div>
      ));

    return (
      <Root activeView={this.state.activeView}>
        <View id="feed" popout={this.state.popout} activePanel={this.state.activePanel}>
          <Panel id="feed" >
            <PanelHeader>Новости</PanelHeader>
            <Search value={this.state.search} onChange={this.onChange} />
            <div className="img-banner" style={{ backgroundImage: `url(${require('../images/banner.png')})` }} />
            <div className="posts">{posts}</div>
          </Panel>

          <Panel id="page">
            <PanelHeader
              left={<HeaderButton onClick={() => alert(1)}>{osname === IOS ? <Icon28ChevronBack /> : <Icon24Back />}</HeaderButton>}
              addon={<HeaderButton onClick={() => alert(1)}>Назад</HeaderButton>}
            >Новости</PanelHeader>


            <Button onClick={() => this.setState({ activePanel: 'feed' })} >Чек</Button>
            <div className="posts">{123}</div>
          </Panel>
        </View>
      </Root>
    );
  }
}

export default NewsFeed;
