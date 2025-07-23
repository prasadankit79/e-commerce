import React, { useState } from 'react';
import {
  Container,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  Box,
  useMediaQuery,
  IconButton,
} from '@mui/material';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import CloseIcon from '@mui/icons-material/Close';

import NavBar from './components/NavBar';
import HeroCarousel from './components/HeroCarousel';
import FlowerSection from './components/FlowerSection';
import CartPage from './pages/CartPage';
import ProductDetailPage from './pages/ProductDetailPage';
import CheckoutPage from './pages/CheckoutPage';
import SuccessPage from './pages/SuccessPage';
import SignupPage from './pages/SignupPage';
import LoginPage from './pages/LoginPage';
import ScrollToTop from './components/ScrollToTop';
import Footer from './components/Footer';
import { CartProvider } from './context/CartContext';
import flowers from './data/flowers';
import AdminLoginPage from './pages/AdminLoginPage';
import AdminUploadPage from './pages/AdminUploadPage';
import AdminProductManager from './pages/AdminProductManager';
import AdminOrdersPage from './pages/AdminOrdersPage';

import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

function App() {
  const [selected, setSelected] = useState(null);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const getFlowersByCategory = (category) =>
    flowers.filter((f) => f.category === category);

  return (
    <CartProvider>
      <Router>
        <ScrollToTop />
        <Box
          sx={{
            backgroundImage:
              'url("https://img.freepik.com/premium-vector/soft-floral-pattern-with-delicate-line-art-ideal-elegant-off-white-background_531810-211.jpg")',
            backgroundRepeat: 'repeat',
            backgroundAttachment: 'fixed',
            backgroundSize: 'cover',
            minHeight: '100vh',
          }}
        >
          <NavBar />

          <Routes>
            <Route
              path="/"
              element={
                <>
                  <HeroCarousel />
                  <Container sx={{ mt: 6 }}>
                    <Typography variant="h4" align="center" gutterBottom>
                      Explore Our Flower Categories
                    </Typography>

                    <FlowerSection
                      title="Birthday Flowers"
                      flowers={getFlowersByCategory('Birthday')}
                      onView={setSelected}
                    />
                    <FlowerSection
                      title="Anniversary Specials"
                      flowers={getFlowersByCategory('Anniversary')}
                      onView={setSelected}
                    />
                    <FlowerSection
                      title="Combo Offers"
                      flowers={getFlowersByCategory('Combo')}
                      onView={setSelected}
                    />
                    <FlowerSection
                      title="Exotic Collection"
                      flowers={getFlowersByCategory('Exotic')}
                      onView={setSelected}
                    />
                  </Container>

                  <Dialog
                    open={!!selected}
                    onClose={() => setSelected(null)}
                    fullWidth
                    maxWidth="sm"
                    fullScreen={fullScreen}
                  >
                    <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      {selected?.name}
                      <IconButton onClick={() => setSelected(null)}>
                        <CloseIcon />
                      </IconButton>
                    </DialogTitle>
                    <DialogContent>
                      {selected?.images && selected.images.length > 0 && (
                        <Carousel showThumbs={false} autoPlay infiniteLoop>
                          {selected.images.map((img, idx) => (
                            <Box
                              key={idx}
                              component="img"
                              src={img}
                              alt={`${selected.name} ${idx + 1}`}
                              sx={{
                                maxWidth: '100%',
                                maxHeight: 350,
                                objectFit: 'contain',
                                borderRadius: 2,
                                mx: 'auto',
                              }}
                            />
                          ))}
                        </Carousel>
                      )}
                      <Typography variant="h6" sx={{ mt: 2 }}>₹{selected?.price}</Typography>
                      <Typography sx={{ mt: 1 }}>{selected?.description}</Typography>
                      <Typography sx={{ mt: 1, fontWeight: 'bold', color: 'green' }}>
                        {selected?.inStock ? 'In Stock' : 'Out of Stock'}
                      </Typography>
                    </DialogContent>
                  </Dialog>
                </>
              }
            />

            <Route path="/product/:id" element={<ProductDetailPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/success" element={<SuccessPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/admin" element={<AdminLoginPage />} />
            <Route path="/admin/upload" element={<AdminUploadPage />} />
            <Route path="/admin/orders" element={<AdminOrdersPage />} />
            <Route path="/admin/products" element={<AdminProductManager />} />

          </Routes>

          <Footer />
        </Box>
      </Router>
    </CartProvider>
  );
}

export default App;
