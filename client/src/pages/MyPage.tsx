import { useEffect, useState } from "react";
import { useUser } from "../context/UserContext";
interface IBook {
  title: string;
  author: string;
  text: string;
}

export const MyPage = () => {
  const { user } = useUser();

  const [loggedinUser, setLoggedinUser] = useState<string | null>(null);
  // const [userId, setUserId] = useState<string | null>(null);
  const [books, setBooks] = useState<IBook[]>([]);

  useEffect(() => {
    if (user) {
      setLoggedinUser(user);
    }
  }, [user]);

  console.log("MySubscriptions", user, "loggedin", loggedinUser);

  const url = "http://localhost:3000/api/content/subBooks";

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
        console.log("Fetched data", resultData);

        if (Array.isArray(resultData)) {
          setBooks(resultData);
        } else if (resultData.isASubscriber) {
          setBooks([resultData]);
          console.log("Connection worked", resultData);
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

  return (
    <div>
      <div>
        <h2>My page</h2>
        {user ? (
          <h3>You are logged in as {user} </h3>
        ) : (
          <h3>Login to see my page</h3>
        )}
      </div>
      {books.map((book) => (
        <div key={book.title}>
          <h3>Title:{book.title}</h3>
          <h3>{book.author}</h3>
          <h3>{book.text}</h3>
        </div>
      ))}
    </div>
  );
};
