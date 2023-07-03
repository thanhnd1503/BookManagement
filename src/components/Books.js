import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";


function Books() {
    const BOOK_MANAGEMENT_API = "https://646f702909ff19b1208742ab.mockapi.io/api/books";
    const { bookId } = useParams();
    const [books, setBooks] = useState([]);

    useEffect(() => {
        axios
            .get(`${BOOK_MANAGEMENT_API}/books`)
            .then(res => {
                setBooks(res.data);
            })
            .catch(err => {
                throw err;
            });
    }, [books, bookId]);

    function handleCreate() {
        window.location.href = "/book/add";
    }

    return (
        <div>
            <div class="d-flex bd-highlight">
                <h1 className="p-2 w-100 bd-highlight text-center">Book List</h1>
                <div className="btn-group p-2 flex-shrink-1 bd-highlight" role="group" aria-label="Basic example">
                    <button type="button" className="btn btn-primary" onClick={handleCreate}>
                        Create new book
                    </button>
                </div>
            </div>
            <table className="table" border={1}>
                <thead>
                <tr>
                    <th>Id</th>
                    <th>Title</th>
                    <th>Quantity</th>
                    <th colSpan={2} >
                        <div className={"text-center"}>
                            Action
                        </div>
                    </th>
                </tr>
                </thead>
                <tbody>
                {books.map(book => (
                    <tr key={book.id}>
                        <td>{book.id} </td>
                        <td>{book.title} </td>
                        <td>{book.quantity} </td>
                        <div className="d-flex justify-content-evenly">
                            <td>
                                <button type="button" className="btn btn-outline-primary" onClick={() => window.location.href=`/book/${book.id}`}>
                                    Details
                                </button>
                            </td>
                            <td>
                                <button type="button" className="btn btn-danger" onClick={() => window.location.href=`/book/edit/${book.id}`}>
                                    Edit
                                </button>
                            </td>
                        </div>

                    </tr>
                ))}
                </tbody>
            </table>
        </div>
        );
}

export default Books;

