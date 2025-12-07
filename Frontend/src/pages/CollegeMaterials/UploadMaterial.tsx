import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import { UploadCloud, ArrowLeft, FileText } from 'lucide-react';
import axios from 'axios';
import authService from '@/services/authService';

const UploadMaterial = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const user = authService.getCurrentUser();
        if (!user || user.role !== 'faculty') {
            toast.error('Only faculty members can upload materials.');
            navigate('/college-materials');
        }
    }, [navigate]);
    const [formData, setFormData] = useState({
        collegeName: 'DVR & Dr. HS MIC College of Technology',
        facultyName: '',
        course: '',
        semester: '',
        title: '',
        description: '',
        subject: '',
        unit: '',
    });
    const [file, setFile] = useState<File | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!file) {
            toast.error('Please select a file');
            return;
        }

        setLoading(true);

        try {
            const data = new FormData();
            data.append('file', file);
            data.append('collegeName', formData.collegeName);
            data.append('facultyName', formData.facultyName);
            data.append('course', formData.course);
            data.append('semester', formData.semester);
            data.append('title', formData.title);
            data.append('description', formData.description);
            data.append('subject', formData.subject);
            data.append('unit', formData.unit);

            await axios.post(`${import.meta.env.VITE_API_URL || 'http://localhost:5003/api'}/materials/upload`, data, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            toast.success('Material uploaded successfully!');
            navigate('/college-materials');
        } catch (error) {
            console.error('Error uploading material:', error);
            toast.error('Failed to upload material');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-background via-secondary/30 to-background">
            <Navbar />

            <div className="container mx-auto px-4 pt-32 pb-12 max-w-3xl">
                <Button
                    variant="ghost"
                    className="mb-6 hover:bg-secondary"
                    onClick={() => navigate('/materials')}
                >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back
                </Button>

                <Card className="border-2 border-primary/20 shadow-xl">
                    <CardHeader className="space-y-4">
                        <div className="flex items-center gap-4">
                            <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg">
                                <UploadCloud className="h-7 w-7 text-background" />
                            </div>
                            <div>
                                <CardTitle className="text-3xl font-display text-foreground">Upload Material</CardTitle>
                                <CardDescription className="text-base">Share educational materials with the students</CardDescription>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Faculty Information Section */}
                            <div className="p-4 rounded-lg bg-primary/5 border border-primary/20 space-y-4">
                                <h3 className="text-lg font-semibold text-foreground">Faculty Information (Required)</h3>

                                <div className="grid gap-4 md:grid-cols-2">
                                    <div>
                                        <Label htmlFor="collegeName" className="text-base font-medium">College Name *</Label>
                                        <Input
                                            id="collegeName"
                                            value={formData.collegeName}
                                            readOnly
                                            disabled
                                            className="mt-2 border-2 border-primary/20 bg-muted cursor-not-allowed"
                                        />
                                    </div>

                                    <div>
                                        <Label htmlFor="facultyName" className="text-base font-medium">Faculty Name *</Label>
                                        <Input
                                            id="facultyName"
                                            required
                                            value={formData.facultyName}
                                            onChange={(e) => setFormData({ ...formData, facultyName: e.target.value })}
                                            placeholder="Enter faculty name"
                                            className="mt-2 border-2 border-primary/20 focus:border-primary"
                                        />
                                    </div>
                                </div>

                                <div className="grid gap-4 md:grid-cols-2">
                                    <div>
                                        <Label htmlFor="course" className="text-base font-medium">Course *</Label>
                                        <Input
                                            id="course"
                                            required
                                            value={formData.course}
                                            onChange={(e) => setFormData({ ...formData, course: e.target.value })}
                                            placeholder="e.g., B.Tech Computer Science"
                                            className="mt-2 border-2 border-primary/20 focus:border-primary"
                                        />
                                    </div>

                                    <div>
                                        <Label htmlFor="semester" className="text-base font-medium">Semester *</Label>
                                        <Input
                                            id="semester"
                                            required
                                            value={formData.semester}
                                            onChange={(e) => setFormData({ ...formData, semester: e.target.value })}
                                            placeholder="e.g., 3rd Semester"
                                            className="mt-2 border-2 border-primary/20 focus:border-primary"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* PDF Details Section */}
                            <div>
                                <Label htmlFor="title" className="text-base font-medium">Title *</Label>
                                <Input
                                    id="title"
                                    required
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                    placeholder="Enter PDF title"
                                    className="mt-2 border-2 border-primary/20 focus:border-primary"
                                />
                            </div>

                            <div>
                                <Label htmlFor="description" className="text-base font-medium">Additional Description</Label>
                                <Textarea
                                    id="description"
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    placeholder="Brief description of the content (optional)"
                                    rows={3}
                                    className="mt-2 border-2 border-primary/20 focus:border-primary"
                                />
                            </div>

                            <div className="grid gap-4 md:grid-cols-2">
                                <div>
                                    <Label htmlFor="subject" className="text-base font-medium">Subject *</Label>
                                    <Input
                                        id="subject"
                                        required
                                        value={formData.subject}
                                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                                        placeholder="e.g., Mathematics"
                                        className="mt-2 border-2 border-primary/20 focus:border-primary"
                                    />
                                </div>

                                <div>
                                    <Label htmlFor="unit" className="text-base font-medium">Unit</Label>
                                    <Input
                                        id="unit"
                                        value={formData.unit}
                                        onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
                                        placeholder="e.g., Unit 1"
                                        className="mt-2 border-2 border-primary/20 focus:border-primary"
                                    />
                                </div>
                            </div>

                            <div>
                                <Label className="text-base font-medium block mb-2">PDF File *</Label>
                                <div className="relative">
                                    <input
                                        id="file"
                                        type="file"
                                        accept=".pdf"
                                        required
                                        onChange={(e) => setFile(e.target.files?.[0] || null)}
                                        className="hidden"
                                    />
                                    <label
                                        htmlFor="file"
                                        className={`flex flex-col items-center justify-center w-full h-40 border-2 border-dashed rounded-xl cursor-pointer transition-all duration-300 ${file
                                            ? 'border-blue-500 bg-blue-50/50'
                                            : 'border-blue-300 hover:border-blue-500 hover:bg-blue-50'
                                            }`}
                                    >
                                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                            {file ? (
                                                <>
                                                    <div className="h-12 w-12 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mb-3">
                                                        <FileText className="w-6 h-6" />
                                                    </div>
                                                    <p className="text-sm font-medium text-blue-600">{file.name}</p>
                                                    <p className="text-xs text-blue-400 mt-1">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                                                </>
                                            ) : (
                                                <>
                                                    <div className="h-12 w-12 rounded-full bg-blue-50 text-blue-500 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                                                        <UploadCloud className="w-6 h-6" />
                                                    </div>
                                                    <p className="mb-2 text-sm text-gray-500">
                                                        <span className="font-semibold text-blue-600">Click to upload</span> or drag and drop
                                                    </p>
                                                    <p className="text-xs text-gray-400">PDF (MAX. 10MB)</p>
                                                </>
                                            )}
                                        </div>
                                    </label>
                                </div>
                            </div>

                            <Button type="submit" className="w-full text-lg py-6" disabled={loading}>
                                {loading ? 'Uploading...' : 'Upload Material'}
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default UploadMaterial;
