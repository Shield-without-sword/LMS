import React, { useState } from "react";
import emailjs from '@emailjs/browser';

const Mentorship = () => {
  const [selectedMentor, setSelectedMentor] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const mentors = [
    {
      id: 1,
      name: "Dr. Sarah Johnson",
      expertise: "Frontend Development, React, UI/UX",
      experience: "8+ years at Google and Meta",
      image: "/src/images/WhatsApp Image 2025-02-23 at 15.04.53_11aef071.jpg",
      alt: "Dr. Sarah Johnson",
      email: "chouguleyash037@gmail.com" // Add mentor's email for notification
    },
    {
      id: 2,
      name: "Alex Patel",
      expertise: "Backend Systems, Node.js, Database Design",
      experience: "10+ years at Amazon",
      image: "/src/images/WhatsApp Image 2025-02-23 at 15.05.51_292e538b.jpg",
      alt: "Alex Patel",
      email: "chouguleyash037@gmail.com"
    },
    {
      id: 3,
      name: "Maria Rodriguez",
      expertise: "Full Stack, DevOps, Cloud Architecture",
      experience: "12+ years consulting for Fortune 500",
      image: "/src/images/WhatsApp Image 2025-02-23 at 15.05.51_292e538b.jpg",
      alt: "Maria Rodriguez",
      email: "chouguleyash037@gmail.com"
    }
  ];

  const handleAppointmentClick = (mentor) => {
    setSelectedMentor(mentor);
    setShowForm(true);
    // Reset form and states
    setFormData({
      name: '',
      email: '',
      phone: '',
      message: ''
    });
    setSuccess(false);
    setError(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const sendAppointmentEmail = async () => {
    try {
      // Replace with your actual EmailJS service ID, template ID, and user ID
      const serviceId = 'service_wtdtxrk'; // Use your service ID
      const templateId = 'template_hetvc4v'; // Use your template ID
      const userId = 'JB2YupqQ3psOuc9HO'; // Use your user ID

      const templateParams = {
        to_name: selectedMentor.name,
        to_email: selectedMentor.email,
        from_name: formData.name,
        from_email: formData.email,
        from_phone: formData.phone,
        message: formData.message,
        appointment_cost: "500 rupees"
      };

      // Send notification to mentor
      await emailjs.send(
        serviceId,
        templateId,
        templateParams,
        userId
      );

      // Optional: Also send confirmation to the user
      const userTemplateParams = {
        to_name: formData.name,
        to_email: formData.email,
        mentor_name: selectedMentor.name,
        mentor_expertise: selectedMentor.expertise,
        appointment_cost: "500 rupees"
      };

      // Uncomment to send email to user too (you'll need another template)
      // await emailjs.send(
      //   serviceId,
      //   'template_user_confirmation', // Create a template for user confirmation
      //   userTemplateParams,
      //   userId
      // );

      return true;
    } catch (error) {
      console.error('Failed to send email:', error);
      throw new Error('Failed to send appointment email');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // Send the email
      await sendAppointmentEmail();
      
      // Show success message
      setSuccess(true);
      setShowForm(false);
      
      // You could also add code here to save the appointment to your database
      console.log(`Booking appointment with mentor ID: ${selectedMentor.id}`);
      
    } catch (err) {
      setError('Failed to process appointment: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const closeForm = () => {
    setShowForm(false);
    setSelectedMentor(null);
  };

  return (
    <div className="bg-black text-gray-200 min-h-screen">  
      <div className="max-w-6xl mx-auto p-6">
        <div className="text-center mb-12 mt-8">
          <h1 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-500">👨‍🏫 MENTORSHIP PROGRAM</h1>
          <p className="text-lg text-gray-300">
            Get one-on-one mentorship from industry experts. Improve your coding skills, 
            work on real-world projects, and receive career guidance.
          </p>
        </div>

        {/* Success Message */}
        {success && (
          <div className="bg-green-900 border border-green-600 text-green-300 px-4 py-3 rounded relative mb-6">
            <strong className="font-bold">Success!</strong>
            <span className="block sm:inline"> Your appointment request has been sent to the mentor. They will contact you shortly.</span>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="bg-red-900 border border-red-600 text-red-300 px-4 py-3 rounded relative mb-6">
            <strong className="font-bold">Error!</strong>
            <span className="block sm:inline"> {error}</span>
          </div>
        )}

        {/* Mentor Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {mentors.map((mentor) => (
            <div key={mentor.id} className="bg-gray-900 rounded-lg overflow-hidden transform hover:scale-105 transition duration-300 border border-gray-800 hover:border-cyan-600 shadow-lg hover:shadow-cyan-500/20">
              <div className="h-64 overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent z-10"></div>
                <img 
                  src={mentor.image} 
                  alt={mentor.alt}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    console.error(`Image loading error for ${mentor.name}:`, e);
                    e.target.src = '/api/placeholder/300/300'; // Fallback image
                  }}
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 text-cyan-400">{mentor.name}</h3>
                <p className="text-gray-300 mb-2"><strong className="text-purple-400">Expertise:</strong> {mentor.expertise}</p>
                <p className="text-gray-300 mb-4"><strong className="text-purple-400">Experience:</strong> {mentor.experience}</p>
                <button
                  onClick={() => handleAppointmentClick(mentor)}
                  className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-bold py-2 px-4 rounded-md transition duration-300 shadow-md hover:shadow-cyan-500/30"
                >
                  Appoint Mentor (500 rupees)
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Appointment Form Modal */}
        {showForm && selectedMentor && (
          <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
            <div className="bg-gray-900 rounded-lg shadow-2xl shadow-cyan-500/20 w-full max-w-md overflow-hidden border border-gray-700">
              <div className="bg-gradient-to-r from-purple-900 to-blue-900 text-white p-4">
                <h3 className="text-xl font-bold">Book an Appointment with {selectedMentor.name}</h3>
              </div>
              
              <form onSubmit={handleSubmit} className="p-6 space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-300">Your Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="mt-1 block w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 text-white"
                    placeholder="Enter your full name"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="mt-1 block w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 text-white"
                    placeholder="your.email@example.com"
                  />
                </div>
                
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-300">Phone Number</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    className="mt-1 block w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 text-white"
                    placeholder="Your phone number"
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-300">Message (Optional)</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows="3"
                    className="mt-1 block w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 text-white"
                    placeholder="Tell the mentor what you'd like to learn or discuss"
                  ></textarea>
                </div>
                
                <div className="flex justify-between pt-4">
                  <button
                    type="button"
                    onClick={closeForm}
                    className="bg-gray-700 hover:bg-gray-600 text-gray-300 font-bold py-2 px-4 rounded-md transition duration-300"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-bold py-2 px-4 rounded-md transition duration-300 shadow-md hover:shadow-cyan-500/30"
                  >
                    {loading ? 'Processing...' : 'Confirm Appointment'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Services Section */}
        <div className="bg-gray-900 p-6 rounded-lg border border-gray-800 shadow-lg">
          <h2 className="text-2xl font-bold mb-6 text-center bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-500">OUR SERVICES</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-gray-800 p-4 rounded shadow-md border border-gray-700 hover:border-cyan-600 transition duration-300 transform hover:scale-105 hover:shadow-cyan-500/20">
              <h3 className="font-bold text-lg mb-2 text-cyan-400">👥 Peer Learning</h3>
              <p className="text-gray-300">Join study groups and learn with others.</p>
            </div>
            
            <div className="bg-gray-800 p-4 rounded shadow-md border border-gray-700 hover:border-cyan-600 transition duration-300 transform hover:scale-105 hover:shadow-cyan-500/20">
              <h3 className="font-bold text-lg mb-2 text-cyan-400">💼 Career Coaching</h3>
              <p className="text-gray-300">Get career advice and resume reviews.</p>
            </div>
            
            <div className="bg-gray-800 p-4 rounded shadow-md border border-gray-700 hover:border-cyan-600 transition duration-300 transform hover:scale-105 hover:shadow-cyan-500/20">
              <h3 className="font-bold text-lg mb-2 text-cyan-400">🛠 Project Assistance</h3>
              <p className="text-gray-300">Receive help on your personal and team projects.</p>
            </div>
            
            <div className="bg-gray-800 p-4 rounded shadow-md border border-gray-700 hover:border-cyan-600 transition duration-300 transform hover:scale-105 hover:shadow-cyan-500/20">
              <h3 className="font-bold text-lg mb-2 text-cyan-400">📝 Mock Interviews</h3>
              <p className="text-gray-300">Prepare for real job interviews with mock sessions.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Mentorship;
