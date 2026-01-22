import { useState } from 'react'
import { INITIAL_TODOS } from '../../constants/todos'
import styles from './StickyNote.module.css'

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
    <div className={styles.stickyNote}>
      {todos.map(todo => (
        <div key={todo.id} className={styles.stickyItem}>
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
