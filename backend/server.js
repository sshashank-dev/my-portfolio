// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");
// const nodemailer = require("nodemailer");
// require("dotenv").config();

// const app = express();

// /* ---------------- MIDDLEWARE ---------------- */

// app.use(cors());
// app.use(express.json());

// /* ---------------- DATABASE ---------------- */

// mongoose
//     .connect(process.env.MONGO_URI)
//     .then(() => console.log("🚀 SUCCESS: Connected to MongoDB"))
//     .catch((err) => console.error("❌ MongoDB Error:", err));

// /* ---------------- SCHEMA ---------------- */

// const inquirySchema = new mongoose.Schema({
//     user_name: {
//         type: String,
//         required: true,
//     },
//     user_email: {
//         type: String,
//         required: true,
//     },
//     user_project: String,
//     message: String,
//     createdAt: {
//         type: Date,
//         default: Date.now,
//     },
// });

// const Inquiry = mongoose.model("Inquiry", inquirySchema);

// /* ---------------- EMAIL SETUP ---------------- */

// const transporter = nodemailer.createTransport({
//     service: "gmail",
//     auth: {
//         user: process.env.EMAIL_USER,
//         pass: process.env.EMAIL_PASS,
//     },
// });

// transporter.verify((error) => {
//     if (error) {
//         console.log("⚠️ Email setup error:", error.message);
//     } else {
//         console.log("📧 Email server ready");
//     }
// });

// /* ---------------- ROUTES ---------------- */

// /**
//  * @route   POST /api/inquiry
//  * @desc    Save a new inquiry from the contact form
//  */
// app.post("/api/inquiry", async (req, res) => {
//     try {
//         console.log("Incoming request body:", req.body);

//         const { user_name, user_email, user_project, message } = req.body;

//         if (!user_name || !user_email || !message) {
//             return res.status(400).json({
//                 success: false,
//                 error: "Missing required fields"
//             });
//         }

//         const newInquiry = new Inquiry({
//             user_name,
//             user_email,
//             user_project,
//             message
//         });

//         await newInquiry.save();
//         console.log("Saved to MongoDB successfully");

//         res.json({
//             success: true,
//             message: "Inquiry stored successfully"
//         });

//     } catch (error) {
//         console.error("BACKEND ERROR:", error);
//         res.status(500).json({
//             success: false,
//             error: error.message
//         });
//     }
// });

// /**
//  * @route   GET /api/admin/inquiries
//  * @desc    Fetch all inquiries for the Admin Dashboard
//  * @fix     This was the missing route causing the 404 error
//  */
// app.get("/api/admin/inquiries", async (req, res) => {
//     try {
//         // Fetch all inquiries from the database, sorted by date (newest first)
//         const inquiries = await Inquiry.find().sort({ createdAt: -1 });

//         // Return the array of inquiries to the frontend
//         res.status(200).json(inquiries);
//     } catch (error) {
//         console.error("ADMIN FETCH ERROR:", error);
//         res.status(500).json({
//             success: false,
//             error: "Failed to retrieve inquiries"
//         });
//     }
// });

// /* ---------------- SERVER ---------------- */

// const PORT = process.env.PORT || 5000;

// app.listen(PORT, () => {
//     console.log(`📡 Server running on port ${PORT}`);
// });






// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");
// const nodemailer = require("nodemailer");
// require("dotenv").config();

// const app = express();

// /* ---------------- MIDDLEWARE ---------------- */
// app.use(cors());
// app.use(express.json());

// /* ---------------- DATABASE ---------------- */
// mongoose
//     .connect(process.env.MONGO_URI)
//     .then(() => console.log("🚀 SUCCESS: Connected to MongoDB"))
//     .catch((err) => console.error("❌ MongoDB Error:", err));

// /* ---------------- SCHEMAS ---------------- */

// // 1. Inquiry Schema (Your existing one)
// const inquirySchema = new mongoose.Schema({
//     user_name: { type: String, required: true },
//     user_email: { type: String, required: true },
//     user_project: String,
//     message: String,
//     createdAt: { type: Date, default: Date.now },
// });
// const Inquiry = mongoose.model("Inquiry", inquirySchema);

// // 2. NEW: Project Schema (For your Portfolio CMS)
// const projectSchema = new mongoose.Schema({
//     title: { type: String, required: true },
//     category: { type: String, required: true },
//     imageUrl: { type: String, required: true },
//     description: String,
//     projectUrl: String,
//     createdAt: { type: Date, default: Date.now },
// });
// const Project = mongoose.model("Project", projectSchema);

