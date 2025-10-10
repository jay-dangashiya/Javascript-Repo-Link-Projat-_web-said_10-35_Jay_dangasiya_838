
{
    console.log("isArray()");

    console.log(Array.isArray([1, 2, 3]));
    console.log(Array.isArray("hello"));
}

{
    console.log("Array.from(items)");

    console.log(Array.from("array"));
    console.log(Array.from([10, 20, 30], (a) => a + 10));
}

{
    console.log("Array.of()");

    let arr = Array.of(1, 2, 3);
    console.log(arr);
}