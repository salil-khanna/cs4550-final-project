import React, { useState } from 'react'
import { Spinner } from 'react-bootstrap';

const ArtworkData = ({ artworkData }) => {
    const [loadedImages, setLoadedImages] = useState([]);

    const handleImageLoad = (index) => {
      setLoadedImages((prev) => [...prev, index]);
    };

  return (
    <div className="row">
      {artworkData.length === 0 ? (
        <div className="col text-center">
          <h4>No artwork found! Please search again.</h4>
        </div>
      ) : (
        artworkData.map((item, index) => (
          <div key={index} className="col-md-4 text-center">
            <img
                src={item.imageUrl}
                alt={item.title}
                className="img-fluid"
                onLoad={() => handleImageLoad(index)}
                style={{ display: !loadedImages.includes(index) && 'none' }}
              />
              <div style={{ display: loadedImages.includes(index) ? 'none' : 'block'}} className="justify-content-center align-items-center">
                <Spinner animation="border" />
              </div>
              <p className="mt-2">{item.title}</p>
          </div>
        ))
      )}
    </div>
  )
}

export default ArtworkData