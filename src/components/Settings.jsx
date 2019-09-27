import React, { Component } from 'react';
import { View, Panel, PanelHeader, Select, FormLayout } from '@vkontakte/vkui';
import '../css/settings.css';
import Groups from './groups.js';

class Settings extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const groups = Groups.map((group) => (
      <option value={group} key={group.toString()}>{group}</option>
    ));

    return (
      <Panel id="settings">
        <PanelHeader>Настройки</PanelHeader>
        <FormLayout>
          <Select top="Группа" placeholder="Выберите группу" value={localStorage.group}>
            {groups}
          </Select>
        </FormLayout>
      </Panel>
    );
  }
}

export default Settings;
