import React, { useEffect, useState } from 'react';
import {
  Container,
  Typography,
  Box,
  Paper,
  Divider,
  Button,
} from '@mui/material';
import { CheckCircleOutline } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const SuccessPage = () => {
  const [order, setOrder] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const stored = localStorage.getItem('latestOrder');
    if (stored) {
      setOrder(JSON.parse(stored));
    }
  }, []);

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(to right, #fefefe, #f3f3f3)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        py: 10,
      }}
    >
      <Container maxWidth="sm">
        <Paper elevation={4} sx={{ p: 5, textAlign: 'center', borderRadius: 4 }}>
          <CheckCircleOutline sx={{ fontSize: 80, color: 'green', mb: 2 }} />
          <Typography variant="h4" gutterBottom>
            Thank You!
          </Typography>
          <Typography variant="subtitle1">
            Your order has been placed successfully.
          </Typography>

          {order && (
            <>
              <Divider sx={{ my: 3 }} />
              <Typography variant="h6">Order Summary</Typography>
              {order.cartItems.map((item, index) => (
                <Box
                  key={index}
                  display="flex"
                  justifyContent="space-between"
                  mt={1}
                >
                  <Typography>{item.name}</Typography>
                  <Typography>₹{item.price}</Typography>
                </Box>
              ))}
              <Divider sx={{ my: 2 }} />
              <Typography variant="subtitle2" color="text.secondary">
                Name: {order.name}
              </Typography>
              <Typography variant="subtitle2" color="text.secondary">
                Address: {order.address}, {order.city}, {order.state} -{' '}
                {order.zip}
              </Typography>
              <Typography variant="subtitle2" color="text.secondary">
                Phone: {order.phone}
              </Typography>
            </>
          )}

          <Button
            variant="contained"
            color="primary"
            sx={{ mt: 4 }}
            onClick={() => navigate('/')}
          >
            Back to Home
          </Button>
        </Paper>
      </Container>
    </Box>
  );
};

export default SuccessPage;
