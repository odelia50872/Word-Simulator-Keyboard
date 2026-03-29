# Word & Keyboard Simulator – Virtual Text Platform

Word Simulator is a specialized React web application that simulates a modern text editing environment. 
It features a fully functional custom-built virtual keyboard, allowing users to interact with a document-style interface, manage text data, and perform advanced search operations.

---

## 🌐 Live Application
*(אם העלית את הפרויקט ל-Vercel, שימי כאן את הלינק. אם לא, אפשר למחוק את השורה הזו)*
* **Frontend (Vercel):** [Link to your Word App](https://your-link-here.vercel.app/)

---

---

## 📸 Screenshots

### 1. Authentication Screen
The application begins with a secured login interface, featuring Microsoft Word branding. Users must provide their credentials (ID, Username, and Password) to access the editor. This demonstrates state management for inputs and basic simulation of security workflows.

<img src="path/to/your/image_4.png" alt="Authentication Screen" width="350"/>

*(Image description: A sleek, dark-blue login interface with input fields for 'Identity', 'Username', and 'Password', with a clear 'W' (Word) logo.)*

---

### 2. Main Editor & Virtual Keyboard
This image shows the core application. It features a fully functional simulated Microsoft Word ribbon toolbar with standard editing functions. Below the empty document area is a comprehensive, interactive Virtual Keyboard (built in React) that allows for text input. The side panels display current editor states and additional file information, demonstrating complex React state management and synchronized event handling.

<img src="path/to/your/image_3.png" alt="Main Editor Screen" width="100%"/>

*(Image description: The complete text editor interface with a rich ribbon toolbar, a file panel, a large virtual QWERTY keyboard, and information panels, all designed with UI familiarity.)*

---
---

## 🚀 Project Overview
Word Simulator simulates a real document-driven platform where users can:
* **Interact via Virtual Keyboard:** Complete support for special keys (Shift, Caps, Backspace).
* **Search & Replace:** Locate specific text patterns and update them instantly.
* **Manage Documents:** Save and load text data to simulate file persistence.
* **Synchronized Input:** Seamless integration between physical and virtual typing.

The project focuses on **complex event handling**, **state synchronization**, and **interactive UI components**.

---

## 🏗️ Application Architecture
`User Input (Physical/Virtual)` ➔ `React State Manager` ➔ `Dynamic Text Buffer` ➔ `Document View` ➔ `Local Storage Simulation`

---

## ✨ Engineering Highlights
- **Dynamic Keyboard Logic:** Advanced event mapping for virtual-to-physical key synchronization.
- **State-Driven Editor:** Real-time text manipulation using React `useState` and `useEffect` hooks.
- **Custom Search Algorithm:** Integrated search-and-highlight functionality within the UI.
- **Modular Component Design:** Reusable architecture for keys, toolbars, and display modules.
- **Interactive UX:** Visual feedback for key presses and document actions.
- **Optimized Folder Structure:** Scalable organization for React components and logic.

---

## 📂 Repository Structure
```text
project/
├── src/
│   ├── components/  # Keyboard, Editor, and UI modules
│   ├── hooks/       # Custom logic for text and state
│   └── assets/      # Styles and static resources
└── public/          # Static assets
