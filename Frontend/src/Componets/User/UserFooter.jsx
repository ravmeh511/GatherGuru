import React from "react";
import { FaGooglePlay, FaApple } from "react-icons/fa";

const UserFooter = () => {
  return (
    <footer className="bg-[#1c1b29] text-white py-10 px-8">
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 text-sm mb-8">
        {/* Column 1 - Company Info */}
        <div>
          <h3 className="font-bold mb-2">Company Info</h3>
          <ul className="space-y-1 text-gray-300">
            <li>About Us</li>
            <li>Contact Us</li>
            <li>Careers</li>
            <li>FAQs</li>
            <li>Terms of Service</li>
            <li>Privacy Policy</li>
          </ul>
        </div>

        {/* Column 2 - Help */}
        <div>
          <h3 className="font-bold mb-2">Help</h3>
          <ul className="space-y-1 text-gray-300">
            <li>Account Support</li>
            <li>Listing Events</li>
            <li>Event Ticketing</li>
            <li>Ticket Purchase Terms & Conditions</li>
          </ul>
        </div>

        {/* Column 3 - Categories */}
        <div>
          <h3 className="font-bold mb-2">Categories</h3>
          <ul className="space-y-1 text-gray-300">
            <li>Concerts & Gigs</li>
            <li>Festivals & Lifestyle</li>
            <li>Business & Networking</li>
            <li>Food & Drinks</li>
            <li>Performing Arts</li>
            <li>Sports & Outdoors</li>
            <li>Exhibitions</li>
            <li>Workshops, Conferences & Classes</li>
          </ul>
        </div>

        {/* Column 4 - Social */}
        <div>
          <h3 className="font-bold mb-2">Follow Us</h3>
          <ul className="space-y-1 text-gray-300">
            <li>Facebook</li>
            <li>Instagram</li>
            <li>Twitter</li>
            <li>Youtube</li>
          </ul>
        </div>

        {/* Column 5 - Download App */}
        <div>
          <h3 className="font-bold mb-2">Download The App</h3>
          <div className="space-y-2">
            <button className="w-full flex items-center gap-2 justify-center border border-white text-white py-2 rounded-md hover:bg-white hover:text-black transition">
              <FaGooglePlay /> Get it on Google Play
            </button>
            <button className="w-full flex items-center gap-2 justify-center border border-white text-white py-2 rounded-md hover:bg-white hover:text-black transition">
              <FaApple /> Download on the App Store
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Line */}
      <div className="border-t border-gray-600 pt-4 text-center text-gray-400 text-sm">
        ©2025 GatherGuru. All rights reserved.
      </div>
    </footer>
  );
};

export default UserFooter;
