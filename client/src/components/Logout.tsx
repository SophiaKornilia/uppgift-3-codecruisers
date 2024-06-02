export const Logout = () => {
  const url = "http://localhost:3000/Logout";
  const successUrl = "/";
  const handleLogout = async () => {
    try {
      const result = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const resultData = await result.json();
      if (!resultData.isLoggedIn) {
        document.location.href = successUrl;
        console.log("You are now logged out");
      } else {
        alert("Unable to log out!");
        console.log("couldn´t sign out");
      }
    } catch (error) {
      console.error("Something went wrong", error);
    }
  };
  return (
    <div>
      <button onClick={handleLogout}>Log out</button>
    </div>
  );
};
