import { Route, Switch, useLocation } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import AppShell from "./components/app-shell/AppShell";
import PortfolioHome from "./pages/PortfolioHome";
import WorkspaceOverview from "./pages/WorkspaceOverview";
import EvidenceMatrixPage from "./pages/EvidenceMatrixPage";
import ResearchBriefPage from "./pages/ResearchBriefPage";
import SourcesPage from "./pages/SourcesPage";
import PipelinePage from "./pages/PipelinePage";
import AboutCasePage from "./pages/AboutCasePage";
import NotFound from "./pages/NotFound";

export default function App() {
  const [location] = useLocation();

  return (
    <ErrorBoundary>
      {location === "/" ? <PortfolioHome /> : (
        <AppShell>
          <Switch>
            <Route path="/workspace" component={WorkspaceOverview} />
            <Route path="/evidence" component={EvidenceMatrixPage} />
            <Route path="/brief" component={ResearchBriefPage} />
            <Route path="/sources" component={SourcesPage} />
            <Route path="/pipeline" component={PipelinePage} />
            <Route path="/about" component={AboutCasePage} />
            <Route component={NotFound} />
          </Switch>
        </AppShell>
      )}
    </ErrorBoundary>
  );
}
