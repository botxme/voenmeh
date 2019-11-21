/* eslint-disable linebreak-style */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */

import React, { Component } from 'react';
import '../css/carousel.css';
import Slider from 'react-slick';
import ThumbImage from './ThumbImage.jsx';
import '../css/slick.css';
import '../css/slick-theme.css';

class Carousel extends Component {
  constructor(props) {
    super(props);

    this.carousel = null;
    this.justSwiped = false;

    this.onVideoClick = this.onVideoClick.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
    this.componentWillUnmount = this.componentWillUnmount.bind(this);
    this.isSingleImage = this.isSingleImage.bind(this);
    this.touchStart = this.touchStart.bind(this);
    this.preventTouch = this.preventTouch.bind(this);
  }

  componentDidMount() {
    if (this.carousel) {
      this.carousel.addEventListener('touchstart', this.touchStart);
      this.carousel.addEventListener('touchmove', this.preventTouch, { passive: false });
    }
  }

  componentWillUnmount() {
    this.carousel.removeEventListener('touchstart', this.touchStart);
    this.carousel.removeEventListener('touchmove', this.preventTouch, { passive: false });
  }

  onVideoClick(e) {
    if (!this.justSwiped) {
      return;
    }
    this.justSwiped = false;
    e.target.click();
  }

  isSingleImage() {
    return this.props.list.length === 1;
  }

  touchStart(e) {
    this.firstClientX = e.touches[0].clientX;
    this.firstClientY = e.touches[0].clientY;
  }

  preventTouch(e) {
    const minValue = 5; // threshold

    this.clientX = e.touches[0].clientX - this.firstClientX;
    this.clientY = e.touches[0].clientY - this.firstClientY;

    if (Math.abs(this.clientX) > minValue) {
      e.preventDefault();
      e.returnValue = false;
      return false;
    }

    return true;
  }

  render() {
    const { list, sizePadding } = this.props;
    const settings = {
      customPaging: () => (
        <div className="Carousel__dot" />
      ),
      centerMode: !this.isSingleImage(),
      centerPadding: '16px',
      dots: true,
      infinite: true,
      speed: 500,
      arrows: false,
      placeholders: false,
      slidesToShow: 1,
      slidesToScroll: 1,
      dotsClass: 'Carousel__dot-list',
      autoplay: !!this.props.autoplay,
      autoplaySpeed: 5000,
      onSwipe: () => {
        this.justSwiped = true;
      }
    };
    return (
      <div
        ref={(el) => {
          this.carousel = el;
        }}
        className="Carousel"
        style={{ maxWidth: this.props.deviceWidth }}
        onTouchMove={(e) => e.preventDefault()}
      >
        {/* eslint-disable-next-line react/jsx-props-no-spreading */}
        <Slider {...settings}>
          {list.map((cover, key) => (
            // eslint-disable-next-line react/no-array-index-key
            <div key={key} onTouchMove={(e) => e.preventDefault()}>
              <div
                className={!this.isSingleImage() ? 'Carousel__image-multiple safari-scale-border-radius-fix' : ''}
              >
                {!cover.preview ? <ThumbImage url={cover.image.url} sizePadding={sizePadding} /> : (
                  <div
                    className="Carousel__video"
                    style={{ background: `#FFFFFF url(${cover.preview}) no-repeat center center/contain `, paddingTop: `${sizePadding}%` }}
                  >
                    <span className="Carousel__play" />
                  </div>
                )}
              </div>
            </div>
          ))}
        </Slider>
      </div>
    );
  }
}

export default Carousel;
