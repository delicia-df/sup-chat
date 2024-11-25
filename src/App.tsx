import { useAuth } from "@/contexts/auth-context";
import { LoginPage } from "@/pages/login";
import { ChatApp } from "@/components/chat-app";

function App() {
  const { session } = useAuth();

  if (!session) {
    return <LoginPage />;
  }

  return <ChatApp />;
}

export default App;