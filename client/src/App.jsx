import { AuthProvider, useAuth } from './context/AuthContext';
import { TaskProvider } from './context/TaskContext';
import Layout from './components/Layout/Layout';
import Login from './components/Auth/Login';
import TaskList from './components/Tasks/TaskList';

const AppContent = () => {
  const { isAuthenticated } = useAuth();
  
  return isAuthenticated ? (
    <Layout>
      <TaskList />
    </Layout>
  ) : (
    <Login />
  );
};

function App() {
  return (
    <AuthProvider>
      <TaskProvider>
        <AppContent />
      </TaskProvider>
    </AuthProvider>
  );
}

export default App;