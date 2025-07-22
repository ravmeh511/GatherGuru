import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from '../../../utils/axios';
import EventSteps from './EventSteps';

const BannerUpload = () => {
  const navigate = useNavigate();
  const { eventId } = useParams();
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [error, setError] = useState('');

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      if (!['image/jpeg', 'image/jpg', 'image/png'].includes(file.type)) {
        setError('Please upload a valid image file (JPG, JPEG, or PNG)');
        return;
      }

      // Validate file size (5MB)
      if (file.size > 5 * 1024 * 1024) {
        setError('File size should be less than 5MB');
        return;
      }

      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
      setError('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedFile) {
      setError('Please select a banner image');
      return;
    }

    const formData = new FormData();
    formData.append('bannerImage', selectedFile);

    try {
      const response = await axios.patch(`/events/${eventId}/banner`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      if (response.data.success) {
        navigate(`/organizer/create-event/ticketing/${eventId}`);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to upload banner');
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-6">
      <div className="mb-4 md:mb-6">
        <h1 className="text-xl md:text-2xl font-semibold">Event Banner</h1>
        <div className="text-gray-600 text-sm md:text-base mt-2">
          Location
          <br />
          Time
        </div>
      </div>

      <EventSteps currentStep={2} />

      <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6 mt-6">
        {error && (
          <div className="text-red-500 text-sm">{error}</div>
        )}

        <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 md:p-8 text-center">
          {previewUrl ? (
            <div className="space-y-3 md:space-y-4">
              <img
                src={previewUrl}
                alt="Banner preview"
                className="max-w-full h-auto mx-auto rounded-lg shadow-sm"
              />
              <button
                type="button"
                onClick={() => {
                  setSelectedFile(null);
                  setPreviewUrl(null);
                }}
                className="text-red-500 hover:text-red-700 transition-colors py-2"
              >
                Remove Image
              </button>
            </div>
          ) : (
            <div className="py-8 md:py-12">
              <input
                type="file"
                accept="image/jpeg,image/jpg,image/png"
                onChange={handleFileSelect}
                className="hidden"
                id="banner-upload"
              />
              <label
                htmlFor="banner-upload"
                className="cursor-pointer block"
              >
                <div className="text-gray-500">
                  <p className="mb-2 text-base md:text-lg font-medium">Click to upload</p>
                  <p className="text-xs md:text-sm">
                    Feature image must be at least 1170 pixels wide by 504 pixels high
                    <br className="hidden md:block" />
                    <span className="md:hidden"> - </span>
                    Valid file formats: JPG, GIF, PNG
                  </p>
                </div>
              </label>
            </div>
          )}
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center gap-4 md:gap-0 pt-4">
          <button
            type="button"
            onClick={() => navigate(`/organizer/create-event/edit/${eventId}`)}
            className="text-gray-600 hover:text-gray-800 transition-colors w-full md:w-auto order-2 md:order-1 py-2"
          >
            Go back to Edit Event
          </button>
          <button
            type="submit"
            className="w-full md:w-auto px-6 py-2.5 bg-[#2B293D] text-white rounded-lg font-medium hover:bg-opacity-90 transition-colors order-1 md:order-2"
          >
            Continue to Ticketing
          </button>
        </div>
      </form>
    </div>
  );
};

export default BannerUpload; 