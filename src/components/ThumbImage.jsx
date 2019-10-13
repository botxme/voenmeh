import React, { Component } from 'react';
import '../css/ThumbImage.css';

class ThumbImage extends Component {
  constructor(props) {
    super(props);
  }

  render() {
		let { url, sizePadding, style } = this.props
		let imgStyle = {
			background: `#EDEEF0 url(${url}) no-repeat center center/cover `,
		}
		let wrapperStyle = {
			...style,
			paddingTop: sizePadding + '%'
		}
		return <div className="ThumbImage">
			<div className={"ThumbImage__image-wrapper"} style={wrapperStyle}>
				<span className="ThumbImage__image" style={imgStyle}>
				</span>
			</div>
		</div>
	}
}

export default ThumbImage;