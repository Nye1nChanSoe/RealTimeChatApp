import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useMessageContext } from '../contexts/MessageContext';

const FullScreenImage = ({ isFullScreen, setIsFullScreen, imageSrc }) => {
  const {imageURLs} = useMessageContext();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const backdrop = 'fixed top-0 left-0 right-0 bottom-0 bg-black z-30';
  const modal = 'w-full h-full flex items-center justify-center';

  useEffect(() => {
    document.addEventListener('keyup', handleKeyPress);
    setCurrentImageIndex(imageURLs.current.indexOf(imageSrc));
    return () => {
      document.removeEventListener('keyup', handleKeyPress);
    };
  }, []);

  const handleKeyPress = (e) => {
    if (e.key === 'Escape') {
      setIsFullScreen(false);
    } else if (e.key === 'ArrowLeft') {
      setCurrentImageIndex((prevIndex) => {
        if(prevIndex - 1 >= 0) {
          return prevIndex - 1;
        }
        return prevIndex;
      });
    } else if (e.key === 'ArrowRight') {
      setCurrentImageIndex((prevIndex) => {
        if(prevIndex + 1 < imageURLs.current.length) {
          return prevIndex + 1;
        }
        return prevIndex;
      })
    }
  };

  return (
    <div onClick={ () => setIsFullScreen(!isFullScreen) } className={ backdrop }>
      <div className={ modal }>
          <img
            src={ imageURLs.current[currentImageIndex] }
            className='max-w-full max-h-full object-contain'
          />
      </div>
    </div>
  );
};

FullScreenImage.propTypes = {
  isFullScreen: PropTypes.bool.isRequired,
  setIsFullScreen: PropTypes.func.isRequired,
  imageSrc: PropTypes.string.isRequired,
};

export default FullScreenImage;