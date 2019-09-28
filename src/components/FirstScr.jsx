import React, { Component } from 'react';
import { Root, Div, Button, View, Panel, PanelHeader, FormLayout, Avatar, Select, FormLayoutGroup, Group, List, Cell } from '@vkontakte/vkui';
import '../css/first.css';
import Groups from './groups.js';

class FirstScr extends Component {
  constructor(props) {
    super(props);

    this.state = { group: {}, disabled: true }
    this.onChange = this.onChange.bind(this);
  }

  onChange(e) {
    const { name, value } = e.currentTarget;
    this.setState({ [name]: value });
    this.setState({ disabled: false });
  }

  render() {
    const groups = Groups.map((group) => (
      <option value={JSON.stringify(group)} key={group.id}>{group.name}</option>
    ));

    return (
      <Panel id="first" >
        <PanelHeader>Авторизация</PanelHeader>
        <FormLayout>
          <Avatar className="logo center" size={80} type="app" src={require('../images/logo.png')} />
          <FormLayoutGroup className="select_group">
            <div className="center">Пожалуйста, выберите свою группу</div>
            <Select placeholder="Не выбрана" onChange={this.onChange} value={this.state.group} name="group">
              {groups}
            </Select>
          </FormLayoutGroup>

          <Div className="button_FirstPage">
            <Button onClick={() => {
              localStorage.setItem('group', this.state.group);
              this.props.variable.changePage('schedule');
            }} size="l" stretched style={{ margin: 0 }} disabled={this.state.disabled}>Продолжить</Button>
          </Div>
        </FormLayout>
      </Panel>
    );
  }
}

export default FirstScr;
