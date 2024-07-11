// INTERFACES
// * Interfaces in typescript just like type script but in advanced version actually

interface Iuser {
  username: string;
  email: string;
  age: number;
}

interface Iemployee extends Iuser {
  employeeId: number;
}

const emp: Iemployee = {
  username: "babu",
  email: "babu@gmail.com",
  age: 22,
  employeeId: 45,
};

const orker: Iuser = {
  username: "babu",
  email: "babu@gmail.com",
  age: 22,
};

console.log(emp);
