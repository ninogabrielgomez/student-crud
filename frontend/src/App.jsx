import React, { useState, useEffect, useCallback } from 'react';
import Navbar from './components/Navbar';
import StatsCards from './components/StatsCards';
import StudentForm from './components/StudentForm';
import StudentTable from './components/StudentTable';
import Notification from './components/Notification';
import {
  getAllStudents,
  createStudent,
  updateStudent,
  deleteStudent,
} from './api/studentService';

export default function App() {
  const [students, setStudents] = useState([]);
  const [editingStudent, setEditingStudent] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const [notification, setNotification] = useState(null);

  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
  };

  const closeNotification = () => {
    setNotification(null);
  };

  // Fetch all students from the API
  const fetchStudents = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await getAllStudents();
      // Ensure data is an array
      setStudents(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error('Error fetching students:', err);
      showNotification(
        'Could not connect to Student API. Ensure backend is running on port 8080.',
        'error'
      );
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchStudents();
  }, [fetchStudents]);

  // Handle Form Submission (Both Create and Update)
  const handleSubmit = async (formData) => {
    setIsSubmitting(true);
    try {
      if (editingStudent) {
        // UPDATE existing student
        const updated = await updateStudent(editingStudent.id, formData);
        setStudents((prev) =>
          prev.map((s) => (s.id === editingStudent.id ? updated : s))
        );
        showNotification(
          `Student "${updated.firstname} ${updated.lastname}" updated successfully!`,
          'success'
        );
        setEditingStudent(null);
      } else {
        // CREATE new student
        const created = await createStudent(formData);
        setStudents((prev) => [...prev, created]);
        showNotification(
          `Student "${created.firstname} ${created.lastname}" added successfully!`,
          'success'
        );
      }
    } catch (err) {
      console.error('Save error:', err);
      showNotification(
        `Failed to save student: ${err.message || 'Server error'}`,
        'error'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle Edit initiation
  const handleEdit = (student) => {
    setEditingStudent(student);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Cancel Edit mode
  const handleCancelEdit = () => {
    setEditingStudent(null);
  };

  // Handle Delete (without modal)
  const handleDelete = async (id) => {
    setDeletingId(id);
    try {
      await deleteStudent(id);
      setStudents((prev) => prev.filter((s) => s.id !== id));
      if (editingStudent && editingStudent.id === id) {
        setEditingStudent(null);
      }
      showNotification(`Student record #${id} deleted successfully.`, 'success');
    } catch (err) {
      console.error('Delete error:', err);
      showNotification(
        `Failed to delete student #${id}: ${err.message || 'Server error'}`,
        'error'
      );
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <Navbar
        studentCount={students.length}
        onRefresh={fetchStudents}
        isLoading={isLoading}
      />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Inline Feedback Notification Banner */}
        {notification && (
          <Notification
            message={notification.message}
            type={notification.type}
            onClose={closeNotification}
          />
        )}

        {/* Top Summary / Stats */}
        <StatsCards students={students} />

        {/* Main Content Layout: Form & Table (No Modals) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Form (4 cols on lg) */}
          <div className="lg:col-span-4">
            <StudentForm
              editingStudent={editingStudent}
              onSubmit={handleSubmit}
              onCancelEdit={handleCancelEdit}
              isSubmitting={isSubmitting}
            />
          </div>

          {/* Right Column: Table (8 cols on lg) */}
          <div className="lg:col-span-8">
            <StudentTable
              students={students}
              activeEditId={editingStudent ? editingStudent.id : null}
              onEdit={handleEdit}
              onDelete={handleDelete}
              isLoading={isLoading}
              deletingId={deletingId}
            />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white py-6 mt-12 text-center text-xs text-slate-500">
        <p>Student CRUD Management System • React + Vite + Tailwind CSS</p>
      </footer>
    </div>
  );
}
