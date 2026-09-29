import { Route, Switch } from "wouter";
import { ErrorBoundary } from "@/components/error-boundary";
import SplashPage from "@/pages/auth/SplashPage";
import AuthPage from "@/pages/auth/AuthPage";
import MotherRoutes from "@/routes/MotherRoutes";
import ProviderRoutes from "@/routes/ProviderRoutes";

export default function AppRouter() {
  return (
    <ErrorBoundary>
      <Switch>
        <Route path="/" component={SplashPage} />
        <Route path="/masuk" component={AuthPage} />
        <Route path="/ibu/:page/:id" component={MotherRoutes} />
        <Route path="/ibu/:page" component={MotherRoutes} />
        <Route path="/bidan/:page/:id" component={ProviderRoutes} />
        <Route path="/bidan/:page" component={ProviderRoutes} />
        <Route component={AuthPage} />
      </Switch>
    </ErrorBoundary>
  );
}
