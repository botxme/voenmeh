import React, { Component } from 'react';
import { View, Panel, PanelHeader, Select, FormLayout, Div } from '@vkontakte/vkui';
import '../css/settings.css';
import Groups from './groups.js';

class Settings extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const groups = Groups.map((group) => (
      <option value={JSON.stringify(group)} key={group.id}>{group.name}</option>
    ));

    const Group = JSON.parse(localStorage.getItem('group'));

    return (
      <Panel id="settings">
        <PanelHeader>Настройки</PanelHeader>
        <FormLayout>
          <Select top="Группа" placeholder="Выберите группу" value={JSON.stringify(Group)}>
            {groups}
          </Select>
        </FormLayout>
      </Panel>
    );
  }
}

export default Settings;
