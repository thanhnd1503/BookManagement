import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function BookDetails() {
  const BOOK_MANAGEMENT_API = "https://646f702909ff19b1208742ab.mockapi.io/api/books";
  const { bookId } = useParams();
  const [book, setBook] = useState([]);

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

  function getBooks() {
    window.location.href = "/";
  }

  function removeBook() {
    if (bookId) {
        axios
        .delete(`${BOOK_MANAGEMENT_API}/books/${bookId}`)
        .then(res => {
            alert(
                `Remove book ${JSON.stringify(
                  res.data
                )} successfully!!!`
              );
              <window className="location"></window>.href = "/";
        })
        .catch(err => {
          throw err;
        });
    }
  }

  return (
      <div>
          <h1 className="mb-4">Book Details</h1>
          <p><b>Id:</b> {book.id}</p>
          <p><b>Title:</b> {book.title}</p>
          <p><b>Quantity:</b> {book.quantity}</p>
          <button type="button" className="btn btn-primary mr-2" onClick={getBooks}>
              Back
          </button>
          <button type="button" className="btn btn-danger" onClick={removeBook}>
              Remove
          </button>
      </div>
    // <div>
    //   <h1>Book Details</h1>
    //   <p><b>Id:</b> {book.id}</p>
    //   <p><b>Title:</b> {book.title}</p>
    //   <p><b>Quantity:</b> {book.quantity}</p>
    //   <button type="button" onClick={getBooks}>
    //     Back
    //   </button>&nbsp;
    //   <button type="button" onClick={removeBook}>
    //     Remove
    //   </button>
    // </div>
  );
}

export default BookDetails;