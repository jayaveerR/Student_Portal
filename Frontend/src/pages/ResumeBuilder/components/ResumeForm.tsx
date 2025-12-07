import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
    User, FileText, Briefcase, GraduationCap,
    Code, Sparkles, Download, ChevronRight, ChevronLeft, Plus, Trash2,
    Image as ImageIcon, Upload, Trophy
} from "lucide-react";

interface Experience {
    id: number;
    company: string;
    role: string;
    duration: string;
    description: string;
}

interface Education {
    id: number;
    school: string;
    degree: string;
    year: string;
}

interface Project {
    id: number;
    name: string;
    link: string;
    description: string;
}

interface Achievement {
    id: number;
    title: string;
    description: string;
}

interface PersonalInfo {
    fullName: string;
    email: string;
    phone: string;
    location: string;
    linkedin: string;
    website: string;
    imageUrl: string;
}

export interface ResumeData {
    title: string;
    personal: PersonalInfo;
    summary: string;
    experience: Experience[];
    education: Education[];
    projects: Project[];
    skills: string[];
    achievements: Achievement[];
}

interface ResumeFormProps {
    resumeData: ResumeData;
    handlers: {
        handlePersonalChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
        handleImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
        handleSummaryChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
        addExperience: () => void;
        removeExperience: (id: number) => void;
        updateExperience: (id: number, field: string, value: string) => void;
        addEducation: () => void;
        removeEducation: (id: number) => void;
        updateEducation: (id: number, field: string, value: string) => void;
        addProject: () => void;
        removeProject: (id: number) => void;
        updateProject: (id: number, field: string, value: string) => void;
        addSkill: () => void;
        removeSkill: (index: number) => void;
        updateSkill: (index: number, value: string) => void;
        addAchievement: () => void;
        removeAchievement: (id: number) => void;
        updateAchievement: (id: number, field: string, value: string) => void;
        handleAIEnhance: (type: 'summary' | 'experience', text: string, id?: number) => void;
        setResumeData: React.Dispatch<React.SetStateAction<ResumeData>>;
    };
    activeTab: string;
    setActiveTab: (tab: string) => void;
    isEnhancing: boolean;
    viewMode: 'edit' | 'preview';
    handleDownload: () => void;
}

