import { User, UserProfile, ApiResponse } from '../components/types/common';

// Configuration for Vite
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

export const userService = {
    async getProfile(userId: string): Promise<ApiResponse<UserProfile>> {
        try {
            // TODO: Replace with actual API call when backend is ready
            // const response = await fetch(`${API_BASE_URL}/users/${userId}/profile`);
            // const data = await response.json();
            // return data;

            await new Promise(resolve => setTimeout(resolve, 500));

            const userStr = localStorage.getItem('user');
            if (userStr) {
                const user = JSON.parse(userStr);
                const profile: UserProfile = {
                    id: user.id,
                    email: user.email,
                    name: user.name,
                    phone: '+27 00 000 0000',
                    preferences: {
                        favoriteDestinations: ['Cape Town', 'Johannesburg'],
                        roomPreferences: ['King Bed', 'Non-smoking'],
                        specialRequests: 'Early check-in preferred'
                    },
                    bookings: [],
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString()
                };

                return {
                    success: true,
                    message: 'Profile fetched successfully',
                    data: profile
                };
            }

            return {
                success: false,
                message: 'User not found',
                data: {} as UserProfile
            };
        } catch (error) {
            console.error('Error fetching user profile:', error);
            return {
                success: false,
                message: 'Failed to fetch user profile',
                data: {} as UserProfile
            };
        }
    },

    async updateProfile(userId: string, updates: Partial<UserProfile>): Promise<ApiResponse<UserProfile>> {
        try {
            // TODO: Replace with actual API call when backend is ready
            // const response = await fetch(`${API_BASE_URL}/users/${userId}/profile`, {
            //     method: 'PUT',
            //     headers: {
            //         'Content-Type': 'application/json',
            //     },
            //     body: JSON.stringify(updates)
            // });
            // const data = await response.json();
            // return data;

            await new Promise(resolve => setTimeout(resolve, 600));

            const userStr = localStorage.getItem('user');
            if (userStr) {
                const user = JSON.parse(userStr);
                const updatedProfile: UserProfile = {
                    id: user.id,
                    email: updates.email || user.email,
                    name: updates.name || user.name,
                    phone: updates.phone || '+27 00 000 0000',
                    preferences: updates.preferences || {
                        favoriteDestinations: ['Cape Town', 'Johannesburg'],
                        roomPreferences: ['King Bed', 'Non-smoking'],
                        specialRequests: 'Early check-in preferred'
                    },
                    bookings: [],
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString()
                };

                // Update localStorage
                localStorage.setItem('user', JSON.stringify({
                    ...user,
                    email: updatedProfile.email,
                    name: updatedProfile.name
                }));

                return {
                    success: true,
                    message: 'Profile updated successfully',
                    data: updatedProfile
                };
            }

            return {
                success: false,
                message: 'User not found',
                data: {} as UserProfile
            };
        } catch (error) {
            console.error('Error updating user profile:', error);
            return {
                success: false,
                message: 'Failed to update user profile',
                data: {} as UserProfile
            };
        }
    },

    async changePassword(userId: string, currentPassword: string, newPassword: string): Promise<ApiResponse<{ message: string }>> {
        try {
            // TODO: Replace with actual API call when backend is ready
            // const response = await fetch(`${API_BASE_URL}/users/${userId}/password`, {
            //     method: 'PUT',
            //     headers: {
            //         'Content-Type': 'application/json',
            //     },
            //     body: JSON.stringify({ currentPassword, newPassword })
            // });
            // const data = await response.json();
            // return data;

            await new Promise(resolve => setTimeout(resolve, 500));

            // Mock password change
            return {
                success: true,
                message: 'Password changed successfully',
                data: { message: 'Password updated successfully' }
            };
        } catch (error) {
            console.error('Error changing password:', error);
            return {
                success: false,
                message: 'Failed to change password',
                data: { message: 'Password change failed' }
            };
        }
    },

    async deleteAccount(userId: string): Promise<ApiResponse<{ message: string }>> {
        try {

            // const response = await fetch(`${API_BASE_URL}/users/${userId}`, {
            //     method: 'DELETE'
            // });
            // const data = await response.json();
            // return data;

            await new Promise(resolve => setTimeout(resolve, 700));

            localStorage.removeItem('authToken');
            localStorage.removeItem('user');
            localStorage.removeItem('isLoggedIn');

            return {
                success: true,
                message: 'Account deleted successfully',
                data: { message: 'Account deleted successfully' }
            };
        } catch (error) {
            console.error('Error deleting account:', error);
            return {
                success: false,
                message: 'Failed to delete account',
                data: { message: 'Account deletion failed' }
            };
        }
    }
};

export const { getProfile, updateProfile, changePassword, deleteAccount } = userService;