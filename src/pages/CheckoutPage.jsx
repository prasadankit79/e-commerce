import React, { useContext, useState } from 'react';
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  Paper,
  Divider,
} from '@mui/material';
import axios from 'axios';
import { useCart } from '../context/CartContext';


const CheckoutPage = () => {
  const { cartItems, clearCart } = useCart();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: ''
  });

  const handlePlaceOrder = async () => {
    const { name, email, phone, address } = formData;
    if (!name || !email || !phone || !address || cartItems.length === 0) {
      alert('Please fill in all fields and ensure your cart is not empty.');
      return;
    }

    const order = {
      items: cartItems.map(item => ({
        _id: item._id?.toString(),
        name: item.name,
        price: item.price,
        quantity: item.quantity
      })),
      name,
      email,
      phone,
      address
    };

    try {
      await axios.post('http://localhost:5000/api/orders', order);
      alert('Order placed successfully!');
      clearCart();
    } catch (error) {
      console.error('Order error:', error);
      alert('Failed to place order');
    }
  };

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <Container maxWidth="md">
      <Paper sx={{ p: 4, mt: 5 }}>
        <Typography variant="h5" gutterBottom>
          Checkout
        </Typography>

        <Box>
          {cartItems.map((item, index) => (
            <Box key={item._id || index} sx={{ mb: 2 }}>
              <Typography variant="body1">
                {item.name} x {item.quantity} - ₹{item.price * item.quantity}
              </Typography>
            </Box>
          ))}
        </Box>

        <Divider sx={{ my: 2 }} />

        <Typography variant="h6" gutterBottom>
          Your Details
        </Typography>

        <TextField
          label="Full Name"
          name="name"
          fullWidth
          sx={{ mb: 2 }}
          value={formData.name}
          onChange={handleChange}
        />
        <TextField
          label="Email"
          name="email"
          type="email"
          fullWidth
          sx={{ mb: 2 }}
          value={formData.email}
          onChange={handleChange}
        />
        <TextField
          label="Phone Number"
          name="phone"
          type="tel"
          fullWidth
          sx={{ mb: 2 }}
          value={formData.phone}
          onChange={handleChange}
        />
        <TextField
          label="Delivery Address"
          name="address"
          fullWidth
          multiline
          rows={4}
          sx={{ mb: 2 }}
          value={formData.address}
          onChange={handleChange}
        />

        <Button
          variant="contained"
          color="primary"
          sx={{ mt: 3 }}
          onClick={handlePlaceOrder}
        >
          Place Order
        </Button>
      </Paper>
    </Container>
  );
};

export default CheckoutPage;
