import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { BottomNavigation } from "@/components/navigation/BottomNavigation";

// Main app pages
import Home from "./pages/Home";
import Log from "./pages/Log";
import Workout from "./pages/Workout";
import Progress from "./pages/Progress";
import Profile from "./pages/Profile";
import CheatMealBalance from "./pages/CheatMealBalance";
import NotFound from "./pages/NotFound";

// Authentication pages
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import ForgotPassword from "./pages/auth/ForgotPassword";
import VerifyEmail from "./pages/auth/VerifyEmail";

// Profile pages
import ProfileOverview from "./pages/profile/ProfileOverview";
import Preferences from "./pages/profile/Preferences";
import ConnectedApps from "./pages/profile/ConnectedApps";
import SecurityPrivacy from "./pages/profile/SecurityPrivacy";
import Subscription from "./pages/profile/Subscription";
import AboutLegal from "./pages/profile/AboutLegal";

// Quick Action pages
import SnapMeal from "./pages/quick-actions/SnapMeal";
import ManualMeal from "./pages/quick-actions/ManualMeal";
import AddWeight from "./pages/quick-actions/AddWeight";
import LogWater from "./pages/quick-actions/LogWater";

const queryClient = new QueryClient();

// MacroMate App - Force refresh to fix blank screen issue
const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <div className="min-h-screen bg-neutral-50">
          <Routes>
            {/* Main App Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/log" element={<Log />} />
            <Route path="/workout" element={<Workout />} />
            <Route path="/progress" element={<Progress />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/cheat-meal-balance" element={<CheatMealBalance />} />

            {/* Authentication Routes */}
            <Route path="/auth/login" element={<Login />} />
            <Route path="/auth/signup" element={<Signup />} />
            <Route path="/auth/forgot-password" element={<ForgotPassword />} />
            <Route path="/auth/verify-email" element={<VerifyEmail />} />

            {/* Profile Sub-routes */}
            <Route path="/profile/overview" element={<ProfileOverview />} />
            <Route path="/profile/preferences" element={<Preferences />} />
            <Route path="/profile/connected-apps" element={<ConnectedApps />} />
            <Route
              path="/profile/security-privacy"
              element={<SecurityPrivacy />}
            />
            <Route path="/profile/subscription" element={<Subscription />} />
            <Route path="/profile/about-legal" element={<AboutLegal />} />

            {/* Quick Action Routes */}
            <Route path="/quick-actions/snap-meal" element={<SnapMeal />} />
            <Route path="/quick-actions/manual-meal" element={<ManualMeal />} />
            <Route path="/quick-actions/add-weight" element={<AddWeight />} />
            <Route path="/quick-actions/log-water" element={<LogWater />} />

            {/* Catch-all route */}
            <Route path="*" element={<NotFound />} />
          </Routes>

          {/* Only show bottom navigation on main app routes */}
          <Routes>
            <Route path="/" element={<BottomNavigation />} />
            <Route path="/log" element={<BottomNavigation />} />
            <Route path="/workout" element={<BottomNavigation />} />
            <Route path="/progress" element={<BottomNavigation />} />
            <Route path="/profile" element={<BottomNavigation />} />
            <Route path="/cheat-meal-balance" element={<BottomNavigation />} />
          </Routes>
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
