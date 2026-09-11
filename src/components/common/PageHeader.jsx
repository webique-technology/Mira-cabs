"use client";

import { PageContainer } from "../layout/PageContainer";

export const PageHeader = ({ title, description }) => {
  return (
    <section className="w-full bg-[url('/images/page-header.webp')] bg-cover bg-center bg-no-repeat overlay-count">
      <div className="h-[573px] flex items-center justify-center">
        <PageContainer className="relative z-1 flex flex-col items-center justify-center">
          <h2 className="text-6xl font-bold text-white mb-2">{title}</h2>
          <p className="text-lg text-white">{description}</p>
        </PageContainer>
      </div>
    </section>
  );
};
