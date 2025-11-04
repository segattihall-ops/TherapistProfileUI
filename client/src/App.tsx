import { useEffect, useState } from 'react';

interface Therapist {
  id: string;
  name: string;
  specialty: string;
  bio: string;
  experience: string;
  location: string;
  rating: number;
  reviewCount: number;
  hourlyRate: number;
  availability: string[];
  certifications: string[];
}

function App() {
  const [therapist, setTherapist] = useState<Therapist | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/therapist/bruno')
      .then(res => res.json())
      .then(data => {
        setTherapist(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">Error: {error}</div>;
  if (!therapist) return <div className="error">No therapist found</div>;

  return (
    <div className="therapist-profile">
      <div className="profile-header">
        <h1>{therapist.name}</h1>
        <p className="specialty">{therapist.specialty}</p>
      </div>
      
      <div className="profile-content">
        <section className="bio-section">
          <h2>About</h2>
          <p>{therapist.bio}</p>
        </section>

        <section className="details-section">
          <div className="detail-item">
            <strong>Experience:</strong> {therapist.experience}
          </div>
          <div className="detail-item">
            <strong>Location:</strong> {therapist.location}
          </div>
          <div className="detail-item">
            <strong>Rating:</strong> {therapist.rating} ⭐ ({therapist.reviewCount} reviews)
          </div>
          <div className="detail-item">
            <strong>Hourly Rate:</strong> ${therapist.hourlyRate}
          </div>
        </section>

        <section className="availability-section">
          <h2>Availability</h2>
          <ul>
            {therapist.availability.map((time, index) => (
              <li key={index}>{time}</li>
            ))}
          </ul>
        </section>

        <section className="certifications-section">
          <h2>Certifications</h2>
          <ul>
            {therapist.certifications.map((cert, index) => (
              <li key={index}>{cert}</li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}

export default App;
