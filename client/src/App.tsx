import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Home from "@/pages/home";
import IlProtocollo from "@/pages/il-protocollo";
import Solari from "@/pages/solari";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/il-protocollo" component={IlProtocollo} />
      <Route path="/solari" component={Solari} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <div className="dark">
          <Toaster />
          <Router />
        </div>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
