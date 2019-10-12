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
        <div style={{
          width: "100%",
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'column'
        }}>
          <img src={require('../images/archive.png')} style={{ width: "40%", marginTop: "30%" }} />
          <span style={{ marginTop: "40px", fontWeight: "550", color: "#7f8285", width: "80%", textAlign: "center" }}>Мы активно работаем над развитием этого раздела<br /><br />Загляните сюда попозже!</span>
        </div>
      </Panel>
    );
  }
}

export default Archive;
