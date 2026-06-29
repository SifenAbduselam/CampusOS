export function createPublicUser(user) {
  return {
    id: user.id,
    fullName: user.fullName,
    email: user.email,
    studentId: user.studentId,
    department: user.department,
    year: user.year,
    role: user.role,
    createdAt: user.createdAt
  };
}