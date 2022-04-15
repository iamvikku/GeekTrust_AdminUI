import React, { useState } from 'react'
import * as Bootstrap from "react-bootstrap"

const Search = ({ performSearch }) => {
  const [debounceTimeout, setDebounceTimeout] = useState(null);
  const debounceSearch = (event, debounceTimeout) => {
    const value = event.target.value;

    if (debounceTimeout) {
      clearTimeout(debounceTimeout);
    }
    const timeout = setTimeout(async () => {
      await performSearch(value);
    }, 200);
    setDebounceTimeout(timeout);
  };

  return (
    <Bootstrap.Navbar bg="light" expand="lg">
      <Bootstrap.Container fluid>
        <Bootstrap.Form className="input-group">
          <Bootstrap.FormControl
            type="search"
            placeholder="Search by name, email or role"
            className="me-2"
            aria-label="Search"
            onChange={(event) => debounceSearch(event, debounceTimeout)}
          />
        </Bootstrap.Form>
      </Bootstrap.Container>
    </Bootstrap.Navbar>
  )
}

export default Search
