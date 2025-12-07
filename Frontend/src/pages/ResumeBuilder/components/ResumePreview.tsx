import React from 'react';
import { Mail, Phone, MapPin, Linkedin, Globe, GraduationCap, Code, Sparkles, Trophy, User, Briefcase, FileText } from 'lucide-react';

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
    description: string;
    link: string;
}

interface Achievement {
    id: number;
    title: string;
    description: string;
}

interface ResumeData {
    title: string;
    personal: {
        fullName: string;
        email: string;
        phone: string;
        location: string;
        linkedin: string;
        website: string;
        imageUrl: string;
    };
    summary: string;
    experience: Experience[];
    education: Education[];
    projects: Project[];
    skills: string[];
    achievements: Achievement[];
}

interface ResumePreviewProps {
    resumeData: ResumeData;
    viewMode: 'edit' | 'preview';
    previewScale: number;
    resumeRef: React.RefObject<HTMLDivElement>;
    containerRef: React.RefObject<HTMLDivElement>;
}

const ResumePreview: React.FC<ResumePreviewProps> = ({ resumeData, viewMode, previewScale, resumeRef, containerRef }) => {
    return (
        <div className={`w-full lg:w-1/2 bg-transparent shadow-none overflow-visible flex flex-col mb-6 lg:mb-0 print:w-full print:shadow-none print:h-auto print:flex print:overflow-visible lg:h-[calc(100vh-140px)] lg:overflow-y-auto lg:sticky lg:top-36 ${viewMode === 'preview' ? 'flex' : 'hidden lg:flex'}`}>
            <div className="hidden print:hidden">
                <span className="font-medium flex items-center">
                    <FileText className="w-4 h-4 mr-2" /> Live Preview
                </span>
                <span className="text-xs text-gray-400">A4 Format</span>
            </div>

            <div ref={containerRef} className="flex-1 flex items-start justify-center bg-transparent p-2 lg:p-8 print:p-0 print:overflow-visible relative min-h-[600px] pb-8 overflow-visible">
                <style>{`
                    @media print {
                        body { -webkit-print-color-adjust: exact; }
                        .resume-preview-wrapper { 
                            transform: none !important; 
                            width: 210mm !important;
                            height: auto !important;
                            margin: 0 auto !important;
                            overflow: visible !important;
                            border: none !important;
                            box-shadow: none !important;
                        }
                        /* Ensure strict A4 dimensions for the internal container */
                        .resume-preview-wrapper > div {
                            width: 100% !important;
                            height: 100% !important;
                            box-shadow: none !important;
                            margin: 0 !important;
                        }
                        /* Hide scrollbars in print */
                        ::-webkit-scrollbar { display: none; }
                    }
                `}</style>
                <div
                    style={{
                        transform: `scale(${previewScale})`,
                        transformOrigin: 'top center',
                        width: '210mm', // Fixed A4 width
                        height: '297mm', // Fixed A4 height (Single Page)
                        overflow: 'hidden', // Enforce single page
                        boxShadow: 'none',
                        border: 'none',
                        margin: '0 auto',
                        display: 'block'
                    }}
                    className="resume-preview-wrapper transition-transform duration-200 ease-out origin-top-center inline-block bg-white shadow-none border-none lg:sticky lg:top-24"
                >
                    <div
                        ref={resumeRef}
                        className="bg-white w-full min-h-full p-[40px] text-left print:shadow-none print:m-0 print:w-full print:h-full box-border"
                    >
                        {/* Resume Header */}
                        <div className="border-b-2 border-gray-800 pb-6 mb-6">
                            <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
                                <div className="order-2 sm:order-1">
                                    <h1
                                        className="text-[18px] font-bold text-gray-900 mb-1 uppercase tracking-wide break-words print:text-[18px]"
                                    >
                                        {resumeData.personal.fullName || "YOUR NAME"}
                                    </h1>
                                </div>
                                {resumeData.personal.imageUrl && (
                                    <div className="order-1 sm:order-2 self-start">
                                        <img
                                            src={resumeData.personal.imageUrl}
                                            alt="Profile"
                                            className="w-20 h-20 rounded-full object-cover border-2 border-gray-200"
                                        />
                                    </div>
                                )}
                            </div>
                            <div className="flex flex-wrap gap-4 mt-4 text-[10px] text-gray-600 print:text-[10px]">
                                {resumeData.personal.email && (
                                    <div className="flex items-center">
                                        <Mail className="w-2 h-2 mr-1 flex-shrink-0" /> <span className="break-all">{resumeData.personal.email}</span>
                                    </div>
                                )}
                                {resumeData.personal.phone && (
                                    <div className="flex items-center">
                                        <Phone className="w-2 h-2 mr-1 flex-shrink-0" /> {resumeData.personal.phone}
                                    </div>
                                )}
                                {resumeData.personal.location && (
                                    <div className="flex items-center">
                                        <MapPin className="w-2 h-2 mr-1 flex-shrink-0" /> {resumeData.personal.location}
                                    </div>
                                )}
                                {resumeData.personal.linkedin && (
                                    <div className="flex items-center">
                                        <Linkedin className="w-2 h-2 mr-1 flex-shrink-0" /> <span className="break-all">{resumeData.personal.linkedin}</span>
                                    </div>
                                )}
                                {resumeData.personal.website && (
                                    <div className="flex items-center">
                                        <Globe className="w-2 h-2 mr-1 flex-shrink-0" /> <span className="break-all">{resumeData.personal.website}</span>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Resume Content Grid */}
                        <div className="grid grid-cols-12 gap-3 sm:gap-4 lg:gap-8 print:grid print:grid-cols-12 print:gap-8">
                            {/* Left Column - Education, Projects, Skills, Achievements */}
                            <div className="col-span-5 order-1 border-r-2 border-gray-200 pr-4 lg:pr-6 space-y-4 print:col-span-5 print:pr-6">
                                {/* Education Section */}
                                {resumeData.education.length > 0 && resumeData.education[0].school && (
                                    <section>
                                        <h3 className="text-[10px] font-bold text-gray-900 uppercase tracking-wider border-b border-gray-200 pb-1 mb-3 flex items-center print:text-[10px]">
                                            <GraduationCap className="w-3 h-3 mr-2" /> Education
                                        </h3>
                                        <div className="space-y-4">
                                            {resumeData.education.map((edu) => (
                                                <div key={edu.id}>
                                                    <h4 className="font-bold text-gray-800 text-[10px] print:text-[10px]">{edu.school}</h4>
                                                    <div className="text-[10px] text-gray-600 print:text-[10px]">{edu.degree}</div>
                                                    <div className="text-[10px] text-gray-500 mt-1 print:text-[10px]">{edu.year}</div>
                                                </div>
                                            ))}
                                        </div>
                                    </section>
                                )}

                                {/* Projects Section */}
                                {resumeData.projects.length > 0 && resumeData.projects[0].name && (
                                    <section>
                                        <h3 className="text-[10px] font-bold text-gray-900 uppercase tracking-wider border-b border-gray-200 pb-1 mb-3 flex items-center print:text-[10px]">
                                            <Code className="w-3 h-3 mr-2" /> Projects
                                        </h3>
                                        <div className="space-y-3">
                                            {resumeData.projects.map((proj) => (
                                                <div key={proj.id} className="bg-gray-50 p-3 rounded border border-gray-100">
                                                    <div className="flex flex-col print:flex-col justify-between items-start mb-1">
                                                        <h4 className="font-bold text-gray-800 text-[10px] print:text-[10px]">{proj.name}</h4>
                                                        {proj.link && (
                                                            <a href={`https://${proj.link.replace(/^https?:\/\//, '')}`} target="_blank" rel="noreferrer" className="text-[10px] mt-1 print:mt-1 text-blue-600 hover:underline break-all print:text-[10px]">
                                                                View Project
                                                            </a>
                                                        )}
                                                    </div>
                                                    <p className="text-[10px] text-gray-700 leading-relaxed print:text-[10px]">
                                                        {proj.description}
                                                    </p>
                                                </div>
                                            ))}
                                        </div>
                                    </section>
                                )}

                                {/* Skills Section */}
                                {resumeData.skills.length > 0 && resumeData.skills[0] && (
                                    <section>
                                        <h3 className="text-[10px] font-bold text-gray-900 uppercase tracking-wider border-b border-gray-200 pb-1 mb-3 flex items-center print:text-[10px]">
                                            <Sparkles className="w-3 h-3 mr-2" /> Skills
                                        </h3>
                                        <div className="flex flex-wrap gap-2">
                                            {resumeData.skills.map((skill: string, index: number) => (
                                                skill && (
                                                    <span key={index} className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-[10px] font-medium border border-gray-200 print:text-[10px]">
                                                        {skill}
                                                    </span>
                                                )
                                            ))}
                                        </div>
                                    </section>
                                )}

                                {/* Achievements Section */}
                                {resumeData.achievements.length > 0 && resumeData.achievements[0].title && (
                                    <section>
                                        <h3 className="text-[10px] font-bold text-gray-900 uppercase tracking-wider border-b border-gray-200 pb-1 mb-3 flex items-center print:text-[10px]">
                                            <Trophy className="w-3 h-3 mr-2" /> Achievements
                                        </h3>
                                        <div className="space-y-3">
                                            {resumeData.achievements.map((achievement) => (
                                                <div key={achievement.id}>
                                                    <h4 className="font-bold text-gray-800 text-[10px] print:text-[10px]">{achievement.title}</h4>
                                                    <p className="text-[10px] text-gray-700 leading-relaxed mt-1 print:text-[10px]">
                                                        {achievement.description}
                                                    </p>
                                                </div>
                                            ))}
                                        </div>
                                    </section>
                                )}
                            </div>

                            {/* Right Column - Summary, Experience */}
                            <div className="col-span-7 order-2 space-y-4 sm:space-y-6 print:col-span-7">
                                {/* Summary Section */}
                                {resumeData.summary && (
                                    <section>
                                        <h3 className="text-[10px] font-bold text-gray-900 uppercase tracking-wider border-b border-gray-200 pb-1 mb-3 flex items-center print:text-[10px]">
                                            <User className="w-3 h-3 mr-2" /> Professional Summary
                                        </h3>
                                        <p className="text-[10px] text-gray-700 leading-relaxed text-justify print:text-[10px]">
                                            {resumeData.summary}
                                        </p>
                                    </section>
                                )}

                                {/* Experience Section */}
                                {resumeData.experience.length > 0 && resumeData.experience[0].company && (
                                    <section>
                                        <h3 className="text-[10px] font-bold text-gray-900 uppercase tracking-wider border-b border-gray-200 pb-1 mb-3 flex items-center print:text-[10px]">
                                            <Briefcase className="w-3 h-3 mr-2" /> Work Experience
                                        </h3>
                                        <div className="space-y-4">
                                            {resumeData.experience.map((exp) => (
                                                <div key={exp.id} className="relative pl-4 border-l-2 border-gray-100">
                                                    <div className="absolute -left-[5px] top-1.5 w-2 h-2 rounded-full bg-gray-300"></div>
                                                    <div className="flex flex-col sm:flex-row justify-between items-baseline mb-1">
                                                        <h4 className="font-bold text-gray-800 text-[10px] print:text-[10px]">{exp.role}</h4>
                                                        <span className="text-[10px] text-gray-500 font-medium print:text-[10px]">{exp.duration}</span>
                                                    </div>
                                                    <div className="text-[10px] text-gray-600 font-medium mb-1 print:text-[10px]">{exp.company}</div>
                                                    <p className="text-[10px] text-gray-700 whitespace-pre-line leading-relaxed text-justify print:text-[10px]">
                                                        {exp.description}
                                                    </p>
                                                </div>
                                            ))}
                                        </div>
                                    </section>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ResumePreview;
