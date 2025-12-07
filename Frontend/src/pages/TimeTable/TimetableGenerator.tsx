import React, { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import authService from "@/services/authService";
import { Loader2, Save, Printer, ArrowLeft, Calendar } from "lucide-react";
import { useNavigate } from "react-router-dom";
import TimetableEditor from "./TimetableEditor";
import collegeHeader from "@/assets/college.jpg";
import "./TimetablePrint.css";
const DEPARTMENTS = [
  "MCA",
  "MBA",
  "ECE",
  "CSE",
  "EEE",
  "AIML",
  "AI",
  "DA",
  "Mechanicals",
];

interface Course {
  code: string;
  title: string;
  facultyName: string;
  facultyId: string;
}

interface Cell {
  id: string;
  text: string;
  rowSpan: number;
  colSpan: number;
  hidden: boolean;
  r: number;
  c: number;
}

const TimetableGenerator = () => {
  const navigate = useNavigate();
  const user = authService.getCurrentUser();

  // Faculty-only access check
  // Faculty-only access check
  useEffect(() => {
    if (!user) {
      toast.error("Please login to access this page");
      navigate("/");
      return;
    }
    if (user.role !== "faculty") {
      toast.error("Only faculty can create timetables");
      navigate("/timetable");
      return;
    }
  }, [user, navigate]);

  const [selectedDept, setSelectedDept] = useState(DEPARTMENTS[0]);
  const [academicYear, setAcademicYear] = useState("2025-2026");
  const [date, setDate] = useState("30-06-2025");
  const [semester, setSemester] = useState("II MCA-B/III SEM");
  const [classInCharge, setClassInCharge] = useState("");
  const [docRef, setDocRef] = useState("DCA-F014");

  const [schedule, setSchedule] = useState<Cell[][]>([]); // Store grid data
  const [courses, setCourses] = useState<Course[]>([
    { code: "", title: "", facultyName: "", facultyId: "" },
  ]);

  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchTimetable = async () => {
      if (!user?.id) return;
      setLoading(true);
      try {
        const response = await fetch(
          `http://192.168.1.4:5003/api/timetable/${
            user?.id
          }?department=${encodeURIComponent(selectedDept)}`
        );
        const data = await response.json();
        if (data.success && data.timetable) {
          const scheduleData = data.timetable.schedule;
          setSchedule(Array.isArray(scheduleData) ? scheduleData : []);
          setSemester(data.timetable.semester || "");
          setAcademicYear(data.timetable.academicYear || "2025-2026");
          setDate(data.timetable.date || "");
          setClassInCharge(data.timetable.classInCharge || "");
          setDocRef(data.timetable.docRef || "DCA-F014");
          setCourses(
            data.timetable.courses && data.timetable.courses.length > 0
              ? data.timetable.courses
              : [{ code: "", title: "", facultyName: "", facultyId: "" }]
          );
        } else {
          // Reset if no timetable found
          setSchedule([]);
          setSemester("II MCA-B/III SEM");
          setAcademicYear("2025-2026");
          setDate("30-06-2025");
          setClassInCharge("");
          setDocRef("DCA-F014");
          setCourses([{ code: "", title: "", facultyName: "", facultyId: "" }]);
        }
      } catch (error) {
        console.error("Failed to fetch", error);
      } finally {
        setLoading(false);
      }
    };
    fetchTimetable();
  }, [user?.id, selectedDept]);

  const handleEditorChange = (newGrid: Cell[][]) => {
    setSchedule(newGrid);
  };

  const handleCourseChange = (
    index: number,
    field: keyof Course,
    value: string
  ) => {
    const newCourses = [...courses];
    newCourses[index][field] = value;
    setCourses(newCourses);
  };

  const addCourseRow = () => {
    setCourses([
      ...courses,
      { code: "", title: "", facultyName: "", facultyId: "" },
    ]);
  };

  const removeCourseRow = (index: number) => {
    const newCourses = courses.filter((_, i) => i !== index);
    setCourses(newCourses);
    toast.success("Course row removed");
  };

  const handleSave = async () => {
    if (!user?.id) {
      toast.error("Please login to save");
      return;
    }
    setSaving(true);
    try {
      const response = await fetch("http://192.168.1.4:5003/api/timetable", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: user.id,
          department: selectedDept,
          semester,
          academicYear,
          date,
          classInCharge,
          docRef,
          courses,
          schedule,
        }),
      });
      const data = await response.json();
      if (data.success) {
        toast.success("Saved successfully!");
        // Redirect to landing page after successful save
        setTimeout(() => {
          navigate("/timetable/landing");
        }, 1000);
      } else {
        toast.error(data.message);
      }
    } catch (e) {
      toast.error("Save failed");
    } finally {
      setSaving(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-white p-4 md:p-8 font-serif print:p-0">
      <div
        ref={contentRef}
        className="max-w-[297mm] mx-auto bg-white print:max-w-none p-4 print:p-0"
      >
        {/* Header Image */}
        <div className="mb-2 md:mb-4 print:mb-0 w-full flex flex-col items-center">
          <img
            src={collegeHeader}
            alt="College Header"
            className="hidden
print:block
      print:w-full
      print:max-h-[180px]
      print:object-contain
      mx-auto
  "
          />
          <div className="w-full border-b md:border-b-2 border-black mt-1 md:mt-2 mb-2 md:mb-4 print:mt-1 print:mb-2"></div>
        </div>

        {/* Navigation (Hidden in Print) */}
        <div className="mb-4 md:mb-8 flex flex-col md:flex-row justify-between items-center gap-2 md:gap-4 print:hidden">
          <Button
            variant="ghost"
            onClick={() => navigate("/timetable/landing")}
            size="sm"
            className="h-8 text-xs md:h-10 md:text-sm"
          >
            <ArrowLeft className="mr-1 md:mr-2 h-3 w-3 md:h-4 md:w-4" /> Back
          </Button>
          <div className="flex gap-2 flex-wrap justify-center">
            <Button
              onClick={handleSave}
              disabled={saving}
              className="bg-orange-600 hover:bg-orange-700 h-8 text-xs px-3 md:h-10 md:text-sm md:px-4"
            >
              {saving ? (
                <Loader2 className="animate-spin h-3 w-3 md:h-4 md:w-4" />
              ) : (
                <Save className="h-3 w-3 md:h-4 md:w-4 mr-1 md:mr-2" />
              )}{" "}
              Save
            </Button>
            <Button
              variant="outline"
              onClick={handlePrint}
              className="h-8 text-xs px-3 md:h-10 md:text-sm md:px-4"
            >
              <Printer className="h-3 w-3 md:h-4 md:w-4 mr-1 md:mr-2" /> Print
            </Button>
          </div>
        </div>

        {/* Header Info Section */}
        <div className="border-b md:border-b-2 border-black mb-2 md:mb-4 pb-1 md:pb-2 print:mb-2 print:pb-1">
          <div className="flex flex-row justify-between items-start gap-1 md:gap-4">
            {/* LEFT COLUMN */}
            <div className="flex flex-col gap-0.5 md:gap-2 w-1/2">
              <h1 className="text-[10px] md:text-lg font-bold uppercase print:text-xl leading-tight">
                CLASS TIME-TABLE
              </h1>

              <div className="flex flex-row items-center gap-1 md:gap-2 print:gap-1">
                <span className="font-bold text-[6px] md:text-xs whitespace-nowrap w-auto md:w-32 print:w-28 print:text-sm">
                  DEPARTMENT:
                </span>
                <Input
                  aria-label="Department"
                  value={selectedDept}
                  onChange={(e) => setSelectedDept(e.target.value)}
                  className="border-none p-0 h-3 md:h-auto font-bold focus-visible:ring-0 w-auto min-w-[20px] md:min-w-[50px] text-[6px] md:text-xs print:text-sm"
                  placeholder="MCA"
                />
              </div>

              <div className="flex flex-row items-center gap-1 md:gap-2 print:gap-1">
                <span className="font-bold text-[6px] md:text-xs whitespace-nowrap w-auto md:w-32 print:w-28 print:text-sm">
                  ACADEMIC YEAR:
                </span>
                <Input
                  value={academicYear}
                  onChange={(e) => setAcademicYear(e.target.value)}
                  className="border-none p-0 h-3 md:h-auto font-bold focus-visible:ring-0 w-full md:w-32 text-[6px] md:text-xs flex-1 min-w-[40px] md:min-w-[100px] print:text-sm"
                />
              </div>
            </div>

            {/* RIGHT COLUMN */}
            <div className="flex w-1/2 justify-end">
              <div className="flex flex-col gap-0.5 md:gap-2 w-full max-w-[150px] md:max-w-none ml-auto items-end">
                <div className="flex flex-row items-center gap-1 md:gap-2 print:gap-1 w-full justify-end">
                  <span className="font-bold text-[6px] md:text-xs whitespace-nowrap w-auto md:w-32 print:w-28 print:text-sm text-right">
                    DOC REF:
                  </span>
                  <Input
                    value={docRef}
                    onChange={(e) => setDocRef(e.target.value)}
                    className="border-none p-0 h-3 md:h-auto font-bold focus-visible:ring-0 w-auto md:w-auto text-[6px] md:text-xs min-w-[20px] md:min-w-[50px] print:text-sm text-right"
                    placeholder="DCA-F014"
                  />
                </div>
                <div className="flex flex-row items-center gap-1 md:gap-2 print:gap-1 w-full justify-end">
                  <span className="font-bold text-[6px] md:text-xs whitespace-nowrap w-auto md:w-32 print:w-28 print:text-sm text-right">
                    DATE:
                  </span>
                  <Input
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="border-none p-0 h-3 md:h-auto font-bold focus-visible:ring-0 w-auto md:w-auto text-[6px] md:text-xs min-w-[20px] md:min-w-[50px] print:text-sm text-right"
                  />
                </div>
                <div className="flex flex-row items-center gap-1 md:gap-2 print:gap-1 w-full justify-end">
                  <span className="font-bold text-[6px] md:text-xs whitespace-nowrap w-auto md:w-32 print:w-28 print:text-sm text-right">
                    CLASS/SEM:
                  </span>
                  <Input
                    value={semester}
                    onChange={(e) => setSemester(e.target.value)}
                    className="border-none p-0 h-3 md:h-auto font-bold focus-visible:ring-0 w-auto md:w-auto text-[6px] md:text-xs min-w-[20px] md:min-w-[50px] print:text-sm text-right"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Timetable Grid */}
        <div className="mb-2 overflow-x-auto print:overflow-visible">
          <div className="min-w-[800px] print:min-w-0 print:w-full">
            <TimetableEditor
              initialRows={8}
              initialCols={8}
              initialData={schedule}
              onChange={handleEditorChange}
            />
          </div>
        </div>

        {/* Note */}
        <div className="mb-2 print:mb-1 font-bold text-xs print:text-[11px] print:mt-1">
          NOTE: *T=TUTORIAL CLASS, SLP=SELF LEARNING PERIOD
        </div>

        {/* Course Details Table */}
        <div className="w-full mx-auto border border-black text-sm overflow-x-auto print:overflow-visible break-inside-avoid">
          <div className="w-full print:w-full mx-auto">
            {/* Class In-charge Row */}
            <div className="flex flex-wrap border-b border-black h-auto print:h-[34px]">
              
              {/* LABEL (perfect mobile-safe) */}
  <div className="
      bg-slate-50 
      border-r border-black 
      font-bold 
      flex items-center 
      p-0.5 md:p-1 
      whitespace-nowrap 
      flex-shrink-0 
      text-[10px] md:text-sm print:text-xs
  ">
    Class In-charge
  </div>
             {/* INPUT WRAPPER (mobile fit) */}
  <div className="flex-1 min-w-0 p-0">
    <input
      aria-label="Class In-charge Name"
      value={classInCharge}
      onChange={(e) => setClassInCharge(e.target.value)}
      className="
          w-full 
          h-full 
          p-0.5 md:p-1 
          outline-none 
          font-bold 
          text-[10px] md:text-sm print:text-xs
      "
      placeholder="Enter Name"
    />
  </div>

</div>



            {/* MAIN TABLE */}
    <table className="w-full border-collapse text-left">
         <thead>
        <tr className="bg-slate-50">
          <th className="border border-black p-1 w-[5%] text-center text-[10px]">S.No</th>
          <th className="border border-black p-1 w-[20%] text-[10px]">Course Code</th>
          <th className="border border-black p-1 w-[45%] text-[10px]">Course Title</th>
          <th className="border border-black p-1 w-[30%] text-[10px]">Name of the Faculty</th>
          <th className="border border-black p-1 w-[3%] print:hidden"></th>
        </tr>
      </thead>


              <tbody>
        {courses.map((course, idx) => (
          <tr key={idx}>
            <td className="border border-black p-1 text-center w-[5%]">{idx + 1}</td>
            <td className="border border-black p-1 w-[20%]"></td>
            <td className="border border-black p-1 w-[45%]"></td>
            <td className="border border-black p-1 w-[30%]"></td>
            <td className="border border-black p-1 text-center print:hidden">×</td>
          </tr>
        ))}
      </tbody>
     </table>

            <div className="p-1 md:p-2 print:hidden">
              <Button
                variant="outline"
                size="sm"
                onClick={addCourseRow}
                className="w-full h-7 text-xs md:h-9 md:text-sm"
              >
                + Add Course
              </Button>
            </div>
          </div>
        </div>
      </div>

      <style>{`
                .writing-vertical-lr {
                    writing-mode: vertical-lr;
                }
            `}</style>
    </div>
  );
};

export default TimetableGenerator;
