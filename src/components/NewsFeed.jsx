import React, { Component } from 'react';
import { Panel, PanelHeader, FormLayout, Search, Cell } from '@vkontakte/vkui';
import '../css/newsfeed.css';
import Groups from './groups.js';
import Page from './Page.jsx';

const News = [
  {
    id: 1,
    title: 'Тестовый запуск сервиса на кафедре И5',
    content: 'тест',
    date: '01.10.2019',
    time: '10:00',
    tags: ['общее', 'кафедраИ5']
  },
  {
    id: 2,
    title: 'Как это было — #студлидер2019',
    content: `Учеба уже успела потрепать нервы новоиспеченным студентам, так что 25 и 26 сентября ребята направляли свои силы в другое русло.
          И действительно, эти дни прошли насыщенно: буквально через час после заселения студенты проходили испытания на выявления лидерских качеств.
          После погружения в стрессовые ситуации обстановку разрядил песенный вечер у костра. Тематикой песен была выбрана «любовь и барды». Многие услышали знакомые песни и с радостью подпевали выступавшим.
          На следующий день команды уже представляли свои проекты, которые комментировались и корректировались организаторами мероприятия.
          До встречи на следующих этапах!`,
    date: '01.10.2019',
    time: '12:30',
    tags: ['общее', 'мероприятие']
  },
  {
    id: 3,
    title: 'В стенах ВУЗа прошёл трёхчасовой квест для первокурсников',
    content: 'тест',
    date: '01.10.2019',
    time: '16:45',
    tags: ['общее', 'мероприятие']
  }
];

class NewsFeed extends Component {
  constructor(props) {
    super(props);

    this.state = {
      search: '',
    };

    this.onChange = this.onChange.bind(this);
  }

  /* поиск */
  onChange(search) {
    this.setState({ search: search.replace(/\s+/g, ' ') });
  }

  get sposts() {
    const search = this.state.search.toLowerCase();
    if (search.substr(0, 1) == "#") {
      return News.filter(({ tags }) => tags.join(' ').toLowerCase().indexOf(search.substr(1)) > -1)
    } else {
      return News.filter(({ title }) => title.toLowerCase().indexOf(search) > -1)
    }
  }

  render() {
    const posts = this.sposts.length > 0 &&
      this.sposts.map((post) => (
        <Cell
          key={post.id}
          size='l'
          onClick={() => {
            this.props.variable.goForward("page");
            this.props.updateData.updateData(post)
          }}
          bottomContent={
            <div className="post_td">
              <div className="post_tags">
                {post.tags.map((tag) => (
                  <div className="post_tag" key={tag} onClick={() => this.onChange('#' + tag)}>{'#' + tag}</div>
                ))}
              </div>
              <div className="post_date">
                {post.date + ' ' + post.time}
              </div>
            </div>
          }
        >{post.title}</Cell>
      ));


    return (
      <Panel id="feed" >
        <PanelHeader>Новости</PanelHeader>
        <Search value={this.state.search} onChange={this.onChange} />
        <div className="img-banner" style={{ backgroundImage: `url(${require('../images/banner.png')})` }} />
        <div className="posts">{posts}</div>
      </Panel>
    );
  }
}

export default NewsFeed;
