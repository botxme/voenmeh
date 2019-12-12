/* eslint-disable no-unused-expressions */
/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable class-methods-use-this */
import React, { Component } from 'react';
import {
  Panel, PanelHeader, Search, Cell, Separator, IS_PLATFORM_ANDROID
} from '@vkontakte/vkui';
import '../css/newsfeed.css';
import Icon24Chevron from '@vkontakte/icons/dist/24/chevron';
import Carousel from './Carousel.jsx';

class NewsFeed extends Component {
  constructor(props) {
    super(props);

    this.state = {
      search: ''
    };

    this.onChange = this.onChange.bind(this);
    this.firstLetterUP = this.firstLetterUP.bind(this);
  }

  /* поиск */
  onChange(search) {
    this.setState({ search: search.replace(/\s+/g, ' ') });
  }

  get sposts() {
    const search = this.state.search.toLowerCase();
    const { News } = this.props;
    if (search.substr(0, 1) === '#') {
      return News.filter(({ tags }) => tags.join(' ').toLowerCase().indexOf(search.substr(1)) > -1);
    }

    return News.filter(({ title, author }) => (title + author).toLowerCase().indexOf(search) > -1);
  }

  firstLetterUP(str) {
    return str[0].toUpperCase() + str.slice(1);
  }

  render() {
    const posts = this.sposts.length > 0
      && this.sposts.map((post) => (
        <div key={post.id}>
          <Cell
            size="l"
            expandable
            multiline
            asideContent={IS_PLATFORM_ANDROID ? <Icon24Chevron className="Cell__chevron" /> : ''}
            onClick={() => {
              this.props.variable.goForward('page');
              this.props.updateData.updateData(post);
            }}
            bottomContent={(
              <div>
                <div className="post_td">
                  <div className="post_tags">
                    {post.tags.map((tag, id) => (
                      // eslint-disable-next-line react/no-array-index-key
                      <div className="post_tag" key={id}>{`#${tag.toLowerCase()}`}</div>
                    ))}
                  </div>
                </div>
                <div className="post_bot">
                  <div className="post_date">
                    {`${post.date} в ${post.time}`}
                  </div>
                  <div className="post_author">
                    {` · ${post.author}`}
                  </div>
                </div>
              </div>
            )}
          >
            <div className="post_title">{post.title}</div>
          </Cell>
          <Separator />
        </div>
      ));

    const zaglushka = (
      <div style={{
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column'
      }}
      >
        <span style={{
          marginTop: '45px', fontWeight: '450', color: '#7f8285', width: '80%', textAlign: 'center'
        }}
        >
Новостей по запросу
          <br />
не найдено!
        </span>
      </div>
    );


    return (
      <Panel id="feed">
        <PanelHeader>Новости</PanelHeader>
        <Search value={this.state.search} onChange={this.onChange} className="NewsFeedSearch" />
        {this.state.search.length === 0 ? (
          <Carousel
            list={this.props.banners}
            autoplay
            sizePadding={52.63}
          />
        ) : null}
        {this.sposts.length === 0 ? zaglushka : null}
        <div className="posts">{posts}</div>
      </Panel>
    );
  }
}

export default NewsFeed;
