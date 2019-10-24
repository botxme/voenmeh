import React, { Component } from 'react';
import '../css/DatePickerComponent.css';

import moment from 'moment';
import { HorizontalScroll } from '@vkontakte/vkui';
moment.locale('ru');

class DatePickerComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedDayIndex: 0,
      selectedDay: moment(new Date())
    };
    this.dateSelect = this.dateSelect.bind(this);
    this.generateDates = this.generateDates.bind(this);
    this.FirstLetUP = this.FirstLetUP.bind(this);
  }

  componentDidMount() {
    const { firstDate, selectedDate } = this.state;

    const first = firstDate ? moment(firstDate) : moment(new Date());
    const selected = selectedDate ? moment(selectedDate) : first;

    const selectedDayIndex = moment.duration(selected.diff(first)).asDays();

    this.setState({
      selectedDayIndex,
    });
  }

  FirstLetUP(str) {
    return str[0].toUpperCase() + str.slice(1);
  }

  dateSelect(props) {
    const { onDateSelect } = this.props;
    this.setState(
      {
        selectedDayIndex: props.key,
        selectedDay: props.date
      }
    );

    if (typeof onDateSelect === 'function') {
      onDateSelect(props.date);
    }
  };

  generateDates(props) {
    const date = moment(props.firstDate);
    const disabledDates = props.disabledDates ? props.disabledDates : [];

    const first = props.firstDate
      ? moment(props.firstDate)
      : moment(new Date());
    const last = props.lastDate ? moment(props.lastDate) : null;

    const numberOfDays = last
      ? moment.duration(last.diff(first)).asDays() + 1
      : props.numberOfDays;

    const dates = [];
    for (let i = 0; i < numberOfDays; i += 1) {
      const isDisabled = !!disabledDates.includes(date.format('YYYY-MM-DD'));

      dates.push({
        date: date.format('YYYY-MM-DD'),
        day: date.format('D'),
        day_of_week: date.format('dddd'),
        month: date.format('DD MMMM').split(' ')[1],
        disabled: isDisabled,
      });
      date.add(1, 'days');
    }
    return dates;
  };

  render() {
    let days;
    const {
      firstDate,
      lastDate,
      numberOfDays,
      width,
      selectedDay,
      selectedDayIndex
    } = this.state;

    if (width) {
      scrollWidth = width;
    }

    const daysProps = {
      firstDate,
      lastDate,
      numberOfDays: numberOfDays || 31
    };

    const availableDates = this.generateDates(daysProps);

    if (availableDates) {
      days = availableDates.map((val, key) => {
        const selectedStyle = selectedDayIndex === key ? "singleContainer activeDate" : "singleContainer";

        return (
          <div className={selectedStyle}
            key={key}
            disabled={val.disabled}
            onClick={() => {
              console.log(val);
              this.dateSelect({
                key, date: availableDates[key].date
              })
            }}>
            <div className={"singleDateBox"}>
              <div className={"dateContainer"}>
                <div className={"dateText"}>{val.day}</div>
                <div className={"monthText"}>{val.month}</div>
              </div>
              <div className={"dayContainer"}>
                <div className={"dayText"}>
                  {val.day_of_week}
                </div>
              </div>
            </div>
          </div>
        );
      });
    }

    return (<div>
      <HorizontalScroll>
        <div style={{ display: 'flex', padding: '25px 10px' }}>
          {days || null}
        </div>
      </HorizontalScroll>
      <div style={{ paddingLeft: '15px', fontWeight: 500 }}>{this.FirstLetUP(moment(selectedDay).format('dddd, DD MMMM'))}</div>
    </div>
    );
  }
}

export default DatePickerComponent;