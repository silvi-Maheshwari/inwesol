import React, { useState } from 'react';
import axios from 'axios';
// import './ContactUsForm.css'; // Import the CSS file

const ContactUsForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'Coach',
    message: '',
    phone: '',
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);

  const validateForm = () => {
    let newErrors = {};
    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.email.includes('@')) newErrors.email = 'Valid email is required';
    if (!formData.message) newErrors.message = 'Message is required';
    if (formData.phone && !/^\d{10}$/.test(formData.phone)) newErrors.phone = 'Invalid phone number';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setLoading(true);
    try {
      await axios.post('https://jsonplaceholder.typicode.com/posts', formData);
      setSuccess('Message sent successfully!');
      setFormData({ name: '', email: '', subject: 'Coach', message: '', phone: '' });
    } catch (error) {
      setSuccess('Failed to send message. Try again.');
    }
    setLoading(false);
  };

  return (
    <div className="form-container">
      <form className="contact-form" onSubmit={handleSubmit}>
        <h2>Contact Us</h2>

        <input
          type="text"
          placeholder="Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className={errors.name ? 'error-input' : ''}
        />
        {errors.name && <p className="error-message">{errors.name}</p>}

        <input
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className={errors.email ? 'error-input' : ''}
        />
        {errors.email && <p className="error-message">{errors.email}</p>}

        <select value={formData.subject} onChange={(e) => setFormData({ ...formData, subject: e.target.value })}>
          <option>Coach</option>
          <option>Institute/Organisation</option>
          <option>Trainee/Coach</option>
        </select>

        <textarea
          placeholder="Message"
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          className={errors.message ? 'error-input' : ''}
        />
        {errors.message && <p className="error-message">{errors.message}</p>}

        <input
          type="tel"
          placeholder="Phone (optional)"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          className={errors.phone ? 'error-input' : ''}
        />
        {errors.phone && <p className="error-message">{errors.phone}</p>}

        <button type="submit" disabled={loading}>
          {loading ? 'Sending...' : 'Submit'}
        </button>

        {success && <p className="success-message">{success}</p>}
      </form>
    </div>
  );
};

export default ContactUsForm;
