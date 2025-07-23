import React, { useEffect, useState } from 'react';
import {
  Container,
  Typography,
  Grid,
  Button,
  Rating,
  Box,
} from '@mui/material';
import { useParams } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import flowers from '../data/flowers';

const ProductDetailPage = () => {
  const { id } = useParams();
  const [flower, setFlower] = useState(null);
  const { addToCart } = useCart();

  useEffect(() => {
    const found = flowers.find((f) => f.id === parseInt(id));
    setFlower(found);
  }, [id]);

  if (!flower) return <Typography>Loading...</Typography>;

  return (
    <Container sx={{ py: 5 }}>
      <Box
        sx={{
          p: 4,
          boxShadow: 3,
          borderRadius: 4,
          backgroundColor: 'white',
        }}
      >
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                p: 2,
                backgroundColor: '#f5f5f5',
                borderRadius: 2,
              }}
            >
              <img
                src={flower.image}
                alt={flower.name}
                style={{
                  maxHeight: '350px',
                  width: '100%',
                  objectFit: 'contain',
                  borderRadius: '10px',
                }}
              />
            </Box>
          </Grid>

          <Grid item xs={12} md={6}>
            <Typography variant="h4" gutterBottom>
              {flower.name}
            </Typography>
            <Typography variant="h5" color="green" gutterBottom>
              ₹{flower.price}
            </Typography>
            <Rating value={flower.rating} readOnly precision={0.5} />
            <Typography sx={{ mt: 2 }}>{flower.description}</Typography>

            <Typography sx={{ mt: 2 }} color={flower.inStock ? 'green' : 'red'}>
              {flower.inStock ? 'In Stock' : 'Out of Stock'}
            </Typography>

            <Button
              variant="contained"
              sx={{ mt: 3, backgroundColor: '#d81b60' }}
              onClick={() => addToCart(flower)}
            >
              Add to Cart
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default ProductDetailPage;
