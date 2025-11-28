import {Mail, MessageCircle } from 'lucide-react';


export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-2">PG Finder</h3>
            <p className="text-gray-400">
              Find your perfect PG accommodation near you
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2">Quick Links</h3>
            <ul className="space-y-0 text-gray-400">
              <li>About Us</li>
              <li>Contact</li>
              <li>Terms of Service</li>
              <li>Privacy Policy</li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2">Contact Us</h3>
            <a
              href="mailto:kumabhi139@gmail.com"
              className="text-blue-400 flex items-center gap-1">
              <Mail className="w-4 h-4 text-white" />
               kumabhi139@gmail.com
            </a>
            <a
              href="https://wa.me/919693272685"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 flex items-center">
              <MessageCircle className="w-4 h-4 text-white" />
              +91 9693272685
              </a>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-1 pt-1  text-center text-gray-400">
          <p>&copy; 2025 PG Finder. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
