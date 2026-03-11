// import React, { useEffect, useState } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import AdminLogin from './AdminLogin';

// const AdminDashboard = () => {
//     const [inquiries, setInquiries] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [adminKey, setAdminKey] = useState(localStorage.getItem('admin_key') || '');
//     const [isAuthorized, setIsAuthorized] = useState(false);

//     // Function to fetch data and verify the key
//     const fetchInquiries = async (key) => {
//         setLoading(true);
//         try {
//             const res = await fetch('http://localhost:5000/api/admin/inquiries', {
//                 method: 'GET',
//                 headers: {
//                     'x-admin-key': key, // The key passed from the login form
//                     'Content-Type': 'application/json'
//                 }
//             });

//             if (res.ok) {
//                 const data = await res.json();
//                 setInquiries(data);
//                 setAdminKey(key);
//                 localStorage.setItem('admin_key', key);
//                 setIsAuthorized(true);
//             } else {
//                 // If key is wrong, clear it
//                 localStorage.removeItem('admin_key');
//                 setIsAuthorized(false);
//             }
//         } catch (err) {
//             console.error("Fetch error:", err);
//             setIsAuthorized(false);
//         } finally {
//             setLoading(false);
//         }
//     };

//     // Check auth on component mount
//     useEffect(() => {
//         if (adminKey) {
//             fetchInquiries(adminKey);
//         } else {
//             setLoading(false);
//         }
//     }, []);

//     const handleDelete = async (id) => {
//         if (!window.confirm("Permanent delete?")) return;

//         try {
//             const response = await fetch(`http://localhost:5000/api/admin/inquiry/${id}`, {
//                 method: 'DELETE',
//                 headers: { 'x-admin-key': adminKey }
//             });

//             if (response.ok) {
//                 setInquiries(inquiries.filter(iq => iq._id !== id));
//             }
//         } catch (error) {
//             console.error("Delete error:", error);
//         }
//     };

//     const handleLogout = () => {
//         localStorage.removeItem('admin_key');
//         setAdminKey('');
//         setIsAuthorized(false);
//     };

//     // 1. Show Loading State
//     if (loading && adminKey) {
//         return (
//             <div className="min-h-screen bg-black flex items-center justify-center text-white font-mono text-[10px] tracking-[0.3em] uppercase">
//                 Verifying Session...
//             </div>
//         );
//     }

//     // 2. Show Login Screen if not authorized
//     if (!isAuthorized) {
//         return <AdminLogin onLogin={fetchInquiries} />;
//     }

//     // 3. Show Dashboard if authorized
//     return (
//         <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             className="min-h-screen bg-black text-white p-6 md:p-16 pt-32 selection:bg-white selection:text-black"
//         >
//             <div className="max-w-7xl mx-auto">
//                 <div className="flex justify-between items-end border-b border-white/10 pb-8 mb-12">
//                     <div>
//                         <p className="text-white/30 text-[10px] uppercase tracking-[0.2em] mb-2 font-bold">Terminal / Admin</p>
//                         <h1 className="text-5xl md:text-7xl font-bold uppercase tracking-tighter">Inquiry <span className="italic text-white/20">Logs</span></h1>
//                     </div>
//                     <div className="text-right">
//                         <button
//                             onClick={handleLogout}
//                             className="text-[10px] uppercase tracking-widest text-white/40 hover:text-white transition-colors mb-4 block"
//                         >
//                             [ Logout ]
//                         </button>
//                         <p className="text-white/30 text-xs tabular-nums">{inquiries.length} Messages</p>
//                     </div>
//                 </div>

//                 <div className="overflow-x-auto">
//                     <table className="w-full border-collapse">
//                         <thead>
//                             <tr className="text-[10px] uppercase tracking-[0.2em] text-white/40 text-left border-b border-white/10">
//                                 <th className="pb-4 font-medium">Date</th>
//                                 <th className="pb-4 font-medium">Client</th>
//                                 <th className="pb-4 font-medium">Project</th>
//                                 <th className="pb-4 font-medium">Message</th>
//                                 <th className="pb-4 font-medium text-right">Action</th>
//                             </tr>
//                         </thead>
//                         <tbody className="divide-y divide-white/5">
//                             <AnimatePresence mode='popLayout'>
//                                 {inquiries.map((iq) => (
//                                     <motion.tr
//                                         key={iq._id}
//                                         layout
//                                         initial={{ opacity: 0, y: 10 }}
//                                         animate={{ opacity: 1, y: 0 }}
//                                         exit={{ opacity: 0, x: -20 }}
//                                         className="group hover:bg-white/[0.02] transition-colors"
//                                     >
//                                         <td className="py-6 pr-4 text-xs text-white/30 tabular-nums">
//                                             {new Date(iq.createdAt).toLocaleDateString('en-IN')}
//                                         </td>
//                                         <td className="py-6 pr-4">
//                                             <div className="font-bold uppercase tracking-tight text-sm">{iq.user_name}</div>
//                                             <div className="text-[10px] text-white/40">{iq.user_email}</div>
//                                         </td>
//                                         <td className="py-6 pr-4">
//                                             <span className="text-[9px] border border-white/20 px-2 py-1 rounded-full uppercase text-white/60">
//                                                 {iq.user_project}
//                                             </span>
//                                         </td>
//                                         <td className="py-6 pr-4 max-w-md">
//                                             <p className="text-sm text-white/70 line-clamp-2 hover:line-clamp-none transition-all duration-500">
//                                                 {iq.message}
//                                             </p>
//                                         </td>
//                                         <td className="py-6 text-right">
//                                             <button
//                                                 onClick={() => handleDelete(iq._id)}
//                                                 className="text-[10px] uppercase tracking-widest text-white/20 hover:text-red-500 transition-colors cursor-pointer"
//                                             >
//                                                 [ Delete ]
//                                             </button>
//                                         </td>
//                                     </motion.tr>
//                                 ))}
//                             </AnimatePresence>
//                         </tbody>
//                     </table>
//                 </div>
//             </div>
//         </motion.div>
//     );
// };

