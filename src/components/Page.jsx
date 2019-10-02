import React, { Component } from 'react';
import { Panel, PanelHeader, FormLayout, Search, Alert, View, List, Cell, ScreenSpinner, HeaderButton, platform, IOS, Button } from '@vkontakte/vkui';
import '../css/page.css';

import Icon24Back from '@vkontakte/icons/dist/24/back';
import Icon28ChevronBack from '@vkontakte/icons/dist/28/chevron_back';

const osname = platform();

class Page extends Component {
  constructor(props) {
    super(props);

    this.state = {

    };
  }
  // () => this.props.variable.changePage('feed')
  render() {
    console.log(this.props.data);
    return (
      <Panel id="page">
        <PanelHeader
              left={<HeaderButton onClick={() => alert(1)}>{osname === IOS ? <Icon28ChevronBack/> : <Icon24Back/>}</HeaderButton>}
              addon={<HeaderButton onClick={() => alert(1)}>Назад</HeaderButton>}
            >Новости</PanelHeader>


        <Button onClick={() => this.props.variable.changePage('feed')} >Чек</Button>
        <div className="posts">{this.props.data}</div>
      </Panel>
    );
  }
}

export default Page;
