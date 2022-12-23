import { useEffect, useState } from 'react'
import api from './api'

function App() {
  const [users, setUsers] = useState()

  useEffect(() => {
    api
      .get('/users')
      .then((response) => setUsers(response.data))
      .catch((err) => {
        console.error('ops! ocorreu um erro' + err)
      })
  }, [])

  if (!users) return null
  return (
    <div>
      {users.map((user) => (
        <p key={user.id} className="flex flex-col mb-4">
          {user.login}
        </p>
      ))}
    </div>
  )
}

export default App