// export default AdminDashboard;




// import React, { useEffect, useState } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { FiTrash2, FiPlus, FiMessageSquare, FiPackage, FiLogOut, FiLink } from 'react-icons/fi';
// import AdminLogin from './AdminLogin';

// const AdminDashboard = () => {
//     const [inquiries, setInquiries] = useState([]);
//     const [projects, setProjects] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [adminKey, setAdminKey] = useState(localStorage.getItem('admin_key') || '');
//     const [isAuthorized, setIsAuthorized] = useState(false);

//     // Project Form State
//     const [projectForm, setProjectForm] = useState({
//         title: '', category: '', imageUrl: '', description: '', projectUrl: ''
//     });

//     const fetchData = async (key) => {
//         setLoading(true);
//         try {
//             const headers = { 'x-admin-key': key, 'Content-Type': 'application/json' };

//             // Parallel fetch for speed
//             const [inqRes, projRes] = await Promise.all([
//                 fetch('http://localhost:5000/api/admin/inquiries', { headers }),
//                 fetch('http://localhost:5000/api/projects')
//             ]);

//             if (inqRes.ok && projRes.ok) {
//                 setInquiries(await inqRes.json());
//                 setProjects(await projRes.json());
//                 setAdminKey(key);
//                 localStorage.setItem('admin_key', key);
//                 setIsAuthorized(true);
//             } else {
//                 handleLogout();
//             }
//         } catch (err) {
//             console.error("System Error:", err);
//             setIsAuthorized(false);
//         } finally {
//             setLoading(false);
//         }
//     };

//     useEffect(() => {
//         if (adminKey) fetchData(adminKey);
//         else setLoading(false);
//     }, []);

//     const handleProjectSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             const res = await fetch('http://localhost:5000/api/admin/projects', {
//                 method: 'POST',
//                 headers: { 'x-admin-key': adminKey, 'Content-Type': 'application/json' },
//                 body: JSON.stringify(projectForm)
//             });
//             if (res.ok) {
//                 const data = await res.json();
//                 setProjects([data.project, ...projects]);
//                 setProjectForm({ title: '', category: '', imageUrl: '', description: '', projectUrl: '' });
//                 alert("ENTRY_PUBLISHED_SUCCESSFULLY");
//             }
//         } catch (err) { alert("UPLOAD_CRITICAL_FAILURE"); }
//     };

//     const deleteInquiry = async (id) => {
//         if (!window.confirm("Wipe this record?")) return;
//         const res = await fetch(`http://localhost:5000/api/admin/inquiry/${id}`, {
//             method: 'DELETE',
//             headers: { 'x-admin-key': adminKey }
//         });
//         if (res.ok) setInquiries(inquiries.filter(iq => iq._id !== id));
//     };

//     const deleteProject = async (id) => {
//         if (!window.confirm("Delete project?")) return;
//         const res = await fetch(`http://localhost:5000/api/admin/projects/${id}`, {
//             method: 'DELETE',
//             headers: { 'x-admin-key': adminKey }
//         });
//         if (res.ok) setProjects(projects.filter(p => p._id !== id));
//     };

//     const handleLogout = () => {
//         localStorage.removeItem('admin_key');
//         setAdminKey('');
//         setIsAuthorized(false);
//     };

//     if (loading) return (
//         <div className="min-h-screen bg-black flex items-center justify-center text-white font-mono text-[10px] tracking-[0.5em]">
//             INITIALIZING_SYSTEM_RESOURCES...
//         </div>
//     );

//     if (!isAuthorized) return <AdminLogin onLogin={fetchData} />;

//     return (
//         <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="min-h-screen bg-black text-white p-6 md:p-16 pt-32 selection:bg-indigo-500">
//             <div className="max-w-7xl mx-auto">

