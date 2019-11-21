import React, { Component } from 'react';
import {
  Panel, PanelHeader, Link
} from '@vkontakte/vkui';
import '../css/profile.css';

import imageVKLogo from '../images/vk_logo.png';
import imageGlobe from '../images/globe.png';

class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {};
    this.onChange = this.onChange.bind(this);
  }

  onChange(e) {
    const { name, value } = e.currentTarget;
    this.setState({ [name]: value });
  }

  render() {
    return (
      <Panel id="profile">
        <PanelHeader>Профиль</PanelHeader>
        <div className="profile_feedback">
          <div className="profile_title">Обратная связь</div>
          <div className="profile_links">
            <Link href="https://vk.com/voenmeh_app" target="_blank">
              <div className="profile_item">
                <div className="profile_links_img" style={{ backgroundImage: `url(${imageVKLogo})` }} />
                <div className="profile_links_text">
                  <div className="profile_links_title">voenmeh_app</div>
                  <div className="profile_links_sub">Сообщество сервиса</div>
                </div>
              </div>
            </Link>

            <Link href="https://vk.com/krethub" target="_blank">
              <div className="profile_item">
                <div className="profile_links_img" style={{ backgroundImage: `url(${imageVKLogo})` }} />
                <div className="profile_links_text">
                  <div className="profile_links_title">krethub</div>
                  <div className="profile_links_sub">Владислав Кретов</div>
                </div>
              </div>
            </Link>

            <div className="profile_item">
              <div className="profile_links_img" style={{ backgroundImage: `url(${imageGlobe})` }} />
              <div className="profile_links_text">
                <div className="profile_links_title">BOT-X.me</div>
                <div className="profile_links_sub">Сайт разработчика</div>
              </div>
            </div>
          </div>
        </div>
      </Panel>
    );
  }
}

export default Profile;
