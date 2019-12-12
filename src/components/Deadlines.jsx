/* eslint-disable react/prefer-stateless-function */
/* eslint-disable global-require */
import React, { Component } from 'react';
import {
  Panel, PanelHeader
} from '@vkontakte/vkui';
import '../css/deadlines.css';

class Deadlines extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Panel id="time">
        <PanelHeader>Дедлайны</PanelHeader>
        <div style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'column'
        }}
        >
          <div style={{width: '150px', height: '150px', marginTop: '25vw' }}>
            <img src={require('../images/deadline.png')} style={{ width: '100%', height: '100%' }} />
          </div>
          <span style={{
            marginTop: '40px', fontWeight: '550', color: '#7f8285', width: '80%', textAlign: 'center'
          }}
          >
            Мы активно работаем над развитием этого раздела
            <br />
            <br />
            Загляните сюда попозже!
          </span>
        </div>
        {/* <Div>
          <div className="activetasks">
            <div className="activetasks_title">
              Активные ({this.state.active.length})
            </div>
            <Div>{active} </Div>

    </div>
        </Div> */}
      </Panel>
    );
  }
}

export default Deadlines;
