import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

interface OnboardingGuardProps {
  children: React.ReactNode;
}

export function OnboardingGuard({ children }: OnboardingGuardProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const checkOnboardingStatus = () => {
      const isOnboardingComplete = localStorage.getItem(
        "macromate_onboarding_complete",
      );
      const isOnboardingRoute = location.pathname.startsWith("/onboarding");
      const isAuthRoute = location.pathname.startsWith("/auth");

      // If user hasn't completed onboarding and is not on an auth or onboarding route
      if (!isOnboardingComplete && !isOnboardingRoute && !isAuthRoute) {
        navigate("/auth/signup");
      }
      // If user has completed onboarding but is on an onboarding route (except via direct navigation)
      else if (isOnboardingComplete && isOnboardingRoute) {
        navigate("/");
      }

      setIsChecking(false);
    };

    checkOnboardingStatus();
  }, [location.pathname, navigate]);

  if (isChecking) {
    return (
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-brand-primary to-brand-secondary flex items-center justify-center animate-pulse">
            <span className="text-2xl font-bold text-white">M</span>
          </div>
          <p className="text-neutral-600">Loading MacroMate...</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
