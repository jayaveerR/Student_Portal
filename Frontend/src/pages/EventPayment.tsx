import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Trash2, Save, RotateCcw, History, FileSpreadsheet, Search } from "lucide-react";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import axios from 'axios';
import * as XLSX from 'xlsx';

interface Payment {
    _id?: string;
    rollNumber: string;
    name: string;
    amount: number;
    items: string[];
    paymentMethod: 'cash' | 'phonepe' | 'online';
    date: string;
    course?: string;
    eventId?: string;
}

const EventPayment = () => {
    const [payments, setPayments] = useState<Payment[]>([]);
    const [rollNo, setRollNo] = useState("");
    const [studentName, setStudentName] = useState("");
    const [amount, setAmount] = useState("");
    const [itemName, setItemName] = useState("");
    const [paymentMethod, setPaymentMethod] = useState<'cash' | 'phonepe'>('cash');
    const [suggestions, setSuggestions] = useState<any[]>([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [course, setCourse] = useState("All");

    // Event management state
    const [events, setEvents] = useState<any[]>([]);
    const [activeEventId, setActiveEventId] = useState<string>("");
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [activeEvent, setActiveEvent] = useState<any>(null);

    const suggestionRef = useRef<HTMLDivElement>(null);

    // Fetch all events on mount
    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const res = await axios.get('http://192.168.1.4:5003/api/events/all');
                setEvents(res.data);
                if (res.data.length > 0) {
                    // Set the most recent event as active by default
                    setActiveEventId(res.data[0]._id);
                    setActiveEvent(res.data[0]);
                }
            } catch (error) {
                console.error("Failed to fetch events", error);
                toast.error("Failed to load events");
            }
        };
        fetchEvents();
    }, []);

    // Fetch payments whenever course or activeEventId changes
    const fetchPayments = async () => {
        try {
            const queryParams = new URLSearchParams();
            if (course !== "All") {
                queryParams.append("course", course);
            }
            if (activeEventId) {
                queryParams.append("eventId", activeEventId);
            }
            const queryString = queryParams.toString();
            const res = await axios.get(`http://192.168.1.4:5003/api/events/payments${queryString ? `?${queryString}` : ""}`);
            setPayments(res.data);
        } catch (error) {
            console.error(error);
            toast.error("Failed to fetch history");
        }
    };

    useEffect(() => {
        fetchPayments();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [course, activeEventId]);

    // Handle click outside suggestions
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (suggestionRef.current && !suggestionRef.current.contains(event.target as Node)) {
                setShowSuggestions(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    // Search for students
    useEffect(() => {
        const searchStudents = async () => {
            if (rollNo.length < 2) {
                setSuggestions([]);
                return;
            }

            try {
                const queryParams = new URLSearchParams();
                queryParams.append("q", rollNo);
                if (course !== "All") {
                    queryParams.append("course", course);
                }
                const queryString = queryParams.toString();
                const res = await axios.get(`http://192.168.1.4:5003/api/events/search${queryString ? `?${queryString}` : ""}`);
                setSuggestions(res.data);
                setShowSuggestions(true);
            } catch (error) {
                console.error("Search error", error);
            }
        };

        const timeoutId = setTimeout(() => {
            searchStudents();
        }, 300); // Debounce

        return () => clearTimeout(timeoutId);
    }, [rollNo, course, activeEventId]);

    const handleSelectStudent = (student: any) => {
        // Try to identify Roll Number and Name fields dynamically
        const keys = Object.keys(student);
        const rollKey = keys.find(k => k.toLowerCase().includes('roll') || k.toLowerCase().includes('id')) || keys[0];
        const nameKey = keys.find(k => k.toLowerCase().includes('name') || k.toLowerCase().includes('student')) || keys[1];

        let rawRoll = String(student[rollKey] || Object.values(student)[0]);
        // Clean: Remove leading digits + hyphen (e.g. "1-24H..." -> "24H...")
        rawRoll = rawRoll.replace(/^\d+-/, '');

        setRollNo(rawRoll);
        setStudentName(student[nameKey] || Object.values(student)[0] || "Unknown");
        setShowSuggestions(false);
    };

    const handleAddItem = async () => {
        if (!rollNo || !amount) {
            toast.error("Please enter Roll Number and Amount");
            return;
        }
        if (!activeEventId) {
            toast.error("Please select an event tab first.");
            return;
        }

        const newPayment = {
            rollNumber: rollNo,
            name: studentName || "Student",
            amount: Number(amount),
            items: itemName ? [itemName] : [],
            paymentMethod,
            course: course !== "All" ? course : "General",
            eventId: activeEventId
        };

        try {
            await axios.post('http://192.168.1.4:5003/api/events/payment', newPayment);
            toast.success("Payment Added");
            fetchPayments();

            // Clear relevant inputs
            setRollNo("");
            setStudentName("");
            setAmount("");
            setItemName("");
        } catch (error) {
            console.error(error);
            toast.error("Failed to add payment");
        }
    };

    const handleDelete = async (id: string) => {
        try {
            await axios.delete(`http://192.168.1.4:5003/api/events/payment/${id}`);
            toast.success("Payment Deleted");
            setPayments(prev => prev.filter(p => p._id !== id));
        } catch (error) {
            console.error(error);
            toast.error("Failed to delete payment");
        }
    };

    const handleClearAll = async () => {
        try {
            await axios.delete(`http://192.168.1.4:5003/api/events/payments/all`);
            setPayments([]);
            toast.success("All payment history cleared successfully");
        } catch (error) {
            console.error(error);
            toast.error("Failed to clear payment history");
        }
    };

    const handleExport = () => {
        const ws = XLSX.utils.json_to_sheet(payments.map((p, i) => ({
            SNo: i + 1,
            RollNumber: p.rollNumber,
            Name: p.name,
            Amount: p.amount,
            Method: p.paymentMethod,
            Course: p.course || "-",
            Date: new Date(p.date).toLocaleString()
        })));
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Payments");
        XLSX.writeFile(wb, "Payment_History.xlsx");
        toast.success("Exported to Excel");
    };

    const totalAmount = payments.reduce((sum, p) => sum + p.amount, 0);

    return (
        <div className="min-h-screen bg-background flex flex-col">
            <Navbar />

            <div className="flex-grow container mx-auto px-4 py-6 sm:py-8 mt-16">
                <div className="flex flex-col sm:flex-row items-start sm:items-center mb-4 sm:mb-6 gap-3 sm:gap-0">
                    <Button variant="ghost" asChild className="sm:mr-4 w-full sm:w-auto">
                        <Link to="/events">
                            <ArrowLeft className="h-4 w-4 mr-2" />
                            Back
                        </Link>
                    </Button>
                    <div className="text-center sm:text-left flex-grow w-full sm:w-auto">
                        <h1 className="text-xl sm:text-2xl font-bold px-2">DVR & Dr. HS MIC College of Technology</h1>
                        <p className="text-sm sm:text-base text-muted-foreground px-2">Event Payment Collection</p>
                    </div>
                </div>

                {/* Event Tabs */}
                {events.length > 0 ? (
                    <Tabs value={activeEventId} onValueChange={(val) => {
                        setActiveEventId(val);
                        const evt = events.find(e => e._id === val);
                        if (evt) setActiveEvent(evt);
                    }} className="w-full">
                        <TabsList className="mb-4 flex flex-wrap h-auto gap-2">
                            {events.map(event => (
                                <TabsTrigger key={event._id} value={event._id} className="px-3 sm:px-4 py-2 text-sm sm:text-base">
                                    {event.title || "Untitled Event"}
                                </TabsTrigger>
                            ))}
                        </TabsList>

                        {/* We use the same content structure for all tabs, data refreshes via activeEventId */}
                        <TabsContent value={activeEventId} className="mt-0">

                            {/* Input Section */}
                            <Card className="mb-8 border-t-4 border-t-[#4a1942]">
                                <CardContent className="pt-4 sm:pt-6">
                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3 sm:gap-4 items-end">

                                        {/* Course Filter */}
                                        <div className="space-y-2">
                                            <Label>Select Course</Label>
                                            <Select value={course} onValueChange={setCourse}>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="All Courses" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="All">All Courses</SelectItem>
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

                                        {/* Roll No with Search Suggestions */}
                                        <div className="space-y-2 relative col-span-1 sm:col-span-1" ref={suggestionRef}>
                                            <Label>Enter Roll Number</Label>
                                            <div className="relative">
                                                <Input
                                                    value={rollNo}
                                                    onChange={(e) => {
                                                        const val = e.target.value.replace(/^\d+-/, '');
                                                        setRollNo(val);
                                                    }}
                                                    placeholder="Search Roll No..."
                                                    autoComplete="off"
                                                />
                                                <Search className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground" />
                                            </div>
                                            {showSuggestions && suggestions.length > 0 && (
                                                <div className="absolute z-10 w-full bg-popover border rounded-md shadow-md mt-1 max-h-60 overflow-auto">
                                                    {suggestions.map((s, idx) => {
                                                        const vals = Object.values(s);
                                                        let roll = vals[0];
                                                        let name = vals[1];

                                                        if (String(roll).match(/^\d+$/) && vals.length > 1) {
                                                            roll = vals[1];
                                                            name = vals[2] || "";
                                                        }

                                                        let cleanDisplay = `${roll}`;
                                                        if (name) cleanDisplay += ` - ${name}`;

                                                        return (
                                                            <div
                                                                key={idx}
                                                                className="p-2 hover:bg-muted cursor-pointer text-sm"
                                                                onClick={() => handleSelectStudent(s)}
                                                            >
                                                                {cleanDisplay}
                                                            </div>
                                                        );
                                                    })}
                                                </div>
                                            )}
                                        </div>

                                        <div className="space-y-2">
                                            <Label>Student Name</Label>
                                            <Input
                                                value={studentName}
                                                onChange={(e) => setStudentName(e.target.value)}
                                                placeholder="Auto-filled"
                                                readOnly
                                                className="bg-muted"
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <Label>Enter Money</Label>
                                            <Input
                                                type="number"
                                                value={amount}
                                                onChange={(e) => setAmount(e.target.value)}
                                                placeholder="Amount"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label>Add Item</Label>
                                            <Input
                                                value={itemName}
                                                onChange={(e) => setItemName(e.target.value)}
                                                placeholder="Optional"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label>Mode</Label>
                                            <Select value={paymentMethod} onValueChange={(v: 'cash' | 'phonepe') => setPaymentMethod(v)}>
                                                <SelectTrigger>
                                                    <SelectValue />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="cash">Cash</SelectItem>
                                                    <SelectItem value="phonepe">PhonePe</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    </div>

                                    <div className="mt-4 sm:mt-6 flex justify-end">
                                        <Button
                                            onClick={handleAddItem}
                                            className="bg-[#4a1942] hover:bg-[#3a1435] text-white w-full sm:w-auto px-6 sm:px-8"
                                        >
                                            Add Payment
                                        </Button>
                                    </div>

                                    <div className="mt-3 sm:mt-4 grid grid-cols-3 gap-2 border-t pt-3 sm:pt-4">
                                        <Button variant="outline" size="sm" onClick={() => toast.info("Data auto-saved")} className="text-[9px] sm:text-sm px-2 sm:px-4 py-1 sm:py-2 h-auto"><Save className="w-3 h-3 sm:w-4 sm:h-4 mr-1" /> Save</Button>
                                        <Button variant="destructive" size="sm" onClick={handleClearAll} className="text-[9px] sm:text-sm px-2 sm:px-4 py-1 sm:py-2 h-auto"><Trash2 className="w-3 h-3 sm:w-4 sm:h-4 mr-1" /> Clear</Button>
                                        <Button variant="secondary" size="sm" onClick={handleExport} className="text-[9px] sm:text-sm px-2 sm:px-4 py-1 sm:py-2 h-auto"><FileSpreadsheet className="w-3 h-3 sm:w-4 sm:h-4 mr-1" /> Export</Button>
                                    </div>
                                </CardContent>
                            </Card>

                            <div className="text-center sm:text-right mb-3 sm:mb-4">
                                <h2 className="text-xl sm:text-2xl font-bold text-[#4a1942]">Total Collection: ₹{totalAmount}</h2>
                            </div>

                            <div className="rounded-md border bg-card overflow-x-auto">
                                <Table className="min-w-[700px]">
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead className="w-[40px] text-[9px] sm:text-sm p-1 sm:p-2">S.No</TableHead>
                                            <TableHead className="text-[9px] sm:text-sm p-1 sm:p-2">Roll Number</TableHead>
                                            <TableHead className="text-[9px] sm:text-sm p-1 sm:p-2">Name</TableHead>
                                            <TableHead className="text-[9px] sm:text-sm p-1 sm:p-2">Amount</TableHead>
                                            <TableHead className="text-[9px] sm:text-sm p-1 sm:p-2">Mode</TableHead>
                                            <TableHead className="text-[9px] sm:text-sm p-1 sm:p-2">Item</TableHead>
                                            <TableHead className="text-[9px] sm:text-sm p-1 sm:p-2">Course</TableHead>
                                            <TableHead className="text-right text-[9px] sm:text-sm p-1 sm:p-2">Action</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {payments.map((payment, index) => (
                                            <TableRow key={payment._id || index}>
                                                <TableCell className="text-[9px] sm:text-sm p-1 sm:p-2">{index + 1}</TableCell>
                                                <TableCell className="font-medium text-[8px] sm:text-sm p-1 sm:p-2">{payment.rollNumber}</TableCell>
                                                <TableCell className="text-[9px] sm:text-sm p-1 sm:p-2">{payment.name}</TableCell>
                                                <TableCell className="text-[9px] sm:text-sm p-1 sm:p-2">₹{payment.amount}</TableCell>
                                                <TableCell className="capitalize text-[9px] sm:text-sm p-1 sm:p-2">
                                                    <span className={`px-1 sm:px-2 py-0.5 sm:py-1 rounded-full text-[8px] sm:text-xs ${payment.paymentMethod === 'cash' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}`}>
                                                        {payment.paymentMethod}
                                                    </span>
                                                </TableCell>
                                                <TableCell className="text-[9px] sm:text-sm p-1 sm:p-2">{payment.items.join(", ")}</TableCell>
                                                <TableCell className="text-[9px] sm:text-sm p-1 sm:p-2">{payment.course || "-"}</TableCell>
                                                <TableCell className="text-right p-1 sm:p-2">
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        onClick={() => handleDelete(payment._id as string)}
                                                        className="text-red-500 hover:text-red-700 hover:bg-red-50 h-6 w-6 sm:h-8 sm:w-8"
                                                    >
                                                        <Trash2 className="h-3 w-3 sm:h-4 sm:w-4" />
                                                    </Button>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                        {payments.length === 0 && (
                                            <TableRow>
                                                <TableCell colSpan={8} className="text-center py-12 text-muted-foreground">
                                                    No payments recorded for this selected event.
                                                </TableCell>
                                            </TableRow>
                                        )}
                                    </TableBody>
                                </Table>
                            </div>
                        </TabsContent>
                    </Tabs>
                ) : (
                    <div className="text-center py-20">
                        <h2 className="text-xl font-bold text-muted-foreground">No events found. Please upload an event first.</h2>
                        <Button className="mt-4" asChild>
                            <Link to="/events/upload">Upload Event</Link>
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default EventPayment;
