import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Printer, Plus, Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import collegeLogo from '@/assets/college.jpg';
import authService from '@/services/authService';

interface Question {
    id: string;
    sNo: string;
    unit: string;
    question: string;
    co: string;
    btl: string;
    marks: string;
}

const QuestionPaperGenerator = () => {
    const navigate = useNavigate();
    const printRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const user = authService.getCurrentUser();
        if (!user || user.role !== 'faculty') {
            toast.error("Access Denied: Only faculty members can access this page.");
            navigate("/question-papers"); // Or navigate to home '/'
        }
    }, [navigate]);

    // Header Information
    const [questionPaperTitle, setQuestionPaperTitle] = useState('');
    const [department, setDepartment] = useState('');
    const [academicYear, setAcademicYear] = useState('');
    const [examType, setExamType] = useState('INTERNAL');
    const [descriptiveExam, setDescriptiveExam] = useState('II');
    const [courseCode, setCourseCode] = useState('');
    const [examDate, setExamDate] = useState('');
    const [semester, setSemester] = useState('');
    const [subject, setSubject] = useState('');
    const [Name, setName] = useState('');
    const [regNo, setRegNo] = useState('');
    const [subjectCode, setSubjectCode] = useState('');
    const [maxTime, setMaxTime] = useState('');
    const [maxMarks, setMaxMarks] = useState('');
    const [marksInstruction, setMarksInstruction] = useState('4x10=40 M');

    // Questions
    const [questions, setQuestions] = useState<Question[]>([
        { id: '1', sNo: '1', unit: 'UNIT - 3', question: '', co: 'CO3', btl: 'L3', marks: '5M' },
    ]);

    const addQuestion = () => {
        const newId = (questions.length + 1).toString();
        setQuestions([...questions, {
            id: newId,
            sNo: newId,
            unit: '',
            question: '',
            co: '',
            btl: '',
            marks: ''
        }]);
    };

    const removeQuestion = (id: string) => {
        if (questions.length === 1) {
            toast.error('At least one question is required');
            return;
        }
        setQuestions(questions.filter(q => q.id !== id));
    };

    const updateQuestion = (id: string, field: keyof Question, value: string) => {
        setQuestions(questions.map(q =>
            q.id === id ? { ...q, [field]: value } : q
        ));
    };

    const handlePrint = () => {
        window.print();
    };

    return (
        <div className="min-h-screen bg-[#f5f5f5]">
            <style type="text/css" media="print">
                {`
                @page {
                    size: auto;
                    margin: 0mm;
                }
                `}
            </style>
            <div className="print:hidden">
                <Navbar />
            </div>

            <div className="container mx-auto px-2 sm:px-4 lg:px-6 xl:px-8 pt-20 sm:pt-24 pb-8 sm:pb-12">
                {/* Controls - Hidden in print */}
                <div className="print:hidden mb-4 sm:mb-6 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4">
                    <Button
                        variant="ghost"
                        onClick={() => navigate(-1)}
                        className="w-full sm:w-auto justify-start sm:justify-center text-sm sm:text-base"
                    >
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back
                    </Button>
                    <Button
                        onClick={handlePrint}
                        className="bg-[#40916c] hover:bg-[#2d6a4f] text-white w-full sm:w-auto text-sm sm:text-base"
                    >
                        <Printer className="w-4 h-4 mr-2" />
                        Print Question Paper
                    </Button>
                </div>

                {/* Question Paper */}
                <div ref={printRef} className="bg-white shadow-lg mx-auto max-w-full sm:max-w-[95%] lg:max-w-[210mm] min-h-[297mm] p-3 sm:p-6 lg:p-8 print:shadow-none print:max-w-[210mm]">
                    {/* Header with College Image */}
                    <div className="mb-3 sm:mb-4">
                        {/* College Logo - Full Width */}
                        <div className="w-full flex justify-center mb-2 sm:mb-3">
                            <img
                                src={collegeLogo}
                                alt="College Header"
                                className="w-full h-24 sm:h-28 lg:h-32 object-contain"
                            />
                        </div>

                        {/* Horizontal Line */}
                        <div className="border-t-2 border-black my-2 sm:my-3"></div>

                        {/* Details Grid */}
                        <div className="grid grid-cols-2 gap-2 sm:gap-3 md:gap-4">
                            <div>
                                <div className="flex gap-2 print:hidden">
                                    <label className="text-[10px] sm:text-sm text-black font-semibold whitespace-nowrap">QUESTION PAPER:</label>
                                    <input
                                        type="text"
                                        title="Question Paper Title"
                                        placeholder="Title"
                                        value={questionPaperTitle}
                                        onChange={(e) => setQuestionPaperTitle(e.target.value)}
                                        className="text-[10px] sm:text-sm flex-1 outline-none bg-transparent"
                                    />
                                </div>
                                <p className="text-xs sm:text-sm text-black print:block hidden"><span className="font-bold">QUESTION PAPER:</span> {questionPaperTitle}</p>

                                <div className="flex gap-2 print:hidden">
                                    <label className="text-[10px] sm:text-sm text-black font-semibold whitespace-nowrap">DEPARTMENT:</label>
                                    <input
                                        type="text"
                                        title="Department"
                                        placeholder="Department"
                                        value={department}
                                        onChange={(e) => setDepartment(e.target.value)}
                                        className="text-[10px] sm:text-sm flex-1 outline-none bg-transparent"
                                    />
                                </div>
                                <p className="text-xs sm:text-sm text-black print:block hidden"><span className="font-bold">DEPARTMENT:</span> {department}</p>

                                <div className="flex gap-2 print:hidden mt-1">
                                    <label className="text-[10px] sm:text-sm text-black font-semibold whitespace-nowrap">ACADEMIC YEAR:</label>
                                    <input
                                        type="text"
                                        title="Academic Year"
                                        placeholder="Year"
                                        value={academicYear}
                                        onChange={(e) => setAcademicYear(e.target.value)}
                                        className="text-[10px] sm:text-sm flex-1 outline-none bg-transparent"
                                    />
                                </div>
                                <p className="text-xs sm:text-sm text-black print:block hidden"><span className="font-bold">ACADEMIC YEAR:</span> {academicYear}</p>
                            </div>
                            <div className="text-right">
                                <div className="print:hidden flex gap-1 justify-end">
                                    <input
                                        type="text"
                                        title="Course Code"
                                        placeholder="Course Code"
                                        value={courseCode}
                                        onChange={(e) => setCourseCode(e.target.value)}
                                        className="text-[10px] sm:text-sm text-right outline-none w-full md:w-auto bg-transparent"
                                    />
                                </div>
                                <p className="text-xs sm:text-sm text-black print:block hidden text-right">{courseCode}</p>

                                <div className="print:hidden flex gap-1 justify-end mt-1">
                                    <span className="text-[10px] sm:text-sm text-black font-semibold">DATE:</span>
                                    <input
                                        type="text"
                                        title="Exam Date"
                                        placeholder="Date"
                                        value={examDate}
                                        onChange={(e) => setExamDate(e.target.value)}
                                        className="text-[10px] sm:text-sm text-right outline-none w-16 sm:w-24 bg-transparent"
                                    />
                                </div>
                                <p className="text-xs sm:text-sm text-black print:block hidden text-right"><span className="font-bold">DATE:</span> {examDate}</p>

                                <div className="print:hidden flex gap-1 justify-end mt-1">
                                    <span className="text-[10px] sm:text-sm text-black font-semibold">SEMESTER:</span>
                                    <input
                                        type="text"
                                        title="Semester"
                                        placeholder="Semester"
                                        value={semester}
                                        onChange={(e) => setSemester(e.target.value)}
                                        className="text-[10px] sm:text-sm text-right outline-none w-16 sm:w-20 bg-transparent"
                                    />
                                </div>
                                <p className="text-xs sm:text-sm text-black print:block hidden text-right"><span className="font-bold">SEMESTER:</span> {semester}</p>
                            </div>
                        </div>
                    </div>

                    {/* Descriptive Exam Title & Details */}
                    <div className="my-3 sm:my-4 text-xs sm:text-sm text-black">
                        <div className="text-center font-bold mb-2">
                            <div className="print:hidden flex justify-center items-center">
                                <span>Descriptive Examination:</span>
                                <input
                                    type="text"
                                    title="Descriptive Examination"
                                    value={descriptiveExam}
                                    onChange={(e) => setDescriptiveExam(e.target.value)}
                                    className="w-12 sm:w-16 outline-none text-center bg-transparent font-bold"
                                />
                            </div>
                            <p className="print:block hidden font-bold">Descriptive Examination: {descriptiveExam}</p>
                        </div>

                        <br />
                        <div className="grid grid-cols-2 gap-2 sm:gap-4 lg:gap-x-8">
                            {/* Left Column */}
                            <div className="space-y-1">
                                <div className="flex gap-1 sm:gap-2">
                                    <span className="font-bold w-16 sm:w-24 text-[10px] sm:text-sm">Sub:</span>
                                    <div className="flex-1">
                                        <p className="print:block hidden text-xs sm:text-sm">{subject}</p>
                                        <input
                                            type="text"
                                            title="Subject"
                                            placeholder="Subject"
                                            value={subject}
                                            onChange={(e) => setSubject(e.target.value)}
                                            className="w-full outline-none bg-transparent print:hidden text-[10px] sm:text-sm"
                                        />
                                    </div>
                                </div>
                                <div className="flex gap-1 sm:gap-2">
                                    <span className="font-bold w-16 sm:w-24 text-[10px] sm:text-sm">Name:</span>
                                    <div className="flex-1">
                                        <p className="print:block hidden text-xs sm:text-sm">{Name}</p>
                                        <input
                                            type="text"
                                            title="Student Name"
                                            placeholder="Name"
                                            value={Name}
                                            onChange={(e) => setName(e.target.value)}
                                            className="w-full outline-none bg-transparent print:hidden text-[10px] sm:text-sm"
                                        />
                                    </div>
                                </div>
                                <div className="flex gap-1 sm:gap-2">
                                    <span className="font-bold w-16 sm:w-24 text-[10px] sm:text-sm">Regd. No:</span>
                                    <div className="flex-1">
                                        <p className="print:block hidden text-xs sm:text-sm">{regNo}</p>
                                        <input
                                            type="text"
                                            title="Registration Number"
                                            placeholder="Reg. No"
                                            value={regNo}
                                            onChange={(e) => setRegNo(e.target.value)}
                                            className="w-full outline-none bg-transparent print:hidden text-[10px] sm:text-sm"
                                        />
                                    </div>
                                </div>
                            </div>
                            {/* Right Column */}
                            <div className="space-y-1">
                                <div className="flex justify-end items-center gap-1 print:hidden">
                                    <span className="font-bold text-[10px] sm:text-sm whitespace-nowrap">Subject Code:</span>
                                    <input
                                        type="text"
                                        title="Subject Code"
                                        placeholder="Code"
                                        value={subjectCode}
                                        onChange={(e) => setSubjectCode(e.target.value)}
                                        className="w-20 sm:w-32 text-right outline-none bg-transparent text-[10px] sm:text-sm"
                                    />
                                </div>
                                <p className="print:block hidden text-right text-xs sm:text-sm"><span className="font-bold">Subject Code:</span> {subjectCode}</p>

                                <div className="flex justify-end items-center gap-1 print:hidden">
                                    <span className="font-bold text-[10px] sm:text-sm whitespace-nowrap">Max. Time:</span>
                                    <input
                                        type="text"
                                        title="Max Time"
                                        placeholder="Time"
                                        value={maxTime}
                                        onChange={(e) => setMaxTime(e.target.value)}
                                        className="w-20 sm:w-32 text-right outline-none bg-transparent text-[10px] sm:text-sm"
                                    />
                                </div>
                                <p className="print:block hidden text-right text-xs sm:text-sm"><span className="font-bold">Max. Time:</span> {maxTime}</p>

                                <div className="flex justify-end items-center gap-1 print:hidden">
                                    <span className="font-bold text-[10px] sm:text-sm whitespace-nowrap">Max. Marks:</span>
                                    <input
                                        type="text"
                                        title="Max Marks"
                                        placeholder="Marks"
                                        value={maxMarks}
                                        onChange={(e) => setMaxMarks(e.target.value)}
                                        className="w-20 sm:w-32 text-right outline-none bg-transparent text-[10px] sm:text-sm"
                                    />
                                </div>
                                <p className="print:block hidden text-right text-xs sm:text-sm"><span className="font-bold">Max. Marks:</span> {maxMarks}</p>
                            </div>
                        </div>
                        <div className="border-t-2 border-black my-2 sm:my-3"></div>
                    </div>

                    {/* Instructions */}
                    <p className="text-[10px] sm:text-sm text-black mb-2 sm:mb-4">Answer all the following questions</p>
                    <div className="flex justify-end mb-2 sm:mb-4 print:hidden">
                        <input
                            type="text"
                            value={marksInstruction}
                            onChange={(e) => setMarksInstruction(e.target.value)}
                            className="text-right text-[10px] sm:text-sm text-black outline-none bg-transparent w-full"
                            placeholder="Marks Instruction like 4x10=40 M"
                        />
                    </div>
                    <p className="text-right text-xs sm:text-sm text-black mb-3 sm:mb-4 print:block hidden">{marksInstruction}</p>

                    {/* Questions Table */}
                    <div className="overflow-x-auto">
                        <table className="w-full border-2 border-black text-black">
                            <thead>
                                <tr className="border-b-2 border-black">
                                    <th className="border-r-2 border-black p-1 text-[10px] sm:text-sm w-10 sm:w-16">S. No</th>
                                    <th className="border-r-2 border-black p-1 text-[10px] sm:text-sm">UNIT - Question</th>
                                    <th className="border-r-2 border-black p-1 text-[10px] sm:text-sm w-10 sm:w-16">CO</th>
                                    <th className="border-r-2 border-black p-1 text-[10px] sm:text-sm w-10 sm:w-16">BTL</th>
                                    <th className="p-1 text-[10px] sm:text-sm w-12 sm:w-20">MARKS</th>
                                </tr>
                            </thead>
                            <tbody>
                                {questions.map((q) => (
                                    <tr key={q.id} className="border-b border-black">
                                        <td className="border-r-2 border-black p-2 text-center align-top">
                                            <div className="print:hidden flex items-center justify-center gap-1">
                                                <input
                                                    type="text"
                                                    title="Serial Number"
                                                    placeholder="S.No"
                                                    value={q.sNo}
                                                    onChange={(e) => updateQuestion(q.id, 'sNo', e.target.value)}
                                                    className="w-12 text-center border border-gray-300 rounded px-1 text-[9px] sm:text-sm"
                                                />
                                                {questions.length > 1 && (
                                                    <button
                                                        onClick={() => removeQuestion(q.id)}
                                                        className="text-red-500 hover:text-red-700"
                                                        title="Remove question"
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                )}
                                            </div>
                                            <span className="print:block hidden">{q.sNo}</span>
                                        </td>
                                        <td className="border-r-2 border-black p-2">
                                            <div className="print:hidden space-y-2">
                                                <input
                                                    type="text"
                                                    value={q.unit}
                                                    onChange={(e) => updateQuestion(q.id, 'unit', e.target.value)}
                                                    placeholder="UNIT - 3"
                                                    className="w-full border border-gray-300 rounded px-2 py-1 text-[9px] sm:text-sm"
                                                />
                                                <textarea
                                                    value={q.question}
                                                    onChange={(e) => updateQuestion(q.id, 'question', e.target.value)}
                                                    placeholder="Enter question here..."
                                                    className="w-full border border-gray-300 rounded px-2 py-1 min-h-[60px] text-[9px] sm:text-sm"
                                                />
                                            </div>
                                            <div className="print:block hidden">
                                                <p className="text-center mb-1">{q.unit}</p>
                                                <p>{q.question}</p>
                                            </div>
                                        </td>
                                        <td className="border-r-2 border-black p-2 text-center align-top">
                                            <input
                                                type="text"
                                                value={q.co}
                                                onChange={(e) => updateQuestion(q.id, 'co', e.target.value)}
                                                placeholder="CO"
                                                className="w-full text-center print:border-0 border border-gray-300 rounded px-1 text-[9px] sm:text-sm"
                                            />
                                        </td>
                                        <td className="border-r-2 border-black p-2 text-center align-top">
                                            <input
                                                type="text"
                                                value={q.btl}
                                                onChange={(e) => updateQuestion(q.id, 'btl', e.target.value)}
                                                placeholder="BTL"
                                                className="w-full text-center print:border-0 border border-gray-300 rounded px-1 text-[9px] sm:text-sm"
                                            />
                                        </td>
                                        <td className="p-2 text-center align-top">
                                            <input
                                                type="text"
                                                value={q.marks}
                                                onChange={(e) => updateQuestion(q.id, 'marks', e.target.value)}
                                                placeholder="Marks"
                                                className="w-full text-center print:border-0 border border-gray-300 rounded px-1 text-[9px] sm:text-sm"
                                            />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Add Question Button */}
                    <div className="mt-3 sm:mt-4 print:hidden">
                        <Button
                            onClick={addQuestion}
                            variant="outline"
                            className="border-[#40916c] text-[#40916c] hover:bg-[#40916c] hover:text-white text-[10px] sm:text-sm px-2 sm:px-4 py-1 sm:py-2 h-auto"
                        >
                            <Plus className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                            Add Question
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default QuestionPaperGenerator;