import { writable } from 'svelte/store';

function isTokenValid(token) {
    if (!token) return false; // If no token exists, it's invalid
    try {
        const payload = JSON.parse(atob(token.split('.')[1])); // Decode the payload (middle part of the JWT)
        const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds
        return payload.exp > currentTime; // Compare expiration time with the current time
    } catch (error) {
        console.error('Invalid token:', error);
        return false; // If decoding fails, consider the token invalid
    }
}

// Initialize auth state from localStorage
let initialToken = localStorage.getItem('token');
let initialUser = localStorage.getItem('user')
    ? JSON.parse(localStorage.getItem('user'))
    : { userID: null, email: '', isAdmin: false };

// Check token validity
const isValidToken = isTokenValid(initialToken);
if (!isValidToken) {
    // Clear invalid token from localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    initialToken = null;
    initialUser = { userID: null, email: '', isAdmin: false };
}

// Initialize the auth store
export const authStore = writable({
    token: initialToken,
    user: initialUser,
    isLoggedIn: !!initialToken && isValidToken, // Check validity before setting logged-in status
});

// Method to set the authentication state
export const setAuth = (token, user) => {
    // Save to localStorage
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    authStore.set({
        token,
        user,
        isLoggedIn: !!token && isTokenValid(token), // Ensure the token is valid before setting logged-in status
    });
};

// Method to clear the authentication state (logout)
export const clearAuth = () => {
    // Remove from localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    authStore.set({
        token: null,
        user: { userID: null, email: '', isAdmin: false },
        isLoggedIn: false,
    });
};

