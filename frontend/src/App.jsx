// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Home from "./pages/Home";
// import SmoothScroll from "./components/SmoothScroll";
// import Navbar from "./components/Navbar"; // Import your navbar

// export default function App() {
//   return (
//     <BrowserRouter>
//       {/* 1. The SmoothScroll Logic */}
//       <SmoothScroll />

//       {/* 2. The Fixed Navbar (Must be z-[100]) */}
//       <Navbar />

//       <Routes>
//         <Route path="/" element={<Home />} />
//       </Routes>
//     </BrowserRouter>
//   );
// }



import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import AboutPage from "./pages/AboutPage";
import SmoothScroll from "./components/SmoothScroll";
import Navbar from "./components/Navbar";
import Inquiry from "./pages/Inquiry";
import AdminDashboard from "./components/AdminDashboard";
import Cursor from "./components/Cursor";
import Work from "./components/Work";

export default function App() {
  return (
    <BrowserRouter>
      {/* Global Elements */}
      <SmoothScroll />
      <Navbar />
      <Cursor />

      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/work" element={<Work />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/inquiry" element={<Inquiry />} />

        {/* Private Admin Route 
          I've kept your custom path '/shashank-admin' for security through obscurity.
        */}
        <Route path="/shashank-admin" element={<AdminDashboard />} />

        {/* Optional: 404 Redirect or Page */}
        <Route path="*" element={
          <div className="h-screen bg-black flex items-center justify-center text-white uppercase tracking-widest text-xs">
            404 / Page Not Found
          </div>
        } />
      </Routes>
    </BrowserRouter>
  );
}