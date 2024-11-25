import { useEffect, useRef } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChatMessage } from "@/components/chat-message";
import { ChatInput } from "@/components/chat-input";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { Bot, LogOut } from "lucide-react";
import { useAuth } from "@/contexts/auth-context";

interface TableData {
  headers: string[];
  rows: string[][];
}

interface Message {
  id: string;
  content: string;
  role: "assistant" | "user";
  timestamp: string;
  table?: TableData;
}

const initialMessages: Message[] = [
  {
    id: "1",
    content: "Hello! I can help you with data visualization. Here's a sample table:",
    role: "assistant",
    timestamp: new Date().toLocaleTimeString(),
    table: {
      headers: ["Name", "Role", "Department"],
      rows: [
        ["John Doe", "Developer", "Engineering"],
        ["Jane Smith", "Designer", "Design"],
        ["Mike Johnson", "Manager", "Operations"]
      ]
    }
  },
];

export function ChatApp() {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [isTyping, setIsTyping] = useState(false);
  const { signOut, user } = useAuth();
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = async (content: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      content,
      role: "user",
      timestamp: new Date().toLocaleTimeString(),
    };
    setMessages((prev) => [...prev, userMessage]);
    
    setIsTyping(true);
    setTimeout(() => {
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: "Here's a sample response with a data table:",
        role: "assistant",
        timestamp: new Date().toLocaleTimeString(),
        table: {
          headers: ["Product", "Price", "Stock"],
          rows: [
            ["Laptop", "$999", "15"],
            ["Phone", "$599", "25"],
            ["Tablet", "$399", "10"]
          ]
        }
      };
      setMessages((prev) => [...prev, botMessage]);
      setIsTyping(false);
    }, 1000);
  };

  return (
    <div className="flex flex-col h-screen bg-background">
      <header className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center gap-2">
          <Bot className="h-6 w-6" />
          <h1 className="text-xl font-semibold">AI Assistant</h1>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">
            {user?.email}
          </span>
          <ThemeToggle />
          <Button variant="ghost" size="icon" onClick={signOut}>
            <LogOut className="h-4 w-4" />
          </Button>
        </div>
      </header>

      <div className="flex-1 overflow-hidden">
        <div 
          ref={scrollAreaRef}
          className="h-full overflow-y-auto px-4 md:px-8 lg:px-12"
        >
          <div className="max-w-3xl mx-auto">
            <div className="flex flex-col gap-4 py-4">
              {messages.map((message) => (
                <ChatMessage key={message.id} {...message} />
              ))}
              {isTyping && (
                <div className="flex gap-2 p-4 text-sm text-muted-foreground">
                  <Bot className="h-4 w-4 animate-pulse" />
                  AI is typing...
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="border-t">
        <div className="max-w-3xl mx-auto">
          <ChatInput onSend={handleSend} disabled={isTyping} />
        </div>
      </div>
    </div>
  );
}