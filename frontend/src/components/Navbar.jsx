import React from 'react';
import { GraduationCap, RefreshCw } from 'lucide-react';

export default function Navbar({ studentCount, onRefresh, isLoading }) {
  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo & Title */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-sm">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-900 tracking-tight leading-none">
                Student Portal
              </h1>
              <p className="text-xs text-slate-500 font-medium mt-1">
                CRUD Management System
              </p>
            </div>
          </div>

          {/* Right Stats & Refresh */}
          <div className="flex items-center space-x-3">
            <div className="hidden sm:flex items-center space-x-2 bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200">
              <span className="text-xs font-medium text-slate-600">Total Enrolled:</span>
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-bold bg-blue-100 text-blue-700">
                {studentCount}
              </span>
            </div>

            <button
              onClick={onRefresh}
              disabled={isLoading}
              title="Refresh list"
              className="inline-flex items-center px-3 py-1.5 border border-slate-300 rounded-lg text-sm font-medium text-slate-700 bg-white hover:bg-slate-50 transition active:scale-95 disabled:opacity-50 cursor-pointer"
            >
              <RefreshCw className={`w-4 h-4 mr-1.5 text-slate-500 ${isLoading ? 'animate-spin' : ''}`} />
              <span className="hidden sm:inline">Refresh</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
