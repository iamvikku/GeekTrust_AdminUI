import React from 'react'

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
            <a onClick={() => paginate(page)} href="!#" className="page-link">{page}</a>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Pagination
