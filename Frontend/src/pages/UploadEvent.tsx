import { useState, useRef, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ArrowLeft, ArrowRight, Upload, FileSpreadsheet, FileText, X } from "lucide-react";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import axios from 'axios';
import authService from "@/services/authService";

const UploadEvent = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [excelFile, setExcelFile] = useState<File | null>(null);
    const [pdfFile, setPdfFile] = useState<File | null>(null);
    const [eventName, setEventName] = useState("");
    const [course, setCourse] = useState("");

    useEffect(() => {
        const user = authService.getCurrentUser();
        if (!user || (user.role !== 'faculty' && user.role !== 'CR')) {
            toast.error("Access Denied: Only Faculty and CRs can upload events.");
            navigate('/events');
        }
    }, [navigate]);

    const excelInputRef = useRef<HTMLInputElement>(null);
    const pdfInputRef = useRef<HTMLInputElement>(null);

    const handleUpload = async () => {
        if (!eventName) {
            toast.error("Please enter an event name");
            return;
        }

        if (!course) {
            toast.error("Please select a course");
            return;
        }

        if (!excelFile && !pdfFile) {
            toast.error("Please select at least one file to upload");
            return;
        }

        setLoading(true);
        const formData = new FormData();
        formData.append('title', eventName);
        formData.append('course', course);
        if (excelFile) formData.append('excel', excelFile);
        if (pdfFile) formData.append('pdf', pdfFile);

        try {
            await axios.post('http://192.168.1.4:5003/api/events/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            toast.success("Event uploaded successfully!");
            navigate('/events/payment');
        } catch (error) {
            console.error(error);
            toast.error("Failed to upload event");
        } finally {
            setLoading(false);
        }
    };

    const FileUploadBox = ({
        title,
        file,
        setFile,
        accept,
        icon: Icon,
        inputRef,
        colorClass
    }: {
        title: string,
        file: File | null,
        setFile: (f: File | null) => void,
        accept: string,
        icon: React.ElementType,
        inputRef: React.RefObject<HTMLInputElement>,
        colorClass: string
    }) => (
        <div
            className={`border-2 border-dashed rounded-xl p-6 sm:p-8 flex flex-col items-center justify-center cursor-pointer transition-all duration-300 group min-h-[180px] sm:min-h-[200px]
                ${file
                    ? `border-${colorClass} bg-${colorClass}/5`
                    : 'border-border hover:border-gray-400 hover:bg-gray-50'}`}
            onClick={() => inputRef.current?.click()}
        >
            <input
                type="file"
                ref={inputRef}
                className="hidden"
                accept={accept}
                aria-label={title}
                onChange={(e) => setFile(e.target.files?.[0] || null)}
            />

            {file ? (
                <div className="text-center relative w-full">
                    <div className={`w-16 h-16 rounded-full bg-${colorClass}/10 flex items-center justify-center mx-auto mb-4`}>
                        <Icon className={`w-8 h-8 text-${colorClass}`} />
                    </div>
                    <p className="font-semibold text-foreground truncate max-w-xs mx-auto">{file.name}</p>
                    <p className="text-sm text-muted-foreground mt-1">{(file.size / 1024).toFixed(1)} KB</p>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="absolute -top-4 -right-4 hover:bg-destructive/10 hover:text-destructive rounded-full"
                        onClick={(e) => {
                            e.stopPropagation();
                            setFile(null);
                            if (inputRef.current) inputRef.current.value = '';
                        }}
                    >
                        <X className="w-4 h-4" />
                    </Button>
                </div>
            ) : (
                <div className="text-center">
                    <div className={`w-16 h-16 rounded-full bg-gray-100 group-hover:bg-${colorClass}/10 flex items-center justify-center mx-auto mb-4 transition-colors`}>
                        <Icon className={`w-8 h-8 text-gray-400 group-hover:text-${colorClass} transition-colors`} />
                    </div>
                    <p className="font-medium text-foreground">{title}</p>
                    <p className="text-sm text-muted-foreground mt-1">Click to browse or drag file here</p>
                </div>
            )}
        </div>
    );

    return (
        <div className="min-h-screen bg-background flex flex-col">
            <Navbar />

            <div className="flex-grow container mx-auto px-4 py-8 mt-16">
                <div className="max-w-4xl mx-auto">
                    {/* Header Section */}
                    <div className="text-center mb-8 sm:mb-10 space-y-3 sm:space-y-4">
                        <h1 className="text-2xl sm:text-3xl font-bold text-[#4a1942] px-2">
                            DVR & Dr. HS MIC College of Technology
                        </h1>
                        <p className="text-lg sm:text-xl text-muted-foreground px-2">Upload Event Data Panel</p>
                    </div>

                    <Card className="border-t-4 border-t-[#4a1942] shadow-lg">
                        <CardHeader>
                            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                                <div className="w-full sm:w-auto">
                                    <CardTitle className="text-xl sm:text-2xl">Create New Event</CardTitle>
                                    <CardDescription className="text-sm sm:text-base">Upload Excel for student data and PDF for event brochure</CardDescription>
                                </div>
                                <Button variant="outline" asChild className="w-full sm:w-auto">
                                    <Link to="/events">
                                        <ArrowLeft className="mr-2 h-4 w-4" />
                                        Back
                                    </Link>
                                </Button>
                            </div>
                        </CardHeader>

                        <CardContent className="space-y-6 sm:space-y-8">
                            {/* Event Name Input */}
                            <div className="space-y-2 sm:space-y-3">
                                <Label htmlFor="eventName" className="text-base sm:text-lg">Event Title</Label>
                                <Input
                                    id="eventName"
                                    placeholder="e.g. Annual Tech Summit 2025"
                                    value={eventName}
                                    onChange={(e) => setEventName(e.target.value)}
                                    className="h-11 sm:h-12 text-base sm:text-lg"
                                />
                            </div>

                            {/* Course Selection */}
                            <div className="space-y-2 sm:space-y-3">
                                <Label htmlFor="course" className="text-base sm:text-lg">Select Course</Label>
                                <Select onValueChange={setCourse} value={course}>
                                    <SelectTrigger className="h-11 sm:h-12 text-base sm:text-lg">
                                        <SelectValue placeholder="Select Course for this Event" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="MCA">MCA</SelectItem>
                                        <SelectItem value="MBA">MBA</SelectItem>
                                        <SelectItem value="EEE">EEE</SelectItem>
                                        <SelectItem value="CSE">CSE</SelectItem>
                                        <SelectItem value="MECHANICAL">Mechanical</SelectItem>
                                        <SelectItem value="AI/DS">AI/DS</SelectItem>
                                        <SelectItem value="ENGINEERING">Engineering</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            {/* Upload Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-8">
                                {/* Excel Upload */}
                                <div className="space-y-2 sm:space-y-3">
                                    <Label className="text-sm sm:text-base font-medium flex items-center gap-2">
                                        <FileSpreadsheet className="w-4 h-4 text-green-600" />
                                        Student Data (Excel)
                                    </Label>
                                    <FileUploadBox
                                        title="Upload Excel File"
                                        file={excelFile}
                                        setFile={setExcelFile}
                                        accept=".xlsx, .xls"
                                        icon={FileSpreadsheet}
                                        inputRef={excelInputRef}
                                        colorClass="green-600"
                                    />
                                </div>

                                {/* PDF Upload */}
                                <div className="space-y-2 sm:space-y-3">
                                    <Label className="text-sm sm:text-base font-medium flex items-center gap-2">
                                        <FileText className="w-4 h-4 text-red-600" />
                                        Event Brochure (PDF)
                                    </Label>
                                    <FileUploadBox
                                        title="Upload PDF File"
                                        file={pdfFile}
                                        setFile={setPdfFile}
                                        accept=".pdf"
                                        icon={FileText}
                                        inputRef={pdfInputRef}
                                        colorClass="red-600"
                                    />
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="pt-4 sm:pt-6 flex flex-col sm:flex-row justify-end gap-3 sm:gap-4">
                                <Button
                                    variant="outline"
                                    size="lg"
                                    className="px-6 sm:px-8 py-5 sm:py-6 text-base sm:text-lg w-full md:w-auto order-2 sm:order-1"
                                    onClick={() => navigate('/events/payment')}
                                >
                                    Next
                                    <ArrowRight className="ml-2 h-4 sm:h-5 w-4 sm:w-5" />
                                </Button>

                                <Button
                                    size="lg"
                                    className="bg-[#4a1942] hover:bg-[#3a1435] px-6 sm:px-8 py-5 sm:py-6 text-base sm:text-lg w-full md:w-auto order-1 sm:order-2"
                                    onClick={handleUpload}
                                    disabled={loading}
                                >
                                    {loading ? (
                                        "Processing..."
                                    ) : (
                                        <>
                                            Upload & Continue
                                            <Upload className="ml-2 h-4 sm:h-5 w-4 sm:w-5" />
                                        </>
                                    )}
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default UploadEvent;