//                 {/* --- HEADER --- */}
//                 <div className="flex justify-between items-end border-b border-white/10 pb-8 mb-20">
//                     <div>
//                         <p className="text-indigo-500 text-[10px] uppercase tracking-[0.3em] mb-2 font-bold">// ROOT_ACCESS_GRANTED</p>
//                         <h1 className="text-5xl md:text-7xl font-bold uppercase tracking-tighter">Control <span className="italic text-white/20">Center</span></h1>
//                     </div>
//                     <button onClick={handleLogout} className="group flex items-center gap-2 text-[10px] uppercase tracking-widest text-white/40 hover:text-red-500 transition-colors">
//                         <FiLogOut /> [ Exit_Session ]
//                     </button>
//                 </div>

//                 {/* --- PROJECT CMS SECTION --- */}
//                 <section className="mb-32">
//                     <div className="flex items-center gap-4 mb-10">
//                         <FiPackage className="text-indigo-500" />
//                         <h2 className="text-2xl font-bold uppercase tracking-widest">Asset_Manager</h2>
//                     </div>

//                     <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
//                         {/* FORM */}
//                         <form onSubmit={handleProjectSubmit} className="lg:col-span-1 space-y-4 bg-zinc-900/30 p-6 border border-white/5 rounded-sm">
//                             <p className="text-[10px] text-white/30 uppercase mb-4 tracking-widest">Create_New_Entry</p>
//                             <input required className="w-full bg-black border border-white/10 p-3 text-xs outline-none focus:border-indigo-500 transition-colors" placeholder="TITLE" value={projectForm.title} onChange={e => setProjectForm({ ...projectForm, title: e.target.value })} />
//                             <input required className="w-full bg-black border border-white/10 p-3 text-xs outline-none focus:border-indigo-500 transition-colors" placeholder="CATEGORY" value={projectForm.category} onChange={e => setProjectForm({ ...projectForm, category: e.target.value })} />
//                             <input required className="w-full bg-black border border-white/10 p-3 text-xs outline-none focus:border-indigo-500 transition-colors" placeholder="IMAGE_URL" value={projectForm.imageUrl} onChange={e => setProjectForm({ ...projectForm, imageUrl: e.target.value })} />

//                             {/* Live Image Preview */}
//                             {projectForm.imageUrl && (
//                                 <div className="aspect-video w-full border border-white/10 overflow-hidden bg-black">
//                                     <img src={projectForm.imageUrl} alt="Preview" className="w-full h-full object-cover opacity-50" onError={(e) => e.target.style.display = 'none'} />
//                                 </div>
//                             )}

//                             <textarea className="w-full bg-black border border-white/10 p-3 text-xs outline-none focus:border-indigo-500 transition-colors h-24" placeholder="DESCRIPTION" value={projectForm.description} onChange={e => setProjectForm({ ...projectForm, description: e.target.value })} />
//                             <button className="w-full bg-white text-black font-bold p-3 text-[10px] uppercase tracking-[0.2em] hover:bg-indigo-500 hover:text-white transition-all">
//                                 Push_To_Production
//                             </button>
//                         </form>

//                         {/* PROJECT LIST */}
//                         <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
//                             <AnimatePresence>
//                                 {projects.map(p => (
//                                     <motion.div key={p._id} layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, scale: 0.9 }} className="border border-white/5 p-4 flex gap-4 bg-zinc-900/10 hover:border-white/20 transition-colors relative group">
//                                         <div className="w-24 h-24 bg-zinc-800 flex-shrink-0">
//                                             <img src={p.imageUrl} alt="" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all" />
//                                         </div>
//                                         <div className="flex-grow">
//                                             <h3 className="text-sm font-bold uppercase truncate">{p.title}</h3>
//                                             <p className="text-[9px] text-indigo-500 uppercase mb-2">{p.category}</p>
//                                             <button onClick={() => deleteProject(p._id)} className="text-[10px] text-white/20 hover:text-red-500 transition-colors">
//                                                 [ Delete ]
//                                             </button>
//                                         </div>
//                                     </motion.div>
//                                 ))}
//                             </AnimatePresence>
//                         </div>
//                     </div>
//                 </section>

//                 {/* --- INQUIRY LOGS SECTION --- */}
//                 <section>
//                     <div className="flex items-center gap-4 mb-10">
//                         <FiMessageSquare className="text-indigo-500" />
//                         <h2 className="text-2xl font-bold uppercase tracking-widest">Incoming_Logs</h2>
//                     </div>

