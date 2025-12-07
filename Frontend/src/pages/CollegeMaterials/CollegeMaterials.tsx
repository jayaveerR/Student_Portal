import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
    FileText,
    Download,
    User,
    BookOpen,
    School,
    Calendar,
    ArrowLeft,
    Filter,
    ArrowRight,
} from "lucide-react";
import axios from "axios";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import CollegeDashboard from "./CollegeDashboard";

interface Material {
    _id: string;
    collegeName: string;
    facultyName: string;
    course: string;
    semester: string;
    title: string;
    description: string;
    subject: string;
    unit: string;
    ipfsUrl: string;
    uploadedAt: string;
}

const CourseFilterButton = ({
    active,
    label,
    onClick,
}: {
    active: boolean;
    label: string;
    onClick: () => void;
}) => (
    <button
        onClick={onClick}
        className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 border ${active
            ? "bg-primary text-primary-foreground border-primary shadow-md transform scale-105"
            : "bg-background text-muted-foreground border-border hover:border-primary/50 hover:text-primary hover:bg-secondary"
            }`}
    >
        {label}
    </button>
);

const CollegeMaterials = () => {
    const navigate = useNavigate();
    const [materials, setMaterials] = useState<Material[]>([]);
    const [loading, setLoading] = useState(true);

    // Filters
    const [courseFilter, setCourseFilter] = useState("");
    const [semesterFilter, setSemesterFilter] = useState("");
    const [subjectFilter, setSubjectFilter] = useState("");
    const [selectedDept, setSelectedDept] = useState("All");

    const departments = ["MCA", "MBA", "EEE", "CSE", "AI/DS", "Mechanical"];

    useEffect(() => {
        const fetchMaterials = async () => {
            try {
                const response = await axios.get(
                    "http://192.168.1.4:5003/api/materials"
                );
                setMaterials(response.data);
            } catch (error) {
                console.error("Error fetching materials:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchMaterials();
    }, []);

    const handleDownload = (url: string) => {
        window.open(url, "_blank");
    };

    const filteredMaterials = materials.filter((material) => {
        const matchDept =
            selectedDept === "All" ||
            material.course.includes(selectedDept) ||
            material.subject.includes(selectedDept);
        const matchCourse = material.course
            .toLowerCase()
            .includes(courseFilter.toLowerCase());
        const matchSemester = semesterFilter
            ? material.semester
                .toString()
                .toLowerCase()
                .includes(semesterFilter.toLowerCase())
            : true;
        const matchSubject = material.subject
            .toLowerCase()
            .includes(subjectFilter.toLowerCase());
        return matchDept && matchCourse && matchSemester && matchSubject;
    });

    return (
        <div className="min-h-screen bg-background">
            <Navbar />
            <div className="container mx-auto px-4 pt-32 pb-12">
                <div className="flex justify-between items-center mb-6">
                    <Button
                        variant="ghost"
                        className="hover:bg-secondary"
                        onClick={() => navigate("/materials")}
                    >
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back
                    </Button>
                    <Button
                        variant="ghost"
                        className="hover:bg-secondary"
                        onClick={() => navigate("/college-dashboard")}
                    >
                        <ArrowRight className="w-4 h-4 mr-2" />
                        Dashboard
                    </Button>
                </div>

                <div className="mb-12 text-center space-y-4">
                    <Badge
                        variant="secondary"
                        className="px-4 py-2 text-primary bg-primary/10 hover:bg-primary/20 text-sm"
                    >
                        <School className="w-4 h-4 mr-2" />
                        DVR & Dr. HS MIC College of Technology
                    </Badge>
                    <h1 className="text-4xl md:text-6xl font-display font-bold text-foreground">
                        College Materials
                    </h1>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        Access study materials, lecture notes, and question papers uploaded
                        by your faculty.
                    </p>
                </div>

                {/* Filter Section */}
                <div className="mb-8 p-6 bg-card rounded-2xl border border-border shadow-sm">
                    <div className="flex flex-col gap-6">
                        {/* Department Buttons */}
                        <div className="flex flex-wrap gap-2 justify-center pb-4 border-b border-border/50">
                            <CourseFilterButton
                                active={selectedDept === "All"}
                                label="All Departments"
                                onClick={() => setSelectedDept("All")}
                            />
                            {departments.map((dept) => (
                                <CourseFilterButton
                                    key={dept}
                                    active={selectedDept === dept}
                                    label={dept}
                                    onClick={() => setSelectedDept(dept)}
                                />
                            ))}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            <div className="space-y-2">
                                <label className="text-xs font-medium text-muted-foreground ml-1">
                                    Course
                                </label>
                                <div className="relative">
                                    <FileText className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                    <input
                                        type="text"
                                        placeholder="Search Course..."
                                        value={courseFilter}
                                        onChange={(e) => setCourseFilter(e.target.value)}
                                        className="w-full h-10 pl-9 pr-4 rounded-lg border border-input bg-background/50 hover:bg-background focus:ring-2 focus:ring-primary/20 transition-all outline-none text-sm"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-medium text-muted-foreground ml-1">
                                    Semester
                                </label>
                                <div className="relative">
                                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                    <select
                                        aria-label="Filter by Semester"
                                        value={semesterFilter}
                                        onChange={(e) => setSemesterFilter(e.target.value)}
                                        className="w-full h-10 pl-9 pr-4 rounded-lg border border-input bg-background/50 hover:bg-background focus:ring-2 focus:ring-primary/20 transition-all outline-none text-sm appearance-none cursor-pointer"
                                    >
                                        <option value="">All Semesters</option>
                                        {["1st", "2nd", "3rd", "4th", "5th", "6th", "7th", "8th"].map(
                                            (sem) => (
                                                <option key={sem} value={sem}>
                                                    {sem} Semester
                                                </option>
                                            )
                                        )}
                                    </select>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-medium text-muted-foreground ml-1">
                                    Subject
                                </label>
                                <div className="relative">
                                    <BookOpen className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                    <input
                                        type="text"
                                        placeholder="Search Subject..."
                                        value={subjectFilter}
                                        onChange={(e) => setSubjectFilter(e.target.value)}
                                        className="w-full h-10 pl-9 pr-4 rounded-lg border border-input bg-background/50 hover:bg-background focus:ring-2 focus:ring-primary/20 transition-all outline-none text-sm"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {loading ? (
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {[1, 2, 3, 4, 5, 6].map((i) => (
                            <Card
                                key={i}
                                className="overflow-hidden border-2 border-muted h-full"
                            >
                                <CardHeader className="space-y-4 pb-4">
                                    <div className="flex justify-between items-start">
                                        <Skeleton className="h-12 w-12 rounded-xl" />
                                        <Skeleton className="h-6 w-24 rounded-full" />
                                    </div>
                                    <div className="space-y-2">
                                        <Skeleton className="h-6 w-3/4" />
                                        <Skeleton className="h-4 w-1/2" />
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-4">
                                        <Skeleton className="h-20 w-full rounded-lg" />
                                        <Skeleton className="h-10 w-full" />
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                ) : filteredMaterials.length === 0 ? (
                    <div className="text-center py-20 bg-secondary/20 rounded-3xl border-2 border-dashed border-muted-foreground/20">
                        <div className="w-20 h-20 bg-background rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
                            <FileText className="w-10 h-10 text-muted-foreground" />
                        </div>
                        <h3 className="text-2xl font-semibold text-foreground mb-2">
                            No materials found
                        </h3>
                        <p className="text-muted-foreground">
                            Try adjusting your filters to find what you're looking for.
                        </p>
                    </div>
                ) : (
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {filteredMaterials.map((material) => (
                            <Card
                                key={material._id}
                                className="group hover:shadow-xl transition-all duration-300 border-2 border-muted hover:border-primary/20"
                            >
                                <CardHeader className="space-y-4 pb-4">
                                    <div className="flex justify-between items-start">
                                        <div className="h-12 w-12 rounded-xl bg-blue-500/10 text-blue-600 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                            <BookOpen className="h-6 w-6" />
                                        </div>
                                        <Badge
                                            variant="outline"
                                            className="border-primary/20 text-primary bg-primary/5"
                                        >
                                            {material.subject}
                                        </Badge>
                                    </div>
                                    <div>
                                        <CardTitle className="text-xl line-clamp-1 group-hover:text-primary transition-colors">
                                            {material.title}
                                        </CardTitle>
                                        <CardDescription className="flex items-center mt-2 text-sm">
                                            <User className="w-4 h-4 mr-1.5" />
                                            {material.facultyName}
                                        </CardDescription>
                                    </div>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="p-4 rounded-lg bg-secondary/50 space-y-3 text-sm">
                                        <div className="flex items-center justify-between text-muted-foreground">
                                            <span className="flex items-center">
                                                <School className="w-3.5 h-3.5 mr-2" />
                                                Course
                                            </span>
                                            <span className="font-medium text-foreground">
                                                {material.course}
                                            </span>
                                        </div>
                                        <div className="flex items-center justify-between text-muted-foreground">
                                            <span className="flex items-center">
                                                <Calendar className="w-3.5 h-3.5 mr-2" />
                                                Semester
                                            </span>
                                            <span className="font-medium text-foreground">
                                                {material.semester}
                                            </span>
                                        </div>
                                    </div>

                                    {material.description && (
                                        <p className="text-sm text-muted-foreground line-clamp-2">
                                            {material.description}
                                        </p>
                                    )}

                                    <Button
                                        className="w-full group/btn"
                                        variant="default"
                                        onClick={() => handleDownload(material.ipfsUrl)}
                                    >
                                        View Material
                                        <Download className="w-4 h-4 ml-2 group-hover/btn:translate-y-0.5 transition-transform" />
                                    </Button>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default CollegeMaterials;
