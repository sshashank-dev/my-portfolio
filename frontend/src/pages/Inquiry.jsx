import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Inquiry = () => {
    const formRef = useRef();

    const initialFormState = {
        user_name: '',
        user_email: '',
        user_project: '',
        message: ''
    };

    const [formData, setFormData] = useState(initialFormState);
    const [status, setStatus] = useState('idle'); // idle | loading | success | error

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('loading');

        try {
            // Note: Ensure your backend has app.post("/api/inquiry", ...) 
            // matching this exact URL.
            const response = await fetch('http://localhost:5000/api/inquiry', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            // Check for response.ok (status 200-299)
            if (response.ok) {
                setFormData(initialFormState);
                setStatus('success');
                // Success message stays for 6 seconds
                setTimeout(() => setStatus('idle'), 6000);
            } else {
                throw new Error(data.error || "Server rejected request");
            }
        } catch (error) {
            console.error("Inquiry Error:", error);
            setStatus('error');
            // Error message clears after 4 seconds
            setTimeout(() => setStatus('idle'), 4000);
        }
    };

    return (
        <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="min-h-screen bg-black text-white p-6 md:p-20 flex flex-col justify-center selection:bg-white selection:text-black"
        >
            <div className="max-w-4xl mx-auto w-full">
                <motion.h2
                    initial={{ y: 20, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.8 }}
                    className="text-6xl md:text-8xl font-bold uppercase tracking-tighter mb-12"
                >
                    Let's Build <br />
                    <span className="text-white/20 italic">Something.</span>
                </motion.h2>

                <form
                    ref={formRef}
                    onSubmit={handleSubmit}
                    className="grid grid-cols-1 md:grid-cols-2 gap-12"
                >
                    {/* Name */}
                    <div className="flex flex-col border-b border-white/10 focus-within:border-white transition-colors pb-4 group">
                        <label className="text-[10px] uppercase tracking-[0.2em] text-white/30 group-focus-within:text-white font-bold mb-2">
                            01 / Your Name
                        </label>
                        <input
                            type="text"
                            name="user_name"
                            value={formData.user_name}
                            onChange={handleChange}
                            required
                            className="bg-transparent outline-none text-xl md:text-2xl uppercase placeholder:text-white/5"
                            placeholder="JOHN DOE"
                        />
                    </div>

                    {/* Email */}
                    <div className="flex flex-col border-b border-white/10 focus-within:border-white transition-colors pb-4 group">
                        <label className="text-[10px] uppercase tracking-[0.2em] text-white/30 group-focus-within:text-white font-bold mb-2">
                            02 / Email Address
                        </label>
                        <input
                            type="email"
                            name="user_email"
                            value={formData.user_email}
                            onChange={handleChange}
                            required
                            className="bg-transparent outline-none text-xl md:text-2xl uppercase placeholder:text-white/5"
                            placeholder="HELLO@EXAMPLE.COM"
                        />
                    </div>

                    {/* Project */}
                    <div className="flex flex-col border-b border-white/10 focus-within:border-white transition-colors pb-4 md:col-span-2 group">
                        <label className="text-[10px] uppercase tracking-[0.2em] text-white/30 group-focus-within:text-white font-bold mb-2">
                            03 / Service Required
                        </label>
                        <input
                            type="text"
                            name="user_project"
                            value={formData.user_project}
                            onChange={handleChange}
                            required
                            className="bg-transparent outline-none text-xl md:text-2xl uppercase placeholder:text-white/5"
                            placeholder="MERN STACK / UI DESIGN"
                        />
                    </div>

                    {/* Message */}
                    <div className="flex flex-col border-b border-white/10 focus-within:border-white transition-colors pb-4 md:col-span-2 group">
                        <label className="text-[10px] uppercase tracking-[0.2em] text-white/30 group-focus-within:text-white font-bold mb-2">
                            04 / Message
                        </label>
                        <textarea
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            required
                            rows="3"
                            className="bg-transparent outline-none text-xl md:text-2xl uppercase placeholder:text-white/5 resize-none"
                            placeholder="TELL ME ABOUT YOUR VISION..."
                        />
                    </div>

                    <div className="md:col-span-2 mt-8 flex flex-col md:flex-row md:items-center gap-8">
                        <button
                            type="submit"
                            disabled={status === 'loading'}
                            className="group flex items-center gap-6 text-3xl md:text-5xl font-bold uppercase tracking-tighter disabled:opacity-50 transition-all cursor-pointer"
                        >
                            <span className={status === 'success' ? 'text-green-500' : ''}>
                                {status === 'loading'
                                    ? 'Sending...'
                                    : status === 'success'
                                        ? 'Dispatched'
                                        : 'Send Inquiry'}
                            </span>

                            <motion.span
                                animate={status === 'loading' ? { x: [0, 10, 0] } : {}}
                                transition={{ repeat: Infinity, duration: 1 }}
                                className="group-hover:translate-x-3 transition-transform"
                            >
                                →
                            </motion.span>
                        </button>

                        <AnimatePresence>
                            {status === 'error' && (
                                <motion.p
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0 }}
                                    className="text-red-500 text-[10px] uppercase tracking-widest"
                                >
                                    Connection failed. Check server.
                                </motion.p>
                            )}
                        </AnimatePresence>
                    </div>
                </form>
            </div>
        </motion.section>
    );
};

export default Inquiry;