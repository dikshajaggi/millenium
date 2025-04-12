import React from 'react';
import instagram from "../../assests/icons/instagram.png";
import { WhatsappIcon, FacebookIcon } from "react-share";
import {
  contactEmail,
  contactNumber,
  whatsappUrl,
  fbPageUrl,
  instaPageUrl
} from "../../assests/static";

const Support = () => {
  return (
    <div className="min-h-[70vh] max-w-4xl mx-auto px-4 py-12">
      <h3 className="text-3xl sm:text-4xl font-bold text-center mb-6 text-gray-800">Contact Us</h3>

      <div className="bg-white p-6 sm:p-8 rounded-xl shadow-md space-y-6 text-gray-700">
        <p>
          We'd love to hear from you! Whether you have questions, feedback, or need assistance, feel free to reach out to us.
        </p>

        <div>
          <h5 className="text-lg font-semibold mb-1">Email Us:</h5>
          <p className="ml-4">
            <span className="font-medium text-sm block">For general inquiries:</span>
            <span>{contactEmail}</span>
          </p>
          <p className="ml-4 mt-2">
            <span className="font-medium text-sm block">For support:</span>
            <span>{contactEmail}</span>
          </p>
        </div>

        <div>
          <h5 className="text-lg font-semibold mb-1">Call Us:</h5>
          <p className="ml-4">{contactNumber}</p>
        </div>

        <div>
          <h5 className="text-lg font-semibold mb-1">Connect with Us:</h5>
          <p className="ml-4 mb-3">Follow us on WhatsApp, Facebook, and Instagram.</p>
          <div className="flex items-center gap-4 ml-4">
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" title="WhatsApp">
              <WhatsappIcon size={36} round />
            </a>
            <a href={fbPageUrl} target="_blank" rel="noopener noreferrer" title="Facebook">
              <FacebookIcon size={36} round />
            </a>
            <a href={instaPageUrl} target="_blank" rel="noopener noreferrer" title="Instagram">
              <img
                src={instagram}
                alt="Instagram"
                className="w-9 h-9 object-contain rounded-full"
                onContextMenu={(e) => e.preventDefault()}
              />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Support;
