const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const response = await axios.post('http://localhost:5000/api/products', form);
    alert('✅ Flower uploaded successfully!');
    setForm({
      name: '',
      description: '',
      price: '',
      category: '',
      inStock: true,
      images: [],
    });
  } catch (err) {
    console.error(err);
    alert('❌ Error uploading flower');
  }
};
