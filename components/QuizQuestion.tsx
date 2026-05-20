import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type QuizQuestionProps = {
  title: string;
  children: ReactNode;
  className?: string;
};

export function QuizQuestion({ title, children, className }: QuizQuestionProps) {
  return (
    <div className={cn("space-y-6", className)}>
      <h1 className="font-fraunces text-2xl font-semibold leading-tight text-madera sm:text-3xl">
        {title}
      </h1>
      <div className="space-y-3">{children}</div>
    </div>
  );
}
