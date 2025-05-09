import { cn } from "@/lib/utils";
import React from "react";

interface PageWithStickyFooterProps {
  children: React.ReactNode;
  renderHeader: () => React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
  footerClassName?: string;
}

export function PageWithStickyFooter({
  children,
  renderHeader,
  footer,
  className,
  footerClassName,
}: PageWithStickyFooterProps) {
  return (
    <div className={cn("flex flex-1 flex-col pt-6", className)}>
      <header className="mb-6 px-4">{renderHeader()}</header>

      <main className="flex-1 overflow-y-auto pb-4 px-4">{children}</main>

      {footer && (
        <footer
          className={cn(
            "sticky bottom-0 left-0 right-0 border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60",
            "p-4",
            footerClassName
          )}
        >
          {footer}
        </footer>
      )}
    </div>
  );
}
