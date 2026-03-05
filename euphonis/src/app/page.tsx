// import Image from "next/image";
"use client";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
export default function Home() {
  return (
    <Button variant="destructive" onClick={() => toast.success("Button pressed")}>
      Click me!
    </Button>
  );
}