import { Metadata } from "next";
import DynamicCreateForm from "@/app/[admin]/(manage)/manage-list/create/CreatePage";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Next.js Form Elements | TailAdmin - Next.js Dashboard Template",
    description: "This is Next.js Form Elements page for TailAdmin",
  };
}

export default function Page({ searchParams }: { searchParams: { [key: string]: string } }) {
  const query = searchParams.query;
  return (
    <div>
      <DynamicCreateForm query={query} />
    </div>
  );
}
