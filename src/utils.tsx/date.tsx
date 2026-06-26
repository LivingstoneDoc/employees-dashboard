export const calculateAge = (birthDateString: string | null): number | null => {
  if (!birthDateString) return null;
  const birthDate = new Date(birthDateString);
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const month = today.getMonth() - birthDate.getMonth();
  const hasNotHadBirthdayThisYear =
    month < 0 || (month === 0 && today.getDate() < birthDate.getDate());
  if (hasNotHadBirthdayThisYear) {
    age--;
  }
  return age;
};
