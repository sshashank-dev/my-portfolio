import React, { useState } from 'react';
import { motion } from 'framer-motion'; // <--- Add this line!

const AdminLogin = ({ onLogin }) => {
    const [key, setKey] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onLogin(key);
    };

    return (
        <div className="min-h-screen bg-black flex items-center justify-center p-6">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="max-w-sm w-full border border-white/10 p-8 text-center"
            >
                <form onSubmit={handleSubmit}>
                    <p className="text-[10px] uppercase tracking-[0.3em] text-white/40 mb-8">
                        Access Restricted
                    </p>
                    <input
                        type="password"
                        placeholder="ENTER ADMIN KEY"
                        autoFocus
                        className="bg-transparent border-b border-white/20 w-full mb-8 text-center outline-none py-2 text-white placeholder:text-white/10"
                        value={key}
                        onChange={(e) => setKey(e.target.value)}
                    />
                    <button
                        type="submit"
                        className="text-[10px] uppercase tracking-widest border border-white/20 px-6 py-2 hover:bg-white hover:text-black transition-all cursor-pointer"
                    >
                        Authorize
                    </button>
                </form>
            </motion.div>
        </div>
    );
};

export default AdminLogin;