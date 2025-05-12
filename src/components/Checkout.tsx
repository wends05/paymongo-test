"use client";

import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { setCookie } from "@/actions/cookies";

const Checkout = () => {
  const router = useRouter();
  const handleCheckout = async () => {
    const res = await fetch("https://api.paymongo.com/v1/checkout_sessions", {
      method: "POST",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
        authorization: "Basic " + process.env.NEXT_PUBLIC_PAYMONGO_SECRET_KEY,
      },
      body: JSON.stringify({
        data: {
          attributes: {
            billing: {
              email: "cxnner05@gmail.com",
              phone: "09281815518",
              name: "Wendell",
            },
            send_email_receipt: true,
            show_description: false,
            show_line_items: true,
            success_url: "http://localhost:3000/success",
            cancel_url: "http://localhost:3000",
            line_items: [
              {
                currency: "PHP",
                amount: 120000,
                description: "iPhone 16 Pro Max",
                name: "Talong may gold",
                quantity: 1,
              },
            ],
            payment_method_types: ["card", "gcash", "paymaya"],
            statement_descriptor:
              "You have paid for an item from Wendell Inc. Thank you for shopping!",
          },
        },
      }),
    });

    const { data } = await res.json();
    console.log(data);

    console.log(data.id);
    await setCookie("checkout_session_id", data.id);

    router.push(data.attributes.checkout_url);
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
