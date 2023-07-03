import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function BookEdit() {
  const BOOK_MANAGEMENT_API = "https://646f702909ff19b1208742ab.mockapi.io/api/books";
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
      .put(`${BOOK_MANAGEMENT_API}/books/${bookId}`, book)
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

  function getBooks() {
    window.location.href = "/";
  }

  return (
    <div>
      <h1 className="text-center">Book Edit</h1>
      <form>
        <div className="mb-3">
          <label htmlFor="Id" className="form-label">ID</label>
          <input readOnly
              type="text"
              className="form-control"
              id="Id"
              value={book.id || ""}
              aria-describedby="emailHelp"
          />
            <div id="emailHelp" className="form-text">This is ID of book you want to edit !</div>
        </div>
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
          <button type="button" className="btn btn-primary" onClick={getBooks}>
            Back
          </button>&nbsp;
          <button type="button" className="btn  btn-success" onClick={handleSubmit}>
            Edit
          </button>
      </form>
    </div>
  );
}

export default BookEdit;