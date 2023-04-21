import React, { useState } from 'react';
import ArtworkCard from './ArtworkCard';

const ArtworkData = ({ artworkData }) => {
    const [loadedImages, setLoadedImages] = useState([]);

    const handleImageLoad = (index) => {
      setLoadedImages((prev) => [...prev, index]);
    };

    const cardOnclick = () => {
      localStorage.setItem('artworkData', JSON.stringify(artworkData));
    };

  return (
    <div className="row">
      {artworkData.length === 0 ? (
        <div className="col text-center">
          <h4>No artwork found! Please search again.</h4>
        </div>
      ) : (
        artworkData.map((item, index) => (
          <ArtworkCard
            key={index}
            item={item}
            index={index}
            loadedImages={loadedImages}
            handleImageLoad={handleImageLoad}
            cardOnclick={cardOnclick}
          />
        ))
      )}
    </div>
  )
}

export default ArtworkData;
