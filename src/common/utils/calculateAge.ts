export const calculateAge = (birthdate: Date): number => {
    const ageDifMs = Date.now() - birthdate.getTime();
    const ageDate = new Date(ageDifMs); // miliseconds from epoch
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  };
  