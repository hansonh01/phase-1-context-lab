/* Your Code Here */

function createEmployeeRecord(array){
    return {
        firstName : array[0],
        familyName : array[1],
        title : array[2],
        payPerHour : array[3],
        timeInEvents : [],
        timeOutEvents : []
    };
};

function createEmployeeRecords(arrays){
    const employeeRecords = [];

    arrays.forEach((array)=>{
        const employeeRecord = createEmployeeRecord(array);
        employeeRecords.push(employeeRecord);
    })

    return employeeRecords;
};

function createTimeInEvent(dateStamp){
    const [date, hour] = dateStamp.split(" ");
    this.timeInEvents.push({
        type : 'TimeIn',
        hour : parseInt(hour, 10),
        date : date,
    });
    return this;
};

function createTimeOutEvent(dateStamp){
    const [date, hour] = dateStamp.split(" ");
    this.timeOutEvents.push({
        type : 'TimeOut',
        hour : parseInt(hour, 10),
        date : date,
    });
    return this;
};

function hoursWorkedOnDate (dateStamp){
    const timeIn = this.timeInEvents.find((e)=> e.date === dateStamp);
    const timeOut = this.timeOutEvents.find((e)=> e.date === dateStamp);

    const tI = parseInt(timeIn.hour, 10);
    const tO = parseInt(timeOut.hour, 10);

    const totalHours = (tO - tI) / 100;

    return totalHours;
};

function wagesEarnedOnDate(dateStamp){
    const totalHours = hoursWorkedOnDate.call(this,dateStamp);
    const payPerHour = this.payPerHour;

    return totalHours * payPerHour;
};

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 
*/

const allWagesFor = function () {
    const eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    const payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
};

function findEmployeeByFirstName(collection, firstNameString){
    return collection.find((employeeRecord)=>{
        return employeeRecord.firstName === firstNameString;
    });
};

function calculatePayroll(employeeRecords){
    let totalPay = 0;
    employeeRecords.forEach((employeeRecord)=>{
        totalPay += allWagesFor.call(employeeRecord);
    });

    return totalPay;
};