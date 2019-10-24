import React, { Component } from 'react';
import { Panel, PanelHeader, Search, Cell, Separator, IS_PLATFORM_ANDROID } from '@vkontakte/vkui';
import '../css/newsfeed.css';
import Carousel from './Carousel.jsx'
import Icon24Chevron from '@vkontakte/icons/dist/24/chevron';

const News = [
  {
    id: 1,
    title: 'Тестовый запуск сервиса на кафедре И5',
    content: 'тест',
    date: '01.10.2019',
    time: '10:00',
    author: 'Владислав Кретов',
    tags: ['факультет И', 'кафедраИ5']
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
    author: 'Валерия Латышева',
    tags: ['общее', 'Мероприятие']
  },
  {
    id: 3,
    title: 'В стенах ВУЗа прошёл трёхчасовой квест для первокурсников',
    content: 'тест',
    date: '01.10.2019',
    time: '16:45',
    author: 'Настя Свет',
    tags: ['привет Настя', 'общее', 'Мероприятие']
  },
  {
    id: 4,
    title: 'Interesting headline',
    content: 'content',
    date: 'dd.mm.yyyy',
    time: 'xx:xx',
    author: '%author_name%',
    tags: ['general', 'hashtag']
  },
  {
    id: 5,
    title: 'Interesting headline',
    content: 'content',
    date: 'dd.mm.yyyy',
    time: 'xx:xx',
    author: '%author_name%',
    tags: ['general', 'hashtag']
  },
];

let list = [
  {
    "id": 1, "url": "https://vk.com/app6969696", "image": {
      "url": require('../images/banner_1.png'), "thumb": ""
    }
  },
  {
    "id": 2, "url": "https://vk.com/app6969696", "image": {
      "url": require('../images/banner_2.png'), "thumb": ""
    }
  },
]

class NewsFeed extends Component {
  constructor(props) {
    super(props);

    this.state = {
      search: '',
    };

    this.onChange = this.onChange.bind(this);
    this.FirstLetUP = this.FirstLetUP.bind(this);
  }

  /* поиск */
  onChange(search) {
    this.setState({ search: search.replace(/\s+/g, ' ') });
  }

  FirstLetUP(str) {
    return str[0].toUpperCase() + str.slice(1);
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
      this.sposts.map((post, id) => (
        <div key={id} >
          <Cell
            key={id}
            size='l'
            expandable={true}
            multiline={true}
            asideContent={IS_PLATFORM_ANDROID ? <Icon24Chevron className="Cell__chevron" /> : ''}
            onClick={() => {
              this.props.variable.goForward("page");
              this.props.updateData.updateData(post)
            }}
            bottomContent={
              <div>
                <div className="post_td">
                  <div className="post_tags">
                    {post.tags.map((tag, id) => (
                      <div className="post_tag" key={id}>{this.FirstLetUP(tag)}</div>
                    ))}
                  </div>
                </div>
                <div className="post_bot">
                  <div className="post_date">
                    {post.date + ' в ' + post.time}
                  </div>
                  <div className="post_author">
                    {' · ' + post.author}
                  </div>
                </div>
              </div>
            }
          ><div className="post_title">{post.title}</div></Cell>
          <Separator />
        </div>
      ));


    return (
      <Panel id="feed" >
        <PanelHeader>Новости</PanelHeader>
        <Search value={this.state.search} onChange={this.onChange} />
        <Carousel list={list}
          autoplay={true}
          sizePadding={52.63} />
        <div className="posts">{posts}</div>
      </Panel>
    );
  }
}

export default NewsFeed;
