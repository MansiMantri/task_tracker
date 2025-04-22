// import Header from './Header';

// const Layout = ({ children }) => {
//   return (
//     <div className="min-h-screen flex flex-col bg-gray-50">
//       <Header />
//       <main className="flex-grow container mx-auto px-4 py-6">
//         {children}
//       </main>
//       <footer className="bg-gray-100 py-4 text-center text-gray-600 text-sm">
//         &copy; {new Date().getFullYear()} Role-Based Task Tracker
//       </footer>
//     </div>
//   );
// };

// export default Layout;
import Header from './Header';

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-[#111827] transition-colors duration-300">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-6">
        {children}
      </main>
      <footer className="bg-gray-100 dark:bg-[#0f172a] py-4 text-center text-gray-600 dark:text-gray-400 text-sm">
        &copy; {new Date().getFullYear()} Role-Based Task Tracker
      </footer>
    </div>
  );
};

export default Layout;
