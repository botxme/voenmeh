import React, { Component } from 'react';
import './Page.css';
import { Panel, Div, Button } from '@vkontakte/vkui';
import phone from './phone0.png';

import Icon24BrowserForward from '@vkontakte/icons/dist/24/browser_forward';

class Panel0 extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		const PageDot = ({ selected, id }) => (
			<div
				className="dot"
				style={{
					width: (selected ? '8px' : '6px'),
					height: (selected ? '8px' : '6px')
				}}
				onClick={() => {
					this.props.variable.changePanelOnBoarding('panel' + id)
				}} />
		);

		const PageDots = ({ pages, currentPage }) => (
			<div className="dots">
				{Array.from(new Array(pages), (x, i) => i).map(page => (
					<PageDot key={page} selected={page === currentPage} id={page} />
				))}
			</div>
		);

		return (
			<Panel id="panel0" >
				<div className="onboarding">
					<img src={phone} className="image" />

					<span className="text1">Встречайте —<br />Военмех ВКонтакте</span>
					<span className="text2">Первый локальный студенческий сервис<br />внутри социальной сети.<br />Не нужно ничего скачивать и устанавливать —<br />это чудесно, не правда ли?</span>

					<Div className="button_Panel">
						<Button
							onClick={() => {
								this.props.variable.changePanelOnBoarding('panel1');
							}}
							size="l"
							stretched
							style={{ margin: 0 }}>
							Далее <Icon24BrowserForward style={{ display: "inline-block", verticalAlign: "middle" }} width={14} height={14} />
						</Button>
					</Div>

					<PageDots pages={6} currentPage={0} />
				</div>
			</Panel >
		)
	}
}

export default Panel0;