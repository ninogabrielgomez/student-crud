const API_BASE_URL = import.meta.env.VITE_API_URL || '/gomez/students';

/**
 * Fetch all students
 */
export async function getAllStudents() {
  const response = await fetch(API_BASE_URL);
  if (!response.ok) {
    throw new Error(`Failed to fetch students (Status: ${response.status})`);
  }
  return response.json();
}

/**
 * Fetch a single student by ID
 */
export async function getStudentById(id) {
  const response = await fetch(`${API_BASE_URL}/${id}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch student #${id} (Status: ${response.status})`);
  }
  return response.json();
}

/**
 * Create a new student
 */
export async function createStudent(studentData) {
  const response = await fetch(API_BASE_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(studentData),
  });
  if (!response.ok) {
    throw new Error(`Failed to create student (Status: ${response.status})`);
  }
  return response.json();
}

/**
 * Update an existing student
 */
export async function updateStudent(id, studentData) {
  const response = await fetch(`${API_BASE_URL}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(studentData),
  });
  if (!response.ok) {
    throw new Error(`Failed to update student #${id} (Status: ${response.status})`);
  }
  return response.json();
}

/**
 * Delete a student by ID
 */
export async function deleteStudent(id) {
  const response = await fetch(`${API_BASE_URL}/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error(`Failed to delete student #${id} (Status: ${response.status})`);
  }
  return response.text();
}
