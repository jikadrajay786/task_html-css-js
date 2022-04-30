var isEdit = false;
function uuIdv4() {
  return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>
    (
      c ^
      (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
    ).toString(16)
  );
}
function crud() {
  if (!validate()) {
    alert("Empty Form Not Valid");
  } else {
    insert();
  }
}
window.addEventListener("load", () => {
  const allEmployee = JSON.parse(localStorage.getItem("employee"));
  if (allEmployee != "" && allEmployee && allEmployee.length != 0) {
    document.getElementById("basicTable").style.display = "block";
    document.getElementById("advanceTable").style.display = "block";
  } else {
    document.getElementById("basicTable").style.display = "none";
    document.getElementById("advanceTable").style.display = "none";
  }
  basicHeader();
  advanceHeaderCreation();
  basicRowCreation(allEmployee);
  advanceRowCreation(allEmployee);
});

function insert() {
  let uniqueId = uuIdv4();
  let name = document.getElementById("employeeName").value;
  let gender = document.getElementsByName("Gender");
  if (gender[0].checked) {
    var gen = gender[0].value;
  } else {
    var gen = gender[1].value;
  }
  let dob = document.getElementById("dob").value;
  let email = document.getElementById("Email").value;
  let phone = document.getElementById("Phone").value;
  let hobby = document.getElementsByName("Hobby");
  let h = [];
  let len = hobby.length;

  for (let i = 0; i < len; i++) {
    if (hobby[i].checked) {
      h.push(hobby[i].value);
    }
  }
  console.log(h);
  let employee = {
    id: uniqueId,
    Name: name,
    Gender: gen,
    DOB: dob,
    Email: email,
    Phone: phone,
    Hobby: h,
  };

  /*Insert data here */
  if (typeof Storage != undefined) {
    if (isEdit == false) {
      let tempData = JSON.parse(localStorage.getItem("employee"));
      if (tempData == null) {
        let data = [employee];
        localStorage.setItem("employee", JSON.stringify(data));
      } else {
        tempData.push(employee);
        localStorage.setItem("employee", JSON.stringify(tempData));
      }
      basicRowCreation([employee]);
      advanceRowCreation([employee]);
      document.getElementById("basicTable").style.display = "block";
      document.getElementById("advanceTable").style.display = "block";
    } else {
    /*Update data here*/
      let updatedEmp = {
        id: uid,
        Name: name,
        Gender: gen,
        DOB: dob,
        Email: email,
        Phone: phone,
        Hobby: h,
      };
      getData = JSON.parse(localStorage.getItem("employee"));
      index = getData.findIndex((obj) => obj.id == uid);
      isEdit = false;
      if (index < 0) {
      } else {
        getData.splice(index, 1, updatedEmp);
        localStorage.setItem("employee", JSON.stringify(getData));
        let cur_row = document.getElementById(arr[index].id);
        const nodeLength = cur_row.childNodes.length;

        const keys = Object.keys(updatedEmp);
        for (let i = 0; i < nodeLength - 1; i++) {
          cur_row.childNodes[i].innerText = updatedEmp[keys[i]];
        }
        const employeeData = [
          "id",
          "Name",
          "Gender",
          "DOB",
          "Email",
          "Phone",
          "Hobby",
          "Action",
        ];

        for (let i = 0; i < employeeData.length - 1; i++) {
          document.getElementById(employeeData[i] + "-" + uid).innerText =
            updatedEmp[keys[i]];
        }
      }
    }
  }
  document.getElementById("employeeForm").reset();
}

function basicHeader() {
  const employeeData = [
    "id",
    "Name",
    "Gender",
    "DOB",
    "Email",
    "Phone",
    "Hobby",
    "Action",
  ];
  if (employeeData != "") {
    divBody = document.getElementById("DataTable");
    basicTable = document.createElement("table");
    tableHead = document.createElement("thead");
    headerRow = document.createElement("tr");
    for (let key of employeeData) {
      headerTd = document.createElement("td");
      headerTd.appendChild(document.createTextNode(key));
      headerRow.appendChild(headerTd);
    }
    tableHead.appendChild(headerRow);
    basicTable.appendChild(tableHead);
    tableBody = document.createElement("tbody");
    basicTable.appendChild(tableBody);
    divBody.appendChild(basicTable);
  }
}
function linkCreator(linkText, id, className, linkTitle) {
  a = document.createElement("a");
  linkText1 = document.createTextNode(linkText);
  a.appendChild(linkText1);
  a.setAttribute("id", id);
  a.className = className;
  a.title = linkTitle;
  return a;
}

