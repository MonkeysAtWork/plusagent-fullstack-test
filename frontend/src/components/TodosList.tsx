import React from 'react'

function Form(props: any) {
  const { todos } = props;

  return (
    <div className='TodoList'>
      <ul className="list-group w-100">
        {todos.map((task: any) => (
          <div key={task.id}>
            <li className="list-group-item d-flex justify-content-between align-items-center">
              {task.description}
              <span className="badge bg-primary rounded-pill">{task.date}</span>
            </li>
          </div>
        ))}
      </ul>
    </div>
  )
}

export default Form

