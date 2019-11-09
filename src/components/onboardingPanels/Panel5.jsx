import React, { Component } from 'react';
import './Page.css';
import { Panel, Div, Button } from '@vkontakte/vkui';
import phone from './phone5.png';

import Icon24BrowserForward from '@vkontakte/icons/dist/24/browser_forward';

class Panel5 extends Component {
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
			<Panel id="panel5" >
				<div className="onboarding">
					<img src={phone} className="image" />

					<span className="text1">Настрой сервис под себя!</span>
					<span className="text2">По умолчанию включены все виды уведомлений<br/>и сортировка новостной ленты по факультетам.</span>

					<Div className="button_Panel">
						<Button
							onClick={() => {
								this.props.variable.changePanelOnBoarding('first');
							}}
							size="l"
							stretched
							style={{ margin: 0 }}>
							Всё понятно!
						</Button>
					</Div>

					<PageDots pages={6} currentPage={5} />
				</div>
			</Panel >
		)
	}
}

export default Panel5;