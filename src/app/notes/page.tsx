import { redirect } from "next/navigation";

export default function NotesIndexRedirect() {
  redirect("/subjects/machine-learning");
}
