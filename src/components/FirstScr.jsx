import React, { Component } from 'react';
import { Div, Button, Panel, PanelHeader, FormLayout, Avatar, Select, FormLayoutGroup } from '@vkontakte/vkui';
import '../css/first.css';
import constants from './constants';

class FirstScr extends Component {
  constructor(props) {
    super(props);

    this.state = {};
    this.onChange = this.onChange.bind(this);
    this.initLocal = this.initLocal.bind(this);
  }

  onChange(e) {
    const { name, value } = e.currentTarget;
    if (value.trim().length > 0) {
      this.setState({ [name]: value });
    } else {
      this.setState({ [name]: false });
    }
  }

  initLocal(fac, group) {
    // запись расписания в localstorage для определенной группы
    switch (fac || localStorage.getItem('faculty')) {
      case '«И»':
        return localStorage.setItem('shed', JSON.stringify(require('./formatGroupI.json')[JSON.parse(group).id]));
      default:
        return null
    }
  }

  render() {
    const faculties = constants.api.map((fac, id) => (
      <option value={JSON.stringify(fac)} key={id}>{fac.faculty}</option>
    ))

    const groups = this.state.faculty ? JSON.parse(this.state.faculty).groups.map((fac, id) => (
      <option value={JSON.stringify(fac)} key={id}>{fac.name}</option>
    )) : <option value={null}></option>

    return (
      <Panel id="first" >
        <div className="onboarding">
          <img src={require('../images/firstP_dark.png')} className="image_first" />

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
                this.initLocal(JSON.parse(this.state.faculty).faculty, this.state.group);
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