
## Voice Feedback

- **Success**: "Task saved. Title: [title]. Description: [description]. Priority: [priority]. Due date: [date]. Tags: [tags]. Task added successfully."
- **Error**: "No title found. Please say title first."

---

# 🤖 AI Assistant

## Features

| Feature | Description |
|---------|-------------|
| **Priority Suggestions** | Analyzes task text for urgency keywords |
| **Productivity Tips** | Random productivity tips for better workflow |
| **Task Suggestions** | Smart recommendations for task management |
| **Productivity Score** | Analyzes completion patterns |

## How It Works

```javascript
// Priority detection
const highKeywords = ['urgent', 'asap', 'deadline', 'critical', 'important'];
const mediumKeywords = ['soon', 'review', 'update', 'check'];

// Returns priority with confidence score
{
  priority: 'High',
  confidence: 0.85,
  reason: 'Urgent keywords detected'
}
---

# 📁 Project Structure

```text
taskflow-ai/
│
├── README.md
├── LICENSE
├── package.json
├── package-lock.json
├── vite.config.js
├── eslint.config.js
├── vercel.json
├── index.html
├── .gitignore
│
├── public/
│   ├── vite.svg
│   └── manifest.json
│
├── src/
│   ├── main.jsx
│   ├── App.jsx
│   ├── App.module.css
│   ├── index.css
│   │
│   ├── components/
│   │   ├── Dashboard/
│   │   ├── TodoForm/
│   │   ├── TodoItem/
│   │   ├── Filters/
│   │   ├── Analytics/
│   │   ├── ActivityTimeline/
│   │   ├── BulkActions/
│   │   ├── ConfirmDialog/
│   │   ├── KeyboardShortcuts/
│   │   ├── VoiceInput/
│   │   ├── ThemeToggle/
│   │   └── OfflineStatus/
│   │
│   ├── hooks/
│   │   ├── useLocalStorage.js
│   │   ├── useUndoRedo.js
│   │   ├── useOfflineSync.js
│   │   └── taskAnalytics.js
│   │
│   ├── utils/
│   │   ├── aiAssistant.js
│   │   ├── constants.js
│   │   └── helpers.js
│   │
│   └── styles/
│       ├── globals.css
│       └── animations.css
│
└── dist/
```

---

# 🚀 Getting Started

## 📋 Requirements

- 🟦 Node.js 18+
- 📦 npm or Yarn
- 🌐 Modern Browser (Chrome/Edge Recommended)

---

## 1️⃣ Clone Repository

```bash
git clone https://github.com/maira333-mmm/taskflow-ai.git

cd taskflow-ai
```

---

## 2️⃣ Install Dependencies

```bash
npm install
```

or

```bash
yarn install
```

---

## 3️⃣ Start Development Server

```bash
npm run dev
```

or

```bash
yarn dev
```

Open:

```
http://localhost:5173
```

---

## 4️⃣ Build for Production

```bash
npm run build
```

or

```bash
yarn build
```

---

# 💻 Usage Guide

## 📝 Create Tasks

- Add title
- Description
- Priority
- Due Date
- Tags
- Click **Create Task**

---

## 🎤 Voice Commands

Click the microphone and say:

```
Title Complete README
Priority High
Date Tomorrow
Save
```

TaskFlow AI automatically creates the task.

---

## ✅ Manage Tasks

| Action | Description |
|---------|-------------|
| ✔ Complete | Mark task completed |
| ✏ Edit | Update task |
| 🗑 Delete | Remove task |
| 🔍 View | Open task details |
| ☑ Select | Multi-select tasks |

---

## 🔍 Filters

- All Tasks
- Active
- Completed
- High Priority
- Medium Priority
- Low Priority
- Overdue
- Due Today
- This Week

---

## 📊 Analytics

The dashboard shows:

- Total Tasks
- Active Tasks
- Completed Tasks
- Completion Rate
- Weekly Progress
- Overdue Tasks
- Priority Distribution

---

## ⌨ Keyboard Shortcuts

| Shortcut | Action |
|-----------|--------|
| Ctrl + N | New Task |
| Ctrl + F | Search |
| Ctrl + Z | Undo |
| Ctrl + Y | Redo |
| Ctrl + D | Toggle Layout |
| Ctrl + H | Analytics |
| Ctrl + T | Theme |

---

# 🎨 UI / UX

## 🎨 Color Palette

| Color | Hex |
|---------|---------|
| Primary | #0A3C30 |
| Secondary | #007380 |
| Success | #10B981 |
| Warning | #F59E0B |
| Danger | #EF4444 |
| Background | #F9FAFB |

---

## ✨ Features

- 🌙 Dark / Light Mode
- 📱 Responsive Design
- 🎤 Voice Input
- 📊 Analytics Dashboard
- 💾 Local Storage
- ♻ Undo / Redo
- 📶 Offline Support
- ⚡ Fast Performance
- ✨ Smooth Animations

---

# 📊 Workflow

```text
             Start
               │
               ▼
        Create New Task
               │
               ▼
      Fill Task Information
               │
               ▼
        Save to LocalStorage
               │
               ▼
      View Task Dashboard
               │
      ┌────────┴────────┐
      ▼                 ▼
 Edit Task         Complete Task
      │                 │
      └────────┬────────┘
               ▼
        Update Analytics
               │
               ▼
        Save Automatically
               │
               ▼
              End
