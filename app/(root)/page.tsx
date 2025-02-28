import { UserButton } from "@clerk/nextjs";
import React from "react";

const Home = () => {
  return (
    <main className="home-container">
      <div className="box-container">
        <UserButton />
        <h1>Welcome to Todo App</h1>
        <p>This is a simple Todo App using Next.js and Tailwind CSS.</p>
      </div>
    </main>
  );
};

export default Home;
