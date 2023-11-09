type arbitraryFunction = (a: number, b: string) => number

type AppendArgument<F, A> = 
    F extends (...args: infer Args) => infer R 
    ? (x:A, ...args: Args) => R
    : never

type finalFunction = AppendArgument<arbitraryFunction, boolean> 
// type finalFunction = (x: boolean, a: number, b: string) => number
const finalF: finalFunction = (x,y,z)=> {
    return 1;
};

console.log(finalF(true, 1, '1'))