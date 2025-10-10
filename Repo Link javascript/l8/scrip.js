{
    let date = new Date()

    console.log(date);
}

{
    let date = Date.now()

    console.log(date);
}

{
    let date = new Date()
    console.log(date.getSeconds());
    console.log(date.getMinutes());
    console.log(date.getHours());
    console.log(date.getDate());
    console.log(date.getMonth() + 1);
    console.log(date.getFullYear());
}
{
    let today = new Date()

    let day =parseInt(prompt("enter the day "))
    let month =parseInt(prompt("enter the month "))
    let year =parseInt(prompt("enter the year "))
    
    today.setDate(day)
    today.setMonth(month-1)
    today.setFullYear(year)
    console.log(today);
}