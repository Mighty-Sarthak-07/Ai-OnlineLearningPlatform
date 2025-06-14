import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/nextjs";

export default function Home() {
  return (
    <div className="items-center justify-center flex ">
     <h1>Hello</h1>
     <Button>Hello</Button>
     <UserButton/>
    </div>
  );
}
