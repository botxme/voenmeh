import React, { Component } from 'react';
import { Panel, PanelHeader, Separator } from '@vkontakte/vkui';
import '../css/schedule.css';
import DatePickerComponent from './DatePickerComponent.jsx';

class Schedule extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      lessons: [],
      schedule: JSON.parse(localStorage.getItem('shed'))
    };
    this.pickDate = this.pickDate.bind(this);
  }

  pickDate(d) {
    const { odd, even } = this.state.schedule;

    let weekDay = d.weekday();
    let k = d.week() / 2;

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

      const { Time, TypeLesson, Discipline, Classroom, Lecturer, numb } = les;
      return (<div key={id}>
        <Separator style={{ margin: '12px 0' }} />
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
      </div>)
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
