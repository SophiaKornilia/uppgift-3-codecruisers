import { useEffect, useState } from "react";
import { useUser } from "../context/UserContext";
import { Link } from "react-router-dom";
interface IBook {
  title: string;
  author: string;
  text: string;
  levelId: number;
}

export const MyPage = () => {
  const { user } = useUser();

  const [loggedinUser, setLoggedinUser] = useState<string | null>(null);
  const [books, setBooks] = useState<IBook[]>([]);
  const [unavailableBooks, setUnavailableBooks] = useState<IBook[]>([]);

  useEffect(() => {
    if (user) {
      setLoggedinUser(user);
    }
  }, [user]);

  console.log("MySubscriptions", user, "loggedin", loggedinUser);

  const url = "http://localhost:3000/api/content/subBooks";
  const url2 = "http://localhost:3000/api/content/noAccess";

  useEffect(() => {
    const getSubscriptionBooks = async () => {
      if (!loggedinUser) return;

      try {
        const result = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user: loggedinUser,
          }),
        });
        const resultData = await result.json();
        console.log("Fetched data", resultData.books);

        if (Array.isArray(resultData.books)) {
          setBooks(resultData.books);
          console.log("Connection worked", resultData.books);
        } else {
          console.error("Unexpected data format:", resultData);
        }
      } catch (error) {
        console.error("Fetch error:", error);
        alert("Something went wrong!");
      }
    };

    getSubscriptionBooks();
  }, [loggedinUser]);

  useEffect(() => {
    const getNoAccessBooks = async () => {
      if (!loggedinUser) return;

      try {
        const response = await fetch(url2, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user: loggedinUser,
          }),
        });
        const responseData = await response.json();
        console.log("Fetched data", responseData.unavailableBooks);

        if (Array.isArray(responseData.unavailableBooks)) {
          setUnavailableBooks(responseData.unavailableBooks);
          console.log("Connection worked", responseData.unavailableBooks);
        } else {
          console.error("Unexpected data format:", responseData);
        }
      } catch (error) {
        console.error("Fetch error:", error);
        alert("Something went wrong!");
      }
    };

    getNoAccessBooks();
  }, [loggedinUser]);

  return (
    <div>
      <div>
        <h2>My Book Shelf</h2>
      </div>
      {books.map((book) => (
        <div key={book.title}>
          <h3>{book.title}</h3>
          <h4>{book.author}</h4>
          <p>{book.text}</p>
        </div>
      ))}
      <div>
        <h2>Want to read more?</h2>
      </div>
      {unavailableBooks.map((unavailableBook) => (
        <div key={unavailableBook.title}>
          <h3>
            
            <Link to={`/MySubscriptions?levelId=${unavailableBook.levelId}`} state={{ fromLink: true }}>
              {unavailableBook.title}
            </Link>
          </h3>
        </div>
      ))}
    </div>
  );
};
