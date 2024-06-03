import { useState } from "react";
import "../style/Admin.css";
export const Admin = () => {
  const url = "http://localhost:3000/api/content";
  const successUrl = "http://localhost:5173/SuccessfullyAddedBook";

  const [title, setTitle] = useState<string>();
  const [author, setAuthor] = useState<string>();
  const [text, setText] = useState<string>();
  const [levelId, setLevelId] = useState<string>();

  const handleTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleAuthor = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAuthor(e.target.value);
  };

  const handleText = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  const handleLevelId = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLevelId(e.target.value);
  };

  const handleClick = async () => {
    console.log(levelId);

    if (!title || !author || !text || !levelId) {
      console.log("You must fill in all the inputs");
      alert("Please fill in all required fields before registering");
      return;
    }

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: title,
          author: author,
          text: text,
          levelId: levelId,
        }),
      });
      const data = await response.json();
      console.log(data);

      if (data.isAdded) {
        console.log("User is registered");
        document.location.href = successUrl;
      }
    } catch (error) {
      console.error("Something went wrong", error);
    }
  };

  return (
    <div className="container">
      <div className="form-container">
        <div>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            name="title"
            id="title"
            onChange={handleTitle}
            value={title}
            required
          />
        </div>
        <div>
          <label htmlFor="author">Author</label>
          <input
            type="text"
            name="author"
            id="author"
            onChange={handleAuthor}
            value={author}
            required
          />
        </div>
        <div>
          <label htmlFor="text">Text</label>
          <input
            type="text"
            name="text"
            id="text"
            onChange={handleText}
            value={text}
            required
          />
        </div>
        <div className="radio-group">
          <h5>Choose subscriptionlevel on the book</h5>
          <div className="radio-box">
            <input
              type="radio"
              name="levelId"
              id="levelId1"
              onChange={handleLevelId}
              value={1}
            />
            <label htmlFor="levelId1">Muggle Magic Section</label>
          </div>
          <div className="radio-box">
            <input
              type="radio"
              name="levelId"
              id="levelId2"
              onChange={handleLevelId}
              value={2}
            />
            <label htmlFor="levelId2">Muggle Magic Section</label>
          </div>
          <div className="radio-box">
            <input
              type="radio"
              name="levelId"
              id="levelId3"
              onChange={handleLevelId}
              value={3}
            />
            <label htmlFor="levelId3">The Forbidden Archives</label>
          </div>
        </div>
        <button onClick={handleClick}>Create book</button>
      </div>
    </div>
  );
};
