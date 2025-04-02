import { Button } from "@/components/ui/button";
import { Logo } from "./logo";
import { NavMenu } from "./nav-menu";
import { NavigationSheet } from "./navigation-sheet";
import { SunIcon } from "lucide-react";
import { Link } from "react-router-dom";
import ProfileImage from "@/assets/image.png";  
import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";
import { useState } from "react";

const Navbar02Page = () => {
  const [user, setUser] = useState(null)

  const handleUser = () =>{
    setUser({
      name: "Sarthak",
      avatar: ProfileImage
    })
  }

  return (
    <div className="top-0 w-full bg-background">
      <nav className="h-16 bg-background">
        <div className="h-full flex items-center justify-between max-w-screen-xl mx-auto px-6 sm:px-10 lg:px-12">
          {/* Left Section: Logo & NavMenu */}
          <div className="flex items-center gap-8">
            <Logo />
            <NavMenu className="hidden md:block" />
          </div>
  
          {/* Right Section: Avatar or Login/Signup */}
          <div className="flex items-center gap-6">
            {user ? (
              <Avatar className="mr-4 w-20 h-20 rounded-full">
                <AvatarImage className="w-full h-full object-cover" src={user.avatar} alt="User Avatar" />
                <AvatarFallback className="text-sm font-medium">{user.name}</AvatarFallback>
              </Avatar>
            ) : (
              <div className="flex items-center gap-4">
                <Link to="/login">
                  <Button onClick={handleUser} variant="outline" className="sm:inline-flex">
                    Login
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button>Sign Up</Button>
                </Link>
              </div>
            )}
  
            {/* Mobile Menu Icon */}
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

