import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Calendar, ArrowRight, Clock, Users, BookOpen } from 'lucide-react';
import authService from '@/services/authService';
import { toast } from 'sonner';
import Navbar from "@/components/Navbar";

const TimetableLanding = () => {
    const navigate = useNavigate();

    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-100 via-white to-gray-50 text-black font-sans pt-16">
            <Navbar />

            {/* Hero Section */}
            <section className="relative py-20 px-4 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-yellow-100/30 to-transparent pointer-events-none"></div>
                <div className="container mx-auto max-w-4xl text-center relative z-10 animate-in fade-in slide-in-from-bottom-10 duration-700">
                    <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-black mb-4 sm:mb-6 leading-tight font-roboto-condensed tracking-tighter">
                        <span className="whitespace-nowrap">Building An <span className="text-yellow-500">Timetable Schedule</span></span><br />
                        <span className="whitespace-nowrap">Powered By Excel</span>
                    </h1>
                    <p className="text-xs sm:text-xl text-gray-700 mb-6 sm:mb-8 max-w-2xl mx-auto px-4">
                        Effortlessly create, manage, and organize your academic schedules.
                        Simple, powerful, and designed for excellence.
                    </p>
                    <div className="flex flex-col flex-row gap-3 sm:gap-4 justify-center w-full max-w-md mx-auto px-0">
                        <Button
                            onClick={() => {
                                const user = authService.getCurrentUser();
                                if (!user) {
                                    toast.error("Please login to create timetables");
                                    navigate('/');
                                    return;
                                }
                                if (user.role !== 'faculty') {
                                    toast.error("Only faculty can create timetables");
                                    return;
                                }
                                navigate('/timetable/generate');
                            }}
                            className="bg-black hover:bg-gray-800 text-white text-xs sm:text-lg px-3 sm:px-8 py-4 sm:py-6 rounded-lg shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1 flex-1 h-auto"
                        >
                            Create Timetable <ArrowRight className="ml-1.5 sm:ml-2 h-4 w-4 sm:h-5 sm:w-5" />
                        </Button>
                        <Button
                            onClick={() => navigate('/timetable')}
                            variant="outline"
                            className="border-2 border-black text-black hover:bg-black hover:text-white text-xs sm:text-lg px-3 sm:px-8 py-4 sm:py-6 rounded-lg transition-all flex-1 h-auto"
                        >
                            View Timetable
                        </Button>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section id="features" className="py-20 bg-white">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12 animate-in fade-in slide-in-from-bottom-5 duration-500">
                        <h2 className="text-4xl font-bold text-black mb-4">Why Choose Our Timetable?</h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">Simple, efficient, and powerful scheduling tools for educational institutions</p>
                    </div>
                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            { icon: Clock, title: "Time Management", desc: "Organize your academic life with precise scheduling and smart time allocation." },
                            { icon: Users, title: "Faculty & Students", desc: "Tailored views for both class in-charges and students with role-based access." },
                            { icon: BookOpen, title: "Course Details", desc: "Keep track of course codes, titles, and faculty details in one place." }
                        ].map((feature, idx) => (
                            <div
                                key={idx}
                                className="p-8 rounded-xl bg-gray-50 border border-gray-200 hover:border-yellow-400 hover:shadow-lg transition-all duration-300 animate-in fade-in slide-in-from-bottom-10"
                                style={{ animationDelay: `${idx * 100}ms` }}
                            >
                                <div className="w-14 h-14 bg-yellow-400 rounded-lg flex items-center justify-center mb-4">
                                    <feature.icon className="h-7 w-7 text-black" />
                                </div>
                                <h3 className="text-xl font-bold text-black mb-3">{feature.title}</h3>
                                <p className="text-gray-600">{feature.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Schedule Info Section */}
            <section id="schedule" className="py-20 bg-gradient-to-br from-gray-50 to-white">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto">
                        <div className="text-center mb-12">
                            <h2 className="text-4xl font-bold text-black mb-4">Scheduling Made Simple</h2>
                            <p className="text-gray-600">Everything you need to create the perfect timetable</p>
                        </div>
                        <div className="grid md:grid-cols-2 gap-6">
                            {[
                                { title: "Easy to Use", desc: "Intuitive interface designed for quick timetable creation" },
                                { title: "Customizable", desc: "Adapt the schedule to your specific needs and preferences" },
                                { title: "Print Ready", desc: "Professional layouts optimized for printing and sharing" },
                                { title: "Save & Load", desc: "Store your timetables securely and access them anytime" }
                            ].map((item, idx) => (
                                <div
                                    key={idx}
                                    className="p-6 bg-white rounded-lg border border-gray-200 hover:border-yellow-400 transition-all duration-300 animate-in fade-in"
                                    style={{ animationDelay: `${idx * 100}ms` }}
                                >
                                    <h3 className="text-lg font-bold text-black mb-2">{item.title}</h3>
                                    <p className="text-gray-600 text-sm">{item.desc}</p>
                                </div>
                            ))}
                        </div>
                        <div className="mt-12 text-center">
                            <Button
                                onClick={() => navigate('/timetable/generate')}
                                className="bg-black hover:bg-gray-800 text-white text-lg px-10 py-6 rounded-lg shadow-lg"
                            >
                                Start Creating Now
                            </Button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer id="footer" className="bg-gray-900 text-gray-300 py-12">
                <div className="container mx-auto px-4">
                    <div className="grid md:grid-cols-4 gap-8 mb-8">
                        <div className="col-span-1 md:col-span-2">
                            <div className="flex items-center gap-2 mb-4">
                                <Calendar className="h-6 w-6 text-yellow-400" />
                                <span className="text-xl font-bold text-white">Portal Timetable</span>
                            </div>
                            <p className="text-gray-400 max-w-sm">
                                Empowering educational institutions with seamless scheduling solutions.
                                Simplify your academic planning today.
                            </p>
                        </div>
                        <div>
                            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
                            <ul className="space-y-2">
                                <li><button onClick={() => navigate('/')} className="hover:text-yellow-400 transition-colors">Home</button></li>
                                <li><button onClick={() => navigate('/timetable/generate')} className="hover:text-yellow-400 transition-colors">Generate</button></li>
                                <li><button onClick={() => scrollToSection('features')} className="hover:text-yellow-400 transition-colors">Features</button></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-white font-semibold mb-4">Contact</h4>
                            <ul className="space-y-2 text-sm">
                                <li>support@portalsparkle.com</li>
                                <li>+1 (555) 123-4567</li>
                                <li>123 Education Lane, Tech City</li>
                            </ul>
                        </div>
                    </div>
                    <div className="border-t border-gray-800 pt-8 text-center text-sm text-gray-500">
                        &copy; {new Date().getFullYear()} Portal Sparkle Vibe. All rights reserved.
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default TimetableLanding;
