import React, { useState, useRef, useEffect, Component, ErrorInfo } from "react";
import Navbar from "@/components/Navbar";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { ArrowLeft, FileEdit, FileText } from "lucide-react";

// Components
import ResumeForm from "./components/ResumeForm";
import ResumePreview from "./components/ResumePreview";

class ErrorBoundary extends Component<{ children: React.ReactNode }, { hasError: boolean, error: Error | null }> {
    constructor(props: { children: React.ReactNode }) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error: Error) {
        return { hasError: true, error };
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error("Uncaught error:", error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="p-8 m-8 bg-red-50 border border-red-200 rounded-lg text-red-800 max-w-2xl mx-auto">
                    <h2 className="text-2xl font-bold mb-4">Something went wrong</h2>
                    <p className="mb-4">The application encountered an error. Please try refreshing the page.</p>
                    <div className="bg-white p-4 rounded border border-red-100 overflow-auto max-h-96">
                        <p className="font-mono text-sm font-bold text-red-600 mb-2">{this.state.error?.message}</p>
                        <pre className="font-mono text-xs text-gray-500 whitespace-pre-wrap">{this.state.error?.stack}</pre>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}

const ResumeBuilderContent = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState("personal");
    const [viewMode, setViewMode] = useState<'edit' | 'preview'>('edit');
    const [isEnhancing, setIsEnhancing] = useState(false);
    const resumeRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [previewScale, setPreviewScale] = useState(1);

    // Handle Resize for A4 Scaling
    useEffect(() => {
        const handleResize = () => {
            if (containerRef.current) {
                const containerWidth = containerRef.current.offsetWidth;
                const a4Width = 794; // 210mm estimated width
                // Calculate scale: fit a4Width into containerWidth with some padding
                const scale = Math.min((containerWidth - 32) / a4Width, 1);
                setPreviewScale(scale < 0.8 ? 0.8 : scale);
            }
        };

        handleResize(); // Initial
        window.addEventListener('resize', handleResize);
        // Also fire when view mode changes to preview
        if (viewMode === 'preview') {
            setTimeout(handleResize, 100);
        }

        return () => window.removeEventListener('resize', handleResize);
    }, [viewMode]);

    // Resume State
    const [resumeData, setResumeData] = useState({
        title: location.state?.title || "My Resume",
        personal: {
            fullName: "",
            email: "",
            phone: "",
            location: "",
            linkedin: "",
            website: "",
            imageUrl: ""
        },
        summary: "",
        experience: [
            { id: 1, company: "", role: "", duration: "", description: "" }
        ],
        education: [
            { id: 1, school: "", degree: "", year: "" }
        ],
        projects: [
            { id: 1, name: "", description: "", link: "" }
        ],
        skills: [""],
        achievements: [
            { id: 1, title: "", description: "" }
        ]
    });

    // Handlers
    const handlePersonalChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setResumeData(prev => ({
            ...prev,
            personal: { ...prev.personal, [name]: value }
        }));
    };

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setResumeData(prev => ({
                    ...prev,
                    personal: { ...prev.personal, imageUrl: reader.result as string }
                }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSummaryChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setResumeData(prev => ({ ...prev, summary: e.target.value }));
    };

    // Experience Handlers
    const addExperience = () => {
        setResumeData(prev => ({
            ...prev,
            experience: [...prev.experience, { id: Date.now(), company: "", role: "", duration: "", description: "" }]
        }));
    };

    const removeExperience = (id: number) => {
        setResumeData(prev => ({
            ...prev,
            experience: prev.experience.filter(exp => exp.id !== id)
        }));
    };

    const updateExperience = (id: number, field: string, value: string) => {
        setResumeData(prev => ({
            ...prev,
            experience: prev.experience.map(exp =>
                exp.id === id ? { ...exp, [field]: value } : exp
            )
        }));
    };

    // Education Handlers
    const addEducation = () => {
        setResumeData(prev => ({
            ...prev,
            education: [...prev.education, { id: Date.now(), school: "", degree: "", year: "" }]
        }));
    };

    const removeEducation = (id: number) => {
        setResumeData(prev => ({
            ...prev,
            education: prev.education.filter(edu => edu.id !== id)
        }));
    };

    const updateEducation = (id: number, field: string, value: string) => {
        setResumeData(prev => ({
            ...prev,
            education: prev.education.map(edu =>
                edu.id === id ? { ...edu, [field]: value } : edu
            )
        }));
    };

    // Projects Handlers
    const addProject = () => {
        setResumeData(prev => ({
            ...prev,
            projects: [...prev.projects, { id: Date.now(), name: "", description: "", link: "" }]
        }));
    };

    const removeProject = (id: number) => {
        setResumeData(prev => ({
            ...prev,
            projects: prev.projects.filter(proj => proj.id !== id)
        }));
    };

    const updateProject = (id: number, field: string, value: string) => {
        setResumeData(prev => ({
            ...prev,
            projects: prev.projects.map(proj =>
                proj.id === id ? { ...proj, [field]: value } : proj
            )
        }));
    };

    // Skills Handlers
    const addSkill = () => {
        setResumeData(prev => ({
            ...prev,
            skills: [...prev.skills, ""]
        }));
    };

    const removeSkill = (index: number) => {
        setResumeData(prev => ({
            ...prev,
            skills: prev.skills.filter((_, i) => i !== index)
        }));
    };

    const updateSkill = (index: number, value: string) => {
        const newSkills = [...resumeData.skills];
        newSkills[index] = value;
        setResumeData(prev => ({ ...prev, skills: newSkills }));
    };

    // Achievements Handlers
    const addAchievement = () => {
        setResumeData(prev => ({
            ...prev,
            achievements: [...prev.achievements, { id: Date.now(), title: "", description: "" }]
        }));
    };

    const removeAchievement = (id: number) => {
        setResumeData(prev => ({
            ...prev,
            achievements: prev.achievements.filter(ach => ach.id !== id)
        }));
    };

    const updateAchievement = (id: number, field: string, value: string) => {
        setResumeData(prev => ({
            ...prev,
            achievements: prev.achievements.map(ach =>
                ach.id === id ? { ...ach, [field]: value } : ach
            )
        }));
    };

    // AI Enhance Function - calls backend OpenAI API
    const handleAIEnhance = async (type: 'summary' | 'experience', text: string, id?: number) => {
        if (!text) {
            toast.error("Please enter some text to enhance");
            return;
        }

        setIsEnhancing(true);
        try {
            const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5003';
            const response = await fetch(`${API_URL}/api/ai/enhance`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ text, type }),
            });

            const data = await response.json();

            if (data.success && data.enhancedText) {
                if (type === 'summary') {
                    setResumeData(prev => ({ ...prev, summary: data.enhancedText }));
                } else if (type === 'experience' && id) {
                    updateExperience(id, 'description', data.enhancedText);
                }
                toast.success("Text enhanced successfully!");
            } else {
                const errorMsg = data.error || data.message || "Failed to enhance text";
                toast.error(errorMsg);
            }
        } catch (error) {
            console.error("AI Enhance Error:", error);
            toast.error("Failed to connect to AI service. Please ensure the backend is running.");
        } finally {
            setIsEnhancing(false);
        }
    };

    // Download Function
    const handleDownload = () => {
        window.print();
    };

    // Bundle handlers to pass to ResumeForm
    const handlers = {
        handlePersonalChange, handleImageUpload, handleSummaryChange,
        addExperience, removeExperience, updateExperience,
        addEducation, removeEducation, updateEducation,
        addProject, removeProject, updateProject,
        addSkill, removeSkill, updateSkill,
        addAchievement, removeAchievement, updateAchievement,
        handleAIEnhance, setResumeData
    };

    return (
        <div className="min-h-screen bg-background print:bg-white">
            <div className="print:hidden relative">
                <Navbar />

                {/* Desktop: Top-Right Back Button below navbar */}
                <div className="hidden lg:flex fixed right-6 top-24 z-50 print:hidden">
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => navigate('/resume')}
                        className="text-gray-600 hover:text-gray-900 flex items-center gap-2 bg-white/90 backdrop-blur-sm border border-gray-200 shadow-sm px-3 py-2"
                    >
                        <ArrowLeft className="w-4 h-4" /> Back to Resume
                    </Button>
                </div>
            </div>

            {/* Main Container - Adjusted Padding for Fixed Navbar and Full Height */}
            <div className="pt-20 lg:pt-28 px-4 max-w-[1920px] mx-auto min-h-screen flex flex-col print:pt-0 print:px-0 print:block">

                {/* Toggle Buttons - Mobile/Tablet Only */}
                <div className="fixed top-16 md:top-20 left-0 right-0 bg-white border-b border-gray-200 z-40 px-4 py-2 print:hidden shadow-sm lg:hidden">
                    <div className="flex gap-2 max-w-[1600px] mx-auto justify-start items-center">
                        <Button
                            size="icon"
                            variant="ghost"
                            title="Back"
                            onClick={() => navigate('/resume')}
                            className="h-8 w-8 mr-2 text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                        >
                            <ArrowLeft className="w-5 h-5" />
                        </Button>
                        <div className="h-6 w-px bg-gray-300 mx-1"></div>
                        <Button
                            size="icon"
                            title="Edit"
                            onClick={() => setViewMode('edit')}
                            className={`h-8 w-8 transition-all ${viewMode === 'edit' ? 'bg-green-600 text-white hover:bg-green-700 shadow-md ring-1 ring-green-600' : 'bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-gray-900 border border-gray-200'}`}
                        >
                            <FileEdit className="w-4 h-4" />
                        </Button>
                        <Button
                            size="icon"
                            title="Preview"
                            onClick={() => setViewMode('preview')}
                            className={`h-8 w-8 transition-all ${viewMode === 'preview' ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-md ring-1 ring-blue-600' : 'bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-gray-900 border border-gray-200'}`}
                        >
                            <FileText className="w-4 h-4" />
                        </Button>
                    </div>
                </div>

                {/* Content Wrapper for Side-by-Side Layout */}
                <div className="flex flex-col lg:flex-row lg:gap-8 w-full items-start flex-1">

                    <ResumeForm
                        resumeData={resumeData}
                        handlers={handlers}
                        activeTab={activeTab}
                        setActiveTab={setActiveTab}
                        isEnhancing={isEnhancing}
                        viewMode={viewMode}
                        handleDownload={handleDownload}
                    />

                    <ResumePreview
                        resumeData={resumeData}
                        viewMode={viewMode}
                        previewScale={previewScale}
                        resumeRef={resumeRef}
                        containerRef={containerRef}
                    />

                </div>
            </div>
        </div>
    );
};

const ResumeBuilder = () => {
    return (
        <ErrorBoundary>
            <ResumeBuilderContent />
        </ErrorBoundary>
    );
};

export default ResumeBuilder;
