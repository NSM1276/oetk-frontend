import ArticlesArchive from "@/components/ArticlesArchive";

export const metadata = { title: "Статьи — ÖTK" };

export default async function ArticlesRuPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const { page } = await searchParams;
  const pageNum = Math.max(1, parseInt(page || "1", 10));
  return <ArticlesArchive lang="ru" page={pageNum} />;
}
