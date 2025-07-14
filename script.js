(async function () {
    let data = await fetch('./data.js')
    console.log(data)
    let res = await data.json();
    console.log(res)

    let employees = res;
    let selectedEmployeId = employees[0].id;
    let selectedEmploye = employees[0];

    const empList = document.querySelector(".emps__names--list")
    const empInfo = document.querySelector(".emps__names--info")
    const createButton = document.querySelector(".createEmp")
    const empTable = document.querySelector('.addEmploye')
    const formSubmit = document.querySelector(".emp_form");
    const dob = document.querySelector('.dob');
    const editEmploye = document.querySelector('.editEmploye');

    dob.max = `${new Date().getFullYear() - 18}-${new Date().toISOString().slice(5, 10)}`
    console.log(dob.max)

    let isEditing = false;
    let editId = null;


    editEmploye.addEventListener("click", (e) => {
        e.preventDefault();
        // empTable.style.display = "flex";
        empTable.style.display = "flex";
        isEditing = true;
        editId = selectedEmploye.id;
        // console.log(editId, isEditing)
        // console.log(formSubmit.firstName.value, 'yeh')

        // Set form fields with selectedEmploye data
        formSubmit.firstName.value = selectedEmploye.firstName;
        formSubmit.lastName.value = selectedEmploye.lastName;
        formSubmit.email.value = selectedEmploye.email;
        formSubmit.address.value = selectedEmploye.address;
        // formSubmit.contactNumber.value = +selectedEmploye.contactNo;
        formSubmit.salary.value = selectedEmploye.salary
        formSubmit.imageUrl.value = selectedEmploye.imageURL;
        // dob.value = `${new Date().getFullYear() - selectedEmploye.DOB}-01-01`; // rough conversion




        // console.log('jai baabe ki')

    })
    formSubmit.addEventListener("submit", (e) => {
        e.preventDefault()
        e.stopPropagation();

        let newPerson = {};

        let data = new FormData(formSubmit);
        // console.log([...data.entries()])

        for (let [key, value] of data.entries()) {
            // console.log(key, value)
            newPerson[key] = value;
        }

        newPerson.id = (employees[employees.length - 1]).id + 1

        newPerson.imageURL = newPerson.imageURL || "https://randomuser.me/api/portraits/women/4.jpg"
        console.log(typeof (dob.value))

        newPerson.DOB = (`${new Date().getFullYear() - parseInt(dob.value.slice(0, 4))}`)
        console.log(newPerson)

        if (isEditing) {
            let index = employees.findIndex(emp => emp.id === editId);
            newPerson.id = editId;
            employees[index] = newPerson;
            isEditing = false;
            editId = null;

        }


        // console.log(newPerson.age, typeof (newPerson.age))

        employees.push(newPerson)
        renderEmps();
        formSubmit.reset();
        empTable.style.display = "none";

    })

    createButton.addEventListener("click", () => {
        empTable.style.display = "flex"

    })

    empTable.addEventListener("click", (e) => {
        if (e.target.className === "addEmploye"
        ) {
            empTable.style.display = "none";
        }

    })
    // extra safety to stop event Propogation
    document.querySelector(".emp_form").addEventListener("click", (e) => {
        e.stopPropagation();

    })


    renderSingleEmp();

    empList.addEventListener("click", (e) => {
        if (e.target.tagName === "SPAN" && selectedEmployeId !== e.target.id) {
            selectedEmployeId = e.target.id

            renderEmps();
            renderSingleEmp();

        }
        if (e.target.tagName === "I") {
            console.log("clicked on cross")
            employees = employees.filter((emp) => String(emp.id) !== e.target.parentNode.id);

            if (String(selectedEmployeId) === e.target.parentNode.id) {
                selectedEmployeId = employees[0]?.id || -1;
                selectedEmploye = employees[0] || {};
                renderSingleEmp()
            }
            renderEmps();

        }


    })


    const renderEmps = () => {
        empList.innerHTML = "";

        employees.forEach((emp) => {
            let employe = document.createElement('span');
            employe.classList.add('emp__names--name')

            if (parseInt(selectedEmployeId, 10) === emp.id) {
                employe.classList.add('selected')
                selectedEmploye = emp


            }
            employe.setAttribute("id", emp.id)
            employe.innerHTML = `${emp.firstName} ${emp.lastName} <i class="empdel">❌</i>`
            empList.append(employe)
        })

    }
    renderEmps();

    function renderSingleEmp() {

        if (selectedEmployeId === -1) {
            empInfo.innerHTML = ""
            return;
        }
        console.log(`${selectedEmploye.imageURL}`)
        empInfo.innerHTML = `<img src="${selectedEmploye.imageURL}"/>
        <span class="name-heading">${selectedEmploye.firstName} ${selectedEmploye.lastName} ${selectedEmploye.age}</span>
        <span>${selectedEmploye.address}</span>
        <span>${selectedEmploye.email}</span>
        <span>${selectedEmploye.contactNo}</span>
        <span>${selectedEmploye.DOB}</span>
        
        `

    }


})()



