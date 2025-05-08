"use client";

import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

const Checkout = () => {
  const router = useRouter();
  const handleCheckout = async () => {
    const res = await fetch("https://api.paymongo.com/v1/checkout_sessions", {
      method: "POST",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
        authorization: "Basic " + process.env.AUTHORIZATION,
      },
      body: JSON.stringify({
        data: {
          attributes: {
            send_email_receipt: false,
            show_description: false,
            show_line_items: true,
            line_items: [
              {
                currency: "PHP",
                name: "sample_item",
                quantity: 1,
                amount: 10000,
                description: "mamamo",
              },
            ],
            payment_method_types: ["qrph", "card", "gcash", "grab_pay"],
          },
        },
      }),
    });

    const data = await res.json();
    console.log(data);

    router.push(data.data.attributes.checkout_url, {});
  };
  return (
    <Card>
      <CardHeader>
        <CardTitle>Checkout</CardTitle>
      </CardHeader>

      <CardContent>
        <button onClick={handleCheckout}> pay now</button>
      </CardContent>
    </Card>
  );
};

export default Checkout;
