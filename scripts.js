// var employeeDT = [
//     ["Jen", "Barber", "4521", "Team Lead", "$80,0000", `<button id="deleteEmployeeBtn">delete</button>`],
//     ["Maurice", "Moss", "8724", "Support Team", "$58,0000", `<button id="deleteEmployeeBtn">delete</button>`],
//     ["Roy", "Smoth", "9623", "Quality Assurance", "$48,0000", `<button id="deleteEmployeeBtn">delete</button>`]
// ];
function Employee(fname, lname, id, title, salary) {
    this.fName = fname.charAt(0).toUpperCase() + fname.substr(1).toLowerCase();
    this.lName = lname.charAt(0).toUpperCase() + lname.substr(1).toLowerCase();
    this.id = id;
    this.title = title.charAt(0).toUpperCase() + title.substr(1).toLowerCase();;
    this.salary = salary;   //can not use .formatCurrency on a nonjquery type??
    this.btn = `<button id="deleteEmployeeBtn">delete</button>`;
}
const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0
})

var employeeDT = [

    new Employee("Jen", "Barber", "4521", "Team Lead", "$80,000"),
    new Employee("Maurice", "Moss", "8724", "Support Team", "$58,000"),
    new Employee("Roy", "Smoth", "9623", "Quality Assurance", "$48,000")
];

$(document).ready(onReady);

function onReady() {

    $('#TABLE').on('click', '#deleteEmployeeBtn', removeEmployee);

    $('#inputHolder').on('click', '#submitBtn', submitEmployee);
    $(`#TABLE`).DataTable
        ({
            columnDefs: [
                { title: "First Name", targets: 0 },
                { title: "Last Name", targets: 1 },
                { title: "ID", targets: 2 },
                { title: "Title", targets: 3 },
                { title: "Annual Salary", targets: 4 },
                { title: "", targets: 5 }
            ],

            data: employeeDT,


            columns: [
                { data: 'fName' },
                { data: 'lName' },
                { data: 'id' },
                { data: 'title' },
                { data: 'salary' },
                { data: 'btn' }
           ]
        });



    //#region INPUT REMOVAL

    //QUESTION FOR INSTRUCTOR, --> IS THERE ANY WAY TO IMPROVE THIS .FOCUS 
    // OR A STANDARD METHOD THAT DOES THIS SMALL THING FOR ME?

    //empties default value of input when focus'd allowing for user's input
    $('#firstName').focus(function () {
        if ($('#firstName').val() == 'First Name')
            $('#firstName').val('');
            
    });

    $('#lastName').focus(function () {
        if ($('#lastName').val() == 'Last Name')
            $('#lastName').val('');
    });

    $('#Id').focus(function () {
        if ($('#Id').val() == 'ID Number')
            $('#Id').val('');
    });

    $('#title').focus(function () {
        if ($('#title').val() == 'Title')
            $('#title').val('');
    });

    $('#salary').focus(function () {
        if ($('#salary').val() == 'Salary')
            $('#salary').val('');
    });
//#endregion
};

function submitEmployee(){
    let temp = new Employee(
    $('#firstName').val(), 
    $('#lastName').val(), 
    $('#Id').val(),  //IF this was real. I'd want to validate this ID with a SQL call.
    $('#title').val(),
    formatter.format($('#salary').val()));
    // $('#salary').formatCurrency({ roundToDecimalPlace: -2 }).val());

    employeeDT.push(temp); //does nothing but good to be consistant
    $(`#TABLE`).DataTable().row.add(temp).draw();
    drawMonthlyCost();
}


function drawMonthlyCost(){
    let total = 0;
    for(emp of employeeDT){
       total += numeral(emp.salary.substr(1)).value();
       // console.log(numeral(emp.salary.substr(1)).value());

    }
    $(`#totalCost`).text(formatter.format(total));
    
}
function removeEmployee() {
    $(`#TABLE`).DataTable().row($(this).parents('tr')).remove().draw(false);
    drawMonthlyCost();
}

