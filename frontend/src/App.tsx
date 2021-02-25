import React, { useState } from 'react'
import Form from './components/Form'
import TodosList from './components/TodosList'



function App(props: any) {
  const [todos, setTodos] = useState(props.init || [])

return (
  <div className='App'>
    {todos.length > 0 && <TodosList todos={todos} />}
    <Form setTodos={setTodos} />
  </div>
)
}

export default App
