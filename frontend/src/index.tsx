import React from 'react'
import ReactDOM from 'react-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css'
import App from './App'
import axios from 'axios'
import paths from './paths'

(async () => {
  let initialData = [];

  try {
    const url = paths.todosPath()
    const resp = await axios.get(url)
    initialData = resp.data
  } catch (err) {
    console.error(err);
  }

  ReactDOM.render(
    <React.StrictMode>
      <App init={initialData.data} />
    </React.StrictMode>,
    document.getElementById('root')
  )
})()