//                     <div className="overflow-x-auto border border-white/5 bg-zinc-900/10">
//                         <table className="w-full border-collapse">
//                             <thead>
//                                 <tr className="text-[9px] uppercase tracking-[0.3em] text-white/30 border-b border-white/10 bg-white/[0.02]">
//                                     <th className="p-4 text-left font-medium">Timestamp</th>
//                                     <th className="p-4 text-left font-medium">Source</th>
//                                     <th className="p-4 text-left font-medium">Context</th>
//                                     <th className="p-4 text-right font-medium">Action</th>
//                                 </tr>
//                             </thead>
//                             <tbody className="divide-y divide-white/5">
//                                 {inquiries.map((iq) => (
//                                     <tr key={iq._id} className="hover:bg-white/[0.02] transition-colors group">
//                                         <td className="p-4 text-[10px] text-white/40 tabular-nums">
//                                             {new Date(iq.createdAt).toLocaleDateString()}
//                                         </td>
//                                         <td className="p-4">
//                                             <div className="text-xs font-bold uppercase">{iq.user_name}</div>
//                                             <div className="text-[9px] text-white/30">{iq.user_email}</div>
//                                         </td>
//                                         <td className="p-4 text-[11px] text-white/60 italic max-w-sm truncate">
//                                             "{iq.message}"
//                                         </td>
//                                         <td className="p-4 text-right">
//                                             <button onClick={() => deleteInquiry(iq._id)} className="text-zinc-700 hover:text-red-500 transition-colors">
//                                                 <FiTrash2 size={14} />
//                                             </button>
//                                         </td>
//                                     </tr>
//                                 ))}
//                             </tbody>
//                         </table>
//                     </div>
//                 </section>
//             </div>
//         </motion.div>
//     );
// };

// export default AdminDashboard;




// import React, { useEffect, useState } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { FiActivity, FiSettings, FiMail, FiLayers, FiTrash2, FiPlus, FiX, FiUser, FiCheckCircle, FiCircle } from 'react-icons/fi';
// import AdminLogin from './AdminLogin';

// const AdminDashboard = () => {
//     const [inquiries, setInquiries] = useState([]);
//     const [projects, setProjects] = useState([]);
//     const [skills, setSkills] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [adminKey, setAdminKey] = useState(localStorage.getItem('admin_key') || '');
//     const [isAuthorized, setIsAuthorized] = useState(false);
//     const [showForge, setShowForge] = useState(false);

//     const [settings, setSettings] = useState({ linkedinUrl: '', githubUrl: '', siteTitle: '' });
//     const [identity, setIdentity] = useState({ aboutMe: '', resumeLink: '', tagline: '' });
//     const [newSkill, setNewSkill] = useState('');

//     const apiBase = 'http://localhost:5000/api';

//     const fetchData = async (key) => {
//         setLoading(true);
//         try {
//             const headers = { 'x-admin-key': key, 'Content-Type': 'application/json' };
//             const inqRes = await fetch(`${apiBase}/admin/inquiries`, { headers });

//             if (inqRes.ok) {
//                 const [projRes, setRes, skillRes, idenRes] = await Promise.all([
//                     fetch(`${apiBase}/projects`),
//                     fetch(`${apiBase}/settings`),
//                     fetch(`${apiBase}/skills`),
//                     fetch(`${apiBase}/identity`)
//                 ]);

//                 setInquiries(await inqRes.json());
//                 setProjects(await projRes.json());
//                 setSettings(await setRes.json());
//                 setSkills(await skillRes.json());
//                 setIdentity(await idenRes.json());

//                 setAdminKey(key);
//                 localStorage.setItem('admin_key', key);
//                 setIsAuthorized(true);
//             } else {
//                 setIsAuthorized(false);
//                 if (inqRes.status === 401) localStorage.removeItem('admin_key');
//             }
//         } catch (err) {
//             console.error("Fetch Error:", err);
//             setIsAuthorized(false);
//         } finally {
//             setLoading(false);
//         }
//     };

//     useEffect(() => {
//         if (adminKey) fetchData(adminKey);
//         else setLoading(false);
//     }, []);

//     const handleAddSkill = async (e) => {
//         e.preventDefault();
//         if (!newSkill.trim()) return;
//         try {
//             const res = await fetch(`${apiBase}/admin/skills`, {
//                 method: 'POST',
//                 headers: { 'x-admin-key': adminKey, 'Content-Type': 'application/json' },
//                 body: JSON.stringify({ name: newSkill.trim() })
//             });
//             if (res.ok) {
//                 const added = await res.json();
//                 setSkills(prev => [...prev, added]);
//                 setNewSkill('');
//             }
//         } catch (err) { console.error(err); }
//     };

//     const handleDelete = async (type, id) => {
//         if (!window.confirm(`Delete ${type}?`)) return;
//         try {
//             const res = await fetch(`${apiBase}/admin/${type}/${id}`, {
//                 method: 'DELETE',
//                 headers: { 'x-admin-key': adminKey }
//             });
//             if (res.ok) {
//                 if (type === 'inquiry') setInquiries(prev => prev.filter(iq => iq._id !== id));
//                 if (type === 'projects') setProjects(prev => prev.filter(p => p._id !== id));
//                 if (type === 'skills') setSkills(prev => prev.filter(s => s._id !== id));
//             }
//         } catch (err) { console.error(err); }
//     };

//     if (loading) return <div className="min-h-screen bg-black flex items-center justify-center text-white font-mono uppercase tracking-[0.3em]">Syncing_Terminal...</div>;
//     if (!isAuthorized) return <AdminLogin onLogin={fetchData} />;

//     return (
//         <div className="min-h-screen bg-black text-white p-6 md:p-16 pt-32 font-mono">
//             <div className="max-w-7xl mx-auto">
//                 <AnimatePresence>{showForge && <ProjectForge apiBase={apiBase} adminKey={adminKey} onClose={() => setShowForge(false)} onSuccess={() => fetchData(adminKey)} />}</AnimatePresence>

