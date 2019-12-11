/* eslint-disable max-len */
/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable react/prop-types */
/* eslint-disable camelcase */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-unused-expressions */
import React, { Component } from 'react';
import {
  Panel, PanelHeader, Link, Spinner, Avatar, Separator, Select, Switch
} from '@vkontakte/vkui';
import '../css/profile.css';
import connect from '@vkontakte/vk-connect';

import imageVKLogo from '../images/vk_logo.png';
import imageGlobe from '../images/globe.png';

const debug = 0;

class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fac: localStorage.getItem('faculty'),
      faculty: null,
      group: localStorage.getItem('group')
    };

    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    if (debug) {
      this.setState({
        data: {
          first_name: 'Vlad', last_name: 'Biralo', id: 198082755, photo_100: 'https://sun9-47.userapi.com/c850016/v850016414/13ab73/BY7D48azABA.jpg?ava=1'
        }
      });
    }

    connect
      .sendPromise('VKWebAppGetUserInfo')
      .then((data) => {
        !debug ? this.setState({ data }) : null;
      })
      .catch((error) => {
        console.error(error);
      });

    this.props.groupsList.filter((a) => a.faculty === this.state.fac).map((b) => this.setState({ faculty: JSON.stringify(b) }));
  }

  onChange(e) {
    const { name, value } = e.currentTarget;

    if (value.trim().length > 0) {
      this.setState({ [name]: value });
    } else {
      this.setState({ [name]: false });
    }

    if (name === 'group') {
      this.props.variable.setSchedule(value, this.state.group);
      localStorage.setItem('faculty', JSON.parse(this.state.faculty).faculty);
      localStorage.setItem('group', value);
    }
  }

  render() {
    if (!this.state.data) return <Spinner size="large" />;

    const faculties = this.props.groupsList.map((fac) => (
      <option value={JSON.stringify(fac)} key={fac.faculty}>{fac.faculty}</option>
    ));

    const groups = this.state.faculty ? JSON.parse(this.state.faculty).groups.map((group) => (
      <option value={JSON.stringify(group)} key={group.name}>{group.name}</option>
    )) : <option value={null} />;

    const {
      last_name, first_name, photo_100
    } = this.state.data;
    return (
      <Panel id="profile">
        <PanelHeader>Профиль</PanelHeader>
        <div className="profile_vk">
          <div className="ava_vk">
            <Avatar src={photo_100} size={65} />
          </div>
          <div className="name_vk">
            <div className="flname">{`${first_name} ${last_name}`}</div>
            <div className="status">студент</div>
          </div>
        </div>
        <Separator style={{ margin: '0' }} />

        <div className="group_data">
          <div className="profile_title">Данные</div>

          <div className="fac_dat">
            <div className="data_name">Факультет</div>
            <div className="data_select">
              <Select
                top="Выбери свой факультет"
                placeholder="Не выбран"
                onChange={this.onChange}
                value={this.state.faculty}
                name="faculty"
              >
                {faculties}
              </Select>
            </div>
          </div>

          <div className="fac_dat">
            <div className="data_name">Группа</div>
            <div className="data_select">
              <Select
                placeholder="Не выбрана"
                onChange={this.onChange}
                value={this.state.group}
                disabled={!this.state.faculty}
                name="group"
              >
                {groups}
              </Select>
            </div>
          </div>
        </div>

        <div className="profile_notify">
          <div className="profile_title">Уведомления</div>
          <div className="profile_notify_deadline">
            <div className="profile_notify_textblock">
              <div className="profile_notify_title">Скоро дедлайн</div>
              <div className="profile_notify_sub">Сервис пришлет уведомление о приближающемся дедлайне</div>
            </div>
            <Switch className="profile_notify_switch" disabled />
          </div>
        </div>

        <div className="profile_feedback">
          <div className="profile_title">Обратная связь</div>
          <div className="profile_links">
            <Link href="https://vk.com/voenmehgo" target="_blank">
              <div className="profile_item">
                <div className="profile_links_img" style={{ backgroundImage: `url(${imageVKLogo})` }} />
                <div className="profile_links_text">
                  <div className="profile_links_title">Сообщество сервиса</div>
                  <div className="profile_links_sub">@voenmehgo</div>
                </div>
              </div>
            </Link>

            <Link href="https://vk.com/krethub" target="_blank">
              <div className="profile_item">
                <div className="profile_links_img" style={{ backgroundImage: `url(${imageVKLogo})` }} />
                <div className="profile_links_text">
                  <div className="profile_links_title">Владислав Кретов</div>
                  <div className="profile_links_sub">@krethub</div>
                </div>
              </div>
            </Link>

            <div className="profile_item">
              <div className="profile_links_img" style={{ backgroundImage: `url(${imageGlobe})` }} />
              <div className="profile_links_text">
                <div className="profile_links_title">Сайт разработчика</div>
                <div className="profile_links_sub">BOT-X.me</div>
              </div>
            </div>
          </div>
        </div>
      </Panel>
    );
  }
}

export default Profile;
