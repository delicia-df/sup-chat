import { cn } from "@/lib/utils";
import { Avatar } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Bot, User } from "lucide-react";

interface TableData {
  headers: string[];
  rows: string[][];
}

interface ChatMessageProps {
  content: string;
  role: "assistant" | "user";
  timestamp: string;
  table?: TableData;
}

function MessageTable({ data }: { data: TableData }) {
  return (
    <div className="rounded-md border bg-background">
      <Table>
        <TableHeader>
          <TableRow>
            {data.headers.map((header, index) => (
              <TableHead key={index}>{header}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.rows.map((row, rowIndex) => (
            <TableRow key={rowIndex}>
              {row.map((cell, cellIndex) => (
                <TableCell key={cellIndex}>{cell}</TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export function ChatMessage({ content, role, timestamp, table }: ChatMessageProps) {
  const isBot = role === "assistant";

  return (
    <div className={cn(
      "flex gap-3",
      isBot ? "justify-start" : "justify-end"
    )}>
      {isBot && (
        <Avatar className="h-8 w-8 bg-primary">
          <Bot className="h-4 w-4 text-primary-foreground" />
        </Avatar>
      )}
      <div className={cn(
        "flex flex-col gap-2 max-w-[80%]",
        !isBot && "items-end"
      )}>
        <Card className={cn(
          "px-4 py-3",
          isBot ? "bg-muted" : "bg-primary text-primary-foreground"
        )}>
          <p className="text-sm whitespace-pre-wrap">{content}</p>
          {table && (
            <div className="mt-3">
              <MessageTable data={table} />
            </div>
          )}
          <span className="block mt-1 text-[10px] opacity-50">{timestamp}</span>
        </Card>
      </div>
      {!isBot && (
        <Avatar className="h-8 w-8 bg-muted">
          <User className="h-4 w-4" />
        </Avatar>
      )}
    </div>
  );
}