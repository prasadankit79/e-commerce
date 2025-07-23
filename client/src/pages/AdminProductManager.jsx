import React, { useEffect, useState } from 'react';
import {
  Container, Typography, Box, TextField, Button, Paper, MenuItem, Grid
} from '@mui/material';
import axios from 'axios';

const AdminProductManager = () => {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [form, setForm] = useState({ name: '', price: '', category: '', image: '' });
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const res = await axios.get('http://localhost:5000/api/products');
    setProducts(res.data);

    // Extract unique categories
    const uniqueCategories = [...new Set(res.data.map(p => p.category))];
    setCategories(uniqueCategories);
  };

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleAddOrUpdate = async () => {
    if (editingProduct) {
      await axios.put(`http://localhost:5000/api/products/${editingProduct._id}`, form);
    } else {
      await axios.post('http://localhost:5000/api/products', form);
    }
    setForm({ name: '', price: '', category: '', image: '' });
    setEditingProduct(null);
    fetchData();
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setForm({
      name: product.name,
      price: product.price,
      category: product.category,
      image: product.image
    });
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      await axios.delete(`http://localhost:5000/api/products/${id}`);
      fetchData();
    }
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        🌸 Manage Products
      </Typography>

      <Paper sx={{ p: 3, mb: 4 }}>
        <Typography variant="h6" gutterBottom>
          {editingProduct ? 'Edit Product' : 'Add New Product'}
        </Typography>

        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Name"
              name="name"
              fullWidth
              value={form.name}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField
              label="Price"
              name="price"
              type="number"
              fullWidth
              value={form.price}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField
              select
              label="Category"
              name="category"
              fullWidth
              value={form.category}
              onChange={handleChange}
            >
              {categories.map((cat, i) => (
                <MenuItem key={i} value={cat}>{cat}</MenuItem>
              ))}
              <MenuItem value="__new">Add new...</MenuItem>
            </TextField>
          </Grid>
          {form.category === '__new' && (
            <Grid item xs={12}>
              <TextField
                label="New Category"
                name="category"
                fullWidth
                onChange={(e) => setForm({ ...form, category: e.target.value })}
              />
            </Grid>
          )}
          <Grid item xs={12}>
            <TextField
              label="Image URL"
              name="image"
              fullWidth
              value={form.image}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" onClick={handleAddOrUpdate}>
              {editingProduct ? 'Update' : 'Add'} Product
            </Button>
            {editingProduct && (
              <Button sx={{ ml: 2 }} onClick={() => {
                setEditingProduct(null);
                setForm({ name: '', price: '', category: '', image: '' });
              }}>
                Cancel
              </Button>
            )}
          </Grid>
        </Grid>
      </Paper>

      <Typography variant="h6" gutterBottom>
        Existing Products
      </Typography>

      <Grid container spacing={2}>
        {products.map(prod => (
          <Grid item key={prod._id} xs={12} sm={6} md={4}>
            <Paper sx={{ p: 2 }}>
              <img src={prod.image} alt={prod.name} style={{ width: '100%', height: 140, objectFit: 'cover' }} />
              <Typography variant="h6">{prod.name}</Typography>
              <Typography>₹{prod.price}</Typography>
              <Typography color="text.secondary">{prod.category}</Typography>
              <Box sx={{ mt: 1 }}>
                <Button size="small" onClick={() => handleEdit(prod)}>Edit</Button>
                <Button size="small" color="error" onClick={() => handleDelete(prod._id)}>Delete</Button>
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default AdminProductManager;
