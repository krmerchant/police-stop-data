import { redirect } from "next/navigation";

export default function Home() {
  redirect("/presentation?slide=0");
}