```

---

# 📈 Analytics Dashboard

| Metric | Description |
|---------|-------------|
| 📋 Total Tasks | Number of Tasks |
| ⏳ Active | Pending Tasks |
| ✅ Completed | Finished Tasks |
| 📊 Completion Rate | Percentage |
| ⚠ Overdue | Past Due Tasks |
| 📅 Weekly Progress | Weekly Activity |
| 🔥 Priority Chart | High / Medium / Low |

---

# 🛠 Technologies Used

| Technology | Purpose |
|------------|----------|
| React 18 | Frontend |
| Vite | Build Tool |
| JavaScript | Programming |
| CSS Modules | Styling |
| Framer Motion | Animations |
| Sonner | Toast Notifications |
| LocalStorage | Persistence |
| Web Speech API | Voice Recognition |

---

# 🌍 Browser Support

| Browser | Supported |
|----------|-----------|
| Chrome | ✅ |
| Firefox | ✅ |
| Edge | ✅ |
| Safari | ✅ |
| Opera | ✅ |
| Mobile Browsers | ✅ |

---

# 🤝 Contributing

```text
Fork Repository
      │
      ▼
Create Feature Branch
      │
      ▼
Commit Changes
      │
      ▼
Push Branch
      │
      ▼
Open Pull Request
```

---

# 📬 Contact

<div align="center">

## 👩‍💻 Maira Alam

<a href="https://mail.google.com/mail/?view=cm&fs=1&to=maira.alam33@gmail.com">
<img src="https://img.shields.io/badge/Gmail-EA4335?style=for-the-badge&logo=gmail&logoColor=white"/>
</a>

<a href="https://github.com/maira333-mmm">
<img src="https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white"/>
</a>

<a href="https://www.linkedin.com/in/maira-a-48699630b/">
<img src="https://img.shields.io/badge/LinkedIn-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white"/>
</a>

<a href="https://maira-alam-o2p20gi.gamma.site/">
<img src="https://img.shields.io/badge/Portfolio-2563EB?style=for-the-badge&logo=googlechrome&logoColor=white"/>
</a>

</div>

---

# 📄 License

Licensed under the **MIT License**.

See the **LICENSE** file for more details.

---

# 🎯 Future Enhancements

| Feature | Description |
|----------|-------------|
| ☁ Cloud Sync | Sync Tasks Across Devices |
| 📱 Mobile App | React Native Version |
| 🔔 Notifications | Task Reminders |
| 📅 Calendar Integration | Google Calendar |
| 🌍 Multi-language | i18n Support |
| 🏷 Smart Tags | AI Tag Suggestions |
| 📊 Advanced Analytics | Charts & Reports |
| 🤖 AI Scheduling | Intelligent Task Planning |

---

# 🐛 Troubleshooting

<details>
<summary><b>🎤 Voice Recognition Not Working</b></summary>

- Use Chrome or Microsoft Edge.
- Allow microphone permission.
- Check microphone settings.
- Speak clearly.

</details>

---

<details>
<summary><b>💾 Tasks Not Saving</b></summary>

- Enable LocalStorage.
- Clear browser cache.
- Refresh the application.

</details>

---

<details>
<summary><b>⚡ Slow Performance</b></summary>

- Close unused browser tabs.
- Disable unnecessary extensions.
- Use the latest browser version.

</details>

---

# 🙏 Acknowledgements

| Resource | Purpose |
|-----------|----------|
| React | UI Framework |
| Vite | Build Tool |
| Framer Motion | Animations |
| Sonner | Notifications |
| Web Speech API | Voice Recognition |
| GitHub | Repository Hosting |
| Shields.io | Badges |

---

<div align="center">

## ❤️ Built with React, JavaScript & AI

Made with 💙 by **Maira Alam**

⭐ If you like this project, don't forget to **Star** the repository.

<br>

<a href="https://github.com/maira333-mmm/taskflow-ai">
<img src="https://img.shields.io/badge/📂_SOURCE_CODE-181717?style=for-the-badge&logo=github&logoColor=white"/>
</a>

<a href="https://github.com/maira333-mmm/taskflow-ai/commits/main">
<img src="https://img.shields.io/github/last-commit/maira333-mmm/taskflow-ai?style=for-the-badge&label=LAST%20UPDATE"/>
</a>

</div>
