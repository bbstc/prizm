import React, { useState, useEffect } from "react";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [usersPerPage] = useState(4);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortedField, setSortedField] = useState("");
  const [filterField, setFilterField] = useState("");
  const [filterValue, setFilterValue] = useState("");
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(users.length / usersPerPage); i++) {
    pageNumbers.push(i);
  }
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/users"
      );
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const sortUsers = (field) => {
    const sortedUsers = [...users].sort((a, b) => {
      if (a[field] < b[field]) return -1;
      if (a[field] > b[field]) return 1;
      return 0;
    });
    setUsers(sortedUsers);
    setSortedField(field);
  };

  const filterUsers = () => {
    if (filterValue && filterField) {
      const filteredUsers = users.filter((user) =>
        user[filterField].toLowerCase().includes(filterValue.toLowerCase())
      );
      setUsers(filteredUsers);
    }
  };

  const resetFilter = () => {
    setFilterField("");
    setFilterValue("");
    setCurrentPage(1);
    fetchUsers();
  };

  return (
    <div className="container">
      <h1>User Listing</h1>
      <div className="flex-row">
        <label htmlFor="sort">Sort:</label>
        <select
          id="sort"
          value={sortedField}
          onChange={(e) => sortUsers(e.target.value)}
        >
          <option value="">-- Select --</option>
          <option value="name">Name</option>
          <option value="email">Email</option>
          <option value="phone">Phone</option>
        </select>
      </div>
      <div className="flex-row">
        <label htmlFor="filterField">Filter:</label>
        <select
          id="filterField"
          value={filterField}
          onChange={(e) => setFilterField(e.target.value)}
        >
          <option value="">-- Select --</option>
          <option value="name">Name</option>
          <option value="email">Email</option>
          <option value="phone">Phone</option>
        </select>
        <input
          type="text"
          value={filterValue}
          onChange={(e) => setFilterValue(e.target.value)}
        />
        <div className="flex-btn">
          <button onClick={filterUsers}>Filter</button>
          <button onClick={resetFilter}>Reset</button>
        </div>
      </div>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
          </tr>
        </thead>
        <tbody>
          {currentUsers.map((user, index) => (
            <tr key={index}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.phone}</td>
            </tr>
          ))}
          <tr>
            <td colSpan={3}></td>
          </tr>
        </tbody>
      </table>
      <nav className="nav">
        <ul className="pagination">
          {pageNumbers.map((number) => (
            <li key={number} className={number === currentPage ? "active" : ""}>
              <a onClick={() => paginate(number)} href="#!">
                {number}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default UserList;
