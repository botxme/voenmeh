import React, { Component } from 'react';
import { View, Panel, PanelHeader, Select, FormLayout, Div } from '@vkontakte/vkui';
import '../css/profile.css';
import constants from './constants';

class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      faculty: JSON.stringify(constants.api.filter(fac => {
        return fac.faculty === localStorage.getItem('faculty');
      })[0]),
      group: localStorage.getItem('group')
    };
    this.onChange = this.onChange.bind(this);
    this.initLocal = this.initLocal.bind(this);
  }

  onChange(e) {
    const { name, value } = e.currentTarget;
    this.setState({ [name]: value });
  }

  initLocal(fac) {
    // запись расписания в localstorage для определенной группы
    switch (fac || localStorage.getItem('faculty')) {
      case '«И»':
        return localStorage.setItem('shed', JSON.stringify(require('./formatGroupI.json')[JSON.parse(this.state.group).id]));
      default:
        return null
    }
  }

  render() {
    this.initLocal();
    const faculties = constants.api.map((fac, id) => (
      <option value={JSON.stringify(fac)} key={id}>{fac.faculty}</option>
    ))

    console.log(this.state)

    const groups = this.state.faculty ? JSON.parse(this.state.faculty).groups.map((fac, id) => (
      <option value={JSON.stringify(fac)} key={id}>{fac.name}</option>
    )) : <option value={null}></option>

    return (
      <Panel id="profile">
        <PanelHeader>Профиль</PanelHeader>
        <FormLayout>
          <Select
            top="Факультет"
            placeholder="Не выбран"
            onChange={this.onChange}
            value={this.state.faculty}
            name="faculty">
            {faculties}
          </Select>
          <Select
            top="Группа"
            placeholder="Не выбрана"
            onChange={this.onChange}
            value={this.state.group}
            disabled={!this.state.faculty}
            name="group">
            {groups}
          </Select>
        </FormLayout>
      </Panel>
    );
  }
}

export default Profile;
