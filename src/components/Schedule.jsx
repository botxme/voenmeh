import React, { Component } from 'react';
import { View, Panel, PanelHeader, Div, Separator } from '@vkontakte/vkui';
import '../css/schedule.css';
import DatePickerComponent from './DatePickerComponent.jsx';

class Schedule extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lessons: [],
      schedule: JSON.parse(localStorage.getItem('shed'))
    };
    this.pickDate = this.pickDate.bind(this);
  }

  pickDate(d) {
    const fillDay = (last) => {
      const zv = [
        ["9:00", "10:35"],
        ["10:50", "12:25"],
        ["12:40", "14:15"],
        ["14:55", "16:30"],
        ["16:45", "18:20"],
        ["18:30", "19:55"],
        ["20:05", "21:30"],
      ]
      for (var i = 0; i < last; i++) {
        lessons[i] = {
          Time: zv[i],
          TypeLesson: 'Пара отсутствует',
          Discipline: 'Кажется можно отдохнуть!',
          Classroom: '',
          Lecturer: ''
        }
      }
    }

    var { lessons } = this.state;
    const { odd, even } = this.state.schedule;

    let weekDay = d.weekday();
    let k = d.week() / 2;

    //console.log('47', weekDay, k)
    if (weekDay == -1) return this.setState({ lessons: [null] });
    if (!odd[weekDay] || !even[weekDay]) return this.setState({ lessons: [null] });

    let les = [];
    if (k != Math.floor(k)) {
      console.log('четная', weekDay, k)

      even[weekDay].map(l => {
        les[l.numb - 1] = l
      })

      this.setState({ lessons: les })
    } else {
      console.log('нечетная', weekDay, k)

      odd[weekDay].map(l => {
        les[l.numb - 1] = l
      })

      this.setState({ lessons: les })
    }
  }

  render() {
    const lessons = this.state.lessons.map((les, id) => {
      if (!les) return (
        <div key={id} style={{
          width: "100%",
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'column'
        }}>
          <img src={require('../images/schedule.png')} style={{ width: "40%", marginTop: "30%" }} />
          <span style={{ marginTop: "40px", fontWeight: "550", color: "#7f8285", width: "80%", textAlign: "center" }}>Кажется, сегодня пар нет<br />Можно отдохнуть!</span>
        </div>
      )

      //console.log(les)
      const { Time, TypeLesson, Discipline, Classroom, Lecturer, numb } = les;
      return (<div key={id}>
        <div className="lesson">
          <div className="lesson_time">
            <div>{Time[0]}</div>
            <div className="lesson_numb">{numb}</div>
            <div>{Time[1]}</div>
          </div>
          <div className="lesson_border"></div>
          <div className="lesson_content">
            <div className="lesson_type">{TypeLesson.toUpperCase()}</div>
            <div className="lesson_name">{Discipline}</div>
            {Classroom ? <div className="lesson_room">Аудитория: {Classroom}</div> : false}
            {Lecturer.ShortName ? <div className="lesson_teacher">Преподаватель: {Lecturer.FullName ? Lecturer.FullName : Lecturer.ShortName}</div> : false}
          </div>
        </div>
        <Separator /></div>)
    }

    );

    return (
      <Panel id="schedule">
        <PanelHeader>Расписание</PanelHeader>
        <div className="lessons_date">
          <DatePickerComponent variable={this} />
        </div>
        <div className="lessons">
          {lessons}
        </div>
      </Panel>
    );
  }
}

export default Schedule;
