// import { redirect } from "next/navigation";
import * as repo from "@/utilities/repository.js";

export default async function Accounts() {
  // repo
  const accounts = await repo.readAccounts();

  // fetch

  // redirect("index.html");

  return <h2>Accounts</h2>;
}
