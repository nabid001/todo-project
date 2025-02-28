import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
const Home = () => {
  return (
    <main className="home-container">
      <div className="box-container">
        <SignedIn>
          <UserButton />
        </SignedIn>
        <SignedOut>
          <SignInButton />
        </SignedOut>
        <h1>Welcome to Todo App</h1>
        <p>This is a simple Todo App using Next.js and Tailwind CSS.</p>
      </div>
    </main>
  );
};

export default Home;
