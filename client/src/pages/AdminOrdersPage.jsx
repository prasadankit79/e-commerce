import React, { useEffect, useState } from 'react';
import {
  Container,
  Typography,
  Box,
  Paper,
  Button,
  Tabs,
  Tab,
} from '@mui/material';
import axios from 'axios';

const AdminOrderPage = () => {
  const [orders, setOrders] = useState([]);
  const [tabIndex, setTabIndex] = useState(0);

  const fetchOrders = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/orders');
      setOrders(res.data);
    } catch (error) {
      console.error('Failed to fetch orders', error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleStatusUpdate = async (orderId, newStatus) => {
    try {
      await axios.put(`http://localhost:5000/api/orders/${orderId}`, {
        status: newStatus,
      });
      fetchOrders(); // Refresh orders
    } catch (error) {
      console.error('Failed to update status', error);
    }
  };

  const filteredOrders = orders.filter((order) => {
    if (tabIndex === 0) return order.status === 'pending';
    if (tabIndex === 1) return order.status === 'confirmed';
    if (tabIndex === 2) return order.status === 'rejected';
    return true;
  });

  return (
    <Container maxWidth="md">
      <Typography variant="h4" gutterBottom sx={{ mt: 4 }}>
        Admin Order Dashboard
      </Typography>

      <Tabs value={tabIndex} onChange={(e, newValue) => setTabIndex(newValue)}>
        <Tab label="Pending" />
        <Tab label="Confirmed" />
        <Tab label="Rejected" />
      </Tabs>

      {filteredOrders.map((order) => (
        <Paper key={order._id} sx={{ p: 3, my: 2 }}>
          <Typography variant="h6" gutterBottom>
            Order ID: {order._id}
          </Typography>
          <Typography variant="body1" gutterBottom>
            Address: {order.address}
          </Typography>

          {order.items.map((item, index) => (
            <Typography key={index} variant="body2">
              {item.name} x {item.quantity} - ₹{item.price * item.quantity}
            </Typography>
          ))}

          <Box sx={{ mt: 2 }}>
            <Typography>Status: {order.status}</Typography>
            {order.status === 'pending' && (
              <Box sx={{ mt: 1 }}>
                <Button
                  variant="contained"
                  color="success"
                  onClick={() => handleStatusUpdate(order._id, 'confirmed')}
                  sx={{ mr: 1 }}
                >
                  Confirm
                </Button>
                <Button
                  variant="contained"
                  color="error"
                  onClick={() => handleStatusUpdate(order._id, 'rejected')}
                >
                  Reject
                </Button>
              </Box>
            )}
          </Box>
        </Paper>
      ))}
    </Container>
  );
};

export default AdminOrderPage;
