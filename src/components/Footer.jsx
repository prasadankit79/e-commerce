import React from 'react';
import { Box, Container, Grid, Typography, IconButton } from '@mui/material';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import EmailIcon from '@mui/icons-material/Email';

const Footer = () => (
  <Box
    sx={{
      backgroundColor: '#f8f8f8',
      borderTop: '1px solid #ddd',
      pt: 6,
      pb: 4,
      mt: 8,
    }}
  >
    <Container maxWidth="lg">
      <Grid container spacing={4}>
        {/* About Us */}
        <Grid item xs={12} md={4}>
          <Typography variant="h6" gutterBottom>
            About Us
          </Typography>
          <Typography variant="body2" color="text.secondary">
            V K Flora Growers And Suppliers — Wholesale Fresh Cut Flowers, Fillers & Foliages.
            We serve across India, 365 days a year.
          </Typography>
        </Grid>

        {/* Contact */}
        <Grid item xs={12} md={4}>
          <Typography variant="h6" gutterBottom>
            Contact
          </Typography>
          <Typography variant="body2" color="text.secondary">
            📞 +91‑9353015993 / +91‑9341285611
          </Typography>
          <Typography variant="body2" color="text.secondary">
            📧 lokeshvkflora@gmail.com
          </Typography>
          <Typography variant="body2" color="text.secondary">
            📍 No 14/2, Near Wilson Garden Club, 9th Cross, Wilson Garden, Bangalore, Karnataka 560027
          </Typography>
        </Grid>

        {/* Follow Us */}
        <Grid item xs={12} md={4}>
          <Typography variant="h6" gutterBottom>
            Follow Us
          </Typography>
          <IconButton href="https://instagram.com/vkflora" target="_blank">
            <InstagramIcon />
          </IconButton>
          <IconButton href="https://facebook.com/vkflorawholesalers" target="_blank">
            <FacebookIcon />
          </IconButton>
          <IconButton href="mailto:lokeshvkflora@gmail.com">
            <EmailIcon />
          </IconButton>
        </Grid>
      </Grid>

      <Box mt={4} textAlign="center">
        <Typography variant="body2" color="text.secondary">
          © {new Date().getFullYear()} V K Flora Growers And Suppliers. All Rights Reserved.
        </Typography>
      </Box>
    </Container>
  </Box>
);

export default Footer;
