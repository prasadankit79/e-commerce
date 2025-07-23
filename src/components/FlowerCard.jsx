import React from 'react';
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActionArea,
  Box,
  Chip,
  Rating,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

function FlowerCard({ flower }) {
  const navigate = useNavigate();

  const stockStatus = Math.random() > 0.5 ? 'In Stock' : 'Few Left';
  const rating = flower.rating || 4.2; // Default rating if not provided

  return (
    <Card
      sx={{
        width: 250,
        borderRadius: 4,
        boxShadow: '0 4px 14px rgba(0,0,0,0.1)',
        transition: 'transform 0.3s ease',
        '&:hover': {
          transform: 'scale(1.03)',
          boxShadow: '0 6px 20px rgba(0,0,0,0.15)',
        },
      }}
    >
      <CardActionArea onClick={() => navigate(`/product/${flower.id}`)}>
        <CardMedia
          component="img"
          height="180"
          image={flower.image}
          alt={flower.name}
        />
        <CardContent>
          <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
            {flower.name}
          </Typography>

          <Typography variant="body2" color="text.secondary">
            ₹{flower.price}
          </Typography>

          <Box mt={1}>
            <Chip
              label={stockStatus}
              color={stockStatus === 'In Stock' ? 'success' : 'warning'}
              size="small"
            />
          </Box>

          <Box mt={1}>
            <Rating value={rating} precision={0.5} readOnly size="small" />
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default FlowerCard;
