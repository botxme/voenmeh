import React, { Component } from 'react';
import { View, Panel, PanelHeader } from '@vkontakte/vkui';
import '../css/info.css';

class Info extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Panel id="info">
        <PanelHeader>What the fuck</PanelHeader>
        <div className="text">
          Этот раздел <br /> временно недоступен
        </div>
      </Panel>
    );
  }
}

export default Info;
