import React, { Component } from 'react';
import { Panel, PanelHeader, PanelHeaderBack, Div } from '@vkontakte/vkui';
import '../css/page.css';

class Page extends Component {
  constructor(props) {
    super(props);

    this.state = {

    };
  }

  render() {
    const { id, title, content, date, time, tags } = this.props.data;
    return (
      <Panel id='page'>
        <PanelHeader left={<PanelHeaderBack onClick={() => this.props.variable.changePanel('feed')} />}>Новости</PanelHeader>
        <Div className="page">
          <div className="page_title">{title}</div>
          <div className="page_content">{content}</div>
        </Div>
      </Panel>
    );
  }
}

export default Page;