//                 <div className="flex justify-between items-end border-b border-white/10 pb-8 mb-12">
//                     <h1 className="text-4xl font-bold uppercase tracking-tighter">Command <span className="text-white/20">Center</span></h1>
//                     <button onClick={() => { localStorage.removeItem('admin_key'); setIsAuthorized(false); }} className="text-[10px] text-white/40 hover:text-white underline">[ Logout ]</button>
//                 </div>

//                 <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-16">
//                     <StatBox label="Inbox" value={inquiries.length} icon={<FiMail />} color="text-indigo-500" />
//                     <StatBox label="Projects" value={projects.length} icon={<FiLayers />} color="text-white/50" />
//                     <StatBox label="Tech" value={skills.length} icon={<FiActivity />} color="text-green-500" />
//                 </div>

//                 <div className="grid grid-cols-1 xl:grid-cols-3 gap-16">
//                     <div className="xl:col-span-2">
//                         <h2 className="text-xs mb-6 text-white/40 uppercase italic tracking-widest">// Message_Stream</h2>
//                         <div className="space-y-4">
//                             {inquiries.map(iq => (
//                                 <div key={iq._id} className="border border-white/5 p-4 flex justify-between items-center group hover:bg-white/[0.02]">
//                                     <div>
//                                         <div className="text-sm font-bold uppercase">{iq.user_name}</div>
//                                         <div className="text-[10px] text-white/30 truncate max-w-md">{iq.message}</div>
//                                     </div>
//                                     <button onClick={() => handleDelete('inquiry', iq._id)} className="text-red-500 text-[9px] opacity-0 group-hover:opacity-100">[ KILL ]</button>
//                                 </div>
//                             ))}
//                         </div>
//                     </div>

//                     <div className="space-y-12">
//                         <div>
//                             <h2 className="text-xs mb-6 text-white/40 uppercase tracking-widest">// Registry</h2>
//                             <div className="space-y-2">
//                                 {projects.map(p => (
//                                     <div key={p._id} className="border border-white/10 p-3 bg-zinc-950 flex justify-between items-center">
//                                         <span className="text-[10px] uppercase">{p.title}</span>
//                                         <button onClick={() => handleDelete('projects', p._id)} className="text-white/20 hover:text-red-500"><FiTrash2 size={12} /></button>
//                                     </div>
//                                 ))}
//                                 <button onClick={() => setShowForge(true)} className="w-full border border-dashed border-white/20 p-4 text-[10px] uppercase text-white/30 hover:border-white hover:text-white">+ Add_New_Node</button>
//                             </div>
//                         </div>

//                         <div>
//                             <h2 className="text-xs mb-6 text-white/40 uppercase tracking-widest">// Tech_Stack</h2>
//                             <form onSubmit={handleAddSkill} className="mb-4 flex gap-2">
//                                 <input value={newSkill} onChange={e => setNewSkill(e.target.value)} placeholder="SKILL_NAME..." className="bg-transparent border-b border-white/10 text-[10px] flex-grow pb-1 outline-none" />
//                                 <button type="submit" className="text-white/40 hover:text-white"><FiPlus /></button>
//                             </form>
//                             <div className="flex flex-wrap gap-2">
//                                 {skills.map(s => (
//                                     <span key={s._id} className="px-2 py-1 bg-zinc-950 border border-white/10 text-[9px] uppercase flex items-center gap-2">
//                                         {s.name} <button onClick={() => handleDelete('skills', s._id)} className="text-red-500">×</button>
//                                     </span>
//                                 ))}
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// // ... (Keep StatBox, InputBlock, and ProjectForge from previous versions)
// export default AdminDashboard;







import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiActivity, FiSettings, FiMail, FiLayers, FiTrash2, FiPlus, FiX, FiUser, FiGlobe, FiSave, FiDownload, FiUpload, FiMessageSquare, FiTerminal } from 'react-icons/fi';
import AdminLogin from './AdminLogin';

