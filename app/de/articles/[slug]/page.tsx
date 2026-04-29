import { getArticle } from "@/lib/joomla";
import { notFound } from "next/navigation";
import ArticleDetail from "@/components/ArticleDetail";

export default async function ArticlePageDe({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = await getArticle(slug);
  if (!article) notFound();

  return <ArticleDetail article={article} lang="de" />;
}
