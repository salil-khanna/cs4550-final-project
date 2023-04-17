import React from 'react';
import { Container, Row, Col, Spinner } from 'react-bootstrap';
import { useMediaQuery } from 'react-responsive';
import './DisplayThree.css'

const DisplayThree = ({title, data, CardComponent, isLoading}) => {
  const isExtraLarge = useMediaQuery({ minWidth: 1200 });
  const isLarge = useMediaQuery({ minWidth: 992, maxWidth: 1199 });
  const isMedium = useMediaQuery({ minWidth: 768, maxWidth: 991 });
  const isSmall = useMediaQuery({ maxWidth: 767 });

  if (isLoading) {
    return (
      <div>
        { !isSmall && <h4>{title}</h4> }
        <div className="d-flex justify-content-center align-items-center">
          <Spinner animation="border" />
        </div>
      </div>
    );
  }
  const cardTable = 
  (
    <div className="scrollable-container">
      <div className="d-flex">
        {data.map((bit) => (
          <div key={bit.key} className="card-container">
            <CardComponent bit={bit} />
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <Container className="mb-2">
      { !isSmall && <h4>{title}</h4> }
      {isExtraLarge ? (
        <Row>
          {data.map((bit) => (
            <Col key={bit.key} xl={4}>
              <CardComponent bit={bit} />
            </Col>
          ))}
        </Row>
      ) : isLarge || isMedium ? (
        cardTable
      ) : (
        <Row>
          {data.map((bit) => (
            <Col key={bit.key} sm={12} className="mb-2">
              <CardComponent bit={bit} />
            </Col>
          ))}
        </Row>
      )}
    </Container>
  )
}

export default DisplayThree