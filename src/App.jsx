import { useEffect, useState } from 'react'
import api from './api'

function App() {
  const [users, setUsers] = useState([])
  const [searchQuery, setSearchQuery] = useState('')
  const [filteredList, setFilteredList] = useState([])

  useEffect(() => {
    api
      .get('/users')
      .then((response) => setUsers(response.data))
      .catch((err) => {
        console.error('ops! ocorreu um erro' + err)
      })
  }, [])

  if (!users) return null

  async function handleSearch() {
    try {
      const response = await api.get(`/search/users?q=${searchQuery}`)
      setFilteredList(response.data.items)
    } catch {
      alert('Esse usuário não existe, verifique e tente novamente :(')
      setSearchQuery('')
    }
  }

  return (
    <div>
      <div>
        <input
          type="search"
          className={`w-full px-3 py-1.5 text-gray-700
           bg-white border-2 border-solid border-gray-300 rounded 
           transition ease-in-out focus:text-gray-700 mb-2
           focus:bg-white md:w-3/6 md:h-12`}
          placeholder="Search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button
          onClick={handleSearch}
          className="mx-14 mt-3 bg-zinc-400 p-3 text-white md:m-0 md:p-0"
        >
          pesquisar
        </button>
      </div>
      {searchQuery && filteredList
        ? filteredList.map((user) => (
            <p key={user.id} className="flex flex-col mb-4">
              {user.login}
            </p>
          ))
        : users.map((user) => (
            <p key={user.id} className="flex flex-col mb-4">
              {user.login}
            </p>
          ))}
    </div>
  )
}

export default App
