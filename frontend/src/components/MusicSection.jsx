

import React, { memo } from 'react';

const MusicSection = () => {
    return (
        <section className="relative min-h-screen bg-black text-white px-6 md:px-16 pt-[150px] md:pt-[300px] pb-16 font-sans flex flex-col overflow-hidden">

            {/* 1. OPTIMIZED BACKGROUND */}
            <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
                <video
                    src="/background-vdo.mp4"
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover opacity-50"
                    style={{ contain: 'strict', transform: 'translateZ(0)' }}
                />
            </div>

            {/* 2. CONTENT LAYER */}
            <div className="relative z-20 max-w-[1400px] mx-auto w-full flex flex-col justify-between h-full min-h-[80vh] mb-5">

                <div className="flex justify-end w-full mt-10">
                    <div className="max-w-[450px] text-right">
                        <h1 className="text-[22px] md:text-[32px] leading-[1.1] md:leading-[0.95] font-medium tracking-tighter text-white">
                            Part of my main activity includes experimenting with UI, motion, and modern web technologies. It keeps me curious.
                        </h1>
                    </div>
                </div>

                <div className="flex justify-start w-full mt-20 md:mt-0">
                    <div className="w-full max-w-[400px]">
                        {/* FIX: Re-added the anchor tag with proper z-index and block display */}
                        <a
                            href="https://www.youtube.com/watch?v=tK_6HYOmGo8"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="relative z-30 block group"
                        >
                            <div className="bg-white text-black p-5 md:p-6 h-[450px] md:h-[420px] flex flex-col justify-between transition-transform duration-500 ease-out group-hover:-translate-y-2 will-change-transform">

                                <div className="flex justify-between items-start">
                                    <h2 className="text-[28px] md:text-[32px] font-bold leading-none tracking-tighter">
                                        Music Visuals
                                    </h2>
                                    <span className="text-xl group-hover:translate-x-1 transition-transform">↗</span>
                                </div>

                                <div className="flex-1 my-5 overflow-hidden bg-black flex items-center relative">
                                    <video
                                        src="/music.mp4"
                                        autoPlay
                                        loop
                                        muted
                                        playsInline
                                        preload="metadata"
                                        className="w-full h-full object-cover grayscale transition-all duration-700 group-hover:grayscale-0"
                                    />
                                </div>

                                <div className="mt-auto">
                                    <span className="text-[9px] font-black text-gray-400 block mb-2 tracking-[0.2em] uppercase">
                                        Recent Release
                                    </span>
                                    <h3 className="text-[16px] md:text-lg font-bold leading-tight mb-1">
                                        Goom Gum — To Trajadão (Original Mix)
                                    </h3>
                                    <p className="text-[11px] md:text-[12px] text-gray-500 font-medium">
                                        Art direction & motion design.
                                    </p>
                                </div>
                            </div>
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default memo(MusicSection);