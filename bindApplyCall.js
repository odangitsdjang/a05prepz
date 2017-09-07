Function.prototype.myBind = function (ctx, ...bindArgs) {
  return (...callArgs) => {
    return this.apply(ctx, bindArgs.concat(callArgs));
  };
};

Function.prototype.myCall = function (ctx, ...bindArgs) {
  // clean
  // this works because unlike bind, apply will call the method
  return this.apply(ctx, bindArgs);

  // another way
  // return this.bind(ctx, ...bindArgs)();

  // dirty approach 1 - unnecessary
  // const f = () => { this.apply(ctx, bindArgs); };
  // return f();


  // dirty approach 2 - unnecessary
  // let that = this;
  // function f()  {
  //   that.apply(ctx, bindArgs);
  // }
  //
  // return f();
};

// apply takes in an array as the second argument
Function.prototype.myApply = function (ctx, array) {
  // break down array into multiple parameters doing what I did below
  return this.call(ctx, ...array);
};

// testing here
class Lamp {
  constructor() {
    this.name = "a lamp";
  }
}

const turnOn = function(first,second) {
   console.log("Turning on " + this.name);
   console.log(first);
   console.log(second);
};

const lamp = new Lamp();
//
// turnOn(); // should not work the way we want it to
//
// const boundTurnOn = turnOn.bind(lamp);
// boundTurnOn();
// const myBoundTurnOn = turnOn.myBind(lamp);
// myBoundTurnOn();  // works

turnOn.myCall(lamp, 1, 2);
turnOn.myApply(lamp, [1,2]);
