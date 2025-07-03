(async function () {
    let data = await fetch('./data.js')
    console.log(data)
    let res = await data.json();
    console.log(res)

    let employees = res;
    let selectedEmployeId = employees[0].id;
    let selectedEmploye = employees[0];

    const empList = document.querySelector(".emps__names--list")
    const empInfo = document.querySelector(".emps__singles--list")


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

    renderEmps()

})()