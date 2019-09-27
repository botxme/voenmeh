import React, { Component } from 'react';
import { Root, Div, Button, View, Panel, PanelHeader, FormLayout, Avatar, Select, FormLayoutGroup, Group, List, Cell } from '@vkontakte/vkui';
import '../css/first.css';
import Groups from './groups.js';

class FirstScr extends Component {
  constructor(props) {
    super(props);

    this.state = { group: "" }
    this.onChange = this.onChange.bind(this);
  }

  onChange(e) {
    const { name, value } = e.currentTarget;
    this.setState({ [name]: value });
  }

  render() {
    const groups = Groups.map((group) => (
      <option value={group} key={group.toString()}>{group}</option>
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
              console.log(this.state.group);
              localStorage.group = this.state.group;
              this.props.variable.changePage('schedule');
            }} size="l" stretched style={{ margin: 0 }}>Продолжить</Button>
          </Div>
        </FormLayout>
      </Panel>
    );
  }
}

export default FirstScr;