// /* ---------------- EMAIL SETUP (Existing) ---------------- */
// const transporter = nodemailer.createTransport({
//     service: "gmail",
//     auth: {
//         user: process.env.EMAIL_USER,
//         pass: process.env.EMAIL_PASS,
//     },
// });

// /* ---------------- ROUTES ---------------- */

// // --- INQUIRY ROUTES ---
// app.post("/api/inquiry", async (req, res) => {
//     try {
//         const { user_name, user_email, user_project, message } = req.body;
//         const newInquiry = new Inquiry({ user_name, user_email, user_project, message });
//         await newInquiry.save();
//         res.json({ success: true, message: "Inquiry stored successfully" });
//     } catch (error) {
//         res.status(500).json({ success: false, error: error.message });
//     }
// });

// app.get("/api/admin/inquiries", async (req, res) => {
//     const adminKey = req.headers['x-admin-key'];
//     if (adminKey !== process.env.ADMIN_KEY) return res.status(401).json({ error: "Unauthorized" });

//     try {
//         const inquiries = await Inquiry.find().sort({ createdAt: -1 });
//         res.status(200).json(inquiries);
//     } catch (error) {
//         res.status(500).json({ error: "Failed to retrieve inquiries" });
//     }
// });

// // --- NEW: PROJECT CMS ROUTES ---

// /**
//  * @route   GET /api/projects
//  * @desc    Fetch projects for the public portfolio gallery
//  */
// app.get("/api/projects", async (req, res) => {
//     try {
//         const projects = await Project.find().sort({ createdAt: -1 });
//         res.json(projects);
//     } catch (error) {
//         res.status(500).json({ error: "Failed to fetch projects" });
//     }
// });

// /**
//  * @route   POST /api/admin/projects
//  * @desc    Upload a new project (Admin Only)
//  */
// app.post("/api/admin/projects", async (req, res) => {
//     const adminKey = req.headers['x-admin-key'];
//     if (adminKey !== process.env.ADMIN_KEY) return res.status(401).json({ error: "Unauthorized" });

//     try {
//         const newProject = new Project(req.body);
//         await newProject.save();
//         res.status(201).json({ success: true, project: newProject });
//     } catch (error) {
//         res.status(400).json({ error: error.message });
//     }
// });

// /**
//  * @route   DELETE /api/admin/projects/:id
//  * @desc    Remove a project (Admin Only)
//  */
// app.delete("/api/admin/projects/:id", async (req, res) => {
//     const adminKey = req.headers['x-admin-key'];
//     if (adminKey !== process.env.ADMIN_KEY) return res.status(401).json({ error: "Unauthorized" });

//     try {
//         await Project.findByIdAndDelete(req.params.id);
//         res.json({ success: true, message: "Project deleted" });
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// });

// /* ---------------- SERVER ---------------- */
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//     console.log(`📡 Server running on port ${PORT}`);
// });

























// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");
// const nodemailer = require("nodemailer");
// require("dotenv").config();

// const app = express();

// /* ---------------- MIDDLEWARE ---------------- */
// app.use(cors());
// app.use(express.json());

// /* ---------------- DATABASE ---------------- */
// mongoose
//     .connect(process.env.MONGO_URI)
//     .then(() => console.log("🚀 SUCCESS: Connected to MongoDB"))
//     .catch((err) => console.error("❌ MongoDB Error:", err));

// /* ---------------- SCHEMAS ---------------- */

// // 1. Inquiry Schema (Updated with Status)
// const inquirySchema = new mongoose.Schema({
//     user_name: { type: String, required: true },
//     user_email: { type: String, required: true },
//     user_project: String,
//     message: String,
//     status: { type: String, default: 'NEW' }, // NEW, REPLIED, ARCHIVED
//     createdAt: { type: Date, default: Date.now },
// });
// const Inquiry = mongoose.model("Inquiry", inquirySchema);

// // 2. Project Schema (Existing)
// const projectSchema = new mongoose.Schema({
//     title: { type: String, required: true },
//     category: { type: String, required: true },
//     imageUrl: { type: String, required: true },
//     description: String,
//     projectUrl: String,
//     createdAt: { type: Date, default: Date.now },
// });
// const Project = mongoose.model("Project", projectSchema);

// // 3. NEW: Settings Schema (For Social Links/Global Config)
// const settingsSchema = new mongoose.Schema({
//     siteTitle: { type: String, default: "My Portfolio" },
//     linkedinUrl: String,
//     githubUrl: String,
//     isAvailable: { type: Boolean, default: true },
// }, { timestamps: true });
// const Settings = mongoose.model("Settings", settingsSchema);

