import { calculateAge } from '../calculateAge';

describe('Utility Functions', () => {
  describe('calculateAge', () => {
    it('should handle future birthdates gracefully', () => {
      const birthdate = new Date();
      birthdate.setFullYear(birthdate.getFullYear() + 10); // Set birthdate to 10 years in the future
      const age = calculateAge(birthdate);
      expect(age).toBe(0); // Assuming the function returns 0 for future dates
    });
  });
});