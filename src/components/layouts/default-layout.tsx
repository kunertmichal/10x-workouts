import { cn } from "@/lib/utils";
import React from "react";

interface DefaultLayoutProps {
  children: React.ReactNode;
  header?: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
  footerClassName?: string;
}

export function DefaultLayout({
  children,
  header,
  footer,
  className,
  footerClassName,
}: DefaultLayoutProps) {
  return (
    <div className={cn("flex flex-1 flex-col pt-6", className)}>
      <header className="mb-6 px-4">{header}</header>

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
