
import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const FreshPage = () => {
    const [searchParams] = useSearchParams();
    const eventId = searchParams.get("eventId");
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-background flex flex-col">
            <Navbar />
            <div className="container mx-auto px-4 py-8 mt-16">
                <div className="flex items-center mb-6">
                    <Button variant="ghost" onClick={() => navigate("/events")} className="mr-4">
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        Back to Events
                    </Button>
                </div>

                <div className="max-w-4xl mx-auto text-center space-y-8 pt-12">
                    <h1 className="text-5xl font-bold font-roboto-condensed text-[#4a1942]">
                        Welcome to the Freshers Event Page!
                    </h1>
                    <p className="text-xl text-muted-foreground">
                        This is a dynamic page generated for Fresher events.
                    </p>
                    {eventId && (
                        <p className="text-sm text-muted-foreground">
                            Viewing details for Event ID: {eventId}
                        </p>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
                        <div className="p-8 border rounded-xl shadow-sm bg-card hover:shadow-md transition-shadow">
                            <h2 className="text-2xl font-bold mb-4">Dance Performances</h2>
                            <p>Check out the lineup for tonight's performances.</p>
                        </div>
                        <div className="p-8 border rounded-xl shadow-sm bg-card hover:shadow-md transition-shadow">
                            <h2 className="text-2xl font-bold mb-4">Dinner Menu</h2>
                            <p>See what's cooking for the grand freshers dinner.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FreshPage;
