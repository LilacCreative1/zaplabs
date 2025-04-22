// ZAP Labs Authentication Utilities

// Mock user data for development purposes
const mockUsers = [
{
  id: 1,
  email: 'demo@zaplabs.org',
  password: 'secure123', // In a real app, this would be hashed
  name: 'Demo User',
  role: 'investigator',
  agency: 'Training Agency',
  completedScenarios: [1, 3],
  progress: 42
}];


// Current user state
let currentUser = null;

// Local storage keys
const TOKEN_KEY = 'zaplabs_auth_token';
const USER_KEY = 'zaplabs_user';

// Initialize auth state from localStorage (if exists)
function initAuth() {
  try {
    const savedToken = localStorage.getItem(TOKEN_KEY);
    const savedUser = localStorage.getItem(USER_KEY);

    if (savedToken && savedUser) {
      currentUser = JSON.parse(savedUser);
      return true;
    }
    return false;
  } catch (error) {
    console.error('Error initializing auth:', error);
    return false;
  }
}

// Login function
function login(email, password) {
  try {
    // In a real app, this would make an API call
    const user = mockUsers.find((u) => u.email === email && u.password === password);

    if (!user) {
      return { success: false, error: 'Invalid credentials' };
    }

    // Create a mock token (in a real app, this would come from the server)
    const token = btoa(`${user.id}:${user.email}:${Date.now()}`);

    // Save to state and localStorage
    currentUser = { ...user };
    delete currentUser.password; // Don't store password in memory

    localStorage.setItem(TOKEN_KEY, token);
    localStorage.setItem(USER_KEY, JSON.stringify(currentUser));

    return { success: true, user: currentUser };
  } catch (error) {
    console.error('Login error:', error);
    return { success: false, error: 'An error occurred during login' };
  }
}

// Logout function
function logout() {
  try {
    // Clear state and localStorage
    currentUser = null;
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    return true;
  } catch (error) {
    console.error('Logout error:', error);
    return false;
  }
}

// Get current user
function getCurrentUser() {
  return currentUser;
}

// Check if user is authenticated
function isAuthenticated() {
  return currentUser !== null;
}

// Update user progress
function updateUserProgress(scenarioId) {
  try {
    if (!currentUser) return false;

    // Update completed scenarios if not already completed
    if (!currentUser.completedScenarios.includes(scenarioId)) {
      currentUser.completedScenarios.push(scenarioId);

      // Recalculate progress (simple example)
      const totalScenarios = 10; // In a real app, this would be dynamic
      currentUser.progress = Math.round(currentUser.completedScenarios.length / totalScenarios * 100);

      // Update localStorage
      localStorage.setItem(USER_KEY, JSON.stringify(currentUser));
    }

    return true;
  } catch (error) {
    console.error('Error updating progress:', error);
    return false;
  }
}

// Register function (for future use)
function register(userData) {
  // This would make an API call in a real app
  return { success: false, error: 'Registration requires admin approval' };
}