import Link from "next/link";
import * as Icons from "lucide-react";
import { ArrowRight } from "lucide-react";
import { Card, Badge } from "@/components/ui/primitives";
import type { ToolMeta } from "@/lib/tools/registry";

function ToolIcon({ name }: { name: string }) {
  const IconComponent = (Icons as unknown as Record<string, Icons.LucideIcon>)[name] ?? Icons.Wrench;
  return <IconComponent className="h-5 w-5" />;
}

export function ToolCard({ tool }: { tool: ToolMeta }) {
  return (
    <Link href={`/tools/${tool.slug}`} className="group block h-full">
      <Card className="flex h-full flex-col gap-3 p-5 transition-shadow hover:shadow-md">
        <div className="flex items-center justify-between">
          <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">
            <ToolIcon name={tool.icon} />
          </span>
          <div className="flex gap-1.5">
            {tool.type === "local" && <Badge>Free</Badge>}
            {tool.type === "ai" && (
              <Badge className="bg-violet-100 dark:bg-violet-500/10 text-violet-700 dark:text-violet-300">
                AI
              </Badge>
            )}
          </div>
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400">
            {tool.name}
          </h3>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{tool.description}</p>
        </div>
        <div className="flex items-center gap-1 text-sm font-medium text-indigo-600 dark:text-indigo-400">
          Try it <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
        </div>
      </Card>
    </Link>
  );
}
