import React from "react";
import GoogleSignInButton from "../buttons/GoogleSignInButton";
import InfoCard from "../info/InfoCard";
import { Divider } from "@nextui-org/divider";
import { infoContent } from "@/utils/content";

function WelcomePage() {
  return (
    <div
      id="content"
      className="flex flex-col justify-center items-center h-full"
    >
      <div
        id="welcome-message"
        className="flex flex-col justify-center items-center relative bottom-40"
      >
        <div className="w-welcomeMsg animate-typing overflow-hidden border-r-3 whitespace-nowrap font-mono text-7xl font-bold mb-14">
          Start Tracking your finances
        </div>
        <div className="flex justify-center items-center">
          <span className="text-4xl">Get Started </span>
          <GoogleSignInButton />
        </div>
      </div>
      <Divider className="absolute" />
      <div
        id="info-cards"
        className="flex justify-center items-center h-infoCard absolute bottom-20 opacity-90"
      >
        {infoContent.map((info) => {
          return (
            <InfoCard
              key={info.title}
              title={info.title}
              description={info.description}
            />
          );
        })}
      </div>
    </div>
  );
}

export default WelcomePage;
