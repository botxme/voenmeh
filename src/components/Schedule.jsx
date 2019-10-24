import React, { Component } from 'react';
import { View, Panel, PanelHeader, Div, Separator } from '@vkontakte/vkui';
import '../css/schedule.css';

import Icon16Dropdown from '@vkontakte/icons/dist/16/dropdown';

var moment = require('moment');

import DatePickerComponent from './DatePickerComponent.jsx';

class Schedule extends Component {
  constructor(props) {
    super(props);

    this.state = {
      lessons: [
        {
          time: ['9:00', '10:35'],
          type: 'Лекция',
          name: 'Введение в специальность',
          room: '314 (главный корпус)',
          teacher: 'Бондарев Евгений Сергеевич'
        },
        {
          time: ['10:50', '12:25'],
          type: 'Пара отсутствует',
          name: 'Наконец можно отдохнуть!',
          room: '',
          teacher: ''
        },
        {
          time: ['12:40', '14:15'],
          type: 'Практика',
          name: 'Ин. язык - английский',
          room: '526а* (новый корпус)',
          teacher: 'Лаптева Александра Вадимовна'
        },
        {
          time: ['14:55', '16:30'],
          type: 'Практика',
          name: 'Математика-1',
          room: '214* (новый корпус)',
          teacher: 'Брацлавский Аркадий Александрович'
        }
      ]
    };

    this.changeDateInput = this.changeDateInput.bind(this);
  }

  changeDateInput(value) {
    const choosedDate = moment(`${value.format('YYYY-MM-DD')}T${moment(this.state.info.date).format('HH:mm')}`);
    this.setState(Object.assign(this.state.info, { date: choosedDate }));
  }

  render() {
    const lessons = this.state.lessons.map(({ time, type, name, room, teacher }) => (
      <div key={time + name + room}>
        <div className="lesson">
          <div className="lesson_time">
            <div>{time[0]}</div>
            <div>{time[1]}</div>
          </div>
          <div className="lesson_border"></div>
          <div className="lesson_content">
            <div className="lesson_type">{type.toUpperCase()}</div>
            <div className="lesson_name">{name}</div>
            {room ? <div className="lesson_room">Аудитория: {room}</div> : false}
            {teacher ? <div className="lesson_teacher">Преподаватель: {teacher}</div> : false}
          </div>
        </div>
        <Separator /></div>
    ));

    return (
      <Panel id="schedule">
        <PanelHeader>Расписание</PanelHeader>
        <div className="lessons_date">
          <DatePickerComponent /> {/* <Icon16Dropdown style={{ marginLeft: "5px" }} /> */}
        </div>
        <div className="lessons">
          {lessons}
        </div>
      </Panel>
    );
  }
}

export default Schedule;
