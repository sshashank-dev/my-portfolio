import React, { useEffect } from 'react';
import About from '../components/About.';


const AboutPage = () => {
    // Ensures the user starts at the top of the page on load
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <main className="bg-black min-h-screen">
            {/* Added spacing for your fixed Navbar */}
            <div className="h-24" />
            <About />

        </main>
    );
};

export default AboutPage;