// /* ---------------- EMAIL SETUP (Existing) ---------------- */
// const transporter = nodemailer.createTransport({
//     service: "gmail",
//     auth: {
//         user: process.env.EMAIL_USER,
//         pass: process.env.EMAIL_PASS,
//     },
// });

// /* ---------------- ROUTES ---------------- */

// // --- INQUIRY ROUTES ---

// app.post("/api/inquiry", async (req, res) => {
//     try {
//         const { user_name, user_email, user_project, message } = req.body;
//         const newInquiry = new Inquiry({ user_name, user_email, user_project, message });
//         await newInquiry.save();
//         res.json({ success: true, message: "Inquiry stored successfully" });
//     } catch (error) {
//         res.status(500).json({ success: false, error: error.message });
//     }
// });

// app.get("/api/admin/inquiries", async (req, res) => {
//     const adminKey = req.headers['x-admin-key'];
//     if (adminKey !== process.env.ADMIN_KEY) return res.status(401).json({ error: "Unauthorized" });

//     try {
//         const inquiries = await Inquiry.find().sort({ createdAt: -1 });
//         res.status(200).json(inquiries);
//     } catch (error) {
//         res.status(500).json({ error: "Failed to retrieve inquiries" });
//     }
// });

// // NEW: Update Inquiry Status (Mark as Replied)
// app.patch("/api/admin/inquiry/:id/status", async (req, res) => {
//     const adminKey = req.headers['x-admin-key'];
//     if (adminKey !== process.env.ADMIN_KEY) return res.status(401).json({ error: "Unauthorized" });

//     try {
//         const updated = await Inquiry.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true });
//         res.json(updated);
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// });

// // --- PROJECT CMS ROUTES ---

// app.get("/api/projects", async (req, res) => {
//     try {
//         const projects = await Project.find().sort({ createdAt: -1 });
//         res.json(projects);
//     } catch (error) {
//         res.status(500).json({ error: "Failed to fetch projects" });
//     }
// });

// app.post("/api/admin/projects", async (req, res) => {
//     const adminKey = req.headers['x-admin-key'];
//     if (adminKey !== process.env.ADMIN_KEY) return res.status(401).json({ error: "Unauthorized" });

//     try {
//         const newProject = new Project(req.body);
//         await newProject.save();
//         res.status(201).json({ success: true, project: newProject });
//     } catch (error) {
//         res.status(400).json({ error: error.message });
//     }
// });

// app.delete("/api/admin/projects/:id", async (req, res) => {
//     const adminKey = req.headers['x-admin-key'];
//     if (adminKey !== process.env.ADMIN_KEY) return res.status(401).json({ error: "Unauthorized" });

//     try {
//         await Project.findByIdAndDelete(req.params.id);
//         res.json({ success: true, message: "Project deleted" });
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// });

// // --- NEW: GLOBAL SETTINGS ROUTES ---

// // Get current settings (Public)
// app.get("/api/settings", async (req, res) => {
//     try {
//         let settings = await Settings.findOne();
//         if (!settings) settings = await Settings.create({}); // Create default if empty
//         res.json(settings);
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// });

// // Update settings (Admin Only)
// app.post("/api/admin/settings", async (req, res) => {
//     const adminKey = req.headers['x-admin-key'];
//     if (adminKey !== process.env.ADMIN_KEY) return res.status(401).json({ error: "Unauthorized" });

//     try {
//         const updated = await Settings.findOneAndUpdate({}, req.body, { upsert: true, new: true });
//         res.json({ success: true, settings: updated });
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// });

// /* ---------------- SERVER ---------------- */
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//     console.log(`📡 Server running on port ${PORT}`);
// });



// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");
// require("dotenv").config();

// const app = express();

// /* ---------------- MIDDLEWARE ---------------- */
// app.use(cors());
// app.use(express.json());

// /* ---------------- DATABASE ---------------- */
// mongoose
//     .connect(process.env.MONGO_URI)
//     .then(() => console.log("🚀 SUCCESS: Connected to MongoDB"))
//     .catch((err) => console.error("❌ MongoDB Error:", err));

// /* ---------------- SCHEMAS ---------------- */

// const inquirySchema = new mongoose.Schema({
//     user_name: { type: String, required: true },
//     user_email: { type: String, required: true },
//     user_project: String,
//     message: String,
//     status: { type: String, default: 'NEW' },
//     createdAt: { type: Date, default: Date.now },
// });
// const Inquiry = mongoose.model("Inquiry", inquirySchema);

