import { useState, useEffect } from 'react'
import Search from './components/SearchHeader'
import getUsers from './utilities/UserDataUtility'
import Table from './components/Table'
import * as Bootstrap from 'react-bootstrap'
import Pagination from './components/Pagination'

function App() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(false)
  const [filteredUsers, setFilteredUsers] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [usersPerPage] = useState(10)
  const [update, setUpdate] = useState(false)

  useEffect(() => {
    setLoading(true)
    getUsers(setUsers)
    setLoading(false)
  }, [])

  if (loading) {
    return <h2>Loading Data...</h2>
  }
  //Search Users
  const performSearch = async (value) => {
    try {
      getUsers(setFilteredUsers)
      if (value === '') {
        setUsers(users)
      } else {
        const data = filteredUsers.filter(
          (user) =>
            user.role.toLowerCase().includes(value.toLowerCase()) ||
            user.name.toLowerCase().includes(value.toLowerCase()) ||
            user.email.toLowerCase().includes(value.toLowerCase())
        )
        setUsers(data)
      }
    } catch (err) {
      console.log(err)
    }
  }

  //Get Users
  const indexOfLastUser = currentPage * usersPerPage
  const indexOfFirstUser = indexOfLastUser - usersPerPage
  const currentUser = users.slice(indexOfFirstUser, indexOfLastUser)

  //Change Page
  const paginate = (pageNumber) => setCurrentPage(pageNumber)

  //Checkbox all
  const handleChange = (e) => {
    const listedUserIds = users
      .slice(indexOfFirstUser, indexOfLastUser)
      .map((user) => user.id)

    let tempUsers = users.map((user) => {
      if (listedUserIds.includes(user.id)) {
        user.selected = e.target.checked
        return user
      }
      return user
    })
    setUsers(tempUsers)
    setUpdate(!update)
  }
  //Delete Selected
  const deleteSelected = () => {
    if (window.confirm('Selected users will be deleted')) {
      setUsers((prevState) => prevState.filter((user) => !user.selected))
    }
  }
  //Delete Single
  const deleteUser = (id) => {
    let tempUsers = users.filter((user) => user.id !== id)
    setUsers(tempUsers)
    setUpdate((prevState) => !prevState)
  }
  //Select Single User
  const selectOne = (id) => {
    let tempUsers = users
    const index = tempUsers.findIndex((user) => user.id === id)
    tempUsers[index].selected = !tempUsers[index].selected
    setUsers(tempUsers)
    setUpdate((prevState) => !prevState)
  }
  //Save user
  const saveUser = (formData) => {
    let tempUsers = users;
    console.log(formData);
    const index = tempUsers.findIndex((user) => user.id === formData.id);
    tempUsers[index].name = formData.name;
    tempUsers[index].email = formData.email;
    tempUsers[index].role = formData.role;
    setUsers(tempUsers);
    setUpdate((prevState) => !prevState);
  };

  return (
    <div className="App">
      <Search performSearch={performSearch} />
      <Table
        users={currentUser}
        handleChange={handleChange}
        deleteUser={deleteUser}
        selectOne={selectOne}
        saveUser={saveUser}
      />
      <div className="d-flex justify-content-between">
        <Bootstrap.Button
          variant="danger"
          className="mx-3 my-3"
          size="sm"
          onClick={deleteSelected}
        >
          Delete Selected
        </Bootstrap.Button>
        <div className="mx-5 my-2">
          <Pagination
            usersPerPage={usersPerPage}
            totalUsers={users.length}
            paginate={paginate}
          />
        </div>
      </div>
    </div>
  )
}

export default App
