// import React, { useState } from 'react';
// import { useAuth } from '../../context/AuthContext';

// const Login = () => {
//   const { login, users } = useAuth();
//   const [selectedUserId, setSelectedUserId] = useState('');
//   const [error, setError] = useState('');

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (!selectedUserId) {
//       setError('Please select a user');
//       return;
//     }

//     const success = login(selectedUserId);
//     if (!success) {
//       setError('Login failed');
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
//       <div className="flex w-full max-w-4xl bg-white rounded-2xl shadow-lg overflow-hidden h-[700px]  ">
        
//         {/* Left Image */}
//         <div className="w-[80%] hidden md:block">
//           <img
//             src="image.png"
//             alt="Login Illustration"
//             className=" w-full h-[700px] object-cover flex flex-col justify-center p-10 px-1 pl-2   "
//           />
//         </div>
  
//         {/* Right Form */}
//         <div className="w-full md:w-1/2 p-8 flex flex-col justify-center">
//           <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
//             Task Tracker Login
//           </h2>
  
//           {error && (
//             <div className="bg-red-100 text-red-700 p-3 rounded mb-4">
//               {error}
//             </div>
//           )}
  
//           <form onSubmit={handleSubmit}>
//             <div className="mb-4">
//               <label className="block text-gray-700 mb-2">Select User</label>
//               <select
//                 className="w-full p-2 border border-gray-300 rounded"
//                 value={selectedUserId}
//                 onChange={(e) => setSelectedUserId(e.target.value)}
//               >
//                 <option value="">-- Select a user --</option>
//                 {users.map((user) => (
//                   <option key={user.id} value={user.id}>
//                     {user.name} ({user.role})
//                   </option>
//                 ))}
//               </select>
//             </div>
  
//             <button
//               type="submit"
//               className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-2 rounded hover:opacity-90 transition-opacity"
//             >
//               Login
//             </button>
//           </form>
  
//           <div className="mt-6 text-center text-sm text-gray-500">
//             <p>This is a mock login for demonstration purposes.</p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }  
// export default Login;
import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import LightImage from '../../assets/undraw_process_7lkc.svg';

const Login = () => {
  const { login, users } = useAuth();
  const [selectedUserId, setSelectedUserId] = useState('');
  const [error, setError] = useState('');
  const [isDark, setIsDark] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const generateMockJWT = (username, password) => {
    const header = {
      alg: "HS256",
      typ: "JWT"
    };
    const payload = {
      username,
      iat: Math.floor(Date.now() / 1000)
    };
    const base64Encode = (obj) =>
      btoa(JSON.stringify(obj)).replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');
    const headerEncoded = base64Encode(header);
    const payloadEncoded = base64Encode(payload);
    const signature = "mock-signature";
    return `${headerEncoded}.${payloadEncoded}.${signature}`;
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    const loginSuccess = login(username, password);
    if (loginSuccess !== false) {
      // Generate and store mock JWT
      const token = generateMockJWT(username, password);
      localStorage.setItem('token', token);
      setError('');
    } else {
      setError('Invalid username or password');
    }
  };

  return (
    <div className={`${isDark ? 'dark' : ''}`}>
      <div className="relative min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-[#0f172a] dark:via-[#0f172a] dark:to-[#0a0e1a] transition-all duration-300 flex items-center justify-center px-4">

        {/* Toggle */}
        <button
          onClick={() => setIsDark(!isDark)}
          className="absolute top-6 right-6 text-sm px-4 py-1.5 rounded-full border dark:border-gray-600 border-gray-300 bg-white dark:bg-gray-800 text-gray-800 dark:text-white shadow"
        >
          {isDark ? '☀️ Light Mode' : '🌙 Dark Mode'}
        </button>

        {/* Layout */}
        <div className="w-full max-w-7xl h-[700px] bg-white dark:bg-[#1e293b] rounded-3xl shadow-xl dark:shadow-[0_0_30px_rgba(0,0,0,0.4)] overflow-hidden grid grid-cols-1 md:grid-cols-2">

          {/* Left SVG Column */}
          <div
            className={`hidden md:flex items-center justify-center px-12 py-20
              ${isDark ? 'bg-[#111827]' : 'bg-gradient-to-br from-indigo-100 via-purple-100 to-white'}`}
          >
            <img
              src={LightImage}
              alt="Illustration"
              className="max-w-[90%] max-h-[400px]"
            />
          </div>

          {/* Right Form Column */}
          <div className="px-12 py-20 flex flex-col justify-center text-gray-800 dark:text-gray-200">
            <h1 className="text-4xl font-extrabold text-center mb-2 tracking-wide">
              Welcome to Task Tracker
            </h1>
            <div className="w-12 h-1 mx-auto bg-blue-600 dark:bg-indigo-500 rounded-full mb-6" />
            <p className="text-base text-center text-gray-600 dark:text-gray-300 mb-8">
              Please login to continue
            </p>

            {error && (
              <div className="bg-red-100 text-red-700 dark:bg-red-400 dark:text-white p-3 rounded mb-5 text-center text-sm">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Username Field */}
              <div>
                <label className="block mb-1 text-sm">Username</label>
                <input
                  type="text"
                  placeholder="Enter your username"
                  className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#0f172a] text-gray-800 dark:text-gray-100 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>

              {/* Password Field */}
              <div>
                <label className="block mb-1 text-sm">Password</label>
                <input
                  type="password"
                  placeholder="Enter your password"
                  className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#0f172a] text-gray-800 dark:text-gray-100 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 text-white font-semibold py-3 rounded-lg transition"
              >
                Login
              </button>
            </form>


            <p className="mt-8 text-center text-sm text-gray-500 dark:text-gray-400">
              This is a mock login for demo use.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
