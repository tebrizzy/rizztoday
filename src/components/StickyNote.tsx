import { useState } from 'react'

const INITIAL_TODOS = [
  { id: 'todo1', label: 'learn vibing', checked: false },
  { id: 'todo2', label: 'finish website', checked: true },
  { id: 'todo3', label: 'call mom', checked: true },
  { id: 'todo4', label: 'drink water', checked: true }
]

export function StickyNote() {
  const [todos, setTodos] = useState(INITIAL_TODOS)

  const toggleTodo = (id: string) => {
    setTodos(prev =>
      prev.map(todo =>
        todo.id === id ? { ...todo, checked: !todo.checked } : todo
      )
    )
  }

  return (
    <div className="sticky-note">
      {todos.map(todo => (
        <div key={todo.id} className="sticky-item">
          <input
            type="checkbox"
            id={todo.id}
            checked={todo.checked}
            onChange={() => toggleTodo(todo.id)}
          />
          <label htmlFor={todo.id}>{todo.label}</label>
        </div>
      ))}
    </div>
  )
}
