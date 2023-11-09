/*

link: https://dev.to/macsikora/advanced-typescript-exercises-question-5-5b5f

We have function getUser which gets Config object, 
the object defines what fields of User function will return. 

If for example config says { name: true, lastname: false } it means returned object should have name field non-optional 
but no field lastname. 

Current User type is very broad type of the return, 
we need to narrow it down depending on the config passed as argument of getUser. 

Solution should be done only at the type level, 
no value level code should be written. 

Only function declaration getUser is to be changed

*/

// Here types should remain the same ❄
type Config = {
  name: boolean;
  lastname: boolean;
};
type User = {
  name?: string;
  lastname?: string;
};

// Here declaration to be changed 🔥
declare function getUser(config: Config): User;

// test cases
const user = getUser({ name: true, lastname: false });
user.name; // this field should be non-optional
user.lastname; // this field should not be there and we should have compile error 🛑

const user2 = getUser({ name: true, lastname: true });
user2.name; // this field should be non-optional
user2.lastname; // this field should be non-optional

const user3 = getUser({ name: false, lastname: true });
user3.name; // this field should not be there and we should have compile error 🛑
user3.lastname; // this field should be non-optional

const user4 = getUser({ name: false, lastname: false });
user4; // user4 should be empty object {}