// const projectSchema = new mongoose.Schema({
//     title: { type: String, required: true },
//     category: { type: String, required: true },
//     imageUrl: { type: String },
//     description: String,
//     githubUrl: String,
//     projectUrl: String,
//     techStack: [String],
//     createdAt: { type: Date, default: Date.now },
// });
// const Project = mongoose.model("Project", projectSchema);

// const skillSchema = new mongoose.Schema({
//     name: { type: String, required: true }
// });
// const Skill = mongoose.model("Skill", skillSchema);

// const identitySchema = new mongoose.Schema({
//     aboutMe: String,
//     tagline: String,
//     resumeLink: String
// });
// const Identity = mongoose.model("Identity", identitySchema);

// const settingsSchema = new mongoose.Schema({
//     siteTitle: { type: String, default: "My Portfolio" },
//     linkedinUrl: String,
//     githubUrl: String,
// }, { timestamps: true });
// const Settings = mongoose.model("Settings", settingsSchema);

// /* ---------------- AUTH MIDDLEWARE (DEBUGGED) ---------------- */
// const verifyAdmin = (req, res, next) => {
//     const adminKey = req.headers['x-admin-key'];

//     // DEBUG LOGS: Check your terminal to see if these match!
//     console.log("--- Auth Check ---");
//     console.log("Received Key:", adminKey);
//     console.log("Expected Key:", process.env.ADMIN_KEY);

//     if (!adminKey || adminKey !== process.env.ADMIN_KEY) {
//         return res.status(401).json({ error: "Unauthorized Access" });
//     }
//     next();
// };

// /* ---------------- ROUTES ---------------- */

// // Public
// app.get("/api/projects", async (req, res) => {
//     const projects = await Project.find().sort({ createdAt: -1 });
//     res.json(projects);
// });

// app.get("/api/skills", async (req, res) => {
//     const skills = await Skill.find().sort({ name: 1 });
//     res.json(skills);
// });

// app.get("/api/settings", async (req, res) => {
//     let settings = await Settings.findOne();
//     if (!settings) settings = await Settings.create({});
//     res.json(settings);
// });

// app.get("/api/identity", async (req, res) => {
//     let identity = await Identity.findOne();
//     if (!identity) identity = await Identity.create({ aboutMe: "Welcome", tagline: "Developer" });
//     res.json(identity);
// });

// // Admin Protected
// app.get("/api/admin/inquiries", verifyAdmin, async (req, res) => {
//     const inquiries = await Inquiry.find().sort({ createdAt: -1 });
//     res.json(inquiries);
// });

// app.post("/api/admin/settings", verifyAdmin, async (req, res) => {
//     const updated = await Settings.findOneAndUpdate({}, req.body, { upsert: true, new: true });
//     res.json(updated);
// });

// app.post("/api/admin/identity", verifyAdmin, async (req, res) => {
//     const updated = await Identity.findOneAndUpdate({}, req.body, { upsert: true, new: true });
//     res.json(updated);
// });

// app.post("/api/admin/projects", verifyAdmin, async (req, res) => {
//     const newProject = new Project(req.body);
//     await newProject.save();
//     res.status(201).json(newProject);
// });

// app.post("/api/admin/skills", verifyAdmin, async (req, res) => {
//     const newSkill = new Skill(req.body);
//     await newSkill.save();
//     res.status(201).json(newSkill);
// });

// app.delete("/api/admin/:type/:id", verifyAdmin, async (req, res) => {
//     const { type, id } = req.params;
//     try {
//         if (type === 'inquiry') await Inquiry.findByIdAndDelete(id);
//         else if (type === 'projects') await Project.findByIdAndDelete(id);
//         else if (type === 'skills') await Skill.findByIdAndDelete(id);
//         res.json({ success: true });
//     } catch (error) { res.status(500).json({ error: error.message }); }
// });

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`📡 Server Live on Port ${PORT}`));






// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");
// const nodemailer = require("nodemailer"); // Added Nodemailer
// require("dotenv").config();

// const app = express();

// /* ---------------- MIDDLEWARE ---------------- */
// app.use(cors());
// app.use(express.json());

// /* ---------------- DATABASE ---------------- */
// mongoose
//     .connect(process.env.MONGO_URI)
//     .then(() => console.log("🚀 SUCCESS: Connected to MongoDB"))
//     .catch((err) => console.error("❌ MongoDB Error:", err));

