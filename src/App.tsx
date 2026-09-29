import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toaster";
import { Router as WouterRouter } from "wouter";
import AppRouter from "@/routes/AppRouter";

function App() {
  return (
    <TooltipProvider>
      <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
        <AppRouter />
      </WouterRouter>
      <Toaster />
    </TooltipProvider>
  );
}

export default App;
