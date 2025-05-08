import Checkout from "@/components/Checkout";
import GcashCard from "@/components/GcashCard";
import OnlineCard from "@/components/OnlineCard";

export default function Home() {
  return (
    <div className="flex p-20 w-screen gap-20 items-center justify-center h-screen">
      <GcashCard />
      <OnlineCard />
      <Checkout />
    </div>
  );
}
