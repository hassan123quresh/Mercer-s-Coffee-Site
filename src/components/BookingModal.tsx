import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { useBooking } from '../context/BookingContext';

export const BookingModal: React.FC = () => {
  const { isBookingOpen, closeBookingModal } = useBooking();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    date: '',
    time: '10:00 AM',
    guests: 2,
    specialRequests: ''
  });

  const timeSlots = [
    '10:00 AM', '11:00 AM', '12:00 PM', '1:00 PM', '2:00 PM', 
    '3:00 PM', '4:00 PM', '5:00 PM', '6:00 PM', '7:00 PM', 
    '8:00 PM', '9:00 PM'
  ];

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isBookingOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
      // Reset state when closed
      setTimeout(() => setIsSubmitted(false), 300);
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isBookingOpen]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleGuestChange = (delta: number) => {
    setFormData(prev => {
      const newGuests = prev.guests + delta;
      if (newGuests >= 1 && newGuests <= 12) {
        return { ...prev, guests: newGuests };
      }
      return prev;
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Compose WhatsApp message
    const message = `Hello Mercer's ✦ I'd like to book a table.

Name: ${formData.name}
Phone: ${formData.phone}
Date: ${formData.date}
Time: ${formData.time}
Guests: ${formData.guests}
${formData.specialRequests ? `Special Requests: ${formData.specialRequests}` : ''}

Looking forward to it!`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappNumber = '923000000000'; // Replace with actual number
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
    
    // Open WhatsApp
    window.open(whatsappUrl, '_blank');
    
    // Show success state
    setIsSubmitted(true);
  };

  if (!isBookingOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-0">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeBookingModal}
          className="fixed inset-0 bg-black/75 backdrop-blur-sm"
        />
        
        <motion.div
          initial={{ opacity: 0, y: 100, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 100, scale: 0.95 }}
          data-lenis-prevent
          className="relative w-full max-w-md max-h-[90vh] overflow-y-auto bg-[#535F48] border border-white/20 rounded-t-[20px] sm:rounded-[20px] shadow-2xl flex flex-col sm:mt-0 mt-auto"
          style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
        >
          <button 
            onClick={closeBookingModal}
            className="absolute top-4 right-4 text-white/70 hover:text-white transition-colors"
          >
            <X size={24} />
          </button>

          <div className="p-6">
            <h2 className="font-display text-3xl text-white mb-6 text-center">
              {isSubmitted ? 'Reservation Sent' : 'Book a Table'}
            </h2>

            {isSubmitted ? (
              <div className="text-center py-8">
                <div className="text-white text-4xl mb-4">✦</div>
                <p className="text-white/80 text-lg">
                  Your table request has been sent via WhatsApp.
                  <br />We will confirm with you shortly.
                </p>
                <button 
                  onClick={closeBookingModal}
                  className="mt-8 px-8 py-3 bg-white text-[#535F48] rounded-full font-medium tracking-wide uppercase text-sm hover:bg-[#F5F0E8] transition-colors"
                >
                  Close
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-white/70 mb-2">Full Name</label>
                  <input 
                    type="text" 
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    className="w-full bg-white/5 border border-white/20 rounded-[10px] px-4 py-3 text-white focus:outline-none focus:border-white/50 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-white/70 mb-2">Phone Number</label>
                  <input 
                    type="tel" 
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+92 3XX XXXXXXX"
                    className="w-full bg-white/5 border border-white/20 rounded-[10px] px-4 py-3 text-white focus:outline-none focus:border-white/50 transition-colors"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] uppercase tracking-widest text-white/70 mb-2">Date</label>
                    <input 
                      type="date" 
                      name="date"
                      required
                      min={new Date().toISOString().split('T')[0]}
                      value={formData.date}
                      onChange={handleChange}
                      className="w-full bg-white/5 border border-white/20 rounded-[10px] px-4 py-3 text-white focus:outline-none focus:border-white/50 transition-colors [color-scheme:dark]"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase tracking-widest text-white/70 mb-2">Time</label>
                    <select 
                      name="time"
                      value={formData.time}
                      onChange={handleChange}
                      className="w-full bg-[#535F48] border border-white/20 rounded-[10px] px-4 py-3 text-white focus:outline-none focus:border-white/50 transition-colors appearance-none"
                    >
                      {timeSlots.map(slot => (
                        <option key={slot} value={slot}>{slot}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-white/70 mb-2">Number of Guests</label>
                  <div className="flex items-center justify-between bg-white/5 border border-white/20 rounded-[10px] px-4 py-2">
                    <button 
                      type="button" 
                      onClick={() => handleGuestChange(-1)}
                      className="w-10 h-10 flex items-center justify-center text-white/50 hover:text-white transition-colors"
                    >
                      -
                    </button>
                    <span className="text-white font-medium">{formData.guests}</span>
                    <button 
                      type="button" 
                      onClick={() => handleGuestChange(1)}
                      className="w-10 h-10 flex items-center justify-center text-white/50 hover:text-white transition-colors"
                    >
                      +
                    </button>
                  </div>
                  {formData.guests === 12 && (
                    <p className="text-white text-xs mt-2 text-center">For groups larger than 12, please contact us directly.</p>
                  )}
                </div>

                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-white/70 mb-2">Special Requests (Optional)</label>
                  <textarea 
                    name="specialRequests"
                    value={formData.specialRequests}
                    onChange={handleChange}
                    placeholder="Dietary needs, high chair, decorations..."
                    maxLength={200}
                    rows={3}
                    className="w-full bg-white/5 border border-white/20 rounded-[10px] px-4 py-3 text-white focus:outline-none focus:border-white/50 transition-colors resize-none"
                  />
                </div>

                <button 
                  type="submit"
                  className="w-full mt-6 py-4 bg-white text-[#535F48] rounded-full font-medium tracking-wide uppercase text-sm hover:bg-[#F5F0E8] transition-colors"
                >
                  Confirm Reservation
                </button>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
