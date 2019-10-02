import React, { Component } from 'react';
import { View, Panel, PanelHeader, Div } from '@vkontakte/vkui';
import '../css/schedule.css';

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
  }

  render() {
    const lessons = this.state.lessons.map(({ time, type, name, room, teacher }) => (
      <div className="lesson" key={time + name + room}>
        <div className="lesson_time">
          <div>{time[0]}</div>
          <div>{time[1]}</div>
        </div>
        <div className="lesson_border"></div>
        <div className="lesson_content">
          <div className="lesson_type">{type.toUpperCase()}</div>
          <div className="lesson_name">{name}</div>
          {room?<div className="lesson_room">Аудитория: {room}</div>:false}
          {teacher?<div className="lesson_teacher">Преподаватель: {teacher}</div>:false}
        </div>
      </div>
    ));

    return (
      <Panel id="schedule">
        <PanelHeader>Расписание</PanelHeader>
        <Div>
          <div className="lessons_date">
            Среда, 2 октября
          </div>
          <div className="lessons">
            {lessons}
          </div>
        </Div>
      </Panel>
    );
  }
}

export default Schedule;
