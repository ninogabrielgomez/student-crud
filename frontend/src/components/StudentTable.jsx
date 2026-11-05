import React, { useState, useMemo } from 'react';
import { Search, Edit2, Trash2, Check, X, Users, BookOpen, Layers } from 'lucide-react';

export default function StudentTable({
  students,
  activeEditId,
  onEdit,
  onDelete,
  isLoading,
  deletingId,
}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCourse, setSelectedCourse] = useState('ALL');
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);

  // Extract unique courses for filter
  const uniqueCourses = useMemo(() => {
    const set = new Set();
    students.forEach((s) => {
      if (s.course) set.add(s.course.trim());
    });
    return Array.from(set).sort();
  }, [students]);

  // Filter students based on search and selected course
  const filteredStudents = useMemo(() => {
    return students.filter((s) => {
      const fullName = `${s.firstname || ''} ${s.lastname || ''}`.toLowerCase();
      const course = (s.course || '').toLowerCase();
      const section = (s.section || '').toLowerCase();
      const query = searchTerm.toLowerCase();

      const matchesSearch =
        fullName.includes(query) || course.includes(query) || section.includes(query);

      const matchesCourse =
        selectedCourse === 'ALL' || (s.course && s.course.trim() === selectedCourse);

      return matchesSearch && matchesCourse;
    });
  }, [students, searchTerm, selectedCourse]);

  const handleDeleteClick = (id) => {
    setConfirmDeleteId(id);
  };

  const handleCancelDelete = () => {
    setConfirmDeleteId(null);
  };

  const handleConfirmDelete = (id) => {
    setConfirmDeleteId(null);
    onDelete(id);
  };

  // Helper for generating avatar initials
  const getInitials = (first, last) => {
    const f = first ? first[0].toUpperCase() : '';
    const l = last ? last[0].toUpperCase() : '';
    return f + l || 'ST';
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
      {/* Top Search & Filter Bar */}
      <div className="p-4 sm:p-5 border-b border-slate-200 bg-slate-50/50 flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by name, course, or section..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-white border border-slate-300 rounded-xl text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500 transition"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Course Filter Dropdown */}
        <div className="flex items-center space-x-2">
          <label htmlFor="courseFilter" className="text-xs font-semibold text-slate-500 whitespace-nowrap">
            Filter Course:
          </label>
          <select
            id="courseFilter"
            value={selectedCourse}
            onChange={(e) => setSelectedCourse(e.target.value)}
            className="bg-white border border-slate-300 rounded-xl px-3 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500 transition cursor-pointer"
          >
            <option value="ALL">All Courses ({students.length})</option>
            {uniqueCourses.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Table Container */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-100/70 border-b border-slate-200 text-xs font-semibold uppercase tracking-wider text-slate-600">
              <th className="py-3 px-4 sm:px-6">ID</th>
              <th className="py-3 px-4 sm:px-6">Student</th>
              <th className="py-3 px-4 sm:px-6">Course</th>
              <th className="py-3 px-4 sm:px-6">Section</th>
              <th className="py-3 px-4 sm:px-6 text-right">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100 text-sm">
            {isLoading && students.length === 0 ? (
              <tr>
                <td colSpan="5" className="py-12 text-center text-slate-400">
                  <div className="inline-block animate-spin rounded-full h-8 w-8 border-3 border-blue-500 border-t-transparent mb-3" />
                  <p className="text-sm font-medium">Loading student records...</p>
                </td>
              </tr>
            ) : filteredStudents.length === 0 ? (
              <tr>
                <td colSpan="5" className="py-12 text-center">
                  <div className="max-w-xs mx-auto text-slate-400 flex flex-col items-center">
                    <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mb-3 text-slate-400">
                      <Users className="w-6 h-6" />
                    </div>
                    <p className="font-semibold text-slate-700">No students found</p>
                    <p className="text-xs text-slate-500 mt-1">
                      {students.length === 0
                        ? 'Get started by creating your first student record.'
                        : 'No student matches your current search or filter.'}
                    </p>
                  </div>
                </td>
              </tr>
            ) : (
              filteredStudents.map((student) => {
                const isEditing = activeEditId === student.id;
                const isConfirmingDelete = confirmDeleteId === student.id;
                const isBeingDeleted = deletingId === student.id;

                return (
                  <tr
                    key={student.id}
                    className={`transition-colors ${
                      isEditing
                        ? 'bg-amber-50/70 font-medium'
                        : isConfirmingDelete
                        ? 'bg-rose-50/70'
                        : 'hover:bg-slate-50/80'
                    }`}
                  >
                    {/* ID */}
                    <td className="py-4 px-4 sm:px-6 font-mono text-xs text-slate-500">
                      #{student.id}
                    </td>

                    {/* Student Name & Avatar */}
                    <td className="py-4 px-4 sm:px-6">
                      <div className="flex items-center space-x-3">
                        <div className="w-9 h-9 rounded-full bg-linear-to-br from-blue-500 to-indigo-600 text-white font-bold text-xs flex items-center justify-center shadow-xs shrink-0">
                          {getInitials(student.firstname, student.lastname)}
                        </div>
                        <div>
                          <div className="font-semibold text-slate-900 leading-tight">
                            {student.firstname} {student.lastname}
                          </div>
                          <div className="text-xs text-slate-400 sm:hidden mt-0.5">
                            {student.course} • Sec {student.section}
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Course */}
                    <td className="py-4 px-4 sm:px-6">
                      <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200/60">
                        <BookOpen className="w-3 h-3 mr-1 text-blue-500" />
                        {student.course || '—'}
                      </span>
                    </td>

                    {/* Section */}
                    <td className="py-4 px-4 sm:px-6">
                      <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-semibold bg-slate-100 text-slate-700 border border-slate-200">
                        <Layers className="w-3 h-3 mr-1 text-slate-500" />
                        {student.section || '—'}
                      </span>
                    </td>

                    {/* Actions (NO MODAL - Inline delete confirmation) */}
                    <td className="py-4 px-4 sm:px-6 text-right">
                      {isConfirmingDelete ? (
                        <div className="inline-flex items-center space-x-1.5 animate-in fade-in duration-150">
                          <span className="text-xs text-rose-700 font-semibold mr-1">
                            Confirm delete?
                          </span>
                          <button
                            onClick={() => handleConfirmDelete(student.id)}
                            disabled={isBeingDeleted}
                            className="inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-bold bg-rose-600 text-white hover:bg-rose-700 transition shadow-xs cursor-pointer disabled:opacity-50"
                            title="Confirm Delete"
                          >
                            <Check className="w-3.5 h-3.5 mr-1" />
                            Yes
                          </button>
                          <button
                            onClick={handleCancelDelete}
                            disabled={isBeingDeleted}
                            className="inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-medium bg-slate-200 text-slate-700 hover:bg-slate-300 transition cursor-pointer"
                            title="Cancel"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ) : (
                        <div className="inline-flex items-center space-x-1">
                          <button
                            onClick={() => onEdit(student)}
                            disabled={isBeingDeleted}
                            className={`p-1.5 rounded-lg text-xs font-medium transition cursor-pointer ${
                              isEditing
                                ? 'bg-amber-100 text-amber-800'
                                : 'text-slate-600 hover:text-blue-600 hover:bg-slate-100'
                            }`}
                            title="Edit student"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>

                          <button
                            onClick={() => handleDeleteClick(student.id)}
                            disabled={isBeingDeleted}
                            className="p-1.5 rounded-lg text-xs font-medium text-slate-500 hover:text-rose-600 hover:bg-rose-50 transition cursor-pointer"
                            title="Delete student"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Table Footer */}
      <div className="p-3 sm:px-6 border-t border-slate-200 bg-slate-50/50 flex items-center justify-between text-xs text-slate-500">
        <span>
          Showing <span className="font-semibold text-slate-700">{filteredStudents.length}</span> of{' '}
          <span className="font-semibold text-slate-700">{students.length}</span> students
        </span>
        {searchTerm && (
          <span className="italic text-slate-400">
            Filtered by: &ldquo;{searchTerm}&rdquo;
          </span>
        )}
      </div>
    </div>
  );
}
