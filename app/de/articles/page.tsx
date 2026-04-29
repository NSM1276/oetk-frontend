import ArticlesArchive from "@/components/ArticlesArchive";

export const metadata = { title: "Artikel — ÖTK" };

export default async function ArticlesDePage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const { page } = await searchParams;
  const pageNum = Math.max(1, parseInt(page || "1", 10));
  return <ArticlesArchive lang="de" page={pageNum} />;
}
