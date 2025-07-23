import React from 'react';
import { Typography, Grid, Box } from '@mui/material';
import FlowerCard from './FlowerCard';

function FlowerSection({ title, flowers }) {
  return (
    <Box
      sx={{
        mt: 6,
        mb: 6,
        mx: 'auto',
        px: 3,
        maxWidth: '1200px',
        backgroundColor: '#ffffff',
        borderRadius: 4,
        boxShadow: '0 4px 20px rgba(0,0,0,0.07)',
        border: '1px solid #eee',
      }}
    >
      <Typography
        variant="h5"
        sx={{
          fontWeight: 'bold',
          pt: 3,
          pb: 2,
          color: '#444',
          textAlign: 'center',
        }}
      >
        {title}
      </Typography>

      <Grid
        container
        spacing={4}
        justifyContent="center"
        sx={{ pb: 4 }}
      >
        {flowers.map((flower) => (
          <Grid item key={flower.id}>
            <FlowerCard flower={flower} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default FlowerSection;
