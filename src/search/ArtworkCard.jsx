import React from 'react';
import { Spinner } from 'react-bootstrap';
import { Card, CardMedia, CardContent, Typography, Box } from '@mui/material';
import { useNavigate} from 'react-router-dom';
import './Search.css'

const ArtworkCard = ({ item, index, loadedImages, handleImageLoad, cardOnclick }) => {
  const navigate = useNavigate();

  const handleCardClick = (id) => {
    cardOnclick();
    navigate(`/art/${id}`);
  };

  return (
    <div className="col-md-3 text-center">
      <Card onClick={() => handleCardClick(item.id)} className="mb-4 artwork-card" sx={{ cursor: 'pointer' }}>
        <Box sx={{ position: 'relative'}} className={loadedImages.includes(index) ? '' : 'mb-5'}>
          <CardMedia
            component="img"
            image={item.imageUrl}
            alt={item.title}
            onLoad={() => handleImageLoad(index)}
            style={{ display: !loadedImages.includes(index) && 'none' }}
          />
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              bgcolor: 'rgba(0, 0, 0, 0.1)',
              display: loadedImages.includes(index) ? 'none' : 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
            className="mt-5 "
          >
          <Spinner animation="border" />
          </Box>
        </Box>
        <CardContent>
          <Typography variant="h8" component="div" className={loadedImages.includes(index) ? '' : 'mt-3'}>
            {item.title}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
};

export default ArtworkCard;
