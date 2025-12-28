import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";

import Home from "@/pages/Home";
import PlayToy from "@/pages/PlayToy";
import PlaySmall from "@/pages/PlaySmall";
import PlayBig from "@/pages/PlayBig";
import StoryReader from "@/pages/StoryReader";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/play/toy" component={PlayToy} />
      <Route path="/play/small" component={PlaySmall} />
      <Route path="/play/big" component={PlayBig} />
      <Route path="/story" component={StoryReader} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
