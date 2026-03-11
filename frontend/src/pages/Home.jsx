// import Navbar from "../components/Navbar";
// import Hero from "../components/Hero";
// import Projects from "../components/Projects";
// import Cursor from "../components/Cursor";
// import SmoothScroll from "../components/SmoothScroll";
// import MusicSection from "../components/MusicSection";



// // pages/Home.jsx
// export default function Home() {
//     return (
//         <div className="bg-black min-h-screen">
//             <SmoothScroll />
//             <Cursor />
//             {/* Navbar must be outside the main scroll flow if it's fixed */}
//             <Navbar />

//             <main className="relative z-10">
//                 <Hero />
//                 <Projects />
//                 <MusicSection />
//             </main>
//         </div>
//     );
// }



import Hero from "../components/Hero";
import Projects from "../components/Projects";
// import Cursor from "../components/Cursor";
import MusicSection from "../components/MusicSection";
import Footer from "../components/Footer";


// pages/Home.jsx
export default function Home() {
    return (
        <div className="bg-black min-h-screen">
            {/* Custom Cursor stays here to track movement across the home sections */}


            {/* SmoothScroll and Navbar are already handled in App.jsx, 
               so we only focus on the page content here.
            */}
            <main className="relative z-10">
                <Hero />
                <Projects />
                <MusicSection />

                <Footer />

            </main>
        </div>
    );
}