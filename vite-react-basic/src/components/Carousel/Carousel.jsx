import React, { useState, useRef, useEffect } from 'react';
import './Carousel.sass';
import Navi from '@/components/Navi/Navi'

const Carousel = ({ panels }) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [carouselHeight, setCarouselHeight] = useState('auto');
    const [direction, setDirection] = useState('next'); // Track animation direction
    const carouselRef = useRef(null);
  
    useEffect(() => {
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
    
    const handleSkip = (targetIndex) => {
        setDirection((targetIndex > activeIndex) ? 'next' : 'prev');
        setActiveIndex(targetIndex);
    }
  
    return (
        <>
            <div
                className={`carousel dir-${direction}`}
                ref={carouselRef}
                style={{ height: carouselHeight }}
            >
                {panels.map((panel, index) => {
                let positionClass = '';
                if (index === activeIndex) {
                    positionClass = 'active';
                } else if(index > activeIndex){
                    positionClass = 'next';
                } else if(index < activeIndex){
                    positionClass = 'previous';
                }
                
                // Infinite logic
                // if (index === activeIndex) {
                //     positionClass = 'active';
                // } else if (index === (activeIndex - 1 + panels.length) % panels.length ) {
                //     positionClass = 'previous';
                // } else if ( index === (activeIndex + 1) % panels.length ) {
                //     positionClass = 'next';
                // } else {
                //     positionClass = (direction === 'next') ? 'next' : 'previous'; 
                // }
        
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
                            : '',
                    }}
                    >
                    {panel}
                    </div>
                );
                })}
                <button className="prev-button" disabled={activeIndex === 0} onClick={handlePrevious}>
                Previous
                </button>
                <button className="next-button" disabled={activeIndex === panels.length -1} onClick={handleNext}>
                Next
                </button>
            </div>
            <div className="dots">
                <ul>
                {panels.map((panel, index) => {
                    return (
                        <li key={index}>
                          <button 
                            className={index === activeIndex ? 'active' : ''} 
                            onClick={() => handleSkip(index)}
                          >
                            {index + 1}
                          </button>
                        </li>
                    );
                })}
                </ul>
            </div>
        </>
      
    );
  };

const RenderCarousel = () => {
    const panels = [
        <div>
            <h4>Panel 1</h4>
            <p>Lorem ipsum odor amet, consectetuer adipiscing elit. Aipsum efficitur ac odio; faucibus porta phasellus. Diam platea eu; dolor suspendisse velit etiam nascetur? Cubilia pretium risus cubilia tortor maximus.</p>
        </div>,
        <div>
            <h4>Panel 2</h4>
            <p>Blandit montes a aliquet vitae himenaeos nam dolor. Ultricies habitant sapien nisi class tortor nisl tortor commodo. Varius dolor cubilia ullamcorper elit tellus. Sagittis congue semper turpis praesent pretium. Nam ligula luctus sit nisi; blandit penatibus arcu quis. Lectus libero odio torquent, leo lacus facilisis velit himenaeos.Id blandit malesuada potenti nulla habitant. Urna ante conubia cras dolor nulla urna fermentum. Fusce aptent tortor iaculis turpis mus nostra fringilla curabitur. Fermentum taciti elit morbi, tellus scelerisque finibus diam. Mus quam nisi nisi litora magnis, maximus consectetur pulvinar? Interdum finibus facilisis ridiculus magnis placerat tristique.</p>
        </div>,
        <div>
            <h4>Panel 3</h4>
            <div className="faux-image"><span>IMAGE HERE</span></div>
        </div>,
        <div>
            <h4>Panel 4</h4>
            <p>Velit blandit etiam etiam; porta mi litora.</p>
            <h4>Panel 4</h4>
            <p>Velit blandit etiam etiam; porta mi litora.Fusce aptent tortor iaculis turpis mus nostra fringilla curabitur. Fermentum taciti elit morbi, tellus scelerisque finibus diam. Mus quam nisi nisi litora magnis, maximus consectetur pulvinar? Interdum finibus facilisis ridiculus magnis placerat tristique.</p>
        </div>,
        <div>
            <h4>Panel 5</h4>
            <p>Blandit montes a aliquet vitae himenaeos nam dolor. Ultricies habitant sapien nisi class tortor nisl tortor commodo. </p>
            <div className="faux-image small"><span>IMAGE HERE</span></div>
        </div>,
        <div>
            <h4>Panel 6</h4>
            <p>Id blandit malesuada potenti nulla habitant. Urna ante conubia cras dolor nulla urna fermentum. Fusce aptent tortor iaculis turpis mus nostra fringilla curabitur. Fermentum taciti elit morbi, tellus scelerisque finibus diam. Mus quam nisi nisi litora magnis, maximus consectetur pulvinar? Interdum finibus facilisis ridiculus magnis placerat tristique.</p>
        </div>,
        <div>
            <h4>Panel 7</h4>
            <p>Urna ante conubia cras dolor.</p>
            <div className="faux-image"><span>IMAGE HERE</span></div>
        </div>,
    ];
    return (
      <>
        <Navi />
        <Carousel panels={panels} />
      </>
        
    );
}

export default RenderCarousel;
