import { calculateAge } from "@/common/utils/calculateAge";

describe('Utility Functions', () => {
  describe('calculateAge', () => {
    it('should calculate the correct age given a birthdate', () => {
      const birthdate = new Date('1990-01-01');
      const age = calculateAge(birthdate);

      expect(age).toBe(new Date().getFullYear() - 1990);
    });

    it('should handle future birthdates gracefully', () => {
      const birthdate = new Date('2090-01-01');
      const age = calculateAge(birthdate);

      expect(age).toBe(0);
    });
  });
});
