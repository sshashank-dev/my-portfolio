import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    FiActivity,
    FiMail,
    FiLayers,
    FiTrash2,
    FiPlus,
    FiX,
    FiUser,
    FiSave,
    FiDownload,
    FiUpload,
    FiMessageSquare,
    FiTerminal,
} from "react-icons/fi";
import AdminLogin from "./AdminLogin";

const AdminDashboard = () => {
    const [inquiries, setInquiries] = useState([]);
    const [projects, setProjects] = useState([]);
    const [skills, setSkills] = useState([]);

    const [loading, setLoading] = useState(true);
    const [adminKey, setAdminKey] = useState(
        localStorage.getItem("admin_key") || ""
    );
    const [isAuthorized, setIsAuthorized] = useState(false);

    const [showForge, setShowForge] = useState(false);

    const fileInputRef = useRef(null);

    const [identity, setIdentity] = useState({
        aboutMe: "",
        tagline: "",
        resumeLink: "",
    });

    const [newSkill, setNewSkill] = useState("");

    // IMPORTANT:
    // This must be a real URL, not Markdown.
    const apiBase = "http://localhost:5000/api";

    // --------------------------------------------------
    // SEPARATE INQUIRIES FROM FOOTER FEEDBACK
    // --------------------------------------------------

    const directInquiries = inquiries.filter(
        (iq) => iq.user_project !== "Footer Feedback"
    );

    const footerFeedback = inquiries.filter(
        (iq) => iq.user_project === "Footer Feedback"
    );

    // --------------------------------------------------
    // FETCH ALL ADMIN DATA
    // --------------------------------------------------
    const fetchData = async (key) => {
        setLoading(true);

        try {
            const headers = {
                "x-admin-key": key,
                "Content-Type": "application/json",
            };

            console.log("🔐 Attempting admin authorization...");
            console.log("🌐 Request:", `${apiBase}/admin/inquiries`);

            const inqRes = await fetch(`${apiBase}/admin/inquiries`, {
                method: "GET",
                headers,
            });

            if (!inqRes.ok) {
                console.error("❌ Admin authorization failed:", inqRes.status);

                if (inqRes.status === 401) {
                    localStorage.removeItem("admin_key");
                }

                setIsAuthorized(false);
                return false;
            }

            const [projRes, skillRes, idenRes] = await Promise.all([
                fetch(`${apiBase}/projects`),
                fetch(`${apiBase}/skills`),
                fetch(`${apiBase}/identity`),
            ]);

            const inquiriesData = await inqRes.json();
            const projectsData = await projRes.json();
            const skillsData = await skillRes.json();
            const identityData = await idenRes.json();

            setInquiries(inquiriesData);
            setProjects(projectsData);
            setSkills(skillsData);

            if (identityData) {
                setIdentity(identityData);
            }

            setAdminKey(key);
            localStorage.setItem("admin_key", key);
            setIsAuthorized(true);

            console.log("✅ ADMIN AUTHORIZED");

            return true;

        } catch (err) {
            console.error("❌ Fetch Error:", err);
            setIsAuthorized(false);
            return false;

        } finally {
            setLoading(false);
        }
    };

    // --------------------------------------------------
    // CHECK SAVED ADMIN KEY ON PAGE LOAD
    // --------------------------------------------------

    useEffect(() => {
        const savedKey =
            localStorage.getItem("admin_key");

        if (savedKey) {
            fetchData(savedKey);
        } else {
            setLoading(false);
        }
    }, []);

    // --------------------------------------------------
    // DOWNLOAD PROJECT BACKUP
    // --------------------------------------------------

    const downloadBackup = () => {
        const dataStr = JSON.stringify(
            projects,
            null,
            2
        );

        const dataBlob = new Blob(
            [dataStr],
            {
                type: "application/json",
            }
        );

        const url =
            URL.createObjectURL(dataBlob);

        const link =
            document.createElement("a");

        link.href = url;

        link.download = `portfolio_registry_backup_${new Date()
            .toISOString()
            .split("T")[0]
            }.json`;

        document.body.appendChild(link);

        link.click();

        document.body.removeChild(link);

        URL.revokeObjectURL(url);
    };

    // --------------------------------------------------
    // RESTORE PROJECT BACKUP
    // --------------------------------------------------

    const handleRestore = async (e) => {
        const file = e.target.files?.[0];

        if (!file) return;

        const reader = new FileReader();

        reader.onload = async (event) => {
            try {
                const importedProjects =
                    JSON.parse(
                        event.target.result
                    );

                if (
                    !Array.isArray(
                        importedProjects
                    )
                ) {
                    throw new Error(
                        "Invalid Format"
                    );
                }

                const confirmed =
                    window.confirm(
                        `Restore ${importedProjects.length} projects?`
                    );

                if (!confirmed) return;

                for (const project of importedProjects) {
                    const proj = {
                        ...project,
                    };

                    delete proj._id;

                    await fetch(
                        `${apiBase}/admin/projects`,
                        {
                            method: "POST",
                            headers: {
                                "x-admin-key":
                                    adminKey,
                                "Content-Type":
                                    "application/json",
                            },
                            body: JSON.stringify(
                                proj
                            ),
                        }
                    );
                }

                alert(
                    "Registry Restored Successfully"
                );

                await fetchData(adminKey);
            } catch (err) {
                console.error(err);
                alert(
                    "Error importing file."
                );
            }
        };

        reader.readAsText(file);

        // Allow same file to be selected again
        e.target.value = "";
    };

    // --------------------------------------------------
    // UPDATE IDENTITY
    // --------------------------------------------------

    const handleUpdateIdentity = async (e) => {
        e.preventDefault();

        try {
            const res = await fetch(
                `${apiBase}/admin/identity`,
                {
                    method: "POST",
                    headers: {
                        "x-admin-key":
                            adminKey,
                        "Content-Type":
                            "application/json",
                    },
                    body: JSON.stringify(
                        identity
                    ),
                }
            );

            if (res.ok) {
                alert(
                    "Identity Updated Successfully"
                );

                await fetchData(adminKey);
            } else {
                alert(
                    "Identity update failed."
                );
            }
        } catch (err) {
            console.error(err);
            alert(
                "Server connection failed."
            );
        }
    };

    // --------------------------------------------------
    // ADD SKILL
    // --------------------------------------------------

    const handleAddSkill = async (e) => {
        e.preventDefault();

        if (!newSkill.trim()) return;

        try {
            const res = await fetch(
                `${apiBase}/admin/skills`,
                {
                    method: "POST",
                    headers: {
                        "x-admin-key":
                            adminKey,
                        "Content-Type":
                            "application/json",
                    },
                    body: JSON.stringify({
                        name: newSkill.trim(),
                    }),
                }
            );

            if (res.ok) {
                const added =
                    await res.json();

                setSkills((prev) => [
                    ...prev,
                    added,
                ]);

                setNewSkill("");
            } else {
                alert(
                    "Failed to add skill."
                );
            }
        } catch (err) {
            console.error(err);

            alert(
                "Server connection failed."
            );
        }
    };

    // --------------------------------------------------
    // DELETE DATA
    // --------------------------------------------------

    const handleDelete = async (
        type,
        id
    ) => {
        const confirmed =
            window.confirm(
                `Delete ${type}?`
            );

        if (!confirmed) return;

        try {
            const res = await fetch(
                `${apiBase}/admin/${type}/${id}`,
                {
                    method: "DELETE",
                    headers: {
                        "x-admin-key":
                            adminKey,
                    },
                }
            );

            if (res.ok) {
                if (type === "inquiry") {
                    setInquiries((prev) =>
                        prev.filter(
                            (iq) =>
                                iq._id !== id
                        )
                    );
                }

                if (type === "projects") {
                    setProjects((prev) =>
                        prev.filter(
                            (project) =>
                                project._id !==
                                id
                        )
                    );
                }

                if (type === "skills") {
                    setSkills((prev) =>
                        prev.filter(
                            (skill) =>
                                skill._id !== id
                        )
                    );
                }
            } else {
                alert(
                    "Delete operation failed."
                );
            }
        } catch (err) {
            console.error(err);

            alert(
                "Server connection failed."
            );
        }
    };

    // --------------------------------------------------
    // LOGOUT
    // --------------------------------------------------

    const handleLogout = () => {
        localStorage.removeItem(
            "admin_key"
        );

        setAdminKey("");
        setIsAuthorized(false);
        setInquiries([]);
        setProjects([]);
        setSkills([]);
    };

    // --------------------------------------------------
    // LOADING SCREEN
    // --------------------------------------------------

    if (loading) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center text-white font-mono uppercase tracking-[0.3em]">
                Syncing_Terminal...
            </div>
        );
    }

    // --------------------------------------------------
    // LOGIN SCREEN
    // --------------------------------------------------

    if (!isAuthorized) {
        return (
            <AdminLogin
                onLogin={fetchData}
            />
        );
    }

    // --------------------------------------------------
    // ADMIN DASHBOARD
    // --------------------------------------------------

    return (
        <div className="min-h-screen bg-black text-white p-6 md:p-16 pt-32 font-mono">
            <div className="max-w-7xl mx-auto">

                {/* PROJECT FORGE */}

                <AnimatePresence>
                    {showForge && (
                        <ProjectForge
                            apiBase={apiBase}
                            adminKey={adminKey}
                            onClose={() =>
                                setShowForge(
                                    false
                                )
                            }
                            onSuccess={() =>
                                fetchData(
                                    adminKey
                                )
                            }
                        />
                    )}
                </AnimatePresence>

                {/* HEADER */}

                <div className="flex flex-col md:flex-row justify-between items-start md:items-end border-b border-white/10 pb-8 mb-12 gap-6">

                    <div>
                        <h1 className="text-4xl font-bold uppercase tracking-tighter">
                            Command{" "}
                            <span className="text-white/20">
                                Center
                            </span>
                        </h1>

                        <p className="text-[9px] text-white/30 mt-2">
                            SECURE_ACCESS //
                            PORTFOLIO_MANAGEMENT_V3
                        </p>
                    </div>

                    <div className="flex flex-wrap gap-4">

                        <input
                            type="file"
                            ref={fileInputRef}
                            onChange={
                                handleRestore
                            }
                            className="hidden"
                            accept=".json"
                        />

                        <button
                            onClick={
                                downloadBackup
                            }
                            className="flex items-center gap-2 text-[10px] text-indigo-400 border border-indigo-400/20 px-3 py-1 uppercase hover:bg-indigo-400 hover:text-white transition-all"
                        >
                            <FiDownload />
                            Backup_Registry
                        </button>

                        <button
                            onClick={() =>
                                fileInputRef.current?.click()
                            }
                            className="flex items-center gap-2 text-[10px] text-green-400 border border-green-400/20 px-3 py-1 uppercase hover:bg-green-400 hover:text-black transition-all"
                        >
                            <FiUpload />
                            Restore_Data
                        </button>

                        <button
                            onClick={
                                handleLogout
                            }
                            className="text-[10px] text-white/40 hover:text-white underline"
                        >
                            [ Logout ]
                        </button>
                    </div>
                </div>

                {/* STATS */}

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-16">

                    <StatBox
                        label="Active_Inquiries"
                        value={
                            directInquiries.length
                        }
                        icon={<FiMail />}
                        color="text-indigo-500"
                    />

                    <StatBox
                        label="Signals_Intercepted"
                        value={
                            footerFeedback.length
                        }
                        icon={
                            <FiMessageSquare />
                        }
                        color="text-amber-500"
                    />

                    <StatBox
                        label="Registry_Nodes"
                        value={
                            projects.length
                        }
                        icon={<FiLayers />}
                        color="text-white/50"
                    />

                    <StatBox
                        label="Tech_Stack"
                        value={
                            skills.length
                        }
                        icon={<FiActivity />}
                        color="text-green-500"
                    />
                </div>

                {/* MAIN GRID */}

                <div className="grid grid-cols-1 xl:grid-cols-3 gap-16">

                    {/* LEFT COLUMN */}

                    <div className="xl:col-span-2 space-y-16">

                        {/* CLIENT INQUIRIES */}

                        <div>

                            <h2 className="text-xs mb-6 text-white/40 uppercase italic tracking-widest flex items-center gap-2">
                                <FiTerminal size={10} />
                                // Client_Inquiries
                            </h2>

                            <div className="space-y-4">

                                {directInquiries.length ===
                                    0 && (
                                        <p className="text-white/20 text-[10px]">
                                            NO_CLIENT_LEADS_DETECTED
                                        </p>
                                    )}

                                {directInquiries.map(
                                    (iq) => (
                                        <div
                                            key={
                                                iq._id
                                            }
                                            className="border border-white/5 p-4 flex justify-between items-center group hover:bg-white/[0.02] transition-colors"
                                        >

                                            <div>

                                                <div className="text-sm font-bold uppercase flex items-center gap-3">

                                                    {iq.user_name}

                                                    <span className="text-[8px] bg-indigo-500/20 text-indigo-400 px-2 py-0.5 border border-indigo-500/30 font-normal tracking-widest">
                                                        PROJ:{" "}
                                                        {
                                                            iq.user_project
                                                        }
                                                    </span>
                                                </div>

                                                <div className="text-[10px] text-white/50 mt-1 italic">
                                                    {
                                                        iq.user_email
                                                    }
                                                </div>

                                                <div className="text-[10px] text-white/30 mt-2 border-l border-white/10 pl-3 max-w-xl">
                                                    {
                                                        iq.message
                                                    }
                                                </div>

                                                <div className="text-[8px] text-white/20 mt-3 uppercase">
                                                    {iq.createdAt
                                                        ? new Date(
                                                            iq.createdAt
                                                        ).toLocaleString()
                                                        : ""}
                                                </div>
                                            </div>

                                            <button
                                                onClick={() =>
                                                    handleDelete(
                                                        "inquiry",
                                                        iq._id
                                                    )
                                                }
                                                className="text-red-500 text-[9px] opacity-0 group-hover:opacity-100 transition-opacity hover:underline"
                                            >
                                                [ KILL ]
                                            </button>
                                        </div>
                                    )
                                )}
                            </div>
                        </div>

                        {/* FOOTER FEEDBACK */}

                        <div className="pt-8 border-t border-white/5">

                            <h2 className="text-xs mb-6 text-amber-500/50 uppercase italic tracking-widest flex items-center gap-2">
                                <FiMessageSquare
                                    size={10}
                                />
                                // Signal_Intercepts
                                (Footer Feedback)
                            </h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                                {footerFeedback.length ===
                                    0 && (
                                        <p className="text-white/20 text-[10px]">
                                            SILENCE_IN_FOOTER_DOMAIN
                                        </p>
                                    )}

                                {footerFeedback.map(
                                    (iq) => (
                                        <div
                                            key={
                                                iq._id
                                            }
                                            className="border border-white/5 p-4 bg-zinc-950/30 group hover:border-amber-500/20 transition-all"
                                        >

                                            <div className="flex justify-between items-start mb-2">

                                                <span className="text-[9px] text-amber-500/60 font-bold uppercase tracking-widest">
                                                    FEEDBACK_NODE
                                                </span>

                                                <button
                                                    onClick={() =>
                                                        handleDelete(
                                                            "inquiry",
                                                            iq._id
                                                        )
                                                    }
                                                    className="text-red-500 text-[9px] opacity-0 group-hover:opacity-100"
                                                >
                                                    [ PURGE ]
                                                </button>
                                            </div>

                                            <div className="text-[11px] text-white/80 leading-relaxed italic">
                                                "
                                                {
                                                    iq.message
                                                }
                                                "
                                            </div>

                                            <div className="mt-4 text-[8px] text-white/20 uppercase tracking-tighter">
                                                Timestamp:{" "}
                                                {iq.createdAt
                                                    ? new Date(
                                                        iq.createdAt
                                                    ).toLocaleString()
                                                    : ""}
                                            </div>
                                        </div>
                                    )
                                )}
                            </div>
                        </div>

                        {/* IDENTITY */}

                        <div className="border border-white/10 p-8 bg-zinc-950/50">

                            <h2 className="text-xs mb-8 text-white/40 uppercase tracking-widest flex items-center gap-2">
                                <FiUser />
                                // Global_Identity
                            </h2>

                            <form
                                onSubmit={
                                    handleUpdateIdentity
                                }
                                className="space-y-6"
                            >

                                <div>

                                    <label className="text-[9px] text-white/30 block mb-2 uppercase">
                                        Portfolio
                                        Tagline
                                    </label>

                                    <input
                                        className="w-full bg-transparent border-b border-white/10 pb-2 outline-none text-sm"
                                        value={
                                            identity.tagline ||
                                            ""
                                        }
                                        onChange={(e) =>
                                            setIdentity({
                                                ...identity,
                                                tagline:
                                                    e.target
                                                        .value,
                                            })
                                        }
                                    />
                                </div>

                                <div>

                                    <label className="text-[9px] text-white/30 block mb-2 uppercase">
                                        Philosophy
                                        Quote
                                    </label>

                                    <textarea
                                        className="w-full bg-transparent border border-white/10 p-4 outline-none text-sm h-24"
                                        value={
                                            identity.aboutMe ||
                                            ""
                                        }
                                        onChange={(e) =>
                                            setIdentity({
                                                ...identity,
                                                aboutMe:
                                                    e.target
                                                        .value,
                                            })
                                        }
                                    />
                                </div>

                                <div>

                                    <label className="text-[9px] text-white/30 block mb-2 uppercase">
                                        Resume Link
                                    </label>

                                    <input
                                        className="w-full bg-transparent border-b border-white/10 pb-2 outline-none text-sm"
                                        value={
                                            identity.resumeLink ||
                                            ""
                                        }
                                        onChange={(e) =>
                                            setIdentity({
                                                ...identity,
                                                resumeLink:
                                                    e.target
                                                        .value,
                                            })
                                        }
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className="flex items-center gap-2 text-[10px] bg-white text-black px-6 py-2 uppercase font-bold hover:bg-indigo-500 hover:text-white transition-all"
                                >
                                    <FiSave />
                                    Sync_Identity
                                </button>
                            </form>
                        </div>
                    </div>

                    {/* RIGHT COLUMN */}

                    <div className="space-y-12">

                        {/* REGISTRY */}

                        <div>

                            <h2 className="text-xs mb-6 text-white/40 uppercase tracking-widest">
                                // Registry
                            </h2>

                            <div className="space-y-2">

                                {projects.length ===
                                    0 && (
                                        <p className="text-white/20 text-[10px]">
                                            NO_REGISTRY_NODES
                                        </p>
                                    )}

                                {projects.map(
                                    (project) => (
                                        <div
                                            key={
                                                project._id
                                            }
                                            className="border border-white/10 p-3 bg-zinc-950 flex justify-between items-center"
                                        >

                                            <span className="text-[10px] uppercase">
                                                {
                                                    project.title
                                                }
                                            </span>

                                            <button
                                                onClick={() =>
                                                    handleDelete(
                                                        "projects",
                                                        project._id
                                                    )
                                                }
                                                className="text-white/20 hover:text-red-500"
                                            >
                                                <FiTrash2
                                                    size={
                                                        12
                                                    }
                                                />
                                            </button>
                                        </div>
                                    )
                                )}

                                <button
                                    onClick={() =>
                                        setShowForge(
                                            true
                                        )
                                    }
                                    className="w-full border border-dashed border-white/20 p-4 text-[10px] uppercase text-white/30 hover:border-white hover:text-white"
                                >
                                    + Add_New_Node
                                </button>
                            </div>
                        </div>

                        {/* TECH STACK */}

                        <div>

                            <h2 className="text-xs mb-6 text-white/40 uppercase tracking-widest">
                                // Tech_Stack
                            </h2>

                            <form
                                onSubmit={
                                    handleAddSkill
                                }
                                className="mb-4 flex gap-2"
                            >

                                <input
                                    value={
                                        newSkill
                                    }
                                    onChange={(e) =>
                                        setNewSkill(
                                            e.target
                                                .value
                                        )
                                    }
                                    placeholder="SKILL_NAME..."
                                    className="bg-transparent border-b border-white/10 text-[10px] flex-grow pb-1 outline-none"
                                />

                                <button
                                    type="submit"
                                    className="text-white/40 hover:text-white"
                                >
                                    <FiPlus />
                                </button>
                            </form>

                            <div className="flex flex-wrap gap-2">

                                {skills.map(
                                    (skill) => (
                                        <span
                                            key={
                                                skill._id
                                            }
                                            className="px-2 py-1 bg-zinc-950 border border-white/10 text-[9px] uppercase flex items-center gap-2"
                                        >
                                            {
                                                skill.name
                                            }

                                            <button
                                                onClick={() =>
                                                    handleDelete(
                                                        "skills",
                                                        skill._id
                                                    )
                                                }
                                                className="text-red-500"
                                            >
                                                ×
                                            </button>
                                        </span>
                                    )
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

// ======================================================
// STAT BOX
// ======================================================

const StatBox = ({
    label,
    value,
    icon,
    color,
}) => {
    return (
        <div className="border border-white/10 p-6 bg-zinc-950 relative overflow-hidden group">

            <div
                className={`absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-30 transition-opacity ${color}`}
            >
                {React.cloneElement(icon, {
                    size: 40,
                })}
            </div>

            <div className="text-[10px] text-white/40 uppercase tracking-widest mb-1">
                {label}
            </div>

            <div className="text-3xl font-bold">
                {value}
            </div>
        </div>
    );
};

// ======================================================
// PROJECT FORGE
// ======================================================

const ProjectForge = ({
    apiBase,
    adminKey,
    onClose,
    onSuccess,
}) => {
    const [formData, setFormData] =
        useState({
            title: "",
            category: "",
            imageUrl: "",
            projectUrl: "",
            githubUrl: "",
            techStack: "",
        });

    const handleSubmit = async (e) => {
        e.preventDefault();

        const projectData = {
            ...formData,
            techStack:
                formData.techStack
                    .split(",")
                    .map((s) =>
                        s.trim()
                    )
                    .filter(
                        (s) => s !== ""
                    ),
        };

        try {
            const res = await fetch(
                `${apiBase}/admin/projects`,
                {
                    method: "POST",
                    headers: {
                        "x-admin-key":
                            adminKey,
                        "Content-Type":
                            "application/json",
                    },
                    body: JSON.stringify(
                        projectData
                    ),
                }
            );

            if (res.ok) {
                onSuccess();
                onClose();
            } else {
                const errorText =
                    await res.text();

                console.error(
                    "Project creation failed:",
                    errorText
                );

                alert(
                    "Creation failed."
                );
            }
        } catch (err) {
            console.error(err);

            alert(
                "Server connection failed."
            );
        }
    };

    return (
        <motion.div
            initial={{
                opacity: 0,
            }}
            animate={{
                opacity: 1,
            }}
            exit={{
                opacity: 0,
            }}
            className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
        >
            <div className="w-full max-w-md border border-white/20 bg-black p-8 relative">

                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-white/40 hover:text-white"
                >
                    <FiX />
                </button>

                <h3 className="text-sm uppercase tracking-[0.2em] mb-8 border-b border-white/10 pb-4">
                    Project_Forge
                </h3>

                <form
                    onSubmit={handleSubmit}
                    className="space-y-4"
                >

                    <input
                        className="w-full bg-transparent border-b border-white/10 py-2 outline-none text-xs"
                        placeholder="TITLE"
                        value={
                            formData.title
                        }
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                title: e.target
                                    .value,
                            })
                        }
                        required
                    />

                    <input
                        className="w-full bg-transparent border-b border-white/10 py-2 outline-none text-xs"
                        placeholder="CATEGORY"
                        value={
                            formData.category
                        }
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                category:
                                    e.target
                                        .value,
                            })
                        }
                        required
                    />

                    <input
                        className="w-full bg-transparent border-b border-white/10 py-2 outline-none text-xs"
                        placeholder="IMAGE_URL"
                        value={
                            formData.imageUrl
                        }
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                imageUrl:
                                    e.target
                                        .value,
                            })
                        }
                    />

                    <input
                        className="w-full bg-transparent border-b border-white/10 py-2 outline-none text-xs"
                        placeholder="LIVE_URL"
                        value={
                            formData.projectUrl
                        }
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                projectUrl:
                                    e.target
                                        .value,
                            })
                        }
                    />

                    <input
                        className="w-full bg-transparent border-b border-white/10 py-2 outline-none text-xs"
                        placeholder="GITHUB_URL"
                        value={
                            formData.githubUrl
                        }
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                githubUrl:
                                    e.target
                                        .value,
                            })
                        }
                    />

                    <input
                        className="w-full bg-transparent border-b border-white/10 py-2 outline-none text-xs"
                        placeholder="TECH (React, Node...)"
                        value={
                            formData.techStack
                        }
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                techStack:
                                    e.target
                                        .value,
                            })
                        }
                    />

                    <button
                        type="submit"
                        className="w-full border border-white py-4 text-[10px] uppercase hover:bg-white hover:text-black mt-4"
                    >
                        Initialize_Build
                    </button>
                </form>
            </div>
        </motion.div>
    );
};

export default AdminDashboard;