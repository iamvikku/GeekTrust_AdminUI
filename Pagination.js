import React from 'react'
import Button from 'react-bootstrap/Button'
const Pagination = ({ usersPerPage, totalUsers, paginate }) => {
  const pageNumber = [];
  for (let number = 1; number <= Math.ceil(totalUsers / usersPerPage); number++) {
    pageNumber.push(number);
  }
  return (
    <div>
      <ul className="pagination">
        {pageNumber.map(page => (
          <li key={page} className="page-item">
            <Button onClick={() => paginate(page)} className="page-link">{page}</Button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Pagination
