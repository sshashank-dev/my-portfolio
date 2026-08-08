import React, { useState } from "react";
import { motion } from "framer-motion";

const AdminLogin = ({ onLogin }) => {
    const [key, setKey] = useState("");
    const [error, setError] = useState("");
    const [loggingIn, setLoggingIn] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!key.trim()) {
            setError("ENTER ADMIN KEY");
            return;
        }

        setError("");
        setLoggingIn(true);

        try {
            const success = await onLogin(key.trim());

            if (!success) {
                setError("INVALID ADMIN KEY OR SERVER ERROR");
            }
        } catch (err) {
            console.error("Admin login error:", err);
            setError("SERVER CONNECTION FAILED");
        } finally {
            setLoggingIn(false);
        }
    };

    return (
        <div className="min-h-screen bg-black flex items-center justify-center p-6">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                    duration: 0.8,
                    ease: [0.16, 1, 0.3, 1],
                }}
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
                        disabled={loggingIn}
                        value={key}
                        onChange={(e) => {
                            setKey(e.target.value);
                            setError("");
                        }}
                        className="bg-transparent border-b border-white/20 w-full mb-3 text-center outline-none py-2 text-white placeholder:text-white/10 disabled:opacity-40"
                    />

                    {error && (
                        <p className="text-red-500 text-[9px] uppercase tracking-widest mb-6">
                            {error}
                        </p>
                    )}

                    {!error && <div className="mb-6" />}

                    <button
                        type="submit"
                        disabled={loggingIn}
                        className="text-[10px] uppercase tracking-widest border border-white/20 px-6 py-2 hover:bg-white hover:text-black transition-all cursor-pointer disabled:opacity-40"
                    >
                        {loggingIn ? "AUTHORIZING..." : "AUTHORIZE"}
                    </button>
                </form>
            </motion.div>
        </div>
    );
};

export default AdminLogin;