import React from 'react';
import { Users, GraduationCap, Grid } from 'lucide-react';

export default function StatsCards({ students }) {
  const totalStudents = students.length;

  const totalCourses = new Set(
    students.map((s) => s.course?.trim()).filter(Boolean)
  ).size;

  const totalSections = new Set(
    students.map((s) => s.section?.trim()).filter(Boolean)
  ).size;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
      {/* Card 1: Total Students */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-5 flex items-center space-x-4 shadow-xs">
        <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
          <Users className="w-6 h-6" />
        </div>
        <div>
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            Total Students
          </p>
          <p className="text-2xl font-bold text-slate-900 mt-0.5">{totalStudents}</p>
        </div>
      </div>

      {/* Card 2: Distinct Courses */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-5 flex items-center space-x-4 shadow-xs">
        <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
          <GraduationCap className="w-6 h-6" />
        </div>
        <div>
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            Active Courses
          </p>
          <p className="text-2xl font-bold text-slate-900 mt-0.5">{totalCourses}</p>
        </div>
      </div>

      {/* Card 3: Active Sections */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-5 flex items-center space-x-4 shadow-xs">
        <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
          <Grid className="w-6 h-6" />
        </div>
        <div>
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            Class Sections
          </p>
          <p className="text-2xl font-bold text-slate-900 mt-0.5">{totalSections}</p>
        </div>
      </div>
    </div>
  );
}
