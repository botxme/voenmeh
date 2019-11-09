import React, { Component } from 'react';
import { Panel, Button } from '@vkontakte/vkui';

import Slider from 'react-slick'

import Icon24BrowserForward from '@vkontakte/icons/dist/24/browser_forward';

import './Page.css';

class Onboarding extends Component {
  constructor() {
    super();

    this.state = {
      slideIndex: 0,
      count: 0
    }

    this.slider = null
    this.justSwiped = false
    this.next = this.next.bind(this);
  }

  next() {
    this.slider.slickNext();
  }

  render() {
    const { pages } = this.props;
    let settings = {
      centerMode: false,
      autoplay: false,
      dots: false,
      infinite: false,
      slidesToShow: 1,
      slidesToScroll: 1,
      beforeChange: (current, next) => this.setState({ slideIndex: next }),
      customPaging: i => this.setState({ count: i })
    };

    const PageDot = ({ selected, id }) => (
      <div
        className="dot"
        style={{
          width: (selected ? '8px' : '6px'),
          height: (selected ? '8px' : '6px')
        }}
        onClick={() => {
          this.slider.slickGoTo(id)
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
      <Panel id="onboarding" style={{ height: "90vh" }}>
        <Slider {...settings} ref={c => (this.slider = c)}>
          {pages.map((page, key) => {
            let { image, title, subtitle } = page;
            let { slideIndex } = this.state;
            return <div key={key} className="onboarding">
              <img src={image} className="image" />

              <span className="title">{title}</span>
              <span className="subtitle">{subtitle}</span>

              <Button
                onClick={() => {
                  slideIndex == 5 ? this.props.variable.changePage('first') : this.next()
                }}
                size="l"
                stretched
                className="button_Panel"
                style={{ margin: 0 }}>
                {slideIndex == 5 ? 'Всё понятно!' : <div>Далее <Icon24BrowserForward style={{ display: "inline-block", verticalAlign: "middle" }} width={14} height={14} /></div>}

              </Button>

              <PageDots pages={6} currentPage={slideIndex} />
            </div>
          })
          }
        </Slider>
      </Panel>
    );
  }
}

export default Onboarding;