import React, { useState, useRef, useEffect } from 'react';
import './Carousel.sass';

const Carousel = ({ panels }) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [carouselHeight, setCarouselHeight] = useState('auto');
    const [direction, setDirection] = useState('next'); // Track animation direction
    const carouselRef = useRef(null);
  
    useEffect(() => {
      // Update carousel height based on the active panel
      if (carouselRef.current) {
        const activePanel = carouselRef.current.querySelector('.panel.active');
        if (activePanel) {
          setCarouselHeight(`${activePanel.offsetHeight}px`);
        }
      }
    }, [activeIndex]);
  
    const handleNext = () => {
      setDirection('next');
      setActiveIndex((prevIndex) => (prevIndex + 1) % panels.length);
    };
  
    const handlePrevious = () => {
      setDirection('prev');
      setActiveIndex((prevIndex) =>
        prevIndex === 0 ? panels.length - 1 : prevIndex - 1
      );
    };
  
    return (
      <div
        className="carousel"
        ref={carouselRef}
        style={{ height: carouselHeight }}
      >
        {panels.map((panel, index) => {
          // Calculate position class based on index and direction
          let positionClass = '';
  
          if (index === activeIndex) {
            positionClass = 'active';
          } else if (
            direction === 'next' &&
            index === (activeIndex - 1 + panels.length) % panels.length
          ) {
            positionClass = 'previous';
          } else if (
            direction === 'prev' &&
            index === (activeIndex + 1) % panels.length
          ) {
            positionClass = 'next';
          }
  
          return (
            <div
              key={index}
              className={`panel ${positionClass}`}
              style={{
                transform:
                  positionClass === 'active'
                    ? 'translateX(0)'
                    : positionClass === 'previous'
                    ? 'translateX(-100%)'
                    : positionClass === 'next'
                    ? 'translateX(100%)'
                    : 'translateX(100%)', // <=  Fix for going forward (translateX(100%))
              }}
            >
              {panel}
            </div>
          );
        })}
        <button className="prev-button" onClick={handlePrevious}>
          Previous ({(activeIndex - 1 + panels.length) % panels.length})
        </button>
        <button>{activeIndex}</button>
        <button className="next-button" onClick={handleNext}>
          Next ({(activeIndex + 1) % panels.length})
        </button>
      </div>
    );
  };

const RenderCarousel = () => {
    const panels = [
        // <div style={{ background: 'red', minHeight: '300px' }}>Panel 1</div>,
        // <div style={{ background: 'blue', minHeight: '500px' }}>Panel 2</div>,
        // <div style={{ background: 'green', minHeight: '400px' }}>Panel 3</div>,
        <div style={{ padding: '40px' }}>Lorem ipsum odor amet, consectetuer adipiscing elit. Aipsum efficitur ac odio; faucibus porta phasellus. Diam platea eu; dolor suspendisse velit etiam nascetur? Cubilia pretium risus cubilia tortor maximus.</div>,
        <div style={{ padding: '40px' }}>Blandit montes a aliquet vitae himenaeos nam dolor. Ultricies habitant sapien nisi class tortor nisl tortor commodo. Varius dolor cubilia ullamcorper elit tellus. Sagittis congue semper turpis praesent pretium. Nam ligula luctus sit nisi; blandit penatibus arcu quis. Lectus libero odio torquent, leo lacus facilisis velit himenaeos.Id blandit malesuada potenti nulla habitant. Urna ante conubia cras dolor nulla urna fermentum. Fusce aptent tortor iaculis turpis mus nostra fringilla curabitur. Fermentum taciti elit morbi, tellus scelerisque finibus diam. Mus quam nisi nisi litora magnis, maximus consectetur pulvinar? Interdum finibus facilisis ridiculus magnis placerat tristique.</div>,
        <div style={{ padding: '40px' }}>Id blandit malesuada potenti nulla habitant. Urna ante conubia cras dolor nulla urna fermentum. Fusce aptent tortor iaculis turpis mus nostra fringilla curabitur. Fermentum taciti elit morbi, tellus scelerisque finibus diam. Mus quam nisi nisi litora magnis, maximus consectetur pulvinar? Interdum finibus facilisis ridiculus magnis placerat tristique.</div>,
    ];
    return (
        <Carousel panels={panels} />
    );
}

export default RenderCarousel;
