"use client";

import { useGlobalSearch } from "@/hooks/use-global-search";
import SimpleSearchModal from "@/components/simple-search-modal";

interface LayoutWithSearchProps {
  children: React.ReactNode;
}

export default function LayoutWithSearch({ children }: LayoutWithSearchProps) {
  const { isOpen, setIsOpen } = useGlobalSearch();

  return (
    <>
      {children}
      <SimpleSearchModal open={isOpen} onOpenChange={setIsOpen} />
    </>
  );
}
