"use client";

// import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

const GcashCard = () => {
  // const router = useRouter();
  const handleCheckout = async () => {
    const res = await fetch("https://api.paymongo.com/v1/payment_intents", {
      method: "POST",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
        authorization: "Basic " + process.env.AUTHORIZATION,
      },
      body: JSON.stringify({
        data: {
          attributes: {
            amount: 2000,
            payment_method_allowed: [
              "qrph",
              "card",
              "dob",
              "paymaya",
              "billease",
              "gcash",
              "grab_pay",
            ],
            payment_method_options: { card: { request_three_d_secure: "any" } },
            currency: "PHP",
            capture_type: "automatic",
          },
        },
      }),
    });

    const data = await res.json();
    console.log(data);
  };
  return (
    <Card>
      <CardHeader>
        <CardTitle>Pay with Gcash</CardTitle>
      </CardHeader>

      <CardContent>
        <button onClick={handleCheckout}> pay now</button>
      </CardContent>
    </Card>
  );
};

export default GcashCard;
