import { createContext, useContext, useState, useEffect } from 'react';
import { getUsers, storeCurrentUser, getCurrentUser } from '../services/localStorage';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    // Load users and current user from localStorage on mount
    const loadedUsers = getUsers();
    setUsers(loadedUsers);

    const savedUser = getCurrentUser();
    if (savedUser) {
      setCurrentUser(savedUser);
      setIsAuthenticated(true);
    }
  }, []);

  const login = (username, password) => {
    // Find user by username and password
    const user = users.find(
      (u) =>
        u.name.toLowerCase() === username.toLowerCase() &&
        u.password === password
    );
    if (user) {
      setCurrentUser(user);
      setIsAuthenticated(true);
      storeCurrentUser(user);
      setError('');
    } else {
      setError('Invalid username or password');
    }
  };

  const logout = () => {
    setCurrentUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('currentUser');
  };

  return (
    <AuthContext.Provider value={{
      currentUser,
      isAuthenticated,
      login,
      logout,
      users,
      error
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;