import React, { useCallback, useEffect, useState, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import ArtworkData from './ArtworkData';
import { useMediaQuery } from 'react-responsive';
import { toast } from 'react-toastify';

const Search = () => {
  const location = useLocation();
  const state = location.state;

  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState(state ? state.searchText : '');
  const [artworkData, setArtworkData] = useState([]);
  const [loading, setLoading] = useState(false);

  const isMobile = useMediaQuery({ query: '(max-width: 575px)' });
  const buttonMobileClass = isMobile ? 'text-center mt-2' : '';
  const inputRef = useRef(null);


  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  };

  const handleSearch = useCallback( async () => {
    setLoading(true);

    const url = `https://api.artic.edu/api/v1/artworks/search?q=${searchTerm}&query[term][is_public_domain]=true&limit=20&fields=id,title,image_id`;
    const response = await axios.get(url);
    const result = response.data;
    const base_url = result.config.iiif_url;

    const imageData = result.data
      .filter((item) => item.image_id !== null)
      .map((item) => ({
        image_id: item.image_id,
        title: item.title,
      }));

    shuffleArray(imageData);

    let validImages = [];

    for (const item of imageData) {
      if (validImages.length >= 6) {
        break;
      }

      const imageUrl = `${base_url}/${item.image_id}/full/320,/0/default.jpg`;
      const imageInfoResponse = await axios.get(
        `${base_url}/${item.image_id}/info.json`
      );
      console.log(item)
      console.log(imageInfoResponse.data)

      const { height, width } = imageInfoResponse.data;
      const scaledHeight = (height * 320) / width;

      if (scaledHeight < 600) {
        validImages.push({
          ...item,
          imageUrl,
        });
      }
    }

    setArtworkData(validImages);
    setLoading(false);
  }, [searchTerm]);

  useEffect(() => {
    if (state) {
      navigate(location.pathname, { state: null, replace: true });
      handleSearch();
    }
  }, [handleSearch, state, navigate, location.pathname]);

  const toastId = React.useRef(null);
  const notify = () => toastId.current = toast.error("Search can not be empty!");
  const update = () => toast.update(toastId.current);
  const handleSubmit = (event) => {
    event.preventDefault();
    if (searchTerm === '') {
      if (toast.isActive(toastId.current)) {
        update();
      } else {
        notify();
      }
    } else {
      toast.dismiss();
      handleSearch();
      inputRef.current.blur();
    } 
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="row mt-2">
        <div className="col-12 col-sm-11">
          <input
            ref={inputRef}
            type="text"
            className="form-control"
            placeholder="Search for art!"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className={`col-12 col-sm-1 ${buttonMobileClass}`}>
          <button type="submit" className="btn btn-primary">
            Search!
          </button>
        </div>
      </form>
      <div className="row mt-4 justify-content-center align-items-center">
        {loading ? (
          <div className="col text-center">
            <h4>Loading...</h4>
          </div>
        ) : <ArtworkData artworkData={artworkData} />}
      </div>
    </div>
  );
}

export default Search