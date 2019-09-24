import React, { Component } from 'react';
import { View, Panel, PanelHeader, Select, FormLayout } from '@vkontakte/vkui';
import '../css/settings.css';

class Settings extends Component {
  constructor(props) {
    super(props);

    this.state = {
      groups: ["A-141", "A-151", "A-152", "A-161", "B-151", "B-152"]
    };
  }

  render() {
    const groups = this.state.groups.map((group) => (
      <option value={group} key={group.toString()}>{group}</option>
    ));

    return (
      <Panel id="settings">
        <PanelHeader>Настройки</PanelHeader>
        <FormLayout>
          <Select top="Группа" placeholder="Выберите группу">
            {groups}
          </Select>
        </FormLayout>
      </Panel>
    );
  }
}

export default Settings;