function basicRowCreation(empData) {
  if (empData != null) {
    empData.forEach((empRow) => {
      bodyRow = document.createElement("tr");
      bodyRow.setAttribute("id", empRow.id);
      for (let key in empRow) {
        bodyTd = document.createElement("td");
        bodyTd.appendChild(document.createTextNode(empRow[key]));
        bodyRow.appendChild(bodyTd);
      }

      bodyTdLink = document.createElement("td");

      let edit = linkCreator("Edit", empRow.id, "edit", "edit");
      edit.addEventListener("click", function () {
        updateRow(this.id, true);
      });
      let remove = linkCreator("Remove", empRow.id, "remove", "remove");
      remove.addEventListener("click", function () {
        del(this.id, true);
      });

      bodyTdLink.appendChild(edit);
      bodyTdLink.appendChild(remove);
      bodyRow.appendChild(bodyTdLink);
      basicTable.appendChild(bodyRow);
    });
  } else {
    document.getElementById("basicTable").style.display = "none";
  }
}

function del(dataId) {
  if (confirm("press OK for delete!")) {
    var arr = new Array();
    arr = JSON.parse(localStorage.getItem("employee"));

    console.log(arr);
    index = arr.findIndex((obj) => obj.id == dataId);
    if (arr != "") {
      if (index < 0) {
        alert(index + "not allow here");
      } else {
        document.getElementById(arr[index].id).remove();
        const employeeData = [
          "id",
          "Name",
          "Gender",
          "DOB",
          "Email",
          "Phone",
          "Hobby",
          "Action",
        ];

        for (let i = 0; i < employeeData.length - 1; i++) {
          document.getElementById(employeeData[i] + "-" + dataId).remove();
        }
        console.log("jay");
        document.getElementById("Action-" + dataId).remove();

        arr.splice(index, 1);
        if (arr == "") {
          document.getElementById("basicTable").style.display = "none";
          document.getElementById("advanceTable").style.display = "none";
        }
      }
      localStorage.setItem("employee", JSON.stringify(arr));
    }
  } else {
  }
}

function updateRow(id) {
  isEdit = true;
  uid = id;
  let employeeForm = document.getElementById("employeeForm");
  arr = JSON.parse(localStorage.getItem("employee"));
  index = arr.findIndex((obj) => obj.id == id);
  console.log(index);

  employeeForm.employeeName.value = arr[index].Name;
  employeeForm.Gender.value = arr[index].Gender;
  employeeForm.dob.value = arr[index].DOB;
  employeeForm.Email.value = arr[index].Email;
  employeeForm.Phone.value = arr[index].Phone;

  hobbyArray = arr[index].Hobby;
  const hobbyLength = hobbyArray.length;
  employeeForm.Hobby1.checked = false;
  employeeForm.Hobby2.checked = false;
  employeeForm.Hobby3.checked = false;
  for (let i = 0; i < hobbyLength; i++) {
    if (employeeForm.Hobby1.value == hobbyArray[i]) {
      employeeForm.Hobby1.checked = true;
    } else if (employeeForm.Hobby2.value == hobbyArray[i]) {
      employeeForm.Hobby2.checked = true;
    } else if (employeeForm.Hobby3.value == hobbyArray[i]) {
      employeeForm.Hobby3.checked = true;
    }
  }
}

/*Advance table*/
function advanceHeaderCreation() {
  const empData = [
    "id",
    "Name",
    "Gender",
    "DOB",
    "Email",
    "Phone",
    "Hobby",
    "Action",
  ];
  if (empData != "") {
    advanceDivBody = document.getElementById("advanceDataTable");
    advanceTable = document.createElement("table");

    for (let key of empData) {
      advanceRow = document.createElement("tr");
      advanceRow.setAttribute("id", key + "-advanceRow");
      advanceTd = document.createElement("td");
      advanceTd.appendChild(document.createTextNode(key));
      advanceRow.appendChild(advanceTd);
      advanceTable.appendChild(advanceRow);
    }
    advanceDivBody.appendChild(advanceTable);
  }
}

function advanceRowCreation(empData) {
  if (empData != null) {
    empData.forEach((empRow) => {
      for (let key in empRow) {
        bodyRow = document.getElementById(key + "-advanceRow");
        bodyTd = document.createElement("td");
        bodyTd.setAttribute("id", key + "-" + empRow.id);
        bodyTd.appendChild(document.createTextNode(empRow[key]));
        bodyRow.appendChild(bodyTd);
      }
      bodyRowLink = document.getElementById("Action-advanceRow");
      bodyTdLink = document.createElement("td");
      bodyTdLink.setAttribute("id", "Action-" + empRow.id);
      let advanceEdit = linkCreator("Edit", empRow.id, "edit", "edit");
      advanceEdit.addEventListener("click", function () {
        updateRow(this.id, true);
      });
      let advanceRemove = linkCreator("Remove", empRow.id, "remove", "remove");
      advanceRemove.addEventListener("click", function () {
        del(this.id, true);
      });
      bodyTdLink.appendChild(advanceEdit);
      bodyTdLink.appendChild(advanceRemove);
      bodyRowLink.appendChild(bodyTdLink);
    });
  }
}