// /* ---------------- EMAIL CONFIGURATION ---------------- */
// const transporter = nodemailer.createTransport({
//     service: 'gmail',
//     auth: {
//         user: process.env.EMAIL_USER, // Your Gmail address
//         pass: process.env.EMAIL_PASS  // Your Gmail App Password
//     }
// });

// /* ---------------- SCHEMAS ---------------- */

// const inquirySchema = new mongoose.Schema({
//     user_name: { type: String, required: true },
//     user_email: { type: String, required: true },
//     user_project: String,
//     message: String,
//     status: { type: String, default: 'NEW' },
//     createdAt: { type: Date, default: Date.now },
// });
// const Inquiry = mongoose.model("Inquiry", inquirySchema);

// const projectSchema = new mongoose.Schema({
//     title: { type: String, required: true },
//     category: { type: String, required: true },
//     imageUrl: { type: String },
//     description: String,
//     githubUrl: String,
//     projectUrl: String,
//     techStack: [String],
//     createdAt: { type: Date, default: Date.now },
// });
// const Project = mongoose.model("Project", projectSchema);

// const skillSchema = new mongoose.Schema({
//     name: { type: String, required: true }
// });
// const Skill = mongoose.model("Skill", skillSchema);

// const identitySchema = new mongoose.Schema({
//     aboutMe: String,
//     tagline: String,
//     resumeLink: String
// });
// const Identity = mongoose.model("Identity", identitySchema);

// const settingsSchema = new mongoose.Schema({
//     siteTitle: { type: String, default: "My Portfolio" },
//     linkedinUrl: String,
//     githubUrl: String,
// }, { timestamps: true });
// const Settings = mongoose.model("Settings", settingsSchema);

// const analyticsSchema = new mongoose.Schema({
//     pageViews: { type: Number, default: 0 },
//     projectClicks: [{
//         projectId: String,
//         title: String,
//         count: { type: Number, default: 0 }
//     }]
// });
// const Analytics = mongoose.model("Analytics", analyticsSchema);

// /* ---------------- AUTH MIDDLEWARE ---------------- */
// const verifyAdmin = (req, res, next) => {
//     const adminKey = req.headers['x-admin-key'];
//     if (!adminKey || adminKey !== process.env.ADMIN_SECRET_KEY) {
//         return res.status(401).json({ error: "Unauthorized Access" });
//     }
//     next();
// };

// /* ---------------- ROUTES ---------------- */

// // 1. New Inquiry + Auto-Email Response
// app.post("/api/inquiry", async (req, res) => {
//     try {
//         const { user_name, user_email, user_project, message } = req.body;

//         // Save to DB
//         const newInquiry = new Inquiry(req.body);
//         await newInquiry.save();

//         // Send Premium Royal/Minimalist Thank You Email
//         const mailOptions = {
//             from: process.env.EMAIL_USER,
//             to: user_email,
//             subject: `PROJECT INQUIRY: ${user_project.toUpperCase()}`,
//             html: `
//                 <div style="background-color: #000000; color: #ffffff; padding: 60px 20px; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; text-align: center;">
//                     <div style="max-width: 600px; margin: 0 auto; border: 1px solid #333; padding: 40px;">

//                         <h1 style="font-size: 10px; text-transform: uppercase; letter-spacing: 5px; color: #666; margin-bottom: 40px;">
//                             Receipt Confirmation
//                         </h1>

//                         <h2 style="font-size: 32px; font-weight: 300; text-transform: uppercase; letter-spacing: -1px; margin-bottom: 20px;">
//                             Hello, <span style="font-style: italic;">${user_name}</span>.
//                         </h2>

//                         <div style="height: 1px; width: 50px; background-color: #ffffff; margin: 30px auto;"></div>

//                         <p style="font-size: 14px; line-height: 1.8; letter-spacing: 0.5px; color: #cccccc; margin-bottom: 30px;">
//                             Your inquiry regarding <strong style="color: #ffffff;">${user_project.toUpperCase()}</strong> has been successfully received. 
//                             I am currently reviewing your vision and will respond within the next 24 to 48 hours.
//                         </p>

//                         <div style="background-color: #0a0a0a; border: 1px solid #1a1a1a; padding: 20px; margin-bottom: 30px; text-align: left;">
//                             <p style="font-size: 10px; text-transform: uppercase; color: #444; margin-bottom: 10px;">Message Preview</p>
//                             <p style="font-size: 13px; color: #888; margin: 0;">"${message}"</p>
//                         </div>

//                         <p style="font-size: 12px; color: #555; text-transform: uppercase; letter-spacing: 2px;">
//                             Best Regards,<br />
//                             <span style="color: #ffffff; font-weight: bold;">Shashank Sharma</span>
//                         </p>

//                         <div style="margin-top: 50px; font-size: 10px; color: #333;">
//                             © 2026 SHASHANK PORTFOLIO / ALL RIGHTS RESERVED
//                         </div>
//                     </div>
//                 </div>
//             `
//         };

//         // Notify Yourself
//         const adminNotify = {
//             from: process.env.EMAIL_USER,
//             to: process.env.EMAIL_USER,
//             subject: "🚀 New Project Inquiry Received!",
//             text: `Name: ${user_name}\nEmail: ${user_email}\nProject: ${user_project}\nMessage: ${message}`
//         };

//         // Fire and forget (don't let email delays slow down the user response)
//         transporter.sendMail(mailOptions).catch(e => console.error("Client email failed", e));
//         transporter.sendMail(adminNotify).catch(e => console.error("Admin notification failed", e));

//         res.status(201).json({ success: true, message: "Inquiry saved and processing emails" });
//     } catch (err) {
//         res.status(500).json({ success: false, error: err.message });
//     }
// });

// // 2. Track Site Hit
// app.post("/api/analytics/hit", async (req, res) => {
//     try {
//         await Analytics.findOneAndUpdate({}, { $inc: { pageViews: 1 } }, { upsert: true });
//         res.sendStatus(200);
//     } catch (err) { res.status(500).json(err); }
// });

// // 3. Track Project Click
// app.post("/api/analytics/click/:id", async (req, res) => {
//     const { id } = req.params;
//     const { title } = req.body;
//     try {
//         let doc = await Analytics.findOne({});
//         if (!doc) doc = await Analytics.create({ projectClicks: [] });
//         const pIdx = doc.projectClicks.findIndex(p => p.projectId === id);
//         if (pIdx > -1) doc.projectClicks[pIdx].count += 1;
//         else doc.projectClicks.push({ projectId: id, title, count: 1 });
//         await doc.save();
//         res.sendStatus(200);
//     } catch (err) { res.status(500).json(err); }
// });

// // Public Getters
// app.get("/api/projects", async (req, res) => {
//     const projects = await Project.find().sort({ createdAt: -1 });
//     res.json(projects);
// });

// app.get("/api/skills", async (req, res) => {
//     const skills = await Skill.find().sort({ name: 1 });
//     res.json(skills);
// });

// app.get("/api/settings", async (req, res) => {
//     let settings = await Settings.findOne();
//     if (!settings) settings = await Settings.create({});
//     res.json(settings);
// });

// app.get("/api/identity", async (req, res) => {
//     let identity = await Identity.findOne();
//     if (!identity) identity = await Identity.create({ aboutMe: "Welcome", tagline: "Developer" });
//     res.json(identity);
// });

// // Admin Get Stats
// app.get("/api/admin/stats", verifyAdmin, async (req, res) => {
//     const stats = await Analytics.findOne({});
//     res.json(stats || { pageViews: 0, projectClicks: [] });
// });

// app.get("/api/admin/inquiries", verifyAdmin, async (req, res) => {
//     const inquiries = await Inquiry.find().sort({ createdAt: -1 });
//     res.json(inquiries);
// });

// app.post("/api/admin/settings", verifyAdmin, async (req, res) => {
//     const updated = await Settings.findOneAndUpdate({}, req.body, { upsert: true, new: true });
//     res.json(updated);
// });

// app.post("/api/admin/identity", verifyAdmin, async (req, res) => {
//     const updated = await Identity.findOneAndUpdate({}, req.body, { upsert: true, new: true });
//     res.json(updated);
// });

// app.post("/api/admin/projects", verifyAdmin, async (req, res) => {
//     const newProject = new Project(req.body);
//     await newProject.save();
//     res.status(201).json(newProject);
// });

// app.post("/api/admin/skills", verifyAdmin, async (req, res) => {
//     const newSkill = new Skill(req.body);
//     await newSkill.save();
//     res.status(201).json(newSkill);
// });

// app.delete("/api/admin/:type/:id", verifyAdmin, async (req, res) => {
//     const { type, id } = req.params;
//     try {
//         if (type === 'inquiry') await Inquiry.findByIdAndDelete(id);
//         else if (type === 'projects') await Project.findByIdAndDelete(id);
//         else if (type === 'skills') await Skill.findByIdAndDelete(id);
//         res.json({ success: true });
//     } catch (error) { res.status(500).json({ error: error.message }); }
// });

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`📡 Server Live on Port ${PORT}`));



