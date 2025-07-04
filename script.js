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


    renderSingleEmp();

    empList.addEventListener("click", (e) => {
        if (e.target.tagName === "SPAN" && selectedEmployeId !== e.target.id) {
            selectedEmployeId = e.target.id

            renderEmps();
            renderSingleEmp();

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



