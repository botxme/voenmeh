import React, { Component } from 'react';
import { View, Panel, PanelHeader, Div, Group } from '@vkontakte/vkui';
import '../css/deadlines.css';

class Deadlines extends Component {
  constructor(props) {
    super(props);

    this.state = {
      active: [{
        title: "Теоретические основы информатики",
        task: "Выполнить практическую работу №1",
        dl: "10.10.2019, 10:10"
      }, {
        title: "Сервис вконтакте",
        task: "Зарелизить сервис для кафедры И5",
        dl: "30.11.2019, 23:59"
      }],
      fulfilled: [{
        title: "#студлидер2019",
        task: "Сделать презентацию к поездке в Выборг",
        dl: "05.10.2019, 9:41"
      }],
      unfulfilled: [{
        title: "купить зонтик",
        task: "Куда же я без зонта в Санкт-Петербурге?",
        dl: "30.09.2019, 23:59"
      }]
    };
  }

  render() {
    const active = this.state.active.map(({ title, task, dl }) => (
      <div className="active" key={title}>
        <div className="active_img" style={{ backgroundImage: `url(${require('../images/active.png')})` }} />
        <div className="task">
          <div className="task_title">
            {title.toUpperCase()}
          </div>
          <div className="task_task">
            {task}
          </div>
          <div className="task_dl">
            до {dl}
          </div>
        </div>
      </div>
    ));

    return (
      <Panel id="time">
        <PanelHeader>Дедлайны</PanelHeader>
        <div className="img_obman_scam" style={{ backgroundImage: `url(${require('../images/scam1.png')})` }} />
        <Div className="img_obman_scamplus" style={{ backgroundImage: `url(${require('../images/scam2.png')})` }} />
        {/*<Div>
          <div className="activetasks">
            <div className="activetasks_title">
              Активные ({this.state.active.length})
            </div>
            <Div>{active} </Div>
            
    </div> 
        </Div>*/}
      </Panel>
    );
  }
}

export default Deadlines;
