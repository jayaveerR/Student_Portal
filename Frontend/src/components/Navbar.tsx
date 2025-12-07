import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Search, Bell, LogIn, ChevronDown, GraduationCap, Menu,
  Clock, BookOpen, Calendar, FileText, FileEdit, Phone, Info, Home, User as UserIcon, LogOut
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import authService, { User } from "../services/authService";

const categories = [
  { name: "Timetable", path: "/timetable/landing", icon: Clock },
  { name: "Resume Builder", path: "/resume", icon: FileEdit },
  { name: "Materials", path: "/materials", icon: BookOpen },
  { name: "Event Payments", path: "/events", icon: Calendar },
  { name: "Question Papers", path: "/papers", icon: FileText },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const currentUser = authService.getCurrentUser();
    setUser(currentUser);
  }, []);

  const handleLogout = () => {
    authService.logout();
    setUser(null);
    navigate('/login');
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b border-border transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16 w-full">
        <div className="flex items-center justify-between h-16 md:h-20 transition-all duration-300">
          {/* Logo Section */}
          <Link to="/" className="flex items-center gap-2 sm:gap-3 group shrink-0">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-foreground flex items-center justify-center transition-all duration-300 group-hover:scale-105 group-hover:rotate-3 shadow-sm">
              <GraduationCap className="w-5 h-5 sm:w-6 sm:h-6 text-background" />
            </div>
            <span className="text-lg sm:text-xl font-bold text-foreground tracking-tight hidden xs:block">StudentPortal</span>
          </Link>

          {/* Desktop Navigation (Hidden on Mobile/Tablet) */}
          <div className="hidden lg:flex items-center gap-4 xl:gap-8">
            <Link to="/" className="text-foreground/80 hover:text-primary transition-colors font-medium flex items-center gap-2 text-sm xl:text-base group">
              <Home className="w-4 h-4 group-hover:text-primary transition-colors" />
              Home
            </Link>
            <Link to="/about" className="text-foreground/80 hover:text-primary transition-colors font-medium flex items-center gap-2 text-sm xl:text-base group">
              <Info className="w-4 h-4 group-hover:text-primary transition-colors" />
              About
            </Link>
            <Link to="/contact" className="text-foreground/80 hover:text-primary transition-colors font-medium flex items-center gap-2 text-sm xl:text-base group">
              <Phone className="w-4 h-4 group-hover:text-primary transition-colors" />
              Contact
            </Link>

            {/* Categories Dropdown */}
            <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="text-foreground/80 hover:bg-muted hover:text-primary font-medium text-sm xl:text-base">
                  Categories
                  <ChevronDown className={`ml-2 h-4 w-4 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-[260px] bg-background border-border shadow-lg p-2 rounded-xl" align="center">
                {categories.map((category) => (
                  <DropdownMenuItem key={category.path} asChild>
                    <Link
                      to={category.path}
                      className="cursor-pointer hover:bg-muted focus:bg-muted transition-all duration-200 flex items-center gap-3 py-2.5 px-3 rounded-lg group"
                    >
                      <div className="p-1.5 rounded-md bg-muted group-hover:bg-background transition-colors">
                        <category.icon className="w-4 h-4 text-primary" />
                      </div>
                      <span className="text-sm font-medium">{category.name}</span>
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Right Side Icons & Actions */}
          <div className="flex items-center gap-1 sm:gap-2">
            <Button variant="ghost" size="icon" className="text-foreground hover:bg-muted/80 transition-all duration-200 hover:scale-105 hidden sm:flex">
              <Search className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="text-foreground hover:bg-muted/80 relative transition-all duration-200 hover:scale-105">
              <Bell className="h-5 w-5" />
              <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 rounded-full animate-pulse border-2 border-background" />
            </Button>

            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="rounded-full w-9 h-9 sm:w-10 sm:h-10 border border-border bg-muted/30 hover:bg-muted transition-all duration-200 ml-1 sm:ml-2">
                    <div className="flex items-center justify-center w-full h-full bg-primary/10 rounded-full text-foreground font-bold">
                      {user.name ? user.name.charAt(0).toUpperCase() : <UserIcon className="h-5 w-5" />}
                    </div>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-60 p-2">
                  <DropdownMenuLabel>
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none truncate">{user.name}</p>
                      <p className="text-xs leading-none text-muted-foreground truncate">{user.email}</p>
                      <p className="text-xs font-semibold text-primary mt-1 capitalize inline-block bg-primary/10 px-2 py-0.5 rounded-full w-fit">{user.role}</p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="cursor-pointer py-2">
                    <UserIcon className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="cursor-pointer text-red-500 focus:text-red-500 py-2 hover:bg-red-50 focus:bg-red-50" onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link to="/login">
                <Button className="bg-foreground text-background hover:bg-foreground/90 transition-all duration-300 hover:scale-105 hover:shadow-lg gap-2 ml-1 sm:ml-2 h-9 sm:h-10 px-3 sm:px-4 text-sm font-medium rounded-full">
                  <LogIn className="h-4 w-4" />
                  <span className="hidden sm:inline">Login</span>
                </Button>
              </Link>
            )}

            {/* Mobile/Tablet Menu Toggle */}
            <div className="lg:hidden ml-1 sm:ml-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="text-foreground hover:bg-muted">
                    <Menu className="h-6 w-6" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-[90vw] sm:w-[350px] bg-background/95 backdrop-blur-xl border-border shadow-2xl mr-2 p-4 mt-2 rounded-2xl animate-in slide-in-from-top-2" align="end">
                  <div className="space-y-1">
                    <DropdownMenuItem asChild>
                      <Link to="/" className="w-full cursor-pointer hover:bg-muted/80 transition-colors flex items-center gap-3 py-3 px-4 rounded-xl">
                        <div className="p-2 bg-primary/10 rounded-lg"><Home className="w-4 h-4 text-primary" /></div>
                        <span className="font-medium text-base">Home</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/about" className="w-full cursor-pointer hover:bg-muted/80 transition-colors flex items-center gap-3 py-3 px-4 rounded-xl">
                        <div className="p-2 bg-primary/10 rounded-lg"><Info className="w-4 h-4 text-primary" /></div>
                        <span className="font-medium text-base">About</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/contact" className="w-full cursor-pointer hover:bg-muted/80 transition-colors flex items-center gap-3 py-3 px-4 rounded-xl">
                        <div className="p-2 bg-primary/10 rounded-lg"><Phone className="w-4 h-4 text-primary" /></div>
                        <span className="font-medium text-base">Contact</span>
                      </Link>
                    </DropdownMenuItem>
                  </div>

                  <div className="my-4 border-t border-border/50"></div>

                  <div className="px-2 mb-2">
                    <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Categories</span>
                  </div>

                  <div className="grid grid-cols-1 gap-1">
                    {categories.map((category) => (
                      <DropdownMenuItem key={category.path} asChild>
                        <Link
                          to={category.path}
                          className="w-full cursor-pointer hover:bg-muted/80 transition-colors flex items-center gap-3 py-2.5 px-4 rounded-xl"
                        >
                          <category.icon className="w-4 h-4 text-foreground/70" />
                          <span className="text-sm font-medium">{category.name}</span>
                        </Link>
                      </DropdownMenuItem>
                    ))}
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
