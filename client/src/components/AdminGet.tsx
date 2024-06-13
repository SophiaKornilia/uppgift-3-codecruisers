import { useState, useEffect } from "react";

interface IBooks {
  bookId: number;
  title: string;
  author: string;
  text: string;
  levelId: number;
}

export const AdminGet = () => {
  const url = "http://localhost:3000/api/content/"; 

  const [books, setBooks] = useState<IBooks[]>([]); 

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        if (Array.isArray(data.books)) {
          setBooks(data.books); 
        } else {
          console.error("Returned data is not an array:", data);
        }
      } catch (error) {
        console.error("Something went wrong", error);
      }
    };

    fetchBooks();
  }, []); 

  return (
    <div className="mypage">
     
      <h2>Book List</h2>
      <ul>
        {books.map((book) => (
          <li key={book.bookId} className="content">
            <h3>{book.title}</h3>
            <p>Author: {book.author}</p>
            <p>{book.text}</p>
            <p>Level ID: {book.levelId}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};
