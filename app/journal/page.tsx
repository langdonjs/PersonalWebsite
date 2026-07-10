import { redirect } from "next/navigation";

// The journal became "Writing" under Life.
export default function JournalRedirect() {
  redirect("/life/writing");
}
