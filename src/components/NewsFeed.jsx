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
      "url": "https://psv4.userapi.com/c856324/u462723039/docs/d1/bf27d3c1a652/banner_epta.png?extra=glQg9H7ASzOuw-VG5rM2777KQqSk7Y88Zenw-p48hahQ4U84uGGq8Qx4106TpSDdIXZWD4lk9iTk3Px1OFgYdPpKaJlkl3bZkTeeyhlsvU5h1LVT82zNICTXY_9KrYeE-SlfUTxyc8RJAhSkbxtmXRxXPVM", "thumb": ""
    }
  },
  {
    "id": 2, "url": "https://vk.com/app6969696", "image": {
      "url": "https://psv4.userapi.com/c848124/u462723039/docs/d9/811086f4150c/banner_yopta_2.png?extra=dWjy7N-I5h0EZl-mN5xA34IHHL0NCcHCjDYv3OIjILJO9OBTDDy43Rt8L6iGNFFD_Kd849hGrkJOCMYwXRivmZpS5LViMXJZoLPDSVoecEx_GVEwdQKURxi4whNqPpikNwAIhs6VKxZlNBAXUkGqtdJDhU0", "thumb": ""
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
    this.ucFirst = this.ucFirst.bind(this);
  }

  /* поиск */
  onChange(search) {
    this.setState({ search: search.replace(/\s+/g, ' ') });
  }

  ucFirst(str) {
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
        <div key={id}>
          <Cell
            key={id}
            size='l'
            expandable={true}
            multiline={true}
            asideContent={IS_PLATFORM_ANDROID?<Icon24Chevron className="Cell__chevron"/>:''}
            onClick={() => {
              this.props.variable.goForward("page");
              this.props.updateData.updateData(post)
            }}
            bottomContent={
              <div>
                <div className="post_td">
                  <div className="post_tags">
                    {post.tags.map((tag, id) => (
                      <div className="post_tag" key={id}>{this.ucFirst(tag)}</div>
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
          <Separator style={{ margin: '5px 0' }} />
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
