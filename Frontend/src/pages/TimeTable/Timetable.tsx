import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import authService from '@/services/authService';
import { Loader2, Calendar, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const DEPARTMENTS = ["MCA", "MBA", "ECE", "CSE", "EEE", "AIML", "AI", "DA", "Mechanicals"];

interface Cell {
    id: string;
    text: string;
    rowSpan: number;
    colSpan: number;
    hidden: boolean;
    r: number;
    c: number;
    value?: string;
    isVertical?: boolean;
}

const Timetable = () => {
    interface Course {
        code: string;
        title: string;
        facultyName: string;
        facultyId: string;
    }

    const navigate = useNavigate();
    const [selectedDept, setSelectedDept] = useState(DEPARTMENTS[0]);
    const [semester, setSemester] = useState("1");
    const [academicYear, setAcademicYear] = useState("2025-2026");
    const [date, setDate] = useState("30-06-2025");
    const [docRef, setDocRef] = useState("DCA-F014");
    const [classInCharge, setClassInCharge] = useState("");
    const [courses, setCourses] = useState<Course[]>([]);
    const [grid, setGrid] = useState<Cell[][]>([]);
    const [loading, setLoading] = useState(false);

    const user = authService.getCurrentUser();

    useEffect(() => {
        const fetchTimetable = async () => {
            if (!user?.id) return;

            setLoading(true);
            try {
                const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5003/api'}/timetable/${user?.id}?department=${encodeURIComponent(selectedDept)}`);
                const data = await response.json();
                if (data.success && data.timetable) {
                    const scheduleData = data.timetable.schedule;
                    setGrid(Array.isArray(scheduleData) ? scheduleData : []);
                    setSemester(data.timetable.semester || "1");
                    setAcademicYear(data.timetable.academicYear || "2025-2026");
                    setDate(data.timetable.date || "");
                    setDocRef(data.timetable.docRef || "DCA-F014");
                    setClassInCharge(data.timetable.classInCharge || "");
                    setCourses(data.timetable.courses || []);
                } else {
                    setGrid([]);
                    setSemester("1");
                    setAcademicYear("2025-2026");
                    setDate("30-06-2025");
                    setDocRef("DCA-F014");
                    setClassInCharge("");
                    setCourses([]);
                }
            } catch (error) {
                console.error("Failed to fetch timetable", error);
                setGrid([]);
            } finally {
                setLoading(false);
            }
        };

        fetchTimetable();
    }, [user?.id, selectedDept]);

    return (
        <div className="min-h-screen bg-white text-slate-900 font-sans">
            <main className="container mx-auto px-4 py-8">
                <div className="mb-4">
                    <Button variant="ghost" size="sm" onClick={() => navigate('/timetable/landing')}>
                        <ArrowLeft className="h-4 w-4 mr-2" /> Back
                    </Button>
                </div>

                <div className="printable-area">
                    {/* Header Info Section */}
                    <div className="border-b-2 border-slate-300 mb-6 pb-4 font-serif bg-slate-50 p-4 rounded-lg shadow-sm">
                        <div className="flex flex-col lg:flex-row justify-between items-start gap-6">
                            <div className="flex flex-col gap-3 w-full lg:w-1/2">
                                <h1 className="text-xl md:text-2xl font-bold uppercase tracking-wide text-slate-800">CLASS TIME-TABLE</h1>
                                <div className="space-y-2">
                                    <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                                        <span className="font-bold text-sm text-slate-600 w-32">DEPARTMENT:</span>
                                        <select
                                            aria-label="Department Selection"
                                            value={selectedDept}
                                            onChange={(e) => setSelectedDept(e.target.value)}
                                            className="font-semibold text-sm bg-white border border-slate-300 rounded-md px-3 py-1.5 focus:ring-2 focus:ring-slate-400 outline-none w-full sm:w-auto transition-all no-print"
                                        >
                                            {DEPARTMENTS.map(dept => (
                                                <option key={dept} value={dept}>{dept}</option>
                                            ))}
                                        </select>
                                        <span className="font-semibold text-sm bg-white border border-slate-300 rounded-md px-3 py-1.5 w-full sm:w-auto department-print-value">
                                            {selectedDept}
                                        </span>
                                    </div>
                                    <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                                        <span className="font-bold text-sm text-slate-600 w-32">ACADEMIC YEAR:</span>
                                        <span className="font-semibold text-slate-900 bg-white border border-slate-300 rounded-md px-3 py-1.5 w-full sm:w-auto block">{academicYear}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col gap-3 w-full lg:w-1/2 lg:items-end">
                                <div className="hidden lg:flex justify-end mb-1">
                                    <span className="font-mono text-xs text-slate-400">{docRef}</span>
                                </div>
                                <div className="space-y-2 w-full lg:w-auto">
                                    <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 lg:justify-end">
                                        <span className="font-bold text-sm text-slate-600 w-32 lg:w-24 lg:text-right">DATE:</span>
                                        <span className="font-semibold text-slate-900 bg-white border border-slate-300 rounded-md px-3 py-1.5 w-full sm:w-48 block">{date}</span>
                                    </div>
                                    <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 lg:justify-end">
                                        <span className="font-bold text-sm text-slate-600 w-32 lg:w-24 lg:text-right">CLASS/SEM:</span>
                                        <span className="font-semibold text-slate-900 bg-white border border-slate-300 rounded-md px-3 py-1.5 w-full sm:w-48 block">{semester}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {loading ? (
                        <div className="flex justify-center py-20">
                            <Loader2 className="h-10 w-10 text-orange-400 animate-spin" />
                        </div>
                    ) : (
                        <>
                            {/* Timetable Grid */}
                            <div className="mb-6 overflow-x-auto border rounded-md shadow-sm bg-white">
                                {grid.length > 0 ? (
                                    <div className="min-w-[800px] md:min-w-full">
                                        <table className="w-full border-collapse bg-white">
                                            <tbody>
                                                {grid.map((row, r) => (
                                                    <tr key={`row-${r}`} className="h-[40px] md:h-[50px]">
                                                        {row.map((cell, c) => {
                                                            if (cell.hidden) return null;
                                                            return (
                                                                <td
                                                                    key={cell.id || `${r}-${c}`}
                                                                    rowSpan={cell.rowSpan}
                                                                    colSpan={cell.colSpan}
                                                                    className="border border-slate-300 p-1 md:p-2 min-w-[60px] md:min-w-[100px]"
                                                                    style={{ verticalAlign: 'middle' }}
                                                                >
                                                                    <div className="relative w-full h-full flex items-center justify-center">
                                                                        <div
                                                                            style={{
                                                                                writingMode: cell.isVertical ? 'vertical-lr' : undefined,
                                                                                textOrientation: cell.isVertical ? 'upright' : undefined,
                                                                                letterSpacing: cell.isVertical ? '1px' : undefined
                                                                            }}
                                                                            className={`text-center flex items-center justify-center w-full font-medium leading-tight overflow-hidden text-[10px] md:text-xs break-words px-1`}
                                                                        >
                                                                            {cell.text || cell.value}
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                            );
                                                        })}
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                ) : (
                                    <div className="text-center py-12 text-slate-500 bg-slate-50">
                                        <Calendar className="w-12 h-12 mx-auto mb-3 text-slate-300" />
                                        <p>No timetable schedule available.</p>
                                    </div>
                                )}
                            </div>
                        </>
                    )}
                </div>

                {/* Course Details Table */}
                <div>
                    {loading ? null : (
                        <>
                            <div className="mb-2 font-bold text-xs">
                                NOTE: *T=TUTORIAL CLASS, SLP=SELF LEARNING PERIOD
                            </div>
                            {courses.length > 0 && (
                                <div className="border border-slate-200 rounded-lg overflow-hidden shadow-sm bg-white">
                                    <div className="bg-slate-50 p-3 border-b border-slate-200 flex flex-col sm:flex-row gap-2 justify-between items-start sm:items-center">
                                        <div className="font-bold text-sm text-slate-700">Class In-charge</div>
                                        <div className="font-mono text-sm px-3 py-1 bg-white border rounded shadow-sm">
                                            {classInCharge || "N/A"}
                                        </div>
                                    </div>
                                    <div className="overflow-x-auto">
                                        <table className="w-full text-left text-sm whitespace-nowrap md:whitespace-normal min-w-[600px]">
                                            <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200">
                                                <tr>
                                                    <th className="p-3 w-16 text-center">S.No.</th>
                                                    <th className="p-3 w-32 border-l border-slate-200 ">Course Code</th>
                                                    <th className="p-3 border-l border-slate-200">Course Title</th>
                                                    <th className="p-3 w-64 border-l border-slate-200">Name of the Faculty</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-slate-100">
                                                {courses.map((course, idx) => (
                                                    <tr key={idx}>
                                                        <td className="p-3 text-center text-slate-500">{idx + 1}</td>
                                                        <td className="p-3 font-mono text-xs border-l border-slate-100">{course.code}</td>
                                                        <td className="p-3 font-medium border-l border-slate-100 whitespace-normal">{course.title}</td>
                                                        <td className="p-3 border-l border-slate-100">
                                                            <div className="flex flex-col sm:flex-row sm:justify-between gap-1">
                                                                <span className="text-slate-700">{course.facultyName}</span>
                                                                <span className="text-[10px] text-slate-400 font-mono bg-slate-100 px-1 rounded w-fit">{course.facultyId}</span>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </main>
        </div>
    );
};

export default Timetable;
