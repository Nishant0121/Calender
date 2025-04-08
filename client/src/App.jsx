import React from "react";
import MyCalendar from "./components/Calendar";

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-gray-800">Nish Calendar</h1>
        </div>
      </header>
      <main className="container mx-auto px-4 py-6">
        <MyCalendar />
      </main>
    </div>
  );
}

export default App;
