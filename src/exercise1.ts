/*
https://dev.to/macsikora/advanced-typescript-exercises-question-1-45k4

If we have a type which is wrapped type like Promise. 
How we can get a type which is inside the wrapped type? 
For example if we have Promise<ExampleType> how to get ExampleType?

type X = Promise<string>
type Y = Promise<{ field: number }>

type ResultX = Transform<X>; // ResultX type equals string
type ResultY = Transform<Y>; // ResultY type equals { field: number }

type Transform<A> = /** here your answer

*/

// Solution
type Transform<A> = A extends Promise<infer Inner> ? Inner : never;


// Samples
let result1: Transform<Promise<string>> = "xxx";
console.log(typeof result1 === "string") ; 

let result2: Transform<Promise<{ field: number }>> = { field: 1 };
console.log(typeof result2 === "object") ; 

