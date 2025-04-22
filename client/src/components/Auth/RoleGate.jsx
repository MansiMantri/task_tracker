import { useAuth } from '../../context/AuthContext';

const RoleGate = ({ allowed, children }) => {
  const { currentUser } = useAuth();
  
  if (!currentUser || !allowed.includes(currentUser.role)) {
    return null;
  }
  
  return children;
};

export default RoleGate;