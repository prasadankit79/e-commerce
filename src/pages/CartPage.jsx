import React from 'react';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
  Box,
  Paper,
  Divider,
} from '@mui/material';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

const CartPage = () => {
  const { cartItems, removeFromCart } = useCart();
  const navigate = useNavigate();

  const getTotal = () =>
    cartItems.reduce((sum, item) => sum + item.price * (item.quantity || 1), 0);

  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundImage:
          'url("https://media.istockphoto.com/id/650247624/photo/closeup-of-white-wedding-lace-with-floral-pattern.jpg?s=612x612&w=0&k=20&c=3H7ZYh89f9LOBanraknhtL68MY9pElzqexeeDVR1DLQ=")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        py: 6,
      }}
    >
      <Container>
        <Typography variant="h4" gutterBottom>
          Your Cart
        </Typography>

        {cartItems.length === 0 ? (
          <Typography variant="subtitle1">Your cart is empty.</Typography>
        ) : (
          <>
            <Grid container spacing={3}>
              {cartItems.map((item) => (
                <Grid item xs={12} md={6} lg={4} key={item.id}>
                  <Card
                    sx={{
                      transition: '0.3s',
                      '&:hover': { transform: 'scale(1.03)' },
                      borderRadius: 3,
                      boxShadow: 3,
                    }}
                  >
                    <CardMedia
                      component="img"
                      height="200"
                      image={item.image}
                      alt={item.name}
                    />
                    <CardContent>
                      <Typography variant="h6">{item.name}</Typography>
                      <Typography color="text.secondary">
                        ₹{item.price}
                      </Typography>
                      <Button
                        variant="outlined"
                        color="error"
                        sx={{ mt: 2 }}
                        onClick={() => removeFromCart(item.id)}
                      >
                        Remove
                      </Button>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>

            <Paper
              elevation={4}
              sx={{ mt: 5, p: 4, borderRadius: 3, textAlign: 'center' }}
            >
              <Typography variant="h5">Total: ₹{getTotal()}</Typography>
              <Divider sx={{ my: 2 }} />
              <Button
                variant="contained"
                color="primary"
                size="large"
                onClick={() => navigate('/checkout')}
              >
                Proceed to Checkout
              </Button>
            </Paper>
          </>
        )}
      </Container>
    </Box>
  );
};

export default CartPage;
