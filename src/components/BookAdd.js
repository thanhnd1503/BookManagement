import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function BookAdd() {
  const BOOK_MANAGEMENT_API = "https://646f702909ff19b1208742ab.mockapi.io/api/books/";
  const { bookId } = useParams();
  const isCreate = !bookId;
  const [book, setBook] = useState({});

  useEffect(() => {
    if (bookId) {
      axios
      .get(`${BOOK_MANAGEMENT_API}/books/${bookId}`)
      .then(res => {
          setBook(res.data);
      })
      .catch(err => {
        throw err;
      });
    }
  }, [bookId]);

  function handleChange(event) {
    setBook({
      ...book,
      [event.target.name]: event.target.value
    });
  }

  function handleSubmit() {
    axios
      .post(`${BOOK_MANAGEMENT_API}/books`, book)
      .then(res => {
        alert(
          `${isCreate ? "Create" : "Edit"} book ${JSON.stringify(
            res.data
          )} successfully!!!`
        );
        window.location.href = "/";
      })
      .catch(err => {
        throw err;
      });
  }

  return (
    <div>
      <h1>Book Add</h1>
      <form>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">Title</label>
          <input
              name={"title"}
              type="text"
              className="form-control"
              id="title"
              value={book.title || ""}
              onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="quantity" className="form-label">Quantity</label>
          <input
              name={"quantity"}
              type="text"
              className="form-control"
              id="quantity"
              value={book.quantity || ""}
              onChange={handleChange}
          />
        </div>
        <button type="button" className="btn btn-primary" onClick={handleSubmit}>
          Add
        </button>
      </form>
    </div>
  );
}

export default BookAdd;