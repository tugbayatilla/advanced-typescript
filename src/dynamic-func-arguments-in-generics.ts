export type MyEvent =
  | {
      type: "LOG_IN";
      payload: {
        userId: string;
      };
    } // or
  | {
      type: "LOG_OUT";
    };

const sendEvent1 = (eventType: MyEvent["type"], payload?: any) => {};

/*
    Correct 
*/
sendEvent1("LOG_IN", {
  userId: "123", // no intellisense support
});
sendEvent1("LOG_OUT");

/*
    Should error 
*/
// ERROR: userId is string but we are giving integer
sendEvent1("LOG_IN", {
  userId: 123,
});

// ERROR:  LOG_OUT is not expecting any paylog at all
sendEvent1("LOG_OUT", {});

// ERROR: no payload at all
sendEvent1("LOG_IN", {});

/* 
NOW it's time to make arguments dynamic in function with generics
*/

const sendEvent2 = <Type extends MyEvent["type"]>(                               
  ...args: Extract<MyEvent, { type: Type }> extends { payload: infer TPayload }  
    ? [type: Type, payload: TPayload]
    : [type: Type]
) => {};

// Explanations
// <Type extends MyEvent["type"]>    --> defining the generic argument with restricting the MyEvent type definitions: 'LOG_IN' | 'LOG_OUT'
// ...args:                          --> the argument is using 'spread syntax',  
// Extract<MyEvent, { type: Type }>  --> select the event with the type which is given at the usage of the function
// ? [type: Type, payload: TPayload] --> if truthy: tuple definition with type and payload
// ? [type: Type]                    --> if falsy: tuple definition with only type

// truthy: if the selected(extracted) type has payload
// infer means, whatever it is defined as payload, it will be used as type. infering that type


// same as sendEvent2
function sendEvent3<Type extends MyEvent["type"]>(
    ...args: Extract<MyEvent, { type: Type }> extends { payload: infer TPayload }  
    ? [type: Type, payload: TPayload]
    : [type: Type]
) {};
  

// SUCCESS: now intelli is helping us
  sendEvent2("LOG_IN", {
    userId: "123",
  });

