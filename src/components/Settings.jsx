import React, { Component } from 'react';
import { View, Panel, PanelHeader } from '@vkontakte/vkui';
import '../css/settings.css';

class Settings extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Panel id="settings">
        <PanelHeader>Настройки</PanelHeader>
        <div className="text">
          А тут пусто!
        </div>
      </Panel>
    );
  }
}

export default Settings;
