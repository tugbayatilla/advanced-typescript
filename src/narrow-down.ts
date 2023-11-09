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

// keyof User                       --> 'name' | 'lastname'
// "as"                             --> type casting

/* 
    (C[K] extends true ? K : never) 
    is a conditional type that checks 
    if the value of C[K] is assignable to true. 
    
    If it is, it includes the key K in the mapped type; 
    otherwise, it includes never, 
    effectively excluding that key from the mapped type.
*/


type ConfiguredUser<C extends Config> = {
    [K in keyof User as (C[K] extends true ? K : never)] -?: User[K]
}

declare function getUser<C extends Config>(config: C): ConfiguredUser<C>;

// test cases
const user = getUser({ name: true, lastname: false });
user.name; // this field should be non-optional
//user.lastname; // this field should not be there and we should have compile error 🛑

const user2 = getUser({ name: true, lastname: true });
user2.name; // this field should be non-optional
user2.lastname; // this field should be non-optional

const user3 = getUser({ name: false, lastname: true });
//user3.name; // this field should not be there and we should have compile error 🛑
user3.lastname; // this field should be non-optional

const user4 = getUser({ name: false, lastname: false });
user4; // user4 should be empty object {}
 
