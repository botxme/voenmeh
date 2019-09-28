import React, { Component } from 'react';
import { Panel, PanelHeader, FormLayout, Search, Alert, View, List, Cell } from '@vkontakte/vkui';
import '../css/newsfeed.css';
import Groups from './groups.js';

const News = [
  {
    id: 1,
    title: 'В стенах ВУЗа прошел трёхчасовой квест для первокурсников',
    link: '/',
    date: '13.10.2019',
    time: '21:00',
    tags: ['общее', 'квест', 'тег']
  },
  {
    id: 2,
    title: 'Что сказать? Кретов -- лучший!',
    link: '/',
    date: '11.10.2019',
    time: '05:00',
    tags: ['факультетИ', 'кафедраИ5']
  },
  {
    id: 3,
    title: 'Долгожданный запуск сервиса для всех студентов ВОЕНМЕХа',
    link: '/',
    date: '20.10.2019',
    time: '23:50',
    tags: ['общее', 'сервисВК']
  },
  {
    id: 4,
    title: 'Всё класс, едем дальше!',
    link: '/',
    date: '11.10.2019',
    time: '05:00',
    tags: ['хеш', 'аываываы']
  }
];

class NewsFeed extends Component {
  constructor(props) {
    super(props);

    this.state = {
      popout: null,
      search: ''
    };

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

  openDefault() {
    this.setState({
      popout:
        <Alert actions={[{
          title: 'Отмена',
          autoclose: true,
          style: 'cancel'
        }]}
          onClose={this.closePopout}
        >
          <p>Блять, все Влады просто пиздатые ❤❤</p>
        </Alert>
    });
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
          <div className="post_title" onClick={this.openDefault}>{title}</div>
        </div>
      ));

    return (
      <View popout={this.state.popout} activePanel="feed">
        <Panel id="feed" >
          <PanelHeader>Новости</PanelHeader>
          <Search value={this.state.search} onChange={this.onChange} />
          <div className="img-banner" style={{ backgroundImage: `url(${require('../images/banner.png')})` }} />
          <div className="posts">{posts}</div>
        </Panel>
      </View>
    );
  }
}

export default NewsFeed;
