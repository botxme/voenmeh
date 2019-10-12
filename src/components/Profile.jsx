import React, { Component } from 'react';
import { View, Panel, PanelHeader, Select, FormLayout, Div } from '@vkontakte/vkui';
import '../css/profile.css';
import Groups from './groups.js';

class Profile extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const groups = Groups.map((group) => (
      <option value={JSON.stringify(group)} key={group.id}>{group.name}</option>
    ));

    const Group = JSON.parse(localStorage.getItem('group'));

    return (
      <Panel id="profile">
        <PanelHeader>Профиль</PanelHeader>
        <FormLayout>
          <Select top="Группа" placeholder="Выберите группу" value={JSON.stringify(Group)}>
            {groups}
          </Select>
        </FormLayout>
      </Panel>
    );
  }
}

export default Profile;
