import ArticlesArchive from "@/components/ArticlesArchive";

export const metadata = { title: "Articles — ÖTK" };

export default async function ArticlesPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const { page } = await searchParams;
  const pageNum = Math.max(1, parseInt(page || "1", 10));
  return <ArticlesArchive lang="tg" page={pageNum} />;
}
