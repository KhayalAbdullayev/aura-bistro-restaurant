import React from 'react';

const Footer = () => {
  return (
    <footer id="contact" className="bg-primary text-white py-16 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {/* Business Hours */}
          <div>
            <h3 className="text-secondary text-xl font-semibold mb-4">Business Hours</h3>
            <p className="mb-2">Monday - Thursday: 5:00 PM - 10:00 PM</p>
            <p className="mb-2">Friday - Saturday: 5:00 PM - 11:00 PM</p>
            <p>Sunday: 4:00 PM - 9:00 PM</p>
          </div>

          {/* Contact Us */}
          <div>
            <h3 className="text-secondary text-xl font-semibold mb-4">Contact Us</h3>
            <p className="mb-2">123 Culinary Avenue</p>
            <p className="mb-2">Gourmet District, GD 12345</p>
            <p className="mb-2">Phone: (555) 123-4567</p>
            <p>Email: info@aurabistro.com</p>
          </div>

          {/* Follow Us */}
          <div>
            <h3 className="text-secondary text-xl font-semibold mb-4">Follow Us</h3>
            <p className="mb-2">Instagram: @aurabistro</p>
            <p className="mb-2">Facebook: Aura Bistro</p>
            <p>Twitter: @aurabistro_official</p>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center pt-8 border-t border-white/20">
          <p className="text-sm opacity-80">
            &copy; 2024 Aura Bistro. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
