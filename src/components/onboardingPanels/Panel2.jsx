import React, { Component } from 'react';
import './Page.css';
import { Panel, Div, Button } from '@vkontakte/vkui';
import phone from './phone2.png';

import Icon24BrowserForward from '@vkontakte/icons/dist/24/browser_forward';

class Panel2 extends Component {
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
			<Panel id="panel2" >
				<div className="onboarding">
					<img src={phone} className="image" />

					<span className="text1">Создавай дедлайны!</span>
					<span className="text2">Укажи название задачи, комментарий и время.<br/>Когда сроки начнут гореть —<br/>сервис пришлет уведомление ВКонтакте.</span>

					<Div className="button_Panel">
						<Button
							onClick={() => { // кнопка далее. panel{id+1}
								this.props.variable.changePanelOnBoarding('panel3');
							}}
							size="l"
							stretched
							style={{ margin: 0 }}>
							Далее <Icon24BrowserForward style={{ display: "inline-block", verticalAlign: "middle" }} width={14} height={14} />
						</Button>
					</Div>

					<PageDots pages={6} currentPage={2} />
				</div>
			</Panel >
		)
	}
}

export default Panel2;