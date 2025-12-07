import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, Mail, Lock, User as UserIcon, Github, Chrome, GraduationCap, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import authService from "@/services/authService";

const Login = () => {
    const navigate = useNavigate();
    const { toast } = useToast();
    const [isSignIn, setIsSignIn] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        role: "student" as "student" | "faculty" | "CR",
        rememberMe: false,
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            if (isSignIn) {
                // Registration
                if (formData.password !== formData.confirmPassword) {
                    toast({
                        title: "Error",
                        description: "Passwords do not match",
                        variant: "destructive",
                    });
                    setIsLoading(false);
                    return;
                }

                const result = await authService.register({
                    name: formData.name,
                    email: formData.email,
                    password: formData.password,
                    role: formData.role,
                });

                if (result.success) {
                    toast({
                        title: "Success!",
                        description: "Account created successfully. Welcome to StudentPortal!",
                    });
                    setTimeout(() => navigate("/"), 1500);
                } else {
                    const errorMsg = result.errors
                        ? result.errors.map(e => e.msg).join(", ")
                        : (result.message || "An error occurred during registration");

                    toast({
                        title: "Registration Failed",
                        description: errorMsg,
                        variant: "destructive",
                    });
                }
            } else {
                // Login
                const result = await authService.login({
                    email: formData.email,
                    password: formData.password,
                });

                if (result.success) {
                    toast({
                        title: "Welcome back!",
                        description: `Logged in as ${result.user?.role}`,
                    });
                    setTimeout(() => navigate("/"), 1500);
                } else {
                    toast({
                        title: "Login Failed",
                        description: result.message || "Invalid email or password",
                        variant: "destructive",
                    });
                }
            }
        } catch (error) {
            toast({
                title: "Error",
                description: "An unexpected error occurred. Please try again.",
                variant: "destructive",
            });
        } finally {
            setIsLoading(false);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-background via-muted/20 to-background p-4 animate-fade-in">
            {/* Background decoration */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse" />
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse animation-delay-500" />
            </div>

            {/* Auth Card */}
            <div className="relative w-full max-w-md animate-fade-up">
                <div className="bg-card/80 backdrop-blur-xl border border-border rounded-2xl shadow-card-hover p-8 space-y-6">
                    {/* Header */}
                    <div className="text-center space-y-2 animate-slide-in">
                        <h1 className="text-3xl font-bold text-foreground">
                            {isSignIn ? "Create Account" : "Welcome Back"}
                        </h1>
                        <p className="text-muted-foreground">
                            {isSignIn
                                ? "Sign up to get started with StudentPortal"
                                : "Login to continue to StudentPortal"}
                        </p>
                    </div>

                    {/* Social Login Buttons */}
                    <div className="grid grid-cols-2 gap-3 animate-slide-in animation-delay-100">
                        <Button
                            variant="outline"
                            className="w-full hover-lift border-border hover:border-foreground/20"
                            type="button"
                            disabled
                        >
                            <Chrome className="w-4 h-4 mr-2" />
                            Google
                        </Button>
                        <Button
                            variant="outline"
                            className="w-full hover-lift border-border hover:border-foreground/20"
                            type="button"
                            disabled
                        >
                            <Github className="w-4 h-4 mr-2" />
                            GitHub
                        </Button>
                    </div>

                    {/* Divider */}
                    <div className="relative animate-slide-in animation-delay-200">
                        <div className="absolute inset-0 flex items-center">
                            <span className="w-full border-t border-border" />
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-card px-2 text-muted-foreground">Or continue with</span>
                        </div>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-4">
                        {/* Name Field - Only for Sign In */}
                        {isSignIn && (
                            <div className="space-y-2 animate-slide-in animation-delay-300">
                                <Label htmlFor="name" className="text-foreground">
                                    Full Name
                                </Label>
                                <div className="relative">
                                    <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                    <Input
                                        id="name"
                                        name="name"
                                        type="text"
                                        placeholder="John Doe"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        className="pl-10 bg-background/50 border-border focus:border-foreground transition-all duration-300"
                                        required={isSignIn}
                                        disabled={isLoading}
                                    />
                                </div>
                            </div>
                        )}

                        {/* Email Field */}
                        <div className="space-y-2 animate-slide-in animation-delay-300">
                            <Label htmlFor="email" className="text-foreground">
                                Email
                            </Label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                <Input
                                    id="email"
                                    name="email"
                                    type="email"
                                    placeholder="you@example.com"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    className="pl-10 bg-background/50 border-border focus:border-foreground transition-all duration-300"
                                    required
                                    disabled={isLoading}
                                />
                            </div>
                        </div>

                        {/* Password Field */}
                        <div className="space-y-2 animate-slide-in animation-delay-400">
                            <Label htmlFor="password" className="text-foreground">
                                Password
                            </Label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                <Input
                                    id="password"
                                    name="password"
                                    type={showPassword ? "text" : "password"}
                                    placeholder="••••••••"
                                    value={formData.password}
                                    onChange={handleInputChange}
                                    className="pl-10 pr-10 bg-background/50 border-border focus:border-foreground transition-all duration-300"
                                    required
                                    disabled={isLoading}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                                    disabled={isLoading}
                                >
                                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                </button>
                            </div>
                        </div>

                        {/* Confirm Password - Only for Sign In */}
                        {isSignIn && (
                            <div className="space-y-2 animate-slide-in animation-delay-500">
                                <Label htmlFor="confirmPassword" className="text-foreground">
                                    Confirm Password
                                </Label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                    <Input
                                        id="confirmPassword"
                                        name="confirmPassword"
                                        type={showConfirmPassword ? "text" : "password"}
                                        placeholder="••••••••"
                                        value={formData.confirmPassword}
                                        onChange={handleInputChange}
                                        className="pl-10 pr-10 bg-background/50 border-border focus:border-foreground transition-all duration-300"
                                        required={isSignIn}
                                        disabled={isLoading}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                                        disabled={isLoading}
                                    >
                                        {showConfirmPassword ? (
                                            <EyeOff className="w-4 h-4" />
                                        ) : (
                                            <Eye className="w-4 h-4" />
                                        )}
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* Role Selection - Only for Sign In */}
                        {isSignIn && (
                            <div className="space-y-2 animate-slide-in animation-delay-500">
                                <Label htmlFor="role" className="text-foreground">
                                    I am a
                                </Label>
                                <Select
                                    value={formData.role}
                                    onValueChange={(value: "student" | "faculty") =>
                                        setFormData((prev) => ({ ...prev, role: value }))
                                    }
                                    disabled={isLoading}
                                >
                                    <SelectTrigger className="bg-background/50 border-border focus:border-foreground transition-all duration-300">
                                        <SelectValue placeholder="Select your role" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="student">
                                            <div className="flex items-center gap-2">
                                                <GraduationCap className="w-4 h-4" />
                                                <span>Student</span>
                                            </div>
                                        </SelectItem>
                                        <SelectItem value="faculty">
                                            <div className="flex items-center gap-2">
                                                <Users className="w-4 h-4" />
                                                <span>Faculty</span>
                                            </div>
                                        </SelectItem>
                                        <SelectItem value="CR">
                                            <div className="flex items-center gap-2">
                                                <Users className="w-4 h-4" />
                                                <span>Class Representative (CR)</span>
                                            </div>
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        )}

                        {/* Remember Me & Forgot Password - Only for Login */}
                        {!isSignIn && (
                            <div className="flex items-center justify-between animate-slide-in animation-delay-500">
                                <div className="flex items-center space-x-2">
                                    <Checkbox
                                        id="remember"
                                        checked={formData.rememberMe}
                                        onCheckedChange={(checked) =>
                                            setFormData((prev) => ({ ...prev, rememberMe: checked as boolean }))
                                        }
                                        disabled={isLoading}
                                    />
                                    <label
                                        htmlFor="remember"
                                        className="text-sm text-muted-foreground cursor-pointer hover:text-foreground transition-colors"
                                    >
                                        Remember me
                                    </label>
                                </div>
                                <Link
                                    to="/forgot-password"
                                    className="text-sm text-foreground hover:underline transition-all"
                                >
                                    Forgot password?
                                </Link>
                            </div>
                        )}

                        {/* Submit Button */}
                        <Button
                            type="submit"
                            className="w-full bg-foreground text-background hover:bg-foreground/90 transition-all duration-300 hover-lift animate-slide-in animation-delay-500"
                            disabled={isLoading}
                        >
                            {isLoading ? "Please wait..." : isSignIn ? "Create Account" : "Sign In"}
                        </Button>
                    </form>

                    {/* Toggle Mode */}
                    <div className="text-center text-sm animate-slide-in animation-delay-500">
                        <span className="text-muted-foreground">
                            {isSignIn ? "Already have an account?" : "Don't have an account?"}
                        </span>{" "}
                        <button
                            type="button"
                            onClick={() => setIsSignIn(!isSignIn)}
                            className="text-foreground font-medium hover:underline transition-all"
                            disabled={isLoading}
                        >
                            {isSignIn ? "Login" : "Sign up"}
                        </button>
                    </div>

                    {/* Back to Home */}
                    <div className="text-center animate-slide-in animation-delay-500">
                        <Link
                            to="/"
                            className="text-sm text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-1"
                        >
                            ← Back to Home
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
