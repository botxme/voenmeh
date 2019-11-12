import React, { Component } from 'react';
import { Panel, PanelHeader, Search, Cell, Separator, IS_PLATFORM_ANDROID, Spinner } from '@vkontakte/vkui';
import '../css/newsfeed.css';
import Carousel from './Carousel.jsx'

import Icon24Chevron from '@vkontakte/icons/dist/24/chevron';

class NewsFeed extends Component {
  constructor(props) {
    super(props);

    this.state = {
      search: ''
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
    const { News } = this.props;
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
        <Carousel list={this.props.banners}
          autoplay={true}
          sizePadding={52.63} />
        <div className="posts">{posts}</div>
      </Panel>
    );
  }
}

export default NewsFeed;
