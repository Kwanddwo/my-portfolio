import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface QuickReferenceProps {
  title: string;
  icon?: LucideIcon;
  items: {
    term: string;
    description: string;
  }[];
}

export function QuickReference({
  title,
  icon: Icon,
  items,
}: QuickReferenceProps) {
  return (
    <Card className="my-6 border-primary/20 bg-primary/5">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          {Icon && <Icon className="h-5 w-5 text-primary" />}
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <dl className="space-y-4">
          {items.map((item, index) => (
            <div key={index}>
              <dt className="font-semibold text-sm mb-1">{item.term}</dt>
              <dd className="text-sm text-muted-foreground">
                {item.description}
              </dd>
            </div>
          ))}
        </dl>
      </CardContent>
    </Card>
  );
}
