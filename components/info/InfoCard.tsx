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
      className="border-none mx-8 py-4 bg-background/60 dark:bg-default-100/50 max-w-[300px] rounded-infoCard"
      shadow="md"
    >
      <CardBody className="flex flex-col justify-center items-center">
        <div className="text-3xl font-bold mb-3">{title}</div>
        <div className="text-center">{description}</div>
      </CardBody>
    </Card>
  );
}

export default InfoCard;
