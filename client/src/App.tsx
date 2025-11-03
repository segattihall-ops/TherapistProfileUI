import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient.ts";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "./components/ui/toaster.tsx";
import { TooltipProvider } from "./components/ui/tooltip.tsx";
import { Layout } from "./components/Layout.tsx";
import NotFound from "./pages/not-found.tsx";
import TherapistProfile from "./pages/therapist-profile.tsx";

function Router() {
  return (
    <Switch>
      <Route path="/" component={() => <TherapistProfile therapistId="bruno-massage-therapist" />} />
      <Route path="/therapist/:id">
        {(params) => <TherapistProfile therapistId={params.id} />}
      </Route>
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <div className="dark">
          <Toaster />
          <Layout>
            <Router />
          </Layout>
        </div>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
