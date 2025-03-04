import React, { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useDispatch } from 'react-redux';
import { showNotification } from '..//redux/slices/uiSlice'; // Ensure the path is correct and the file exists

const ProfilePage: React.FC = () => {
  const { user, updateUserProfile } = useAuth();
  const dispatch = useDispatch();
  
  // Store original user data for change detection
  const [originalData, setOriginalData] = useState({
    name: '',
    email: '',
    username: '',
    bio: '',
    avatar: '',
    role: '',
  });

  const [profileData, setProfileData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    username: user?.username || '',
    password: '',
    bio: user?.bio || '',
    avatar: user?.avatar || '',
    role: user?.role || '',
  });

  const [avatarPreview, setAvatarPreview] = useState(user?.avatar || '');
  const [editingField, setEditingField] = useState<string | null>(null);

  // Initialize original data on component mount
  useEffect(() => {
    if (user) {
      setOriginalData({
        name: user.name || '',
        email: user.email || '',
        username: user.username || '',
        bio: user.bio || '',
        avatar: user.avatar || '',
        role: user.role || '',
      });
    }
  }, [user]);

  // Check for changes in form data
  const hasChanges = () => {
    return Object.keys(originalData).some(key => {
      const profileKey = key as keyof typeof originalData;
      if (profileKey === 'avatar') {
        return profileData.avatar !== originalData.avatar;
      }
      return profileData[profileKey] !== originalData[profileKey];
    }) || profileData.password !== '';
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setProfileData({
      ...profileData,
      [e.target.name]: e.target.value,
    });
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result as string);
        setProfileData({
          ...profileData,
          avatar: reader.result as string,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!hasChanges()) {
      dispatch(showNotification({
        message: 'No changes detected to update',
        type: 'info'
      }));
      return;
    }

    try {
      const success = await updateUserProfile(profileData);
      if (success) {
        dispatch(showNotification({
          message: 'Profile updated successfully',
          type: 'success'
        }));
        setEditingField(null);
        // Update original data with new changes
        setOriginalData(prev => ({
          ...prev,
          ...profileData,
          avatar: profileData.avatar
        }));
      } else {
        dispatch(showNotification({
          message: 'Failed to update profile. Please try again.',
          type: 'error'
        }));
      }
    } catch {
      dispatch(showNotification({
        message: 'An unexpected error occurred. Please try again later.',
        type: 'error'
      }));
    }
  };

  const EditIcon = ({ field }: { field: string }) => (
    <button
      type="button"
      onClick={() => {
        setEditingField(field);
        setTimeout(() => {
          document.getElementsByName(field)[0]?.focus();
        }, 50);
      }}
      className={`absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-full transition-all ${
        editingField === field 
          ? 'text-primary-600 bg-primary-100/50 dark:bg-primary-900/30'
          : 'text-gray-400 hover:text-primary-600 hover:bg-gray-100 dark:hover:bg-gray-700'
      }`}
    >
      <svg
        className="w-5 h-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
        />
      </svg>
    </button>
  );

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <div className="mb-8 border-b border-gray-200 dark:border-gray-700 pb-6">
        <h1 className="text-3xl font-semibold text-gray-900 dark:text-white">Profile Settings</h1>
        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
          Update your account information and preferences
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Personal Information Section */}
        <div className="bg-white dark:bg-gray-800 shadow-lg rounded-xl p-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Personal Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {['name', 'email'].map((field) => (
              <div key={field} className="relative">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {field.charAt(0).toUpperCase() + field.slice(1)}
                </label>
                <div className="relative">
                  <input
                    type={field === 'email' ? 'email' : 'text'}
                    name={field}
                    value={profileData[field as keyof typeof profileData]}
                    onChange={handleChange}
                    readOnly={editingField !== field}
                    onBlur={() => setEditingField(null)}
                    className={`w-full px-4 py-2.5 rounded-lg border ${
                      editingField === field
                        ? 'border-primary-500 ring-2 ring-primary-500/30 bg-white dark:bg-gray-700'
                        : 'border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700/50'
                    } transition-all pr-12 dark:text-white`}
                  />
                  <EditIcon field={field} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Account Information Section */}
        <div className="bg-white dark:bg-gray-800 shadow-lg rounded-xl p-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Account Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {['username', 'password'].map((field) => (
              <div key={field} className="relative">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {field.charAt(0).toUpperCase() + field.slice(1)}
                </label>
                <div className="relative">
                  <input
                    type={field === 'password' ? 'password' : 'text'}
                    name={field}
                    value={profileData[field as keyof typeof profileData]}
                    onChange={handleChange}
                    readOnly={editingField !== field}
                    onBlur={() => setEditingField(null)}
                    placeholder={field === 'password' ? '••••••••' : ''}
                    className={`w-full px-4 py-2.5 rounded-lg border ${
                      editingField === field
                        ? 'border-primary-500 ring-2 ring-primary-500/30 bg-white dark:bg-gray-700'
                        : 'border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700/50'
                    } transition-all pr-12 dark:text-white`}
                  />
                  <EditIcon field={field} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bio & Avatar Section */}
        <div className="bg-white dark:bg-gray-800 shadow-lg rounded-xl p-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Profile Details</h2>
          <div className="space-y-6">
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Bio</label>
              <div className="relative">
                <textarea
                  name="bio"
                  value={profileData.bio}
                  onChange={handleChange}
                  rows={4}
                  readOnly={editingField !== 'bio'}
                  onBlur={() => setEditingField(null)}
                  className={`w-full px-4 py-2.5 rounded-lg border ${
                    editingField === 'bio'
                      ? 'border-primary-500 ring-2 ring-primary-500/30 bg-white dark:bg-gray-700'
                      : 'border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700/50'
                  } transition-all pr-12 dark:text-white`}
                />
                <EditIcon field="bio" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Avatar</label>
              <div className="flex items-center gap-6">
                <div className="relative group">
                  <img 
                    src={avatarPreview || 'https://pbs.twimg.com/profile_images/1835759638433652736/fD3zE0qE_400x400.jpg'} 
                    alt="Avatar Preview" 
                    className="h-24 w-24 rounded-full object-cover border-2 border-gray-200 dark:border-gray-600 group-hover:opacity-75 transition-opacity"
                  />
                </div>
                <label className="cursor-pointer">
                  <span className="px-4 py-2.5 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors text-sm font-medium">
                    Change photo
                  </span>
                  <input
                    type="file"
                    name="avatar"
                    accept="image/*"
                    onChange={handleAvatarChange}
                    className="hidden"
                  />
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Role & Submit Section */}
        <div className="bg-white dark:bg-gray-800 shadow-lg rounded-xl p-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Account Role</label>
              <input
                type="text"
                name="role"
                value={profileData.role}
                readOnly
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 dark:text-gray-400 cursor-not-allowed uppercase"
              />
            </div>
            <button 
              type="submit" 
              className="w-full sm:w-auto px-8 py-3 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-lg transition-colors shadow-sm hover:shadow-md"
            >
              Save Changes
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ProfilePage;