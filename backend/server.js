const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const nodemailer = require("nodemailer");
require("dotenv").config();

const app = express();

/* ---------------- MIDDLEWARE ---------------- */
// Updated CORS to allow your specific Vercel domain and local testing
app.use(cors({
    origin: ["https://my-portfolio-zn4k.vercel.app", "http://localhost:5173"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}));
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

        const finalProjectName = user_project || "General Feedback";
        const finalUserName = user_name || "Footer User";

        const newInquiry = new Inquiry({
            user_name: finalUserName,
            user_email: user_email || "no-reply@portfolio.com",
            user_project: finalProjectName,
            message,
            status: 'NEW'
        });
        await newInquiry.save();

        if (user_email && !user_email.includes("no-email-provided")) {
            const mailOptions = {
                from: process.env.EMAIL_USER,
                to: user_email,
                subject: `PROJECT INQUIRY: ${finalProjectName.toUpperCase()}`,
                html: `
                    <div style="background-color: #000000; color: #ffffff; padding: 60px 20px; font-family: Arial, sans-serif; text-align: center;">
                        <div style="max-width: 600px; margin: 0 auto; border: 1px solid #333; padding: 40px;">
                            <h2 style="font-weight: 300; text-transform: uppercase;">Hello, ${finalUserName}.</h2>
                            <p style="color: #cccccc;">Your inquiry regarding <strong>${finalProjectName}</strong> has been received.</p>
                            <p style="font-size: 12px; color: #555;">I will respond within 24-48 hours.</p>
                            <br/>
                            <p>Best Regards,<br/><strong>Shashank Sharma</strong></p>
                        </div>
                    </div>
                `
            };
            transporter.sendMail(mailOptions).catch(e => console.error("Client email failed", e));
        }

        const adminNotify = {
            from: process.env.EMAIL_USER,
            to: process.env.EMAIL_USER,
            subject: `🚀 New ${finalProjectName} Received!`,
            text: `Name: ${finalUserName}\nEmail: ${user_email}\nProject: ${finalProjectName}\nMessage: ${message}`
        };

        transporter.sendMail(adminNotify).catch(e => console.error("Admin notification failed", e));

        res.status(201).json({ success: true, message: "Inquiry saved" });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

// 2. Analytics
app.post("/api/analytics/hit", async (req, res) => {
    try {
        await Analytics.findOneAndUpdate({}, { $inc: { pageViews: 1 } }, { upsert: true });
        res.sendStatus(200);
    } catch (err) { res.status(500).json(err); }
});

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

// 3. Public Getters
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

// 4. Admin Routes
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