const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const nodemailer = require("nodemailer");
require("dotenv").config();

const app = express();

/* ---------------- MIDDLEWARE ---------------- */
app.use(cors());
app.use(express.json());

/* ---------------- DATABASE ---------------- */
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log("🚀 SUCCESS: Connected to MongoDB"))
    .catch((err) => console.error("❌ MongoDB Error:", err));

/* ---------------- EMAIL CONFIGURATION ---------------- */
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

/* ---------------- SCHEMAS ---------------- */

const inquirySchema = new mongoose.Schema({
    user_name: { type: String, required: true },
    user_email: { type: String, required: true },
    user_project: String,
    message: String,
    status: { type: String, default: 'NEW' },
    createdAt: { type: Date, default: Date.now },
});
const Inquiry = mongoose.model("Inquiry", inquirySchema);

const projectSchema = new mongoose.Schema({
    title: { type: String, required: true },
    category: { type: String, required: true },
    imageUrl: { type: String },
    description: String,
    githubUrl: String,
    projectUrl: String,
    techStack: [String],
    createdAt: { type: Date, default: Date.now },
});
const Project = mongoose.model("Project", projectSchema);

const skillSchema = new mongoose.Schema({
    name: { type: String, required: true }
});
const Skill = mongoose.model("Skill", skillSchema);

const identitySchema = new mongoose.Schema({
    aboutMe: String,
    tagline: String,
    resumeLink: String
});
const Identity = mongoose.model("Identity", identitySchema);

const settingsSchema = new mongoose.Schema({
    siteTitle: { type: String, default: "My Portfolio" },
    linkedinUrl: String,
    githubUrl: String,
}, { timestamps: true });
const Settings = mongoose.model("Settings", settingsSchema);

const analyticsSchema = new mongoose.Schema({
    pageViews: { type: Number, default: 0 },
    projectClicks: [{
        projectId: String,
        title: String,
        count: { type: Number, default: 0 }
    }]
});
const Analytics = mongoose.model("Analytics", analyticsSchema);

/* ---------------- AUTH MIDDLEWARE ---------------- */
const verifyAdmin = (req, res, next) => {
    const adminKey = req.headers['x-admin-key'];
    if (!adminKey || adminKey !== process.env.ADMIN_SECRET_KEY) {
        return res.status(401).json({ error: "Unauthorized Access" });
    }
    next();
};

/* ---------------- ROUTES ---------------- */

