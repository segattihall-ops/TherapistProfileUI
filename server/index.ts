import express from 'express';
import path from 'path';

const app = express();
const PORT = process.env.PORT || 5000;

// Mock therapist data
const mockTherapist = {
  id: 'bruno',
  name: 'Bruno Silva',
  specialty: 'Deep Tissue & Sports Massage',
  bio: 'Professional massage therapist with over 10 years of experience specializing in deep tissue and sports massage therapy.',
  experience: '10+ years',
  location: 'San Francisco, CA',
  rating: 4.9,
  reviewCount: 127,
  hourlyRate: 120,
  availability: ['Mon-Fri: 9AM-6PM', 'Sat: 10AM-4PM'],
  certifications: [
    'Licensed Massage Therapist (LMT)',
    'Certified Sports Massage Therapist',
    'Deep Tissue Specialist'
  ]
};

// API endpoint
app.get('/api/therapist/:id', (req, res) => {
  res.json(mockTherapist);
});

// Serve static files in production
if (process.env.NODE_ENV === 'production') {
  const publicPath = path.join(process.cwd(), 'dist', 'public');
  app.use(express.static(publicPath));
  
  app.get('*', (req, res) => {
    res.sendFile(path.join(publicPath, 'index.html'));
  });
}

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
