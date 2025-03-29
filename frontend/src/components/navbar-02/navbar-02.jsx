import { Button } from "@/components/ui/button";
import { Logo } from "./logo";
import { NavMenu } from "./nav-menu";
import { NavigationSheet } from "./navigation-sheet";
import { SunIcon } from "lucide-react";
import { Link } from "react-router-dom";


const Navbar02Page = () => {
  return (
    <div className="top-0">
      <nav className="h-16 bg-background">
        <div
          className="h-full flex items-center justify-between max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-8">
            <Logo />

            {/* Desktop Menu */}
            <NavMenu className="hidden md:block" />
          </div>

          <div className="flex items-center gap-3">
            <Link to="/login">
              <Button variant="outline" className="sm:inline-flex">
                Login
              </Button>
            </Link>
            <Link to="/signup">
              <Button>Sign Up</Button>
            </Link>

            <div className="md:hidden">
              <NavigationSheet />
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar02Page;
