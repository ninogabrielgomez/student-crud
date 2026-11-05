import React, { useState, useEffect } from 'react';
import { UserPlus, Save, X, RotateCcw, AlertTriangle } from 'lucide-react';

export default function StudentForm({ editingStudent, onSubmit, onCancelEdit, isSubmitting }) {
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    course: '',
    section: '',
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (editingStudent) {
      setFormData({
        firstname: editingStudent.firstname || '',
        lastname: editingStudent.lastname || '',
        course: editingStudent.course || '',
        section: editingStudent.section || '',
      });
      setErrors({});
    } else {
      setFormData({
        firstname: '',
        lastname: '',
        course: '',
        section: '',
      });
      setErrors({});
    }
  }, [editingStudent]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.firstname.trim()) newErrors.firstname = 'First name is required';
    if (!formData.lastname.trim()) newErrors.lastname = 'Last name is required';
    if (!formData.course.trim()) newErrors.course = 'Course is required (e.g. BSCS, BSIT)';
    if (!formData.section.trim()) newErrors.section = 'Section is required (e.g. 3-A, 1-B)';
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    onSubmit(formData);
  };

  const handleReset = () => {
    setFormData({
      firstname: '',
      lastname: '',
      course: '',
      section: '',
    });
    setErrors({});
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sticky top-20">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 mb-5 border-b border-slate-100">
        <div className="flex items-center space-x-2.5">
          <div
            className={`w-9 h-9 rounded-xl flex items-center justify-center text-white ${
              editingStudent ? 'bg-amber-600' : 'bg-blue-600'
            }`}
          >
            {editingStudent ? <Save className="w-5 h-5" /> : <UserPlus className="w-5 h-5" />}
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-800">
              {editingStudent ? 'Edit Student' : 'Add New Student'}
            </h2>
            <p className="text-xs text-slate-500">
              {editingStudent ? `Updating record ID #${editingStudent.id}` : 'Fill in the details below'}
            </p>
          </div>
        </div>

        {editingStudent && (
          <span className="px-2.5 py-1 text-xs font-semibold rounded-full bg-amber-100 text-amber-800 border border-amber-200">
            Edit Mode
          </span>
        )}
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* First Name */}
        <div>
          <label htmlFor="firstname" className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1">
            First Name <span className="text-rose-500">*</span>
          </label>
          <input
            id="firstname"
            name="firstname"
            type="text"
            placeholder="e.g. Juan"
            value={formData.firstname}
            onChange={handleChange}
            className={`w-full px-3.5 py-2.5 bg-slate-50 border rounded-xl text-sm transition focus:bg-white focus:outline-none focus:ring-2 ${
              errors.firstname
                ? 'border-rose-400 focus:ring-rose-200'
                : 'border-slate-300 focus:border-blue-500 focus:ring-blue-100'
            }`}
          />
          {errors.firstname && (
            <p className="mt-1 text-xs text-rose-600 flex items-center">
              <AlertTriangle className="w-3.5 h-3.5 mr-1" />
              {errors.firstname}
            </p>
          )}
        </div>

        {/* Last Name */}
        <div>
          <label htmlFor="lastname" className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1">
            Last Name <span className="text-rose-500">*</span>
          </label>
          <input
            id="lastname"
            name="lastname"
            type="text"
            placeholder="e.g. Dela Cruz"
            value={formData.lastname}
            onChange={handleChange}
            className={`w-full px-3.5 py-2.5 bg-slate-50 border rounded-xl text-sm transition focus:bg-white focus:outline-none focus:ring-2 ${
              errors.lastname
                ? 'border-rose-400 focus:ring-rose-200'
                : 'border-slate-300 focus:border-blue-500 focus:ring-blue-100'
            }`}
          />
          {errors.lastname && (
            <p className="mt-1 text-xs text-rose-600 flex items-center">
              <AlertTriangle className="w-3.5 h-3.5 mr-1" />
              {errors.lastname}
            </p>
          )}
        </div>

        {/* Course & Section Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {/* Course */}
          <div>
            <label htmlFor="course" className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1">
              Course <span className="text-rose-500">*</span>
            </label>
            <input
              id="course"
              name="course"
              type="text"
              placeholder="e.g. BSCS"
              value={formData.course}
              onChange={handleChange}
              className={`w-full px-3.5 py-2.5 bg-slate-50 border rounded-xl text-sm transition focus:bg-white focus:outline-none focus:ring-2 ${
                errors.course
                  ? 'border-rose-400 focus:ring-rose-200'
                  : 'border-slate-300 focus:border-blue-500 focus:ring-blue-100'
              }`}
            />
            {errors.course && (
              <p className="mt-1 text-xs text-rose-600 flex items-center">
                <AlertTriangle className="w-3.5 h-3.5 mr-1" />
                {errors.course}
              </p>
            )}
          </div>

          {/* Section */}
          <div>
            <label htmlFor="section" className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1">
              Section <span className="text-rose-500">*</span>
            </label>
            <input
              id="section"
              name="section"
              type="text"
              placeholder="e.g. 3-A"
              value={formData.section}
              onChange={handleChange}
              className={`w-full px-3.5 py-2.5 bg-slate-50 border rounded-xl text-sm transition focus:bg-white focus:outline-none focus:ring-2 ${
                errors.section
                  ? 'border-rose-400 focus:ring-rose-200'
                  : 'border-slate-300 focus:border-blue-500 focus:ring-blue-100'
              }`}
            />
            {errors.section && (
              <p className="mt-1 text-xs text-rose-600 flex items-center">
                <AlertTriangle className="w-3.5 h-3.5 mr-1" />
                {errors.section}
              </p>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="pt-2 flex flex-col sm:flex-row gap-2">
          <button
            type="submit"
            disabled={isSubmitting}
            className={`flex-1 inline-flex items-center justify-center px-4 py-2.5 rounded-xl text-sm font-semibold text-white shadow-sm transition active:scale-98 disabled:opacity-50 cursor-pointer ${
              editingStudent
                ? 'bg-amber-600 hover:bg-amber-700'
                : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            {editingStudent ? (
              <>
                <Save className="w-4 h-4 mr-2" />
                {isSubmitting ? 'Updating...' : 'Update Student'}
              </>
            ) : (
              <>
                <UserPlus className="w-4 h-4 mr-2" />
                {isSubmitting ? 'Adding...' : 'Add Student'}
              </>
            )}
          </button>

          {editingStudent ? (
            <button
              type="button"
              onClick={onCancelEdit}
              disabled={isSubmitting}
              className="inline-flex items-center justify-center px-4 py-2.5 rounded-xl text-sm font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 transition cursor-pointer"
            >
              <X className="w-4 h-4 mr-1.5 text-slate-500" />
              Cancel
            </button>
          ) : (
            <button
              type="button"
              onClick={handleReset}
              className="inline-flex items-center justify-center px-3 py-2.5 rounded-xl text-sm font-medium text-slate-600 bg-slate-100 hover:bg-slate-200 transition cursor-pointer"
              title="Reset fields"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
