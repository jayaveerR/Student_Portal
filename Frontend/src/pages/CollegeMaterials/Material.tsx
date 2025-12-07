import { Button } from "@/components/ui/button";
import { Upload, BookOpen } from "lucide-react";
import Navbar from "@/components/Navbar";
import { useNavigate } from "react-router-dom";
import authService from "@/services/authService";
import { toast } from "sonner"; // Import toast for error messaging

const departments = [
    "MCA", "MBA", "EEE", "CSE", "AI/DS", "Mechanical"
];

const Material = () => {
    const navigate = useNavigate();
    const user = authService.getCurrentUser(); // Get current user

    const handleUploadRedirect = () => {
        if (!user || user.role !== 'faculty') {
            toast.error("Access Denied: Only faculty members can upload materials.");
            return;
        }
        navigate("/material/upload");
    };

    return (
        <div className="min-h-screen bg-background">
            <Navbar />

            {/* Hero Section */}
            {/* Hero Section */}
            {/* Hero Section */}
            <section className="relative min-h-[85vh] flex items-center pt-12 md:pt-16 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-[#c1121f]/5 via-background to-background opacity-60"></div>
                <div className="absolute inset-0 bg-gradient-to-tr from-[#c1121f]/10 via-transparent to-transparent"></div>

                <div className="max-w-8xl mx-auto px-8 sm:px-6 lg:px-8 w-full relative z-10">
                    <div className="max-w-4xl mx-auto text-center space-y-6 md:space-y-8">
                        {/* Badge */}
                        <div className="opacity-0 animate-slide-in inline-block mt-9 md:mt-12">
                            <span className="inline-flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 rounded-full bg-[#c1121f]/10 border border-[#c1121f]/20 text-[#c1121f] text-xs md:text-sm font-medium">
                                <BookOpen className="w-3 h-3 md:w-4 md:h-4" />
                                Centralized Study Materials
                            </span>
                        </div>

                        {/* Main Heading */}
                        <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-9xl font-bold font-roboto-condensed text-foreground leading-tight opacity-0 animate-slide-in animation-delay-100 tracking-tighter">
                            <span className="whitespace-nowrap">Access All Your</span> <br />
                            <span className="bg-gradient-to-r from-[#c1121f] to-[#e11d2b] bg-clip-text text-transparent whitespace-nowrap">
                                Study Materials.
                            </span>
                        </h1>

                        {/* Subheading */}
                        <p className="text-base md:text-xl text-muted-foreground max-w-2xl mx-auto opacity-0 animate-slide-in animation-delay-200 px-4 md:px-0">
                            Find and share notes, question papers, and more for your department.
                            Powered by a decentralized network.
                        </p>

                        {/* CTA Buttons */}
                        <div className="flex flex-row items-center justify-between gap-3 sm:gap-4 opacity-0 animate-slide-in animation-delay-300 w-full max-w-4xl mx-auto px-0 sm:px-0">
                            <Button
                                size="lg"
                                onClick={handleUploadRedirect}
                                className="bg-[#c1121f] text-white hover:bg-[#a10f19] px-3 sm:px-8 py-4 sm:py-6 text-xs sm:text-lg rounded-full group shadow-lg hover:shadow-xl transition-all duration-300 flex-1 h-auto"
                            >
                                Upload Material
                                <Upload className="ml-1.5 sm:ml-2 h-4 w-4 sm:h-5 sm:w-5 transition-transform group-hover:-translate-y-1" />
                            </Button>

                            <Button
                                size="lg"
                                onClick={() => navigate("/college-materials")}
                                variant="outline"
                                className="border-2 border-[#c1121f]/20 text-[#c1121f] hover:bg-[#c1121f]/5 px-3 sm:px-8 py-4 sm:py-6 text-xs sm:text-lg rounded-full group transition-all duration-300 flex-1 h-auto"
                            >
                                College Materials
                                <BookOpen className="ml-1.5 sm:ml-2 h-4 w-4 sm:h-5 sm:w-5 transition-transform group-hover:translate-x-1" />
                            </Button>
                        </div>

                        {/* Departments Section */}
                        <div className="pt-16 opacity-0 animate-fade-up animation-delay-400">
                            <p className="text-sm text-muted-foreground mb-6 uppercase tracking-wider">
                                Available for Departments
                            </p>
                            <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-8 md:gap-12 px-4">
                                {departments.map((dept) => (
                                    <div
                                        key={dept}
                                        className="text-lg sm:text-xl font-bold text-muted-foreground/60 hover:text-foreground/80 transition-colors duration-300 cursor-pointer"
                                    >
                                        {dept}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Decorative Elements */}
                <div className="absolute top-20 left-10 w-20 h-20 bg-[#c1121f]/20 rounded-full blur-3xl"></div>
                <div className="absolute bottom-20 right-10 w-32 h-32 bg-[#c1121f]/20 rounded-full blur-3xl"></div>
            </section>

            {/* Placeholder for displaying materials */}
            <section className="py-24 bg-background">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                            Recently Uploaded Materials
                        </h2>
                        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                            Browse the latest materials shared by students and faculty.
                        </p>
                    </div>
                    {/* Display grid will go here */}
                    <div className="text-center text-muted-foreground">
                        <p>(Material display area will be implemented here after setting up the backend.)</p>
                    </div>
                </div>
            </section>


            {/* Simple Footer */}
            <footer className="border-t border-border py-12 bg-background">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center text-sm text-muted-foreground">
                        © 2024 Study Material Hub. All rights reserved.
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Material;
