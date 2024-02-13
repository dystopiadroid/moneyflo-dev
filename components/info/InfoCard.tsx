import { Card, CardBody } from "@nextui-org/card";
import React from "react";

function InfoCard({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <Card
      isBlurred
      className="border-none mx-8 py-4 dark:bg-border max-w-[300px] rounded-infoCard"
      shadow="md"
    >
      <CardBody className="flex flex-col justify-center items-center text-card-foreground">
        <div className="text-3xl font-bold mb-3">{title}</div>
        <div className="text-center">{description}</div>
      </CardBody>
    </Card>
  );
}

export default InfoCard;
