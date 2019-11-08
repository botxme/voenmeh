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
        <PanelHeader>Авторизация</PanelHeader>
        <FormLayoutGroup>
          {/* <Avatar className="logo center" size={80} type="app" src={require('../images/logo.png')} /> */}
          <FormLayout className="select_group">
            <div className="button_top-text">Пожалуйста, выберите свой факультет</div>
            <Select
              placeholder="Не выбран"
              onChange={this.onChange}
              value={this.state.faculty}
              name="faculty">
              {faculties}
            </Select>

            <div className="button_top-text">Пожалуйста, выберите свою группу</div>
            <Select
              placeholder="Не выбрана"
              onChange={this.onChange}
              value={this.state.group}
              disabled={!this.state.faculty}
              name="group">
              {groups}
            </Select>
          </FormLayout>

          <Div className="button_FirstPage">
            <Button
              onClick={() => {
                this.initLocal(JSON.parse(this.state.faculty).faculty, this.state.group);
                localStorage.setItem('group', this.state.group);
                localStorage.setItem('faculty', JSON.parse(this.state.faculty).faculty);
                this.props.variable.changePage('schedule');
              }}
              size="l"
              stretched
              style={{ margin: 0 }}
              disabled={!this.state.group || !this.state.faculty}>
              Продолжить
            </Button>
          </Div>
        </FormLayoutGroup>
      </Panel>
    );
  }
}

export default FirstScr;
