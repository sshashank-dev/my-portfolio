// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';

// const Navbar = () => {
//     const [time, setTime] = useState('');
//     const [isCopied, setIsCopied] = useState(false);

//     useEffect(() => {
//         const updateTime = () => {
//             const now = new Date();
//             const options = {
//                 hour: '2-digit', minute: '2-digit', hour12: true,
//                 timeZone: 'Asia/Kolkata'
//             };
//             const timeString = now.toLocaleTimeString('en-IN', options).toUpperCase();
//             setTime(`${timeString} IST`);
//         };
//         updateTime();
//         const timer = setInterval(updateTime, 1000);
//         return () => clearInterval(timer);
//     }, []);

//     const handleCopy = () => {
//         navigator.clipboard.writeText("shashanksarma55204@gmail.com");
//         setIsCopied(true);
//         setTimeout(() => setIsCopied(false), 2000);
//     };

//     const linkStyle = "relative text-[13px] md:text-[14px] tracking-tight whitespace-nowrap transition-all duration-700 ease-[cubic-bezier(0.19,1,0.22,1)] hover:opacity-50 after:content-[''] after:absolute after:left-0 after:bottom-[-2px] after:w-0 after:h-[1px] after:bg-white after:transition-all after:duration-700 hover:after:w-full cursor-pointer";

//     return (
//         <nav className="fixed top-0 left-0 w-full z-[100] px-6 md:px-10 mt-4 md:mt-6 pointer-events-none font-medium select-none">
//             <div className="flex items-center justify-between text-white antialiased py-2">

//                 {/* LEFT GROUP */}
//                 <div className="flex items-center gap-8 md:gap-14 pointer-events-auto">
//                     <a href="/" className={linkStyle}>Shashank Sharma</a>

//                     {/* Hidden on mobile, shows on tablets/desktops */}
//                     <span className="hidden md:block text-[13px] md:text-[14px] tabular-nums tracking-tight uppercase opacity-40 cursor-default">
//                         {time}
//                     </span>

//                     {/* Email + Side Notification: Hidden on mobile to prevent overlap */}
//                     <div className="hidden lg:flex items-center gap-4">
//                         <span
//                             onClick={handleCopy}
//                             className={linkStyle}
//                         >
//                             shashanksharma55204@gmail.com
//                         </span>

//                         <span className={`
//                             text-[10px] md:text-[11px] uppercase tracking-[0.2em] font-bold text-white/50
//                             transition-all duration-500 ease-[cubic-bezier(0.19,1,0.22,1)]
//                             ${isCopied ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-2 pointer-events-none'}
//                         `}>
//                             Copied
//                         </span>
//                     </div>
//                 </div>

//                 {/* RIGHT GROUP */}
//                 <div className="flex items-center gap-8 md:gap-14 pointer-events-auto text-right">
//                     {/* Only shows on very large screens (xl) */}
//                     <a href="#work" className={`${linkStyle} hidden xl:block opacity-40 hover:opacity-100`}>
//                         Work, Exhibitions, Stories, About.
//                     </a>

//                     <a href="#inquiries" className="flex items-center gap-1 text-[13px] md:text-[14px] group transition-all duration-500 hover:opacity-50">
//                         <span className="relative after:content-[''] after:absolute after:left-0 after:bottom-[-2px] after:w-0 after:h-[1px] after:bg-white after:transition-all after:duration-500 group-hover:after:w-full">Inquiries</span>
//                         <span className="text-[10px] md:text-[11px] inline-block transform transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1">↗</span>
//                     </a>
//                 </div>

//             </div>
//         </nav>
//     );
// };

// export default Navbar;


import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    const [time, setTime] = useState('');
    const [isCopied, setIsCopied] = useState(false);

    useEffect(() => {
        const updateTime = () => {
            const now = new Date();
            const options = {
                hour: '2-digit', minute: '2-digit', hour12: true,
                timeZone: 'Asia/Kolkata'
            };
            const timeString = now.toLocaleTimeString('en-IN', options).toUpperCase();
            setTime(`${timeString} IST`);
        };
        updateTime();
        const timer = setInterval(updateTime, 1000);
        return () => clearInterval(timer);
    }, []);

    const handleCopy = () => {
        navigator.clipboard.writeText("shashanksharma55204@gmail.com");
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
    };

    const linkStyle = "relative text-[13px] md:text-[14px] tracking-tight whitespace-nowrap transition-all duration-700 ease-[cubic-bezier(0.19,1,0.22,1)] hover:opacity-50 after:content-[''] after:absolute after:left-0 after:bottom-[-2px] after:w-0 after:h-[1px] after:bg-white after:transition-all after:duration-700 hover:after:w-full cursor-pointer";

    return (
        <nav className="fixed top-0 left-0 w-full z-[100] px-6 md:px-10 mt-4 md:mt-6 pointer-events-none font-medium select-none">
            <div className="flex items-center justify-between text-white antialiased py-2">

                {/* LEFT GROUP */}
                <div className="flex items-center gap-8 md:gap-14 pointer-events-auto">
                    <Link to="/" className={linkStyle}>Shashank Sharma</Link>

                    <span className="hidden md:block text-[13px] md:text-[14px] tabular-nums tracking-tight uppercase opacity-40 cursor-default">
                        {time}
                    </span>

                    <div className="hidden lg:flex items-center gap-4">
                        <span onClick={handleCopy} className={linkStyle}>
                            shashanksharma55204@gmail.com
                        </span>

                        <span className={`
                            text-[10px] md:text-[11px] uppercase tracking-[0.2em] font-bold text-white/50
                            transition-all duration-500 ease-[cubic-bezier(0.19,1,0.22,1)]
                            ${isCopied ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-2 pointer-events-none'}
                        `}>
                            Copied
                        </span>
                    </div>
                </div>

                {/* RIGHT GROUP */}
                <div className="flex items-center gap-6 md:gap-10 pointer-events-auto text-right">

                    {/* UPDATED: Separate Links for Work and About */}
                    <div className="hidden xl:flex items-center gap-1">
                        <Link
                            to="/work"
                            className={`${linkStyle} opacity-40 hover:opacity-100`}
                        >
                            Work
                        </Link>

                        <span className="opacity-40 text-[13px] md:text-[14px] px-1">,</span>

                        <Link
                            to="/about"
                            className={`${linkStyle} opacity-40 hover:opacity-100`}
                        >
                            About.
                        </Link>
                    </div>

                    <Link
                        to="/inquiry"
                        onClick={() => window.scrollTo(0, 0)}
                        className="flex items-center gap-1 text-[13px] md:text-[14px] group transition-all duration-500 hover:opacity-50"
                    >
                        <span className="relative after:content-[''] after:absolute after:left-0 after:bottom-[-2px] after:w-0 after:h-[1px] after:bg-white after:transition-all after:duration-700 group-hover:after:w-full">
                            Inquiries
                        </span>
                        <span className="text-[10px] md:text-[11px] inline-block transform transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1">
                            ↗
                        </span>
                    </Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;