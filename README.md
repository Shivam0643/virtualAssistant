<img width="1920" height="1080" alt="Screenshot (74)" src="https://github.com/user-attachments/assets/ebcb1aa0-cf53-49f9-ad74-0e4aa245e292" /><img width="1920" height="1080" alt="Screenshot (76)" src="https://github.com/user-attachments/assets/918cf706-128c-4b4f-8e54-8e05ab200488" />⭐ virtualAssistant

An interactive MERN-stack Virtual Assistant application that allows users to perform tasks, ask questions, and receive responses through both voice and text. The assistant listens only when the user addresses it by the personalized name they assign—creating a more natural, real-world assistant experience.

🔗 Live Demo: https://virtualassistant-750q.onrender.com/
🔗 Repository: https://github.com/Shivam0643/virtualAssistant

📌 About the Project

virtualAssistant is a full-stack application built using the MERN stack.
It features a React frontend, a Node.js + Express backend, and MongoDB for storing assistant settings and conversation data.

The user can:
Assign a custom name to the assistant
Ask a question using voice
Receive the answer in voice + text
Interact with a smooth and responsive UI
The assistant only responds when the user calls its name, making the experience feel authentic and personalized.

✨ Features

🎙 Voice Input — Ask questions using your microphone
🔊 Voice Output — Assistant responds verbally
💬 Chat UI — Text-based conversation also available
👤 Personalized Assistant Name — Assistant responds only when addressed by the name you assign
🤖 OpenAI-Powered Responses — Smart, dynamic, contextual replies
📦 MERN Stack Architecture — Robust and scalable
📱 Responsive UI — Works on all devices
⚡ Fast and smooth frontend with modern design
🔐 (Optional) Authentication support
☁️ Live deployment on Render

🛠 Tech Stack
Frontend
React.js
Tailwind CSS / Bootstrap
Axios
Speech Recognition API
Text-To-Speech API
Framer Motion (optional animations)

Backend
Node.js
Express.js
MongoDB
Mongoose
OpenAI API
CORS
dotenv

📁 Project Structure
virtualAssistant/
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── server.js
│   ├── .env
│   └── package.json
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── utils/
│   │   ├── App.js
│   │   └── index.js
│   ├── package.json
│
└── README.md

🚀 Getting Started
Prerequisites
Node.js (v14+)
npm or yarn
MongoDB Atlas or Local MongoDB
OpenAI API Key

Deployment
Render (Backend + Frontend)

⚙️ Installation & Setup
1️⃣ Clone the Repository
git clone https://github.com/Shivam0643/virtualAssistant.git
cd virtualAssistant

2️⃣ Setup Backend
cd backend
npm install


Create a .env file:
MONGO_URI=your_mongodb_connection_string
OPENAI_API_KEY=your_api_key
PORT=5000


Start backend:
npm start

3️⃣ Setup Frontend
cd ../frontend
npm install
npm start


The app will start at:
👉 http://localhost:3000

🧠 How It Works
✔ Assign a Name
The user gives the assistant a name (example: “Alexa”, “JARVIS”, “Nova”).

✔ Voice Activation
The assistant listens only when you call its name first.

Example:
“Nova, what is the weather today?”
“JARVIS, open YouTube.”

✔ Smart Responses
The question is sent to the backend → OpenAI processes → assistant responds:
In text (chat UI)
In voice (speech synthesis)

✔ Continuous Conversations
The assistant can handle follow-up questions and maintain context.

🖼️ Screenshots
<img width="1920" height="1080" alt="Screenshot (72)" src="https://github.com/user-attachments/assets/d8bc4cc0-865d-49ec-86bd-419b53f57ee1" />
<img width="1920" height="1080" alt="Screenshot (73)" src="https://github.com/user-attachments/assets/59fb3eb6-100f-461f-81ee-d02c6a103156" />
<img width="1920" height="1080" alt="Screenshot (74)" src="https://github.com/user-attachments/assets/46a6a1d1-9697-4f5e-a964-330ebb262fd6" />
<img width="1920" height="1080" alt="Screenshot (76)" src="https://github.com/user-attachments/assets/403df760-9a5f-46dc-9197-7cf9c011fcc1" />
<img width="1920" height="1080" alt="Screenshot (77)" src="https://github.com/user-attachments/assets/1a2d8bd6-80a3-4fb8-84dc-2852568f0949" />
