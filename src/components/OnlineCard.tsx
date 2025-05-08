import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

const OnlineCard = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Pay with Gcash</CardTitle>
      </CardHeader>

      <CardContent>
        <button> pay now</button>
      </CardContent>
    </Card>
  );
};

export default OnlineCard;
