import { Card, CardContent } from "@/components/ui/card";
import { cookies } from "next/headers";
import Link from "next/link";
import React from "react";

interface Item {
  amount: number;
  currency: string;
  description: string;
  name: string;
  quantity: number;
  images: [];
}

const Page = async () => {
  const cookieStore = await cookies();
  const recentSessionId = cookieStore.get("checkout_session_id");
  const sessionId = recentSessionId?.value;

  if (!sessionId) {
    return (
      <div>
        <h1>Session ID not found.</h1>
        <p>
          This may be due to the fact that you have not completed the checkout
          process. Please try again.
        </p>
        <button>
          <Link href="/">Home</Link>
        </button>
      </div>
    );
  }

  const url = "https://api.paymongo.com/v1/checkout_sessions/" + sessionId;

  const checkoutFetch = await fetch(url, {
    method: "GET",
    headers: {
      accept: "application/json",
      "Content-Type": "application/json",
      authorization: "Basic " + process.env.NEXT_PUBLIC_PAYMONGO_SECRET_KEY,
    },
  });

  const { data } = await checkoutFetch.json();
  console.log(data.attributes.payments);
  console.log(data.attributes.payments[0].attributes.status);

  // items
  console.log(data.attributes.line_items);

  const line_items: Item[] = data.attributes.line_items;

  return (
    <div className="flex flex-col p-10 h-screen items-start gap-5">
      <div>
        Success Page
        <h1>Return to home page</h1>
        <button className="shadow-md px-3 py-1 rounded-md">
          <Link href="/">Home</Link>
        </button>
      </div>

      <p>
        {data.attributes.payments[0].attributes.status === "paid"
          ? "Payment was successful"
          : "Payment was not successful"}
      </p>
      <ul>
        {line_items.map((item, idx) => {
          return (
            <Card key={idx}>
              <CardContent>
                <li>
                  <h3>
                    {item.name} x {item.quantity}
                  </h3>
                  <p>{item.description}</p>
                  <p>
                    {item.currency}{" "}
                    {new Intl.NumberFormat("en-PH").format(item.amount)}
                  </p>
                </li>
              </CardContent>
            </Card>
          );
        })}
      </ul>
    </div>
  );
};

export default Page;
