import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import ComingSoon from "./pages/ComingSoon";
import Login from "./pages/Login";
import Resume from "./pages/Resume";
import ResumeBuilder from "./pages/ResumeBuilder/ResumeBuilder.tsx";
import TimetableLanding from "./pages/TimeTable/TimetableLanding.tsx";
import TimetableGenerator from "./pages/TimeTable/TimetableGenerator.tsx";
import Timetable from "./pages/TimeTable/Timetable.tsx";
import Material from "./pages/CollegeMaterials/Material.tsx";
import UploadMaterial from "./pages/CollegeMaterials/UploadMaterial.tsx";
import CollegeMaterials from "./pages/CollegeMaterials/CollegeMaterials.tsx";
import CollegeDashboard from "./pages/CollegeMaterials/CollegeDashboard.tsx";
import QuestionPapers from "./pages/QuestionPapers.tsx";
import QuestionPaperGenerator from "./pages/QuestionPaperGenerator.tsx";
import Events from "./pages/Events.tsx";
import UploadEvent from "./pages/UploadEvent.tsx";
import EventPayment from "./pages/EventPayment.tsx";
import FreshPage from "./pages/FreshPage.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/resume" element={<Resume />} />
          <Route path="/resume/builder" element={<ResumeBuilder />} />
          <Route path="/materials" element={<Material />} />
          <Route path="/material/upload" element={<UploadMaterial />} />
          <Route path="/college-materials" element={<CollegeMaterials />} />
          <Route path="/college-dashboard" element={<CollegeDashboard />} />
          <Route path="/timetable/landing" element={<TimetableLanding />} />
          <Route path="/timetable" element={<Timetable />} />
          <Route path="/timetable/generate" element={<TimetableGenerator />} />
          <Route path="/papers" element={<QuestionPapers />} />
          <Route path="/question-papers" element={<QuestionPapers />} />
          <Route path="/question-paper/generate" element={<QuestionPaperGenerator />} />
          <Route path="/events" element={<Events />} />
          <Route path="/events/upload" element={<UploadEvent />} />
          <Route path="/events/payment" element={<EventPayment />} />
          <Route path="/events/fresh" element={<FreshPage />} />
          <Route path="/*" element={<ComingSoon />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
