import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import RecentReviews from './RecentReviews';
import { Container, Row, Col, Image, Dropdown } from 'react-bootstrap';
import './HomePage.css';
import { toast } from 'react-toastify';
import { useMediaQuery } from 'react-responsive';
import LogoHeader from '../img/logo512.png';
import { usePopper } from 'react-popper';

const CustomDropdownMenu = React.forwardRef(
  ({ children, style, className, 'aria-labelledby': labeledBy }, ref) => {
    const [popperElement, setPopperElement] = useState(null);
    const { styles, attributes } = usePopper(ref, popperElement, {
      modifiers: [
        { name: 'offset', options: { offset: [0, 10] } },
        { name: 'flip', enabled: true },
      ],
      placement: 'bottom',
    });

    return (
      <div
        ref={setPopperElement}
        style={{ ...styles.popper, ...style }}
        className={className}
        aria-labelledby={labeledBy}
        {...attributes.popper}
      >
        {children}
      </div>
    );
  },
);


const Home = () => {
  const [searchText, setSearchText] = useState('');
  const navigate = useNavigate();

  const toastId = React.useRef(null);
  const notify = () => toastId.current = toast.error("Search can not be empty!");
  const update = () => toast.update(toastId.current);
  
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchText === '') {
      if (toast.isActive(toastId.current)) {
        update();
      } else {
        notify();
      }
    } else {
      toast.dismiss();
      navigate(`/search`, { state: { searchText } });
    }
  };

  const isMobile = useMediaQuery({ query: '(max-width: 575px)' });
  const buttonMobileClass = isMobile ? 'text-center' : '';

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = (event) => {
    if (event.target.closest(".details-summary")) {
    setIsDropdownOpen(!isDropdownOpen);
    }
  };

  return (
    <Container className="home-page">
      <div className="logo-and-search">
        <Row className="text-center">
        <a href="/" style={{textDecoration:'none', color: 'inherit'}}>
          <Col className="d-flex justify-content-center align-items-center">
              <Image src={LogoHeader} alt="GalleryGrade Logo" className="logo" roundedCircle />
              <h1 className="gallery-grade-text">GalleryGrade</h1>
          </Col>
          </a>
        </Row>
        <div className="shorten">
          <form onSubmit={handleSearchSubmit} className="row mt-1 search-row">
            <div className="col-12 col-sm-9 mt-2">
              <input
                type="text"
                className="form-control"
                placeholder="Search for art!"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
              />
            </div>
            <div className={`col-12 ${buttonMobileClass} col-sm-2 mt-2`}>
              <button type="submit" className="btn btn-primary">
                Search!
              </button>
            </div>
          </form>
        </div>
      </div>
      <Row className="text-center">
        <Row className="dropdown-wrapper">
          <div className={`details-dropdown mt-2${isDropdownOpen ? ' open' : ''}`} >
            <div className="details-summary" onClick={toggleDropdown}>
              <span className="arrow"></span>
              <span>Recent Reviews!</span>
            </div>
            
              <div className="details-content mt-2">
                <RecentReviews dropdownOpen={isDropdownOpen}/>
              </div>
            
          </div>
        </Row>
      </Row>
    </Container>
  );
};

export default Home;
