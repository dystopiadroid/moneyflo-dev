import React from "react";
import GoogleSignInButton from "../buttons/GoogleSignInButton";

function WelcomePage() {
  return (
    <div className="flex flex-col justify-center items-center">
      <div className="typing-demo font-mono text-7xl font-bold mb-14">
        Start Tracking your finances
      </div>
      <div className="flex justify-center items-center">
        <span className="text-4xl">Get Started </span>
        <GoogleSignInButton />
      </div>
    </div>
  );
}

export default WelcomePage;