const AdminDashboard = () => {
    const [inquiries, setInquiries] = useState([]);
    const [projects, setProjects] = useState([]);
    const [skills, setSkills] = useState([]);
    const [loading, setLoading] = useState(true);
    const [adminKey, setAdminKey] = useState(localStorage.getItem('admin_key') || '');
    const [isAuthorized, setIsAuthorized] = useState(false);
    const [showForge, setShowForge] = useState(false);
    const fileInputRef = useRef(null);

    const [identity, setIdentity] = useState({ aboutMe: '', tagline: '', resumeLink: '' });
    const [newSkill, setNewSkill] = useState('');

    const apiBase = 'http://localhost:5000/api';

    // --- SEPARATION LOGIC ---
    const directInquiries = inquiries.filter(iq => iq.user_project !== "Footer Feedback");
    const footerFeedback = inquiries.filter(iq => iq.user_project === "Footer Feedback");

    const fetchData = async (key) => {
        setLoading(true);
        try {
            const headers = { 'x-admin-key': key, 'Content-Type': 'application/json' };
            const inqRes = await fetch(`${apiBase}/admin/inquiries`, { headers });

            if (inqRes.ok) {
                const [projRes, skillRes, idenRes] = await Promise.all([
                    fetch(`${apiBase}/projects`),
                    fetch(`${apiBase}/skills`),
                    fetch(`${apiBase}/identity`)
                ]);

                setInquiries(await inqRes.json());
                setProjects(await projRes.json());
                setSkills(await skillRes.json());

                const idenData = await idenRes.json();
                if (idenData) setIdentity(idenData);

                setAdminKey(key);
                localStorage.setItem('admin_key', key);
                setIsAuthorized(true);
            } else {
                setIsAuthorized(false);
                if (inqRes.status === 401) localStorage.removeItem('admin_key');
            }
        } catch (err) {
            console.error("Fetch Error:", err);
            setIsAuthorized(false);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (adminKey) fetchData(adminKey);
        else setLoading(false);
    }, []);

    const downloadBackup = () => {
        const dataStr = JSON.stringify(projects, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(dataBlob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `portfolio_registry_backup_${new Date().toISOString().split('T')[0]}.json`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const handleRestore = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = async (event) => {
            try {
                const importedProjects = JSON.parse(event.target.result);
                if (!Array.isArray(importedProjects)) throw new Error("Invalid Format");
                if (!window.confirm(`Restore ${importedProjects.length} projects?`)) return;

                for (const proj of importedProjects) {
                    delete proj._id;
                    await fetch(`${apiBase}/admin/projects`, {
                        method: 'POST',
                        headers: { 'x-admin-key': adminKey, 'Content-Type': 'application/json' },
                        body: JSON.stringify(proj)
                    });
                }
                alert("Registry Restored Successfully");
                fetchData(adminKey);
            } catch (err) {
                alert("Error importing file.");
            }
        };
        reader.readAsText(file);
    };

    const handleUpdateIdentity = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch(`${apiBase}/admin/identity`, {
                method: 'POST',
                headers: { 'x-admin-key': adminKey, 'Content-Type': 'application/json' },
                body: JSON.stringify(identity)
            });
            if (res.ok) alert("Identity Updated Successfully");
        } catch (err) { console.error(err); }
    };

    const handleAddSkill = async (e) => {
        e.preventDefault();
        if (!newSkill.trim()) return;
        try {
            const res = await fetch(`${apiBase}/admin/skills`, {
                method: 'POST',
                headers: { 'x-admin-key': adminKey, 'Content-Type': 'application/json' },
                body: JSON.stringify({ name: newSkill.trim() })
            });
            if (res.ok) {
                const added = await res.json();
                setSkills(prev => [...prev, added]);
                setNewSkill('');
            }
        } catch (err) { console.error(err); }
    };

    const handleDelete = async (type, id) => {
        if (!window.confirm(`Delete ${type}?`)) return;
        try {
            const res = await fetch(`${apiBase}/admin/${type}/${id}`, {
                method: 'DELETE',
                headers: { 'x-admin-key': adminKey }
            });
            if (res.ok) {
                if (type === 'inquiry') setInquiries(prev => prev.filter(iq => iq._id !== id));
                if (type === 'projects') setProjects(prev => prev.filter(p => p._id !== id));
                if (type === 'skills') setSkills(prev => prev.filter(s => s._id !== id));
            }
        } catch (err) { console.error(err); }
    };

    if (loading) return <div className="min-h-screen bg-black flex items-center justify-center text-white font-mono uppercase tracking-[0.3em]">Syncing_Terminal...</div>;
    if (!isAuthorized) return <AdminLogin onLogin={fetchData} />;

    return (
        <div className="min-h-screen bg-black text-white p-6 md:p-16 pt-32 font-mono">
            <div className="max-w-7xl mx-auto">
                <AnimatePresence>
                    {showForge && (
                        <ProjectForge
                            apiBase={apiBase}
                            adminKey={adminKey}
                            onClose={() => setShowForge(false)}
                            onSuccess={() => fetchData(adminKey)}
                        />
                    )}
                </AnimatePresence>

                {/* HEADER SECTION */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end border-b border-white/10 pb-8 mb-12 gap-6">
                    <div>
                        <h1 className="text-4xl font-bold uppercase tracking-tighter">
                            Command <span className="text-white/20">Center</span>
                        </h1>
                        <p className="text-[9px] text-white/30 mt-2">SECURE_ACCESS // PORTFOLIO_MANAGEMENT_V3</p>
                    </div>

                    <div className="flex flex-wrap gap-4">
                        <input type="file" ref={fileInputRef} onChange={handleRestore} className="hidden" accept=".json" />
                        <button onClick={downloadBackup} className="flex items-center gap-2 text-[10px] text-indigo-400 border border-indigo-400/20 px-3 py-1 uppercase hover:bg-indigo-400 hover:text-white transition-all">
                            <FiDownload /> Backup_Registry
                        </button>
                        <button onClick={() => fileInputRef.current.click()} className="flex items-center gap-2 text-[10px] text-green-400 border border-green-400/20 px-3 py-1 uppercase hover:bg-green-400 hover:text-black transition-all">
                            <FiUpload /> Restore_Data
                        </button>
                        <button onClick={() => { localStorage.removeItem('admin_key'); setIsAuthorized(false); }} className="text-[10px] text-white/40 hover:text-white underline">[ Logout ]</button>
                    </div>
                </div>

                {/* STATS SECTION */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-16">
                    <StatBox label="Active_Inquiries" value={directInquiries.length} icon={<FiMail />} color="text-indigo-500" />
                    <StatBox label="Signals_Intercepted" value={footerFeedback.length} icon={<FiMessageSquare />} color="text-amber-500" />
                    <StatBox label="Registry_Nodes" value={projects.length} icon={<FiLayers />} color="text-white/50" />
                    <StatBox label="Tech_Stack" value={skills.length} icon={<FiActivity />} color="text-green-500" />
                </div>

                <div className="grid grid-cols-1 xl:grid-cols-3 gap-16">
                    {/* LEFT COLUMN: Messages & Identity */}
                    <div className="xl:col-span-2 space-y-16">

                        {/* SECTION 1: MAIN INQUIRIES */}
                        <div>
                            <h2 className="text-xs mb-6 text-white/40 uppercase italic tracking-widest flex items-center gap-2"><FiTerminal size={10} /> // Client_Inquiries</h2>
                            <div className="space-y-4">
                                {directInquiries.length === 0 && <p className="text-white/20 text-[10px]">NO_CLIENT_LEADS_DETECTED</p>}
                                {directInquiries.map(iq => (
                                    <div key={iq._id} className="border border-white/5 p-4 flex justify-between items-center group hover:bg-white/[0.02] transition-colors">
                                        <div>
                                            <div className="text-sm font-bold uppercase flex items-center gap-3">
                                                {iq.user_name}
                                                <span className="text-[8px] bg-indigo-500/20 text-indigo-400 px-2 py-0.5 border border-indigo-500/30 font-normal tracking-widest">PROJ: {iq.user_project}</span>
                                            </div>
                                            <div className="text-[10px] text-white/50 mt-1 italic">{iq.user_email}</div>
                                            <div className="text-[10px] text-white/30 mt-2 border-l border-white/10 pl-3 max-w-xl">{iq.message}</div>
                                        </div>
                                        <button onClick={() => handleDelete('inquiry', iq._id)} className="text-red-500 text-[9px] opacity-0 group-hover:opacity-100 transition-opacity hover:underline">[ KILL ]</button>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* SECTION 2: FOOTER FEEDBACK (THE NEW SECTION) */}
                        <div className="pt-8 border-t border-white/5">
                            <h2 className="text-xs mb-6 text-amber-500/50 uppercase italic tracking-widest flex items-center gap-2"><FiMessageSquare size={10} /> // Signal_Intercepts (Footer Feedback)</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {footerFeedback.length === 0 && <p className="text-white/20 text-[10px]">SILENCE_IN_FOOTER_DOMAIN</p>}
                                {footerFeedback.map(iq => (
                                    <div key={iq._id} className="border border-white/5 p-4 bg-zinc-950/30 group hover:border-amber-500/20 transition-all">
                                        <div className="flex justify-between items-start mb-2">
                                            <span className="text-[9px] text-amber-500/60 font-bold uppercase tracking-widest">FEEDBACK_NODE</span>
                                            <button onClick={() => handleDelete('inquiry', iq._id)} className="text-red-500 text-[9px] opacity-0 group-hover:opacity-100">[ PURGE ]</button>
                                        </div>
                                        <div className="text-[11px] text-white/80 leading-relaxed italic">"{iq.message}"</div>
                                        <div className="mt-4 text-[8px] text-white/20 uppercase tracking-tighter">
                                            Timestamp: {new Date(iq.createdAt).toLocaleString()}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="border border-white/10 p-8 bg-zinc-950/50">
                            <h2 className="text-xs mb-8 text-white/40 uppercase tracking-widest flex items-center gap-2"><FiUser /> // Global_Identity</h2>
                            <form onSubmit={handleUpdateIdentity} className="space-y-6">
                                <div>
                                    <label className="text-[9px] text-white/30 block mb-2 uppercase">Portfolio Tagline</label>
                                    <input className="w-full bg-transparent border-b border-white/10 pb-2 outline-none text-sm" value={identity.tagline} onChange={e => setIdentity({ ...identity, tagline: e.target.value })} />
                                </div>
                                <div>
                                    <label className="text-[9px] text-white/30 block mb-2 uppercase">Philosophy Quote</label>
                                    <textarea className="w-full bg-transparent border border-white/10 p-4 outline-none text-sm h-24" value={identity.aboutMe} onChange={e => setIdentity({ ...identity, aboutMe: e.target.value })} />
                                </div>
                                <button type="submit" className="flex items-center gap-2 text-[10px] bg-white text-black px-6 py-2 uppercase font-bold hover:bg-indigo-500 hover:text-white transition-all">
                                    <FiSave /> Sync_Identity
                                </button>
                            </form>
                        </div>
                    </div>

                    {/* RIGHT COLUMN: Registry & Tech */}
                    <div className="space-y-12">
                        <div>
                            <h2 className="text-xs mb-6 text-white/40 uppercase tracking-widest">// Registry</h2>
                            <div className="space-y-2">
                                {projects.map(p => (
                                    <div key={p._id} className="border border-white/10 p-3 bg-zinc-950 flex justify-between items-center">
                                        <span className="text-[10px] uppercase">{p.title}</span>
                                        <button onClick={() => handleDelete('projects', p._id)} className="text-white/20 hover:text-red-500"><FiTrash2 size={12} /></button>
                                    </div>
                                ))}
                                <button onClick={() => setShowForge(true)} className="w-full border border-dashed border-white/20 p-4 text-[10px] uppercase text-white/30 hover:border-white hover:text-white">
                                    + Add_New_Node
                                </button>
                            </div>
                        </div>

                        <div>
                            <h2 className="text-xs mb-6 text-white/40 uppercase tracking-widest">// Tech_Stack</h2>
                            <form onSubmit={handleAddSkill} className="mb-4 flex gap-2">
                                <input value={newSkill} onChange={e => setNewSkill(e.target.value)} placeholder="SKILL_NAME..." className="bg-transparent border-b border-white/10 text-[10px] flex-grow pb-1 outline-none" />
                                <button type="submit" className="text-white/40 hover:text-white"><FiPlus /></button>
                            </form>
                            <div className="flex flex-wrap gap-2">
                                {skills.map(s => (
                                    <span key={s._id} className="px-2 py-1 bg-zinc-950 border border-white/10 text-[9px] uppercase flex items-center gap-2">
                                        {s.name}
                                        <button onClick={() => handleDelete('skills', s._id)} className="text-red-500">×</button>
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const StatBox = ({ label, value, icon, color }) => (
    <div className="border border-white/10 p-6 bg-zinc-950 relative overflow-hidden group">
        <div className={`absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-30 transition-opacity ${color}`}>
            {React.cloneElement(icon, { size: 40 })}
        </div>
        <div className="text-[10px] text-white/40 uppercase tracking-widest mb-1">{label}</div>
        <div className="text-3xl font-bold">{value}</div>
    </div>
);

const ProjectForge = ({ apiBase, adminKey, onClose, onSuccess }) => {
    const [formData, setFormData] = useState({ title: '', category: '', imageUrl: '', projectUrl: '', githubUrl: '', techStack: '' });

    const handleSubmit = async (e) => {
        e.preventDefault();
        const projectData = {
            ...formData,
            techStack: formData.techStack.split(',').map(s => s.trim()).filter(s => s !== "")
        };
        try {
            const res = await fetch(`${apiBase}/admin/projects`, {
                method: 'POST',
                headers: { 'x-admin-key': adminKey, 'Content-Type': 'application/json' },
                body: JSON.stringify(projectData)
            });
            if (res.ok) { onSuccess(); onClose(); }
            else { alert("Creation failed."); }
        } catch (err) { console.error(err); }
    };

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="w-full max-w-md border border-white/20 bg-black p-8 relative">
                <button onClick={onClose} className="absolute top-4 right-4 text-white/40 hover:text-white"><FiX /></button>
                <h3 className="text-sm uppercase tracking-[0.2em] mb-8 border-b border-white/10 pb-4">Project_Forge</h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input className="w-full bg-transparent border-b border-white/10 py-2 outline-none text-xs" placeholder="TITLE" onChange={e => setFormData({ ...formData, title: e.target.value })} required />
                    <input className="w-full bg-transparent border-b border-white/10 py-2 outline-none text-xs" placeholder="CATEGORY" onChange={e => setFormData({ ...formData, category: e.target.value })} required />
                    <input className="w-full bg-transparent border-b border-white/10 py-2 outline-none text-xs" placeholder="IMAGE_URL" onChange={e => setFormData({ ...formData, imageUrl: e.target.value })} />
                    <input className="w-full bg-transparent border-b border-white/10 py-2 outline-none text-xs" placeholder="LIVE_URL" onChange={e => setFormData({ ...formData, projectUrl: e.target.value })} />
                    <input className="w-full bg-transparent border-b border-white/10 py-2 outline-none text-xs" placeholder="GITHUB_URL" onChange={e => setFormData({ ...formData, githubUrl: e.target.value })} />
                    <input className="w-full bg-transparent border-b border-white/10 py-2 outline-none text-xs" placeholder="TECH (React, Node...)" onChange={e => setFormData({ ...formData, techStack: e.target.value })} />
                    <button type="submit" className="w-full border border-white py-4 text-[10px] uppercase hover:bg-white hover:text-black mt-4">Initialize_Build</button>
                </form>
            </div>
        </motion.div>
    );
};

export default AdminDashboard;