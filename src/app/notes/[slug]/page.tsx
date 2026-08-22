import { redirect } from "next/navigation";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function NotesSlugRedirect({ params }: PageProps) {
  const { slug } = await params;
  redirect(`/subjects/machine-learning/${slug}`);
}
