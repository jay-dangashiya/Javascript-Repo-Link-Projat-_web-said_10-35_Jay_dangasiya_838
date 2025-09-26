console.log("-------- Regular Functions --------");

{
  // 1. Simple Addition Function
  function addition(num1, num2) {
    return num1 + num2;
  }
  console.log(addition(5, 10));
}


{
  // 2. Check Even or Odd function
  function evenodd(num) {
    if (num % 2 === 0) {
      console.log("Even number");
    } else {
      console.log("Odd number");
    }
  }
  evenodd(7);
}


{
  // 3. Square of a Number function
  function square(num) {
    return num * num;
  }
  console.log(square(4));
}


{
  // 4. String Capitalizer function
  function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  }
  console.log(capitalize("jAY"));
}

console.log("---- Arrow Functions ----");




{
  // 1. Simple Addition with Arrow Function
  const addition = (num1, num2) => num1 + num2;
  console.log(addition(10, 10));
}




{
  // 2. Check Even or Odd Arrow function
  const evenodd = (num) => {
    if (num % 2 === 0) {
      console.log("Even number");
    } else {
      console.log("Odd number");
    }
  };
  evenodd(8);
}



{
  // 3. Square of a Number Arrow function
  const square = (num) => num * num;
  console.log(square(8));
}

console.log("");


{
  // 4. String Capitalizer Arrow function
  const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  console.log(capitalize("hello"));
}
