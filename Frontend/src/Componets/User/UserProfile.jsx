import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from '../../utils/axios';
import { toast } from 'react-hot-toast';
import { login } from '../../redux/features/authSlice';

const UserProfile = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [profileData, setProfileData] = useState({
    firstName: '',
    lastName: '',
    website: '',
    company: '',
    phoneNumber: '',
    address: '',
    city: '',
    country: '',
    pincode: '',
    profilePicture: ''
  });
  const [loading, setLoading] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);

  useEffect(() => {
    // Fetch user profile data
    const fetchProfile = async () => {
      try {
        const response = await axios.get('/api/user/profile');
        const userData = response.data.data;
        
        // Update local state
        setProfileData({
          firstName: userData.firstName || '',
          lastName: userData.lastName || '',
          website: userData.website || '',
          company: userData.company || '',
          phoneNumber: userData.phone || '',
          address: userData.address || '',
          city: userData.city || '',
          country: userData.country || '',
          pincode: userData.pincode || '',
          profilePicture: userData.profilePicture || ''
        });

        // Update Redux store
        dispatch(login({
          ...user,
          userData: {
            ...user.userData,
            ...userData
          }
        }));
      } catch (error) {
        toast.error('Failed to fetch profile data');
        console.error('Error fetching profile:', error);
      }
    };

    fetchProfile();
  }, [dispatch, user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      console.log('Updating profile with data:', {
        firstName: profileData.firstName,
        lastName: profileData.lastName,
        website: profileData.website,
        company: profileData.company,
        phone: profileData.phoneNumber,
        address: profileData.address,
        city: profileData.city,
        country: profileData.country,
        pincode: profileData.pincode
      });

      const response = await axios.put('/api/user/profile', {
        firstName: profileData.firstName,
        lastName: profileData.lastName,
        website: profileData.website,
        company: profileData.company,
        phone: profileData.phoneNumber,
        address: profileData.address,
        city: profileData.city,
        country: profileData.country,
        pincode: profileData.pincode
      });
      
      console.log('Profile update response:', response.data);

      if (response.data.success) {
        // Update the user data in Redux store
        dispatch(login({
          ...user,
          userData: response.data.data
        }));
        
        // Show success message
        toast.success('Profile updated successfully! 🎉');

        // Update local state with new data
        setProfileData(prev => ({
          ...prev,
          ...response.data.data,
          phoneNumber: response.data.data.phone // Sync the phone field name difference
        }));
      } else {
        throw new Error(response.data.message || 'Failed to update profile');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      console.error('Error details:', {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status
      });
      
      // Show error message
      const errorMessage = error.response?.data?.message || error.message || 'Failed to update profile';
      toast.error(`Error: ${errorMessage} 😕`);
    } finally {
      setLoading(false);
    }
  };

  const handleProfilePictureChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Check file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error('Image size should be less than 5MB');
      return;
    }

    // Check file type
    if (!file.type.startsWith('image/')) {
      toast.error('Please upload an image file');
      return;
    }

    // Additional file type validation
    const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/jpg'];
    if (!validTypes.includes(file.type)) {
      toast.error('Please upload a JPG, PNG, or GIF file');
      return;
    }

    setUploadingImage(true);
    const formData = new FormData();
    formData.append('profilePicture', file);

    try {
      console.log('Uploading file:', {
        name: file.name,
        type: file.type,
        size: file.size
      });

      const response = await axios.post('/api/user/profile/picture', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          console.log('Upload progress:', percentCompleted + '%');
        }
      });

      console.log('Upload response:', response.data);

      if (response.data.success) {
        // Update the user data in Redux store with the full profile picture URL
        dispatch(login({
          ...user,
          userData: {
            ...user.userData,
            profilePicture: response.data.data.profilePicture
          }
        }));

        toast.success('Profile picture updated successfully');
      } else {
        throw new Error(response.data.message || 'Failed to upload profile picture');
      }
    } catch (error) {
      console.error('Error uploading profile picture:', error);
      console.error('Error details:', {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status
      });

      // Show a more detailed error message
      const errorMessage = error.response?.data?.message || error.message || 'Failed to upload profile picture';
      toast.error(errorMessage);

      // Reset the file input
      e.target.value = '';
    } finally {
      setUploadingImage(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-semibold mb-6">Account Information</h2>

        {/* Profile Photo Section */}
        <div className="mb-8">
          <h3 className="text-lg font-medium mb-4">Profile Photo</h3>
          <div className="relative w-32 h-32">
            <img
              src={profileData.profilePicture ? `${axios.defaults.baseURL}/${profileData.profilePicture}` : '/default-avatar.svg'}
              alt="Profile"
              className="w-full h-full rounded-full object-cover border-2 border-gray-200"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = '/default-avatar.svg';
              }}
            />
            <label
              className={`absolute bottom-0 right-0 bg-gray-800 p-2 rounded-full text-white cursor-pointer ${uploadingImage ? 'opacity-50 cursor-not-allowed' : ''}`}
              title="Change photo"
            >
              <input
                type="file"
                className="hidden"
                accept="image/*"
                onChange={handleProfilePictureChange}
                disabled={uploadingImage}
              />
              {uploadingImage ? (
                <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                </svg>
              )}
            </label>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Profile Information */}
          <div className="mt-8">
            <h3 className="text-lg font-medium mb-4">Profile Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">First Name</label>
                <input
                  type="text"
                  name="firstName"
                  value={profileData.firstName}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  value={profileData.lastName}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Website</label>
                <input
                  type="url"
                  name="website"
                  value={profileData.website}
                  onChange={handleInputChange}
                  placeholder="https://example.com"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Company</label>
                <input
                  type="text"
                  name="company"
                  value={profileData.company}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Contact Details */}
          <div className="mt-8">
            <h3 className="text-lg font-medium mb-4">Contact Details</h3>
            <p className="text-sm text-gray-500 mb-4">These details are private and only used to contact you for ticketing or events.</p>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">Phone Number</label>
                <input
                  type="tel"
                  name="phoneNumber"
                  value={profileData.phoneNumber}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700">Address</label>
                <input
                  type="text"
                  name="address"
                  value={profileData.address}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700">City/Town</label>
                  <input
                    type="text"
                    name="city"
                    value={profileData.city}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700">Country</label>
                  <input
                    type="text"
                    name="country"
                    value={profileData.country}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700">Pincode</label>
                  <input
                    type="text"
                    name="pincode"
                    value={profileData.pincode}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Save Button */}
          <div className="mt-8">
            <button
              type="button"
              onClick={handleSubmit}
              disabled={loading}
              className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {loading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Saving...
                </>
              ) : (
                'Save Changes'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserProfile; 