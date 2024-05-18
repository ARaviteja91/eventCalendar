import React from 'react';
import Calendar from './components/Calendar';
import "./App.css"


// You can replace with API respose
const events = [
  { id: 1, title: 'Meeting', date: '2024-05-16',description:'Some random description' },
  { id: 2, title: 'Party', date: '2024-06-20', description:'Some random description' },
  { id: 3, title: 'Party', date: '2024-07-02', description:'Some random description' },
  // Add more events as needed
];

const App = () => {
  return (
    <div className="App">
      <div>
        <h1>Event Scheduler</h1>
        <Calendar events={events} />
      </div>
    </div>
  );
};

export default App;
