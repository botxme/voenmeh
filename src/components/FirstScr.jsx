import React, { Component } from 'react';
import { Button, Panel, FormLayout, Select } from '@vkontakte/vkui';
import '../css/first.css';
import API from '../helpers/API.js';

class FirstScr extends Component {
  constructor(props) {
    super(props);

    this.state = {
      groupsList: []
    };
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    API.request('getGroups', null, "GET", 1).then(value => {
      this.setState({ groupsList: value });
    }).catch(e => {
      console.error(e);
    })
  }

  onChange(e) {
    const { name, value } = e.currentTarget;
    if (value.trim().length > 0) {
      this.setState({ [name]: value });
    } else {
      this.setState({ [name]: false });
    }
  }

  render() {
    const faculties = this.state.groupsList.map((fac, id) => (
      <option value={JSON.stringify(fac)} key={id}>{fac.faculty}</option>
    ))

    const groups = this.state.faculty ? JSON.parse(this.state.faculty).groups.map((fac, id) => (
      <option value={JSON.stringify(fac)} key={id}>{fac.name}</option>
    )) : <option value={null}></option>

    return (
      <Panel id="first" >
        <div className="onboarding">
          {/* <img src={require('../images/firstP_dark.png')} className="image_first" /> */}

          <span className="title">Пора знакомиться!</span>
          <span className="subtitle">Чтобы продолжить работу с сервисом,<br />необходимо выбрать свой факультет и группу.<br />Благодаря этим данным мы сможем фильтровать<br />ленту новостей и показать твоё расписание.</span>

          <FormLayout className="select_group">
            <Select
              top="Выбери свой факультет"
              placeholder="Не выбран"
              onChange={this.onChange}
              value={this.state.faculty}
              name="faculty">
              {faculties}
            </Select>

            <Select
              top="Выбери свою группу"
              placeholder="Не выбрана"
              onChange={this.onChange}
              value={this.state.group}
              disabled={!this.state.faculty}
              name="group">
              {groups}
            </Select>
          </FormLayout>

          <div className="button_next_first">
            <Button
              onClick={() => {
                localStorage.setItem('group', this.state.group);
                localStorage.setItem('faculty', JSON.parse(this.state.faculty).faculty);
                this.props.variable.changePage('schedule');
              }}
              size="l"
              stretched
              className="button_Panel"
              style={{ margin: 0 }}
              disabled={!this.state.group || !this.state.faculty}>
              Поехали!
            </Button>
          </div>
        </div>
      </Panel>
    );
  }
}

export default FirstScr;