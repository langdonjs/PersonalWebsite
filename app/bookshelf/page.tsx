import { redirect } from "next/navigation";

// Bookshelf now lives under Life.
export default function BookshelfRedirect() {
  redirect("/life/bookshelf");
}
