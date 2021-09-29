import axios from 'axios';
import './App.css';
import { useState } from 'react';



function App() {
  const [data, setData] = useState({})

  const api = axios.create({
    baseURL: "http://localhost:8000",
    headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,OPTIONS",
        "Content-Type": "application/json"
    }
  })

  const getData = async () => {
    const books = await api.get('http://localhost:8000/milluki/books')
    console.log(books.data)
  }

  getData()

  return (
    <div className="App">
      <header className="App-header">
        <div>Foda-se</div>
      </header>
    </div>
  );
}

export default App;
