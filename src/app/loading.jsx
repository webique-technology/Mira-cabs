import { Skeleton } from "@/components/ui/skeleton";
import { PageContainer } from "@/components/layout/PageContainer";

export default function RootLoading() {
  return (
    <PageContainer className="py-16">
      <div className="flex flex-col gap-4">
        <Skeleton className="h-8 w-1/3" />
        <Skeleton className="h-4 w-1/2" />
        <Skeleton className="mt-6 h-64 w-full" />
      </div>
    </PageContainer>
  );
}
