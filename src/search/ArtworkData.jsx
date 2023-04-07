import React from 'react'

const ArtworkData = ({ artworkData }) => {
  return (
    <div className="row">
      {artworkData.length === 0 ? (
        <div className="col text-center">
          <h4>No artwork found! Please search again.</h4>
        </div>
      ) : (
        artworkData.map((item, index) => (
          <div key={index} className="col-md-4 text-center">
            <img src={item.imageUrl} alt={item.title} className="img-fluid" />
            <p className="mt-2">{item.title}</p>
          </div>
        ))
      )}
    </div>
  )
}

export default ArtworkData