const ResumeForm: React.FC<ResumeFormProps> = ({
    resumeData,
    handlers,
    activeTab,
    setActiveTab,
    isEnhancing,
    viewMode,
    handleDownload
}) => {
    const {
        handlePersonalChange, handleImageUpload, handleSummaryChange,
        addExperience, removeExperience, updateExperience,
        addEducation, removeEducation, updateEducation,
        addProject, removeProject, updateProject,
        addSkill, removeSkill, updateSkill,
        addAchievement, removeAchievement, updateAchievement,
        handleAIEnhance, setResumeData
    } = handlers;

    return (
        <div className={`w-full lg:w-1/2 flex flex-col min-h-[calc(100vh-120px)] lg:h-[calc(100vh-140px)] lg:overflow-y-auto print:hidden pr-2 custom-scrollbar ${viewMode === 'edit' ? 'flex' : 'hidden lg:flex'}`}>
            <div className="mb-4 sm:mb-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                <h1 className="text-xl sm:text-3xl font-bold font-roboto-condensed">{resumeData.title}</h1>
                <Button onClick={handleDownload} className="w-full sm:w-auto bg-green-600 hover:bg-green-700 h-10">
                    <Download className="w-4 h-4 mr-2" />
                    Download PDF
                </Button>
            </div>

            <Card className="flex-1 overflow-hidden flex flex-col border-border/50 shadow-md bg-white">
                <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col overflow-hidden">
                    <div className="px-2 sm:px-4 pt-2 sm:pt-4 border-b border-border bg-white z-10">
                        <TabsList className="w-full justify-start overflow-x-auto h-auto p-1 bg-transparent gap-2 no-scrollbar">
                            <TabsTrigger value="personal" className="min-w-[100px] sm:min-w-fit data-[state=active]:bg-green-50 data-[state=active]:text-green-700 border border-transparent data-[state=active]:border-green-200">
                                <User className="w-4 h-4 mr-2" /> Personal
                            </TabsTrigger>
                            <TabsTrigger value="summary" className="min-w-[100px] sm:min-w-fit data-[state=active]:bg-green-50 data-[state=active]:text-green-700 border border-transparent data-[state=active]:border-green-200">
                                <FileText className="w-4 h-4 mr-2" /> Summary
                            </TabsTrigger>
                            <TabsTrigger value="experience" className="min-w-[100px] sm:min-w-fit data-[state=active]:bg-green-50 data-[state=active]:text-green-700 border border-transparent data-[state=active]:border-green-200">
                                <Briefcase className="w-4 h-4 mr-2" /> Experience
                            </TabsTrigger>
                            <TabsTrigger value="education" className="min-w-[100px] sm:min-w-fit data-[state=active]:bg-green-50 data-[state=active]:text-green-700 border border-transparent data-[state=active]:border-green-200">
                                <GraduationCap className="w-4 h-4 mr-2" /> Education
                            </TabsTrigger>
                            <TabsTrigger value="projects" className="min-w-[100px] sm:min-w-fit data-[state=active]:bg-green-50 data-[state=active]:text-green-700 border border-transparent data-[state=active]:border-green-200">
                                <Code className="w-4 h-4 mr-2" /> Projects
                            </TabsTrigger>
                            <TabsTrigger value="skills" className="min-w-[100px] sm:min-w-fit data-[state=active]:bg-green-50 data-[state=active]:text-green-700 border border-transparent data-[state=active]:border-green-200">
                                <Sparkles className="w-4 h-4 mr-2" /> Skills
                            </TabsTrigger>
                            <TabsTrigger value="achievements" className="min-w-[100px] sm:min-w-fit data-[state=active]:bg-green-50 data-[state=active]:text-green-700 border border-transparent data-[state=active]:border-green-200">
                                <Trophy className="w-4 h-4 mr-2" /> Achievements
                            </TabsTrigger>
                        </TabsList>
                    </div>

                    <div className="flex-1 overflow-hidden bg-card/50 flex flex-col w-full">
                        {/* Personal Info Tab */}
                        <TabsContent value="personal" className="flex flex-col h-full mt-0 data-[state=active]:flex">
                            <div className="flex-1 overflow-y-auto p-4 sm:p-6">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pb-4">
                                    <div className="space-y-2">
                                        <Label>Full Name *</Label>
                                        <Input name="fullName" value={resumeData.personal.fullName} onChange={handlePersonalChange} placeholder="John Doe" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Email *</Label>
                                        <Input name="email" value={resumeData.personal.email} onChange={handlePersonalChange} placeholder="john@example.com" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Phone *</Label>
                                        <Input name="phone" value={resumeData.personal.phone} onChange={handlePersonalChange} placeholder="+1 234 567 890" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Location *</Label>
                                        <Input name="location" value={resumeData.personal.location} onChange={handlePersonalChange} placeholder="New York, NY" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>LinkedIn</Label>
                                        <Input name="linkedin" value={resumeData.personal.linkedin} onChange={handlePersonalChange} placeholder="linkedin.com/in/johndoe" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Website</Label>
                                        <Input name="website" value={resumeData.personal.website} onChange={handlePersonalChange} placeholder="johndoe.com" />
                                    </div>
                                    <div className="col-span-1 sm:col-span-2 space-y-2">
                                        <Label className="flex items-center gap-2">
                                            <ImageIcon className="w-4 h-4 text-gray-500" /> Profile Image
                                            <span className="text-xs text-gray-400 font-normal">(Optional)</span>
                                        </Label>
                                        <div className="flex items-center gap-4 p-4 border border-dashed border-gray-300 rounded-lg bg-gray-50/50 hover:bg-gray-50 transition-colors">
                                            <div className="relative shrink-0">
                                                {resumeData.personal.imageUrl ? (
                                                    <img
                                                        src={resumeData.personal.imageUrl}
                                                        alt="Preview"
                                                        className="w-16 h-16 rounded-full object-cover border-2 border-white shadow-md"
                                                    />
                                                ) : (
                                                    <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center text-gray-400">
                                                        <User className="w-8 h-8" />
                                                    </div>
                                                )}
                                                {resumeData.personal.imageUrl && (
                                                    <Button
                                                        size="icon"
                                                        variant="destructive"
                                                        className="absolute -top-1 -right-1 w-5 h-5 rounded-full"
                                                        onClick={() => setResumeData(prev => ({ ...prev, personal: { ...prev.personal, imageUrl: "" } }))}
                                                    >
                                                        <Trash2 className="w-3 h-3" />
                                                    </Button>
                                                )}
                                            </div>
                                            <div className="flex-1">
                                                <div className="relative">
                                                    <Input
                                                        type="file"
                                                        accept="image/*"
                                                        onChange={handleImageUpload}
                                                        className="cursor-pointer opacity-0 absolute inset-0 w-full h-full z-10"
                                                    />
                                                    <Button variant="outline" className="w-full flex gap-2 pointer-events-none">
                                                        <Upload className="w-4 h-4" />
                                                        {resumeData.personal.imageUrl ? "Change Photo" : "Upload Photo"}
                                                    </Button>
                                                </div>
                                                <p className="text-xs text-gray-500 mt-2">
                                                    Supported formats: JPG, PNG. Max size: 2MB.
                                                    <br />
                                                    <span className="text-green-600 font-medium">Clear, professional headshots recommended.</span>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="p-4 border-t bg-white flex justify-end shrink-0 sticky bottom-0 z-20 shadow-[0_-5px_15px_rgba(0,0,0,0.1)]">
                                <Button onClick={() => setActiveTab("summary")} className="bg-green-600 hover:bg-green-700 w-full sm:w-auto shadow-sm">
                                    Next <ChevronRight className="w-4 h-4 ml-2" />
                                </Button>
                            </div>
                        </TabsContent>

                        {/* Summary Tab */}
                        <TabsContent value="summary" className="flex flex-col h-full mt-0 data-[state=active]:flex">
                            <div className="flex-1 overflow-y-auto p-4 sm:p-6">
                                <div className="space-y-2">
                                    <div className="flex justify-between items-center">
                                        <Label>Professional Summary</Label>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => handleAIEnhance('summary', resumeData.summary)}
                                            disabled={isEnhancing}
                                            className="text-white bg-gradient-to-r from-violet-600 to-indigo-600 border-none hover:opacity-90 shadow-sm transition-all"
                                        >
                                            <Sparkles className={`w-3 h-3 mr-2 ${isEnhancing ? 'animate-spin' : ''}`} />
                                            {isEnhancing ? "Enhancing..." : "AI Enhance"}
                                        </Button>
                                    </div>
                                    <Textarea
                                        value={resumeData.summary}
                                        onChange={handleSummaryChange}
                                        placeholder="Experienced software engineer with..."
                                        className="h-40"
                                    />
                                </div>
                            </div>
                            <div className="p-4 border-t bg-white flex justify-between shrink-0 sticky bottom-0 z-20 shadow-[0_-5px_15px_rgba(0,0,0,0.1)]">
                                <Button variant="outline" onClick={() => setActiveTab("personal")} className="shadow-sm">
                                    <ChevronLeft className="w-4 h-4 mr-2" /> Previous
                                </Button>
                                <Button onClick={() => setActiveTab("experience")} className="bg-green-600 hover:bg-green-700 shadow-sm">
                                    Next <ChevronRight className="w-4 h-4 ml-2" />
                                </Button>
                            </div>
                        </TabsContent>

                        {/* Experience Tab */}
                        <TabsContent value="experience" className="flex flex-col h-full mt-0 data-[state=active]:flex">
                            <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
                                <div className="space-y-4">
                                    {resumeData.experience.map((exp) => (
                                        <Card key={exp.id} className="p-4 relative border-l-4 border-l-green-500 shadow-sm">
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="absolute top-2 right-2 text-destructive hover:bg-destructive/10"
                                                onClick={() => removeExperience(exp.id)}
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </Button>
                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                                                <div className="space-y-2">
                                                    <Label>Company</Label>
                                                    <Input value={exp.company} onChange={(e) => updateExperience(exp.id, 'company', e.target.value)} placeholder="Company Name" />
                                                </div>
                                                <div className="space-y-2">
                                                    <Label>Role</Label>
                                                    <Input value={exp.role} onChange={(e) => updateExperience(exp.id, 'role', e.target.value)} placeholder="Job Title" />
                                                </div>
                                                <div className="col-span-1 sm:col-span-2 space-y-2">
                                                    <Label>Duration</Label>
                                                    <Input value={exp.duration} onChange={(e) => updateExperience(exp.id, 'duration', e.target.value)} placeholder="Jan 2020 - Present" />
                                                </div>
                                                <div className="col-span-1 sm:col-span-2 space-y-2">
                                                    <div className="flex justify-between items-center">
                                                        <Label>Description</Label>
                                                        <Button
                                                            variant="ghost"
                                                            size="sm"
                                                            onClick={() => handleAIEnhance('experience', exp.description, exp.id)}
                                                            disabled={isEnhancing}
                                                            className="text-indigo-600 hover:bg-indigo-50 hover:text-indigo-700 text-xs px-2 h-7"
                                                        >
                                                            <Sparkles className={`w-3 h-3 mr-1 ${isEnhancing ? 'animate-spin' : ''}`} />
                                                            AI Enhance
                                                        </Button>
                                                    </div>
                                                    <Textarea
                                                        value={exp.description}
                                                        onChange={(e) => updateExperience(exp.id, 'description', e.target.value)}
                                                        placeholder="Job responsibilities..."
                                                        className="min-h-[100px]"
                                                    />
                                                </div>
                                            </div>
                                        </Card>
                                    ))}
                                </div>
                                <Button variant="outline" onClick={addExperience} className="w-full border-dashed border-2 hover:border-green-500 hover:text-green-600 mt-4">
                                    <Plus className="w-4 h-4 mr-2" /> Add Experience
                                </Button>
                            </div>
                            <div className="p-4 border-t bg-white flex justify-between shrink-0 sticky bottom-0 z-20 shadow-[0_-5px_15px_rgba(0,0,0,0.1)]">
                                <Button variant="outline" onClick={() => setActiveTab("summary")} className="shadow-sm">
                                    <ChevronLeft className="w-4 h-4 mr-2" /> Previous
                                </Button>
                                <Button onClick={() => setActiveTab("education")} className="bg-green-600 hover:bg-green-700 shadow-sm">
                                    Next <ChevronRight className="w-4 h-4 ml-2" />
                                </Button>
                            </div>
                        </TabsContent>

                        {/* Education Tab */}
                        <TabsContent value="education" className="flex flex-col h-full mt-0 data-[state=active]:flex">
                            <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
                                <div className="space-y-6">
                                    {resumeData.education.map((edu) => (
                                        <Card key={edu.id} className="p-4 relative">
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="absolute top-2 right-2 text-destructive hover:bg-destructive/10"
                                                onClick={() => removeEducation(edu.id)}
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </Button>
                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                                <div className="space-y-2">
                                                    <Label>School/University</Label>
                                                    <Input value={edu.school} onChange={(e) => updateEducation(edu.id, 'school', e.target.value)} placeholder="University Name" />
                                                </div>
                                                <div className="space-y-2">
                                                    <Label>Degree</Label>
                                                    <Input value={edu.degree} onChange={(e) => updateEducation(edu.id, 'degree', e.target.value)} placeholder="Bachelor's in CS" />
                                                </div>
                                                <div className="col-span-1 sm:col-span-2 space-y-2">
                                                    <Label>Year</Label>
                                                    <Input value={edu.year} onChange={(e) => updateEducation(edu.id, 'year', e.target.value)} placeholder="2018 - 2022" />
                                                </div>
                                            </div>
                                        </Card>
                                    ))}
                                </div>
                                <Button variant="outline" onClick={addEducation} className="w-full border-dashed mt-4">
                                    <Plus className="w-4 h-4 mr-2" /> Add Education
                                </Button>
                            </div>
                            <div className="p-4 border-t bg-white flex justify-between shrink-0 sticky bottom-0 z-20 shadow-[0_-5px_15px_rgba(0,0,0,0.1)]">
                                <Button variant="outline" onClick={() => setActiveTab("experience")} className="shadow-sm">
                                    <ChevronLeft className="w-4 h-4 mr-2" /> Previous
                                </Button>
                                <Button onClick={() => setActiveTab("projects")} className="bg-green-600 hover:bg-green-700 shadow-sm">
                                    Next <ChevronRight className="w-4 h-4 ml-2" />
                                </Button>
                            </div>
                        </TabsContent>

                        {/* Projects Tab */}
                        <TabsContent value="projects" className="flex flex-col h-full mt-0 data-[state=active]:flex">
                            <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 ">
                                <div className="space-y-6">
                                    {resumeData.projects.map((proj) => (
                                        <Card key={proj.id} className="p-4 relative">
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="absolute top-2 right-2 text-destructive hover:bg-destructive/10"
                                                onClick={() => removeProject(proj.id)}
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </Button>
                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                                                <div className="space-y-2">
                                                    <Label>Project Name</Label>
                                                    <Input value={proj.name} onChange={(e) => updateProject(proj.id, 'name', e.target.value)} placeholder="Project Name" />
                                                </div>
                                                <div className="space-y-2">
                                                    <Label>Link (Optional)</Label>
                                                    <Input value={proj.link} onChange={(e) => updateProject(proj.id, 'link', e.target.value)} placeholder="github.com/project" />
                                                </div>
                                                <div className="col-span-1 sm:col-span-2 space-y-2">
                                                    <Label>Description</Label>
                                                    <Textarea value={proj.description} onChange={(e) => updateProject(proj.id, 'description', e.target.value)} placeholder="Project details..." />
                                                </div>
                                            </div>
                                        </Card>
                                    ))}
                                </div>
                                <Button variant="outline" onClick={addProject} className="w-full border-dashed mt-4">
                                    <Plus className="w-4 h-4 mr-2" /> Add Project
                                </Button>
                            </div>
                            <div className="p-4 border-t bg-white flex justify-between shrink-0 sticky bottom-0 z-20 shadow-[0_-5px_15px_rgba(0,0,0,0.1)]">
                                <Button variant="outline" onClick={() => setActiveTab("education")} className="shadow-sm">
                                    <ChevronLeft className="w-4 h-4 mr-2" /> Previous
                                </Button>
                                <Button onClick={() => setActiveTab("skills")} className="bg-green-600 hover:bg-green-700 shadow-sm">
                                    Next <ChevronRight className="w-4 h-4 ml-2" />
                                </Button>
                            </div>
                        </TabsContent>

                        {/* Skills Tab */}
                        <TabsContent value="skills" className="flex flex-col h-full mt-0 data-[state=active]:flex">
                            <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
                                <div className="space-y-4">
                                    <Label>Skills</Label>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        {resumeData.skills.map((skill: string, index: number) => (
                                            <div key={index} className="flex gap-2">
                                                <Input
                                                    value={skill}
                                                    onChange={(e) => updateSkill(index, e.target.value)}
                                                    placeholder="e.g. React, Node.js"
                                                />
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="text-destructive hover:bg-destructive/10"
                                                    onClick={() => removeSkill(index)}
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </Button>
                                            </div>
                                        ))}
                                    </div>
                                    <Button variant="outline" onClick={addSkill} className="w-full border-dashed mt-4">
                                        <Plus className="w-4 h-4 mr-2" /> Add Skill
                                    </Button>
                                </div>
                            </div>
                            <div className="p-4 border-t bg-white flex justify-between shrink-0 sticky bottom-0 z-20 shadow-[0_-5px_15px_rgba(0,0,0,0.1)]">
                                <Button variant="outline" onClick={() => setActiveTab("projects")} className="shadow-sm">
                                    <ChevronLeft className="w-4 h-4 mr-2" /> Previous
                                </Button>
                                <Button onClick={() => setActiveTab("achievements")} className="bg-green-600 hover:bg-green-700 shadow-sm">
                                    Next <ChevronRight className="w-4 h-4 ml-2" />
                                </Button>
                            </div>
                        </TabsContent>

                        {/* Achievements Tab */}
                        <TabsContent value="achievements" className="flex flex-col h-full mt-0 data-[state=active]:flex">
                            <div className="flex-1 overflow-y-auto p-4 sm:p-6">
                                <div className="space-y-4">
                                    {resumeData.achievements.map((achievement) => (
                                        <Card key={achievement.id} className="p-4 relative border-green-100">
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="absolute top-2 right-2 text-destructive hover:bg-destructive/10"
                                                onClick={() => removeAchievement(achievement.id)}
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </Button>
                                            <div className="space-y-4">
                                                <div className="space-y-2">
                                                    <Label>Achievement Title *</Label>
                                                    <Input
                                                        value={achievement.title}
                                                        onChange={(e) => updateAchievement(achievement.id, 'title', e.target.value)}
                                                        placeholder="e.g. Best Project Award"
                                                    />
                                                </div>
                                                <div className="space-y-2">
                                                    <Label>Description</Label>
                                                    <Textarea
                                                        value={achievement.description}
                                                        onChange={(e) => updateAchievement(achievement.id, 'description', e.target.value)}
                                                        placeholder="Describe your achievement..."
                                                        rows={3}
                                                    />
                                                </div>
                                            </div>
                                        </Card>
                                    ))}
                                </div>
                                <Button variant="outline" onClick={addAchievement} className="w-full border-dashed mt-4">
                                    <Plus className="w-4 h-4 mr-2" /> Add Achievement
                                </Button>
                            </div>
                            <div className="p-4 border-t bg-white flex justify-between shrink-0 sticky bottom-0 z-20 shadow-[0_-5px_15px_rgba(0,0,0,0.1)]">
                                <Button variant="outline" onClick={() => setActiveTab("skills")} className="shadow-sm">
                                    <ChevronLeft className="w-4 h-4 mr-2" /> Previous
                                </Button>
                                <Button onClick={handleDownload} className="bg-green-600 hover:bg-green-700 shadow-sm">
                                    <Download className="w-4 h-4 mr-2" /> Download PDF
                                </Button>
                            </div>
                        </TabsContent>
                    </div>
                </Tabs>
            </Card>
        </div>
    );
};

export default ResumeForm;
