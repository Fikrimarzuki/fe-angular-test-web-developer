export interface Employee {
  id?: string;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  birthDate: string | Date;
  basicSalary: number | string;
  status: string;
  group: string;
  description: string | Date;
}