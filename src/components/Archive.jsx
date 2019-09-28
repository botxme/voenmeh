import React, { Component } from 'react';
import { View, Panel, PanelHeader } from '@vkontakte/vkui';
import '../css/archive.css';

class Archive extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Panel id="archive">
        <PanelHeader>Архив</PanelHeader>
        <div className="center-text">
          Этот раздел <br /> временно недоступен
        </div>
      </Panel>
    );
  }
}

export default Archive;
