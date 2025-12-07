import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Upload, Calendar, DollarSign, Check, MapPin, Clock } from "lucide-react";
import Navbar from "@/components/Navbar";
import { Link, useNavigate } from "react-router-dom";
import education from "../assets/education.jpg";
import authService from "@/services/authService";
import { toast } from "sonner";
import { useState, useEffect } from "react";
import axios from "axios";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const brands = [
    "TechFest", "Cultural", "Sports", "Workshops", "Seminars", "Alumni"
];

const features = [
    {
        icon: Upload,
        title: "Easy Data Upload",
        description: "Upload event data simply via Excel or PDF files."
    },
    {
        icon: Calendar,
        title: "Event Management",
        description: "Organize and track multiple events seamlessly."
    },
    {
        icon: DollarSign,
        title: "Payment Collection",
        description: "Collect and track payments with real-time updates."
    }
];

interface Event {
    _id: string;
    title: string;
    description?: string;
    course?: string;
    createdAt: string;
}

const Events = () => {
    const navigate = useNavigate();
    const user = authService.getCurrentUser();
    const canUpload = user && (user.role === "faculty" || user.role === "CR");
    const [events, setEvents] = useState<Event[]>([]);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const res = await axios.get('http://192.168.1.4:5003/api/events/all');
                setEvents(res.data);
            } catch (error) {
                console.error("Failed to fetch events", error);
            }
        };
        fetchEvents();
    }, []);

    const handleUploadClick = (e: React.MouseEvent) => {
        if (!canUpload) {
            e.preventDefault();
            toast.error("Access Denied: Only Faculty and CRs can upload events.");
        } else {
            navigate("/events/upload");
        }
    };

    const handleEventClick = (event: Event) => {
        // Dynamic Page Mapping based on Title
        const title = event.title.toLowerCase();

        if (title.includes("fresh")) {
            navigate(`/events/fresh?eventId=${event._id}`);
        } else if (title.includes("farewell")) {
            navigate(`/events/fresh?eventId=${event._id}`); // Reusing fresh page structure for now as demo
            toast.info("Navigating to Farewell Page (demo)");
        } else {
            // Default action or specific page for other events
            toast.info(`Opening details for ${event.title}`);
            // navigate(`/events/details/${event._id}`); // Future implementation
        }
    };

    return (
        <div className="min-h-screen bg-background">
            <Navbar />
            <br />

            {/* Hero Section with Purple Gradient Background */}
            <section className="relative min-h-[85vh] flex items-center pt-12 md:pt-16 overflow-hidden">
                {/* Purple Gradient Background - matching the user's preferred #4a1942 */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#4a1942]/50 via-background to-background opacity-60"></div>
                <div className="absolute inset-0 bg-gradient-to-tr from-[#4a1942]/30 via-transparent to-transparent"></div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
                    <div className="max-w-4xl mx-auto text-center space-y-6 md:space-y-8">
                        {/* Badge */}
                        <div className="opacity-0 animate-slide-in inline-block">
                            <span className="inline-flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 rounded-full bg-[#4a1942]/10 border border-[#4a1942]/20 text-[#4a1942] text-xs md:text-sm font-medium">
                                <Sparkles className="w-3 h-3 md:w-4 md:h-4" />
                                Streamline Your Campus Events
                            </span>
                        </div>

                        {/* Main Heading */}
                        <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-7xl font-bold font-roboto-condensed text-foreground leading-tight opacity-0 animate-slide-in animation-delay-100 tracking-tighter">
                            <span className="whitespace-nowrap">Effortless Event Management</span> <br />
                            <span className="bg-gradient-to-r from-[#4a1942] to-purple-600 bg-clip-text text-transparent whitespace-nowrap">
                                For Your College.
                            </span>
                        </h1>

                        {/* Subheading */}
                        <p className="text-base md:text-xl text-muted-foreground max-w-2xl mx-auto opacity-0 animate-slide-in animation-delay-200 px-2 md:px-0">
                            Manage payments, track participants, and organize data with our{" "}
                            <span className="font-semibold text-[#4a1942] font-roboto-condensed">Excel-powered</span>{" "}
                            event portal.
                        </p>

                        {/* CTA Buttons */}
                        <div className="flex flex-row items-center justify-between gap-3 sm:gap-4 opacity-0 animate-slide-in animation-delay-300 w-full max-w-4xl mx-auto px-0 sm:px-0">
                            <Button
                                size="lg"
                                onClick={handleUploadClick}
                                className="bg-[#4a1942] text-white hover:bg-[#3a1435] px-3 sm:px-8 py-4 sm:py-6 text-xs sm:text-lg rounded-full group shadow-lg hover:shadow-xl transition-all duration-300 flex-1 h-auto"
                            >
                                Upload Your Event
                                <ArrowRight className="ml-1.5 sm:ml-2 h-4 w-4 sm:h-5 sm:w-5 transition-transform group-hover:translate-x-1" />
                            </Button>

                            <Button
                                variant="outline"
                                size="lg"
                                onClick={() => document.getElementById('upcoming-events')?.scrollIntoView({ behavior: 'smooth' })}
                                className="px-3 sm:px-8 py-4 sm:py-6 text-xs sm:text-lg rounded-full border-2 border-[#4a1942] text-[#4a1942] hover:bg-purple-50 transition-all duration-300 flex-1 h-auto"
                            >
                                View Events
                            </Button>
                        </div>

                        {/* Event Categories */}
                        <div className="pt-16 opacity-0 animate-fade-up animation-delay-400">
                            <p className="text-sm text-muted-foreground mb-6 uppercase tracking-wider">
                                Manage all types of events
                            </p>
                            <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-8 md:gap-12 px-4">
                                {brands.map((brand) => (
                                    <div
                                        key={brand}
                                        className="text-lg sm:text-2xl font-bold text-muted-foreground/40 hover:text-foreground/60 transition-colors duration-300 cursor-pointer opacity-0 animate-fade-up animation-delay-400"
                                    >
                                        {brand}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Decorative Elements */}
                <div className="absolute top-20 left-10 w-20 h-20 bg-[#4a1942]/20 rounded-full blur-3xl"></div>
                <div className="absolute bottom-20 right-10 w-32 h-32 bg-purple-400/20 rounded-full blur-3xl"></div>
            </section>

            {/* Upcoming Events Section (Dynamic) */}
            <section id="upcoming-events" className="py-24 bg-background">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                            Upcoming Events
                        </h2>
                        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                            Browse and register for the latest events happening on campus.
                        </p>
                    </div>

                    {events.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {events.map((event) => (
                                <Card key={event._id} className="hover:shadow-lg transition-shadow cursor-pointer border-t-4 border-t-[#4a1942]" onClick={() => handleEventClick(event)}>
                                    <CardHeader>
                                        <div className="flex justify-between items-start">
                                            <Badge variant="secondary" className="bg-purple-100 text-[#4a1942] hover:bg-purple-200">
                                                {event.course || "General"}
                                            </Badge>
                                            <span className="text-xs text-muted-foreground">
                                                {new Date(event.createdAt).toLocaleDateString()}
                                            </span>
                                        </div>
                                        <CardTitle className="mt-4 text-xl font-bold line-clamp-2">
                                            {event.title}
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-muted-foreground line-clamp-3 mb-4">
                                            {event.description || "Join us for this exciting event! Click to view details and register."}
                                        </p>
                                        <div className="space-y-2 text-sm text-muted-foreground">
                                            <div className="flex items-center">
                                                <Calendar className="w-4 h-4 mr-2" />
                                                <span>{new Date(event.createdAt).toLocaleDateString()}</span>
                                            </div>
                                            <div className="flex items-center">
                                                <MapPin className="w-4 h-4 mr-2" />
                                                <span>Campus Venue</span>
                                            </div>
                                        </div>
                                    </CardContent>
                                    <CardFooter>
                                        <Button className="w-full bg-[#4a1942] hover:bg-[#3a1435]">
                                            View Details
                                        </Button>
                                    </CardFooter>
                                </Card>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-12 bg-muted/30 rounded-lg border border-dashed">
                            <p className="text-muted-foreground">No upcoming events found.</p>
                            {canUpload && (
                                <Button variant="link" onClick={() => navigate("/events/upload")} className="text-[#4a1942]">
                                    Upload an Event
                                </Button>
                            )}
                        </div>
                    )}
                </div>
            </section>

            {/* Features Section */}
            <section className="py-24 bg-background relative border-t">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                            Everything You Need to Run Events
                        </h2>
                        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                            Powerful tools to handle data, payments, and student records efficiently.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {features.map((feature, index) => (
                            <div
                                key={feature.title}
                                className={`bg-card border border-border rounded-2xl p-8 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 opacity-0 animate-fade-up animation-delay-${index === 0 ? '0' : index === 1 ? '100' : '200'}`}
                            >
                                <div className="w-14 h-14 rounded-xl bg-[#4a1942]/10 flex items-center justify-center mb-6">
                                    <feature.icon className="w-7 h-7 text-[#4a1942]" />
                                </div>
                                <h3 className="text-xl font-semibold text-foreground mb-3">
                                    {feature.title}
                                </h3>
                                <p className="text-muted-foreground">
                                    {feature.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Why Choose Us Section */}
            <section className="py-24 bg-gradient-to-b from-background to-[#4a1942]/10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div className="space-y-6">
                            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                                Why Choose Our Event Portal?
                            </h2>
                            <div className="space-y-4">
                                {[
                                    "Seamless Excel Integration",
                                    "Real-time Payment Tracking",
                                    "Secure Student Data Management",
                                    "Instant Receipt Generation",
                                    "Comprehensive Event Analytics"
                                ].map((item, index) => (
                                    <div key={index} className="flex items-start gap-3">
                                        <div className="w-6 h-6 rounded-full bg-[#4a1942] flex items-center justify-center flex-shrink-0 mt-0.5">
                                            <Check className="w-4 h-4 text-white" />
                                        </div>
                                        <p className="text-muted-foreground text-lg">{item}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="relative">
                            <div className="aspect-square bg-gradient-to-br from-[#4a1942]/10 to-purple-100 rounded-3xl flex items-center justify-center overflow-hidden">
                                <img src={education} alt="Events Dashboard" className="w-full h-full object-cover" />
                            </div>
                            <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-[#4a1942]/20 rounded-full blur-3xl"></div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer CTA */}
            <section className="py-24 bg-background">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                        Ready to Host Your Next Event?
                    </h2>
                    <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                        Simplify event management and focus on creating memorable experiences for students.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Button
                            size="lg"
                            onClick={handleUploadClick}
                            className="bg-[#4a1942] text-white hover:bg-[#3a1435] px-8 py-6 text-lg rounded-full group shadow-lg"
                        >
                            Get Started Now
                            <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                        </Button>
                    </div>
                </div>
            </section>

            {/* Simple Footer - Using the same custom footer as Resume page */}
            <footer className="border-t border-border py-12 bg-background">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        <div className="col-span-1 md:col-span-2">
                            <h3 className="text-lg font-semibold text-foreground mb-4">Event Portal</h3>
                            <p className="text-muted-foreground text-sm">
                                Your one-stop solution for managing college events, payments, and participants.
                            </p>
                        </div>
                        <div>
                            <h4 className="text-sm font-semibold text-foreground mb-4">Features</h4>
                            <ul className="space-y-2 text-sm text-muted-foreground">
                                <li className="hover:text-foreground cursor-pointer transition-colors">Upload Data</li>
                                <li className="hover:text-foreground cursor-pointer transition-colors">Track Payments</li>
                                <li className="hover:text-foreground cursor-pointer transition-colors">Analytics</li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-sm font-semibold text-foreground mb-4">Support</h4>
                            <ul className="space-y-2 text-sm text-muted-foreground">
                                <li className="hover:text-foreground cursor-pointer transition-colors">Documentation</li>
                                <li className="hover:text-foreground cursor-pointer transition-colors">Contact Admin</li>
                                <li className="hover:text-foreground cursor-pointer transition-colors">Report Issue</li>
                            </ul>
                        </div>
                    </div>
                    <div className="mt-12 pt-8 border-t border-border text-center text-sm text-muted-foreground">
                        © 2024 Event Portal. All rights reserved.
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Events;
