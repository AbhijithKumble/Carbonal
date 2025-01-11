// Utility function to get today's date in YYYY-MM-DD format
export const getTodayDate = () => {
  return new Date().toISOString().split('T')[0]; // e.g., '2025-01-10'
};

