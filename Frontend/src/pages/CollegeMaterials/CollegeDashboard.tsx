import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
    FileText, User, BookOpen, Activity, BarChart3, ArrowLeft
} from 'lucide-react';
import axios from 'axios';
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell
} from 'recharts';

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

const CollegeDashboard = () => {
    const navigate = useNavigate();
    const [materials, setMaterials] = useState<Material[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMaterials = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_URL || 'http://localhost:5003/api'}/materials`);
                if (Array.isArray(response.data)) {
                    setMaterials(response.data);
                } else {
                    setMaterials([]);
                }
            } catch (error) {
                console.error('Error fetching materials:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchMaterials();
    }, []);

    // Analytics Calculation
    const courseDistribution = materials.reduce((acc: Record<string, number>, curr) => {
        if (!curr.course) return acc;
        const course = curr.course.split(' ')[0] || 'Unknown';
        acc[course] = (acc[course] || 0) + 1;
        return acc;
    }, {} as Record<string, number>);

    const chartData = Object.keys(courseDistribution).map(key => ({
        name: key,
        count: courseDistribution[key]
    }));

    const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff8042', '#0088FE'];

    // Get Unique Faculty
    const uniqueFaculty = Array.from(new Set(materials.map(m => m.facultyName).filter(Boolean))).slice(0, 5);

    return (
        <div className="min-h-screen bg-slate-50/50">
            <Navbar />

            <div className="container mx-auto px-4 py-8 pt-24">
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-slate-800 tracking-tight">Analytics Dashboard</h1>
                        <p className="text-slate-500">Overview of material distribution and usage.</p>
                    </div>
                    <div className="flex gap-2">
                        <Button variant="outline" onClick={() => navigate('/college-materials')}>
                            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Materials
                        </Button>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                    {/* Main Stats Area */}
                    <div className="lg:col-span-3 space-y-6">

                        {/* Stats Row */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <Card className="border-none shadow-md bg-white">
                                <CardHeader className="flex flex-row items-center justify-between pb-2">
                                    <div className="text-sm font-medium text-slate-500">Total Materials</div>
                                    <FileText className="w-4 h-4 text-indigo-500" />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold text-slate-800">{materials.length}</div>
                                    <p className="text-xs text-slate-400 mt-1">+2 from yesterday</p>
                                </CardContent>
                            </Card>
                            <Card className="border-none shadow-md bg-white">
                                <CardHeader className="flex flex-row items-center justify-between pb-2">
                                    <div className="text-sm font-medium text-slate-500">Subjects Covered</div>
                                    <BookOpen className="w-4 h-4 text-emerald-500" />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold text-slate-800">
                                        {new Set(materials.map(m => m.subject)).size}
                                    </div>
                                    <p className="text-xs text-slate-400 mt-1">Across {Object.keys(courseDistribution).length} courses</p>
                                </CardContent>
                            </Card>
                            <Card className="border-none shadow-md bg-white">
                                <CardHeader className="flex flex-row items-center justify-between pb-2">
                                    <div className="text-sm font-medium text-slate-500">Active Faculty</div>
                                    <User className="w-4 h-4 text-orange-500" />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold text-slate-800">{uniqueFaculty.length}</div>
                                    <p className="text-xs text-slate-400 mt-1">Contributors</p>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Analytics Section */}
                        <Card className="border-none shadow-md bg-white">
                            <CardHeader>
                                <CardTitle className="text-lg flex items-center gap-2">
                                    <BarChart3 className="w-5 h-5 text-indigo-600" />
                                    Material Distribution Analytics
                                </CardTitle>
                                <CardDescription>Overview of materials uploaded by course/department</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="h-[250px] w-full">
                                    {chartData.length > 0 ? (
                                        <ResponsiveContainer width="100%" height="100%">
                                            <BarChart data={chartData}>
                                                <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                                                <XAxis dataKey="name" fontSize={12} tickLine={false} axisLine={false} />
                                                <YAxis fontSize={12} tickLine={false} axisLine={false} />
                                                <Tooltip
                                                    cursor={{ fill: 'rgba(0,0,0,0.05)' }}
                                                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                                                />
                                                <Bar dataKey="count" radius={[4, 4, 0, 0]}>
                                                    {chartData.map((entry, index) => (
                                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                                    ))}
                                                </Bar>
                                            </BarChart>
                                        </ResponsiveContainer>
                                    ) : (
                                        <div className="flex h-full items-center justify-center text-slate-400">
                                            No data available for analytics
                                        </div>
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Right Sidebar */}
                    <div className="lg:col-span-1 space-y-6">
                        {/* Live Dashboard Info */}
                        <div className="bg-slate-900 text-white rounded-2xl p-6 shadow-xl relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/20 rounded-full blur-3xl -mr-10 -mt-10"></div>
                            <h3 className="font-semibold text-lg mb-4 flex items-center">
                                <Activity className="w-4 h-4 mr-2 text-green-400" />
                                Live Dashboard
                            </h3>
                            <div className="space-y-6 relative z-10">
                                <div>
                                    <div className="text-slate-400 text-sm mb-1">Active Students</div>
                                    <div className="text-3xl font-bold flex items-end gap-2">
                                        128
                                        <span className="text-xs text-green-400 mb-1.5 flex items-center">
                                            <span className="w-1.5 h-1.5 bg-green-400 rounded-full mr-1 animate-pulse"></span>
                                            Online
                                        </span>
                                    </div>
                                </div>
                                <div>
                                    <div className="text-slate-400 text-sm mb-1">Downloads Today</div>
                                    <div className="text-2xl font-bold">452</div>
                                    <div className="w-full bg-slate-800 h-1.5 rounded-full mt-2 overflow-hidden">
                                        <div className="bg-indigo-500 w-[70%] h-full rounded-full"></div>
                                    </div>
                                </div>
                                <div>
                                    <div className="text-slate-400 text-sm mb-1">System Status</div>
                                    <div className="flex items-center gap-2 text-sm font-medium text-emerald-400">
                                        <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
                                        Operational
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Top Contributors */}
                        <Card className="border-none shadow-md bg-white">
                            <CardHeader>
                                <CardTitle className="text-base font-semibold text-slate-800">Top Faculty Contributors</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    {uniqueFaculty.length > 0 ? uniqueFaculty.map((faculty, i) => (
                                        <div key={i} className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center font-bold text-xs">
                                                {faculty.charAt(0)}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <div className="text-sm font-medium text-slate-800 truncate">{faculty}</div>
                                                <div className="text-xs text-slate-400">Senior Faculty</div>
                                            </div>
                                        </div>
                                    )) : (
                                        <div className="text-sm text-slate-400">No contributors yet</div>
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CollegeDashboard;
