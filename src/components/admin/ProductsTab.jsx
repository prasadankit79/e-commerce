import React from 'react';
import { List, ListItem, ListItemText, Typography, Paper } from '@mui/material';

const mockProducts = [
  { name: 'Rose Bouquet', price: '₹499' },
  { name: 'Lily Vase', price: '₹899' },
];

const ProductsTab = () => (
  <Paper elevation={2} sx={{ p: 2, borderRadius: 2 }}>
    <Typography variant="h6" gutterBottom>Products</Typography>
    <List>
      {mockProducts.map((product, index) => (
        <ListItem key={index}>
          <ListItemText primary={product.name} secondary={`Price: ${product.price}`} />
        </ListItem>
      ))}
    </List>
  </Paper>
);

export default ProductsTab;
