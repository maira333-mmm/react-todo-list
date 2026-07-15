<div align="center">

<img width="100%" src="https://capsule-render.vercel.app/api?type=waving&height=210&color=0:1E3A5F,50:2563EB,100:60A5FA&text=TaskSwift%20AI&fontColor=ffffff&fontSize=50&fontAlignY=38&desc=React%20%7C%20TypeScript%20%7C%20AI%20Assistant&descAlignY=60&animation=fadeIn" alt="TaskSwift AI Header" />

<br>

<img src="https://readme-typing-svg.demolab.com?font=Inter&weight=600&size=20&duration=2800&pause=700&color=2563EB&center=true&vCenter=true&repeat=true&width=700&height=52&lines=AI-Powered+Task+Management+App.;Voice+Input+%7C+Dark+Mode+%7C+Offline+Support.;Smart+Analytics+%7C+Undo%2FRedo+%7C+Bulk+Actions.;Built+with+React+%2B+Vite+%2B+TypeScript." alt="Typing Animation" />

<br><br>

A modern **AI-Powered Task Management Application** built with **React, TypeScript, and Vite**. Features voice input, dark mode, offline support, smart analytics, undo/redo functionality, and an AI assistant for productivity tips.

<br>

<a href="https://github.com/maira333-mmm/react-todo-list">
  <img src="https://img.shields.io/badge/📂_SOURCE_CODE-181717?style=for-the-badge&logo=github&logoColor=white" alt="Source Code"/>
</a>

<a href="https://github.com/maira333-mmm/react-todo-list/commits/main">
  <img src="https://img.shields.io/github/last-commit/maira333-mmm/react-todo-list?style=for-the-badge&label=LAST%20UPDATE" alt="Last Update"/>
</a>

<br><br>

<img src="https://img.shields.io/badge/React-20232A?style=flat-square&logo=react&logoColor=61DAFB"/>
<img src="https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white"/>
<img src="https://img.shields.io/badge/Vite-646CFF?style=flat-square&logo=vite&logoColor=white"/>
<img src="https://img.shields.io/badge/CSS_Modules-1572B6?style=flat-square&logo=css3&logoColor=white"/>
<img src="https://img.shields.io/badge/Framer_Motion-0055FF?style=flat-square&logo=framer&logoColor=white"/>
<img src="https://img.shields.io/badge/LocalStorage-FF6B6B?style=flat-square"/>

</div>

---

# 📋 Table of Contents

- 📖 About
- ✨ Features
- 🎯 Key Highlights
- 📁 Project Structure
- 🚀 Getting Started
- 🔧 Installation
- 💻 Usage Guide
- 🎨 UI/UX Design
- 🛠 Technologies Used
- 🌍 Browser Compatibility
- 🤝 Contributing
- 📬 Contact
- 📄 License
- 🙏 Acknowledgements

---

# 📖 About

**TaskSwift AI** is a modern, AI-powered task management application that helps users organize, track, and complete tasks efficiently. Built with React and TypeScript, it features voice input, dark mode, offline support, smart analytics, and an intelligent AI assistant for productivity insights.

## 🎯 Key Highlights

- 🎤 **Voice Input** - Add tasks using voice commands
- 🤖 **AI Assistant** - Smart productivity tips and suggestions
- 🌙 **Dark Mode** - Toggle between light and dark themes
- 📶 **Offline Support** - Works without internet connection
- 🔄 **Undo/Redo** - Full undo/redo functionality
- 📊 **Analytics** - Visual task completion analytics
- 🏷️ **Tags & Priority** - Organize tasks with tags and priorities
- 📅 **Due Dates** - Set and track task deadlines
- 🔍 **Search & Filter** - Find tasks quickly

---

# ✨ Features

| Feature | Description |
|---------|-------------|
| 🎤 **Voice Input** | Add tasks using natural language voice commands |
| 🤖 **AI Assistant** | Get productivity tips and task suggestions |
| 🌙 **Dark Mode** | Toggle between light and dark themes |
| 📶 **Offline Support** | Works offline with sync when online |
| 🔄 **Undo/Redo** | Full undo/redo functionality (Ctrl+Z/Ctrl+Y) |
| 📊 **Analytics Dashboard** | Visual task completion analytics |
| 🏷️ **Tags** | Add and filter tasks by tags |
| 📅 **Due Dates** | Set due dates with overdue/today indicators |
| 🔍 **Search** | Search tasks by title, description, or tags |
| 📂 **Filters** | Filter by status (All, Active, Completed, Priority) |
| 📱 **Responsive** | Works on all devices |
| 💾 **Local Storage** | Data persistence in browser |

---

# 📁 Project Structure

```text
react-todo-list/
│
├── README.md
├── index.html
├── package.json
├── package-lock.json
├── vite.config.js
├── vercel.json
├── eslint.config.js
├── .gitignore
│
├── public/
│   ├── vite.svg
│   └── manifest.json
│
├── src/
│   ├── main.jsx                         # Entry point
│   ├── App.jsx                          # Main App component
│   ├── App.module.css                   # App styles
│   ├── index.css                        # Global styles
│   │
│   ├── components/
│   │   ├── TodoForm/
│   │   │   ├── TodoForm.jsx
│   │   │   └── TodoForm.module.css
│   │   │
│   │   ├── TodoItem/
│   │   │   ├── TodoItem.jsx
│   │   │   └── TodoItem.module.css
│   │   │
│   │   ├── Dashboard/
│   │   │   ├── Dashboard.jsx
│   │   │   └── Dashboard.module.css
│   │   │
│   │   ├── Filters/
│   │   │   ├── Filters.jsx
│   │   │   └── Filters.module.css
│   │   │
│   │   ├── Analytics/
│   │   │   ├── AnalyticsDashboard.jsx
│   │   │   └── AnalyticsDashboard.module.css
│   │   │
│   │   ├── ActivityTimeline/
│   │   │   ├── ActivityTimeline.jsx
│   │   │   └── ActivityTimeline.module.css
│   │   │
│   │   ├── BulkActions/
│   │   │   ├── BulkActions.jsx
│   │   │   └── BulkActions.module.css
│   │   │
│   │   ├── ConfirmDialog/
│   │   │   ├── ConfirmDialog.jsx
│   │   │   └── ConfirmDialog.module.css
│   │   │
│   │   ├── KeyboardShortcuts/
│   │   │   ├── KeyboardShortcuts.jsx
│   │   │   └── KeyboardShortcuts.module.css
│   │   │
│   │   ├── ThemeToggle/
│   │   │   ├── ThemeToggle.jsx
│   │   │   └── ThemeToggle.module.css
│   │   │
│   │   ├── OfflineStatus/
│   │   │   ├── OfflineStatus.jsx
│   │   │   └── OfflineStatus.module.css
│   │   │
│   │   └── VoiceInput/
│   │       ├── VoiceInput.jsx
│   │       └── VoiceInput.module.css
│   │
│   ├── hooks/
│   │   ├── useLocalStorage.js
│   │   ├── useOfflineSync.js
│   │   ├── useUndoRedo.js
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
└── dist/                               # Build output
---

# 🚀 Getting Started

## 📋 Requirements

- 🟩 Node.js 18+
- 📦 npm or Yarn
- 🌐 Modern Web Browser

---

## 🔧 Installation

### 1️⃣ Clone Repository

```bash
git clone https://github.com/maira333-mmm/react-todo-list.git

cd react-todo-list
```

### 2️⃣ Install Dependencies

```bash
npm install
```

or

```bash
yarn install
```

### 3️⃣ Run Development Server

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

### 4️⃣ Build for Production

```bash
npm run build
```

or

```bash
yarn build
```

### 5️⃣ Preview Production Build

```bash
npm run preview
```

or

```bash
yarn preview
```

---

# 💻 Usage Guide

## 🎤 Add Tasks with Voice

Click the microphone button and say:

```
Title Complete project report
Description Final report for client
Priority High
Date August 15 2026
Tags work,urgent
Save
```

---

## ✍ Add Tasks Manually

- Enter Task Title
- Add Description (Optional)
- Select Priority
- Choose Due Date
- Add Tags
- Click **Create Task**

---

## ✅ Manage Tasks

| Action | Description |
|---------|-------------|
| ✔ Complete | Mark task as completed |
| ✏ Edit | Modify existing task |
| 🗑 Delete | Remove task |
| 📋 Bulk Actions | Complete/Delete multiple tasks |

---

## ⌨ Keyboard Shortcuts

| Shortcut | Action |
|-----------|--------|
| Ctrl + N | New Task |
| Ctrl + F | Search |
| Ctrl + Z | Undo |
| Ctrl + Y | Redo |
| Ctrl + D | Toggle View |
| Ctrl + H | Analytics |
| Ctrl + T | Theme |

---

## 🔍 Filtering & Sorting

### Filters

- All
- Active
- Completed
- High Priority
- Medium Priority
- Low Priority

### Sorting

- Date
- Priority
- Title
- Ascending / Descending

---

# 🎨 UI / UX Design

## 🎨 Color Palette

| Color | Hex |
|---------|---------|
| Primary Dark | #0A3C30 |
| Accent Teal | #007380 |
| Success | #10B981 |
| Warning | #F59E0B |
| Danger | #EF4444 |
| Background | #F9FAFB |

---

## ✨ Features

- 🌙 Dark / Light Theme
- 🎤 Voice Input
- 📱 Responsive Layout
- 💾 Local Storage
- ♻ Undo / Redo
- ✨ Smooth Animations
- 📊 Analytics Dashboard
- ⚡ Fast Performance

---

# 🛠 Technologies Used

| Technology | Purpose |
|------------|----------|
| React 18 | UI Framework |
| TypeScript | Type Safety |
| Vite | Build Tool |
| CSS Modules | Styling |
| Framer Motion | Animations |
| Sonner | Toast Notifications |
| LocalStorage | Data Persistence |
| Web Speech API | Voice Recognition |

---

# 🌍 Browser Compatibility

| Browser | Supported |
|----------|-----------|
| Chrome | ✅ |
| Firefox | ✅ |
| Microsoft Edge | ✅ |
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

### Contribution Guidelines

- Fork the repository
- Create a feature branch

```bash
git checkout -b feature/AmazingFeature
```

- Commit your changes

```bash
git commit -m "Add Amazing Feature"
```

- Push your branch

```bash
git push origin feature/AmazingFeature
```

- Open a Pull Request

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

This project is licensed under the **MIT License**.

See the **LICENSE** file for more information.

---

# 🎯 Future Enhancements

| Feature | Description |
|----------|-------------|
| 🔔 Push Notifications | Task Reminders |
| 📱 PWA Support | Install as Mobile App |
| ☁ Cloud Sync | Sync Across Devices |
| 👥 Team Collaboration | Shared Task Lists |
| 📊 Advanced Analytics | Productivity Insights |
| 🎨 Custom Themes | Additional Color Schemes |
| 📅 Calendar View | Calendar Integration |

---

# 🐛 Troubleshooting

<details>
<summary><b>🎤 Voice Input Not Working</b></summary>

- Allow microphone permission.
- Use Chrome or Microsoft Edge.
- Ensure Web Speech API is supported.
- Speak clearly.

</details>

---

<details>
<summary><b>💾 Data Not Saving</b></summary>

- Check LocalStorage is enabled.
- Clear browser cache.
- Refresh the application.

</details>

---

<details>
<summary><b>⚡ Build Failing</b></summary>

```bash
rm -rf node_modules package-lock.json

npm install

npm run build
```

</details>

---

# 🙏 Acknowledgements

| Resource | Purpose |
|-----------|----------|
| React | UI Framework |
| Vite | Build Tool |
| Framer Motion | Animations |
| Sonner | Toast Notifications |
| Web Speech API | Voice Recognition |
| GitHub | Repository Hosting |
| Shields.io | Badges |

---

<div align="center">

## ❤️ Built with React, TypeScript & Love

Made with 💙 by **Maira Alam**

⭐ If you found this project helpful, consider giving it a **Star**!

<br>
<a href="https://github.com/maira333-mmm/react-todo-list" target="_blank">
  <img src="https://img.shields.io/badge/📂_SOURCE_CODE-181717?style=for-the-badge&logo=github&logoColor=white" alt="Source Code"/>
</a>

<a href="https://react-todo-list-o3jx-hzbvhxevx-mairas-projects-0f919ce8.vercel.app/" target="_blank">
  <img src="https://img.shields.io/badge/🚀_LIVE_DEMO-00C853?style=for-the-badge&logo=vercel&logoColor=white" alt="Live Demo"/>
</a>

<a href="https://github.com/maira333-mmm/react-todo-list/commits/main" target="_blank">
  <img src="https://img.shields.io/github/last-commit/maira333-mmm/react-todo-list?style=for-the-badge&label=LAST%20UPDATE" alt="Last Update"/>
</a>

</div>