// 1. New Inquiry + Auto-Email Response
app.post("/api/inquiry", async (req, res) => {
    try {
        const { user_name, user_email, user_project, message } = req.body;

        // Handle footer fallback logic
        const finalProjectName = user_project || "General Feedback";
        const finalUserName = user_name || "Footer User";

        // Save to DB
        const newInquiry = new Inquiry({
            user_name: finalUserName,
            user_email: user_email || "no-reply@portfolio.com",
            user_project: finalProjectName,
            message,
            status: 'NEW'
        });
        await newInquiry.save();

        // Send Thank You Email only if it's a real user inquiry (has real email)
        if (user_email && !user_email.includes("no-email-provided")) {
            const mailOptions = {
                from: process.env.EMAIL_USER,
                to: user_email,
                subject: `PROJECT INQUIRY: ${finalProjectName.toUpperCase()}`,
                html: `
                    <div style="background-color: #000000; color: #ffffff; padding: 60px 20px; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; text-align: center;">
                        <div style="max-width: 600px; margin: 0 auto; border: 1px solid #333; padding: 40px;">
                            <h1 style="font-size: 10px; text-transform: uppercase; letter-spacing: 5px; color: #666; margin-bottom: 40px;">
                                Receipt Confirmation
                            </h1>
                            <h2 style="font-size: 32px; font-weight: 300; text-transform: uppercase; letter-spacing: -1px; margin-bottom: 20px;">
                                Hello, <span style="font-style: italic;">${finalUserName}</span>.
                            </h2>
                            <div style="height: 1px; width: 50px; background-color: #ffffff; margin: 30px auto;"></div>
                            <p style="font-size: 14px; line-height: 1.8; letter-spacing: 0.5px; color: #cccccc; margin-bottom: 30px;">
                                Your inquiry regarding <strong style="color: #ffffff;">${finalProjectName.toUpperCase()}</strong> has been successfully received. 
                                I am currently reviewing your vision and will respond within the next 24 to 48 hours.
                            </p>
                            <div style="background-color: #0a0a0a; border: 1px solid #1a1a1a; padding: 20px; margin-bottom: 30px; text-align: left;">
                                <p style="font-size: 10px; text-transform: uppercase; color: #444; margin-bottom: 10px;">Message Preview</p>
                                <p style="font-size: 13px; color: #888; margin: 0;">"${message}"</p>
                            </div>
                            <p style="font-size: 12px; color: #555; text-transform: uppercase; letter-spacing: 2px;">
                                Best Regards,<br />
                                <span style="color: #ffffff; font-weight: bold;">Shashank Sharma</span>
                            </p>
                            <div style="margin-top: 50px; font-size: 10px; color: #333;">
                                © 2026 SHASHANK PORTFOLIO / ALL RIGHTS RESERVED
                            </div>
                        </div>
                    </div>
                `
            };
            transporter.sendMail(mailOptions).catch(e => console.error("Client email failed", e));
        }

        // Notify Yourself (Admin Notification)
        const adminNotify = {
            from: process.env.EMAIL_USER,
            to: process.env.EMAIL_USER,
            subject: `🚀 New ${finalProjectName} Received!`,
            text: `Name: ${finalUserName}\nEmail: ${user_email}\nProject: ${finalProjectName}\nMessage: ${message}`
        };

        transporter.sendMail(adminNotify).catch(e => console.error("Admin notification failed", e));

        res.status(201).json({ success: true, message: "Inquiry saved and processing emails" });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

// 2. Track Site Hit
app.post("/api/analytics/hit", async (req, res) => {
    try {
        await Analytics.findOneAndUpdate({}, { $inc: { pageViews: 1 } }, { upsert: true });
        res.sendStatus(200);
    } catch (err) { res.status(500).json(err); }
});

// 3. Track Project Click
app.post("/api/analytics/click/:id", async (req, res) => {
    const { id } = req.params;
    const { title } = req.body;
    try {
        let doc = await Analytics.findOne({});
        if (!doc) doc = await Analytics.create({ projectClicks: [] });
        const pIdx = doc.projectClicks.findIndex(p => p.projectId === id);
        if (pIdx > -1) doc.projectClicks[pIdx].count += 1;
        else doc.projectClicks.push({ projectId: id, title, count: 1 });
        await doc.save();
        res.sendStatus(200);
    } catch (err) { res.status(500).json(err); }
});

// Public Getters
app.get("/api/projects", async (req, res) => {
    const projects = await Project.find().sort({ createdAt: -1 });
    res.json(projects);
});

app.get("/api/skills", async (req, res) => {
    const skills = await Skill.find().sort({ name: 1 });
    res.json(skills);
});

app.get("/api/settings", async (req, res) => {
    let settings = await Settings.findOne();
    if (!settings) settings = await Settings.create({});
    res.json(settings);
});

app.get("/api/identity", async (req, res) => {
    let identity = await Identity.findOne();
    if (!identity) identity = await Identity.create({ aboutMe: "Welcome", tagline: "Developer" });
    res.json(identity);
});

// Admin Routes
app.get("/api/admin/stats", verifyAdmin, async (req, res) => {
    const stats = await Analytics.findOne({});
    res.json(stats || { pageViews: 0, projectClicks: [] });
});

app.get("/api/admin/inquiries", verifyAdmin, async (req, res) => {
    const inquiries = await Inquiry.find().sort({ createdAt: -1 });
    res.json(inquiries);
});

app.post("/api/admin/settings", verifyAdmin, async (req, res) => {
    const updated = await Settings.findOneAndUpdate({}, req.body, { upsert: true, new: true });
    res.json(updated);
});

app.post("/api/admin/identity", verifyAdmin, async (req, res) => {
    const updated = await Identity.findOneAndUpdate({}, req.body, { upsert: true, new: true });
    res.json(updated);
});

app.post("/api/admin/projects", verifyAdmin, async (req, res) => {
    const newProject = new Project(req.body);
    await newProject.save();
    res.status(201).json(newProject);
});

app.post("/api/admin/skills", verifyAdmin, async (req, res) => {
    const newSkill = new Skill(req.body);
    await newSkill.save();
    res.status(201).json(newSkill);
});

app.delete("/api/admin/:type/:id", verifyAdmin, async (req, res) => {
    const { type, id } = req.params;
    try {
        if (type === 'inquiry') await Inquiry.findByIdAndDelete(id);
        else if (type === 'projects') await Project.findByIdAndDelete(id);
        else if (type === 'skills') await Skill.findByIdAndDelete(id);
        res.json({ success: true });
    } catch (error) { res.status(500).json({ error: error.message }); }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`📡 Server Live on Port ${PORT}`));