import { useEffect, useState } from 'react'
import api from './api'

function App() {
  const [searchQuery, setSearchQuery] = useState('')
  const [users, setUsers] = useState()

  useEffect(() => {
    handleSearch()
  }, [])

  if (!users) return null

  function handleSearch() {
    api
      .get(`/search/users?q=${searchQuery ? searchQuery : 'git'}`)
      .then((response) => setUsers(response.data.items))
      .catch((err) => {
        console.error('ops! ocorreu um erro: ' + err)
      })
  }

  return (
    <div className="flex flex-col font-mono bg-slate-100">
      <h1 className="m-8 text-2xl text-center font-bold">
        Lista de usuários GitHub
      </h1>
      <div className="flex flex-col justify-center md:flex-row">
        <input
          type="search"
          className={`mx-14 block border border-gray-300 bg-gray-50 p-4 pl-10 text-sm text-gray-900 md:m-0`}
          placeholder="Search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onBlur={handleSearch}
        />
        <button
          onClick={handleSearch}
          className="mx-14 mt-3 bg-slate-600 p-3 text-white hover:bg-slate-800 md:m-0 md:px-4"
        >
          pesquisar
        </button>
      </div>
      <section className="container mx-auto p-6 font-mono">
        <div className="w-full mb-8 overflow-x-auto md:overflow-hidden  rounded-lg shadow-lg">
          <table className="w-full">
            <thead>
              <tr className="text-md font-semibold tracking-wide text-left text-gray-900 bg-slate-300 uppercase border-b border-gray-600">
                <th className="px-4 py-3">Nome</th>
                <th className="px-4 py-3">Followers</th>
                <th className="px-4 py-3">Following</th>
                <th className="px-4 py-3">Repositories</th>
                <th className="px-4 py-3">See more</th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {users.map((user) => (
                <tr className="text-gray-700 hover:bg-slate-200" key={user.id}>
                  <td className="px-4 py-3 border">
                    <div className="flex items-center text-sm">
                      <div className="relative w-8 h-8 mr-3 rounded-full md:block">
                        <img
                          className="object-cover w-full h-full rounded-full"
                          src={user.avatar_url}
                          alt=""
                          loading="lazy"
                        />
                        <div
                          className="absolute inset-0 rounded-full shadow-inner"
                          aria-hidden="true"
                        ></div>
                      </div>
                      <div>
                        <p className="font-semibold text-black">{user.login}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-ms font-semibold border">
                    {user.followers_url.length} Seguidores
                  </td>
                  <td className="px-4 py-3 text-ms font-semibold border">
                    {user.following_url.length} Seguindo
                  </td>
                  <td className="px-4 py-3 text-ms font-semibold border">
                    {user.repos_url.length} Repositórios
                  </td>
                  <td className="px-4 py-3 text-xs border">
                    <a
                      href={user.html_url}
                      target="_blank"
                      className="px-2 py-1 font-semibold leading-tight text-green-700 bg-green-100 rounded-sm"
                    >
                      {' '}
                      Ver conta{' '}
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  )
}

export default App
