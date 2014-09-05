
function RegisterUser() {
    $.ajax({
        url: "/Home/Register",
        type: "GET",
        datatype: "html",
        success: function (data) {
            $("#Partial").html(data)
        },
        error: function (data) {

        }
    });
}

function LoginUser() {

    $.ajax({
        url: "/Home/LogIn",
        type: "GET",
        datatype: "html",
        success: function (data) {
            $("#Partial1").html(data)
        },
        error: function (data) {

        }
    });
}


function Close() {
    $("#dialogDelConDept").dialog("close");
}

function Close1() {
    $("#dialogDelConEmp").dialog("close");
}

//function ChkEntry(id) {

//    $("#tblEmp").append("<tr>" + "<td>" + id + "</td>" + "<td>" + $("#Name").val() + "</td>" + "<td>" + $("#DropDown option:selected").text() + "</td>" + "<td>" + "<a href='#Employees' class='Edit' attr1='" + id + "'>" + "Edit</a>" + "|" + "<a href='#Employees' class='Delete' attr2='" + id + "'>" + "Delete</a>" + "</td>" + "</tr>");

//}

function EmpEntry() {
    $("#Spinner1").show();
    var name = document.getElementById("Name").value.trim();
    var psw = document.getElementById("Password").value.trim();
    var cpsw = document.getElementById("Cpassword").value.trim();
    var email = document.getElementById("Email").value.trim();
    var chekboxarr1 = [];
    $('input:checked').each(function () {

        chekboxarr1.push($(this).attr("value"));
    })

 
 


    if (name == "" || name == "Please enter the name") {
        $("#Name").val("Please enter the name");
    } else {
        $.ajax({
            url: "/Home/Register",
            type: "POST",
            traditional: true,
            data: { name: name, email: email, password: psw, confirmpassword: cpsw, DeptsValue: chekboxarr1 },
            datatype: "json",
            success: function (data) {
                //alert("success");
                $("#Spinner1").hide();
                $("#tblEmp").empty();
                $("#tblEmp").append("<tr>" + "<td>" + "Id" + "</td>" + "<td>" + "Name" + "</td>" + "<td>" + "Department" + "</td>" + "<td>" + "Action" + "</td>" + "</tr>");
                FetchAllEmp();
                $("#dialog").dialog('close');
                $("#ChkBoxes").empty();

            },
            error: function (data) {
                alert("error");
            }
        });
    }
}

function FetchAllEmp() {
    $("#EmpTitle").show();
    $("#DeptTitle").hide();
    $("#OpenDialog1").hide();
    $("#tblEmp").show();
    $("#Spinner").show();
    $.ajax({
        url: "/Home/GetAllEmployee",
        type: "GET",
        datatype: "json",
        success: function (data) {
            var jsonObj = JSON.parse(data);
            $("#Spinner").hide();
            $.each(jsonObj, function (i, item) {

              //  $("#tblEmp").append("<tr>" + "<td>" + item.Id + "</td>" + "<td>" + item.Name + "</td>" + "<td>" + item.Department.Name + "</td>" + "<td>" + "<a href='#Employees' class='Edit' attr1='" + item.Id + "'>" + "Edit</a>" + "|" + "<a href='#Employees' class='Delete' attr2='" + item.Id + "'>" + "Delete</a>" + "</td>" + "</tr>");
                $("#tblEmp").append("<tr>" + "<td>" + item.Id + "</td>" + "<td>" + item.Name + "</td>" + "<td>" + item.Department + "</td>" + "<td>"  + "<a href='#Employees' class='Delete' attr2='" + item.Id + "'>" + "Delete</a>" + "</td>" + "</tr>");

            });
        },
        error: function (data) {

        }
    });
}

function FetchDataDropDown() {

    $.ajax({
        url: "/Home/LoadDropDownList",
        type: "GET",

        datatype: "json",
        success: function (data) {
            $("#ChkBoxes1").empty();
            $("#ChkBoxes1").append("Select Departments:" + "<br/>" + "<br/>");
            var jsonObj = JSON.parse(data);
         
            if (jsonObj != "") {
                $.each(jsonObj, function (index, optiondata) {

                    $("#ChkBoxes1").append("<input type='checkbox' name='DeptsValue' class='ChkDepts' value='" + optiondata.Id + "'/s>" + optiondata.depart + "<br/>");
                });
            } else {
                $("#chkk").empty();
                $("#chkk").append("<p><b>Please create a new department first to assign it to an employ!</b></p>");
                setTimeout(function () {
                    $("#dialog").dialog("close");

                    var url = '@Url.Action("Index", "Home")';
                    window.location.href = url;
                }, 4000);

            }
        },
        error: function (data) {

        }
    });
}

function EmpEdit() {
    debugger;
    var id = $("#EditId").val();
 
    var name = document.getElementById("Name1").value.trim();
    var chekboxarr1 = [];
    $('input:checked').each(function () {

        chekboxarr1.push($(this).attr("value"));
    })
    if (name == "" || name == "Please enter the name") {
        $("#Name1").val("Please enter the name");
    } else {
        $.ajax({
            url: "/Home/EditEmp",
            type: "POST",
            data: { id: id, name: name, dept: chekboxarr1 },
            datatype: "json",
            success: function (data) {
                $("#tblEmp").empty();
                $("#tblEmp").append("<tr>" + "<td>" + "Id" + "</td>" + "<td>" + "Name" + "</td>" + "<td>" + "Department" + "</td>" + "<td>" + "Action" + "</td>" + "</tr>");
                FetchAllEmp();
                $("#dialog1").dialog('close');
            },
            error: function (data) {

            }
        });
    }
}

function DelConfirmEmp() {
    var id = $("#EditDelId").val();
    $.ajax({
        url: "/Home/Del",
        type: "POST",
        data: { id: id },
        datatype: "json",
        success: function (data) {
            $("#dialogDelConEmp").dialog("close");
            $("#tblEmp").empty();
            $("#tblEmp").append("<tr>" + "<td>" + "Id" + "</td>" + "<td>" + "Name" + "</td>" + "<td>" + "Department" + "</td>" + "<td>" + "Action" + "</td>" + "</tr>");
            FetchAllEmp();
        },
        error: function (data) {

        }
    });
}



var count = 0;

function ChkDept(id) {
    var x = 0;
    $("#tblDept").append("<tr>" + "<td>" + id + "</td>" + "<td>" + $("#DeptName").val() + "</td>" + "<td>" + x + "</td>" + "<td>" + "<a href='#Departments' class='EditDept' attr3='" + id + "'>" + "Edit</a>" + "|" + "<a href='#Departments' class='DeleteDept' attr4='" + id + "'>" + "Delete</a>" + "</td>" + "</tr>");

}

function displayDeptAll() {
    $("#EmpTitle").hide();
    $("#DeptTitle").show();
    $("#OpenDialog").hide();
    $("#tblDept").show();
    $("#Spinner").show();

    $.ajax({
        url: "/Home/GetAllEmployeesByDepartments",
        type: "Get",
        datatype: "json",
        success: function (data) {
            var jsonObj = JSON.parse(data);
            $("#Spinner").hide();
            $.each(jsonObj, function (i, item) {

                //x =new Array(GetEmpByDept(item.Id));
                $("#tblDept").append("<tr>" + "<td>" + item.Id + "</td>" + "<td>" + item.Name + "</td>" + "<td>" + item.Total + "</td>" + "<td>" + "<a href='#Departments' class='EditDept' attr3='" + item.Id + "'>" + "Edit</a>" + "|" + "<a href='#Departments' class='DeleteDept' attr4='" + item.Id + "'>" + "Delete</a>" + "</td>" + "</tr>");;
            });
        },
        error: function (data) {

        }
    });
};

function GetEmpByDept(id) {
    var id1 = id;
    $.ajax({
        url: "/Home/GetNumberOfEmpByDeptId",
        type: "GET",
        data: { id: id1 },
        success: function (data) {
            count = data;
        },
        error: function (data) {

        }
    });

    return count;
}


function DeptEntry() {
    var name = document.getElementById("DeptName").value.trim();
    var id;
    if (name == "" || name == "Please enter the name") {
        $("#DeptName").val("Please enter the name");
    } else {
        $.ajax({
            url: "/Home/CreateDepartment",
            type: "POST",
            data: { name: name },
            datatype: "json",
            success: function (data) {
                id = JSON.parse(data);
                ChkDept(id.Id);
                $("#dialog2").dialog("close");
                $("#DeptName").val("");
            },
            error: function (data) {

            }
        });
    }
}


function DeptEdit() {
    var id = $("#EditDeptId").val();
    var name = document.getElementById("DeptName1").value.trim();
    if (name == "" || name == "Please enter the name") {
        $("#DeptName1").val("Please enter the name");
    } else {
        $.ajax({
            url: "/Home/EditDept",
            type: "POST",
            data: { id: id, name: name },
            datatype: "json",
            success: function (data) {
                $("#tblDept").empty();
                $("#tblDept").append("<tr>" + "<td>" + "Id" + "</td>" + "<td>" + "Name" + "</td>" + "<td>" + "No of employees" + "</td>" + "<td>" + "Actions" + "</td>" + "</tr>");
                displayDeptAll();
                $("#dialog3").dialog('close');

            },
            error: function (data) {

            }
        });
    }
}


function DeleteDept() {
    var id = $("#EditDelDeptId").val();

    $.ajax({
        url: "/Home/DeleteDept",
        type: "POST",
        data: { id: id },
        datatype: "json",
        success: function (data) {
            $("#tblDept").empty();
            $("#tblDept").append("<tr>" + "<td>" + "Id" + "</td>" + "<td>" + "Name" + "</td>" + "<td>" + "No of employees" + "</td>" + "<td>" + "Actions" + "</td>" + "</tr>");
            displayDeptAll();
            $("#dialogDelConDept").dialog("close");

        },
        error: function (data) {

        }
    });
}

function fillingData() {

    $("#tblDept").empty();
    $("#tblDept").append("<tr>" + "<td>" + "Id" + "</td>" + "<td>" + "Name" + "</td>" + "<td>" + "No of employees" + "</td>" + "<td>" + "Actions" + "</td>" + "</tr>");
    displayDeptAll();
    $("#OpenDialog1").show();
    $("#tblDept").show();
    $("#tblEmp").hide();
    $("#OpenDialog").hide();
    $("#LoginForm").hide();
    $("#RegisterForm").hide();

}


$(function () {

    $(document).ajaxError(function (e, xhr) {
        $("#MainBody").addClass("transparent");
        $("#MainDiv").hide();
        if (xhr.status == 401) {
            $("#Popup").dialog('open');
        }
    });

    $("#Popuplink").click(function () {
        $("#MainBody").show();

        $("#Popup").dialog('close');
        $(location).attr('href', "http://10.1.81.226:1043/#Login");
        window.location.reload(true);
    });


    $("#OpenDialog").hide();
    $("#OpenDialog1").hide();
    $("#MainHead").show();

    $("#HomeLink").click(function () {

        $("#OpenDialog").hide();
        $("#OpenDialog1").hide();
        $("#Partial").hide();
        $("#Partial1").hide();
        $("#tblDept").hide();
        $("#tblEmp").hide();
        $("#MainHead").hide();
        $("#MainHead1").show();


    });
    if ($(location).attr('href') == "http://10.1.81.226:1043/#Home") {

        $("#OpenDialog").hide();
        $("#OpenDialog1").hide();
        $("#Partial").hide();
        $("#Partial1").hide();
        $("#tblDept").hide();
        $("#tblEmp").hide();
        $("#MainHead").hide();
        $("#MainHead1").show();

    }

    if ($(location).attr('href') == "/#Employees" || $(location).attr('href') == "http://10.1.81.226:1043/#Employees" || $(location).attr('href') == "http://10.1.81.226:1043/Home/Index#Employees") {
        $("#OpenDialog").show();
        $("#OpenDialog1").hide();
        $("#tblEmp").empty();
        $("#tblEmp").append("<tr>" + "<td>" + "Id" + "</td>" + "<td>" + "Name" + "</td>" + "<td>" + "Department" + "</td>" + "<td>" + "Action" + "</td>" + "</tr>");
        $("#Partial").hide();
        $("#Partial1").hide();
        $("#tblDept").hide();
        $("#MainHead").hide();
        FetchAllEmp();
    }

    if ($(location).attr('href') == "http://10.1.81.226:1043/#Login") {
        $("#MainDiv").hide();
        var url = $("#LoginLink").attr('path');
        $.ajax({
            url: url,
            type: "GET",
            datatype: "html",
            success: function (data) {
                $("#Partial1").html(data)
            },
            error: function (data) {

            }
        });
    }

    if ($(location).attr('href') == "/#EmployeeUser") {
        $("#MainDiv").hide();
      //  var url = $("#LoginLink").attr('path');
        $.ajax({
            url:"/Home/EmployeeUser",
            type: "GET",
            datatype: "html",
            success: function (data) {
                $("#Partial2").html(data)
            },
            error: function (data) {

            }
        });
    }

    if ($(location).attr('href') == "http://10.1.81.226:1043/#Login?err=1") {
        $("#MainDiv").hide();
        var url = $("#LoginLink").attr('path');
        $.ajax({
            url: url,
            type: "GET",
            datatype: "html",
            success: function (data) {
                $("#Partial1").html(data)

            },
            error: function (data) {

            }
        });
    }

    //if ($(location).attr('href').indexOf("#ConfirmEmail") > -1) {
    //    $("#MainDiv").hide();
    //  //  var id=getURLParameter('userId');
    // //   var code=getURLParameter('code');
    //    $.ajax({
    //        url: "/Home/ConfirmEmail",
    //        type: "GET",
    //        data:{userId:id,code:code},
    //        datatype: "html",
    //        success: function (data) {
    //            $("#Partial4").html(data)

    //        },
    //        error: function (data) {

    //        }
    //    });
    //}

    if ($(location).attr('href') == "http://localhost:1612/#Departments" || $(location).attr('href') == "http://10.1.81.226:1043/#Departments" || $(location).attr('href') == "http://10.1.81.226:1043/Home/Index#Departments") {
        $("#MainHead").hide();
        fillingData();

    }

    if ($(location).attr('href') == "http://10.1.81.226:1043/#Register") {
        $("#MainDiv").hide();

        $.ajax({
            url: "/Home/Register",
            type: "GET",
            datatype: "html",
            success: function (data) {
                $("#Partial1").html(data)
            },
            error: function (data) {

            }
        });
    }

    if ($(location).attr('href') == "http://10.1.81.226:1043/#Register?err=1" || $(location).attr('href') == "http://10.1.81.226:1043/#Register?err=2") {
        $("#MainDiv").hide();
        $.ajax({
            url: "/Home/Register",
            type: "GET",
            datatype: "html",
            success: function (data) {
                $("#Partial1").html(data)
            },
            error: function (data) {

            }
        });
    }




    //on Department link click event
    $("#DeptLink").click(function () {
        fillingData();
        $("#MainHead").hide();
    });

    // on Regiter Link click event
    $("#RegisterLink").click(function () {
        //  $(location).empty();
        //  $(location).attr('href', "http://10.1.81.226:1043/#Register");
        //  window.location.reload(true);
        RegisterUser();
        $("#Partial").show();
        $("#Partial1").hide();
        $("#tblEmp").hide();
        $("#EmpTitle").hide();
        $("#MainDiv").hide();
        //$(location).attr('href', "http://10.1.81.226:1043/Home/Login#Register");
        //window.location.reload(true);
        //$("#tblEmp").hide();
        //$("#OpenDialog").hide();
        //$("#tblDept").hide();
        //$("#OpenDialog1").hide();
        //$("#EmpTitle").hide();
        //$("#DeptTitle").hide();
        //$("#LoginForm").hide();
        //$("#LoginTitle").hide();
        //$("#RegisterForm").show();
    });

    // on Login link click event
    $("#LoginLink").click(function () {
        // $(location).empty();
        //  $(location).attr('href', "http://10.1.81.226:1043/#Login");
        // window.location.reload(true);
        LoginUser();
        $("#Partial1").show();
        $("#Partial").hide();
        $("#tblEmp").hide();
        $("#EmpTitle").hide();
        $("#MainDiv").hide();

        //$("#tblEmp").hide();
        //$("#OpenDialog").hide();
        //$("#tblDept").hide();
        //$("#OpenDialog1").hide();
        //$("#LoginForm").show();
        //$("#LoginTitle").show();
        //$("#EmpTitle").hide();
        //$("#DeptTitle").hide();
        //$("#RegisterForm").hide();
    });


    //on Employee link click event
    $("#EmpLink").click(function () {
       // FetchDataDropDown();
        $("#tblEmp").empty();
        $("#tblEmp").append("<tr>" + "<td>" + "Id" + "</td>" + "<td>" + "Name" + "</td>" + "<td>" + "Department" + "</td>" + "<td>" + "Action" + "</td>" + "</tr>");
        FetchAllEmp();
        $("#OpenDialog").show();
        $("#tblDept").hide();
        $("#OpenDialog1").hide();
        $("#LoginForm").hide();
        $("#LoginTitle").hide();
        $("#RegisterForm").hide();
        $("#MainHead").hide();
    });

    // create Pop Up for session expire
    $("#Popup").dialog({

        height: 300,
        width: 600,
        autoOpen: false
    })
    // create dialog for Employee
    $("#dialog").dialog({
        height: 500,
        width: 600,
        autoOpen: false,
        show: {
            effect: "fade",
            duration: 1000

        },

    });


    
    //edit dialog for Employee
    $("#dialog1").dialog({
        height: 300,
        width: 600,
        autoOpen: false,
        resizable: false,
        show: {
            effect: "fade",
            duration: 1000

        },

    });

    //change password for emplyee
    $("#dialogChangePassword").dialog({

        height: 300,
        width: 600,
        autoOpen: false,
        resizable: false,
        show: {
            effect: "fade",
            duration: 1000

        }

    });
    // create dialog for Department
    $("#dialog3").dialog({
        height: 300,
        width: 600,
        autoOpen: false,
        show: {
            effect: "fade",
            duration: 1000

        },

    });
    // edit for profile dialog 
    $("#dialogChangeProfile").dialog({

        height: 300,
        width: 600,
        autoOpen: false,
        show: {
            effect: "fade",
            duration: 1000

        },


    })
    // edit dialog for Department

    $("#dialog2").dialog({
        height: 300,
        width: 600,
        autoOpen: false,
        resizable: false,
        show: {
            effect: "fade",
            duration: 1000

        },

    });

    $("#dialogDelConEmp").dialog({
        height: 300,
        width: 600,
        autoOpen: false,
        resizable: false,
        open: function (event, ui) {
            $(this).css('overflow', 'hidden');
            $("body").css('overflow', 'hidden');
        },
        beforeClose: function (event, ui) {
            $("body").css({ overflow: 'inherit' });
        },
        show: {
            effect: "fade",
            duration: 1000

        },

    });

    $("#dialogDelConDept").dialog({
        height: 300,
        width: 600,
        autoOpen: false,
        resizable: false,
        open: function (event, ui) {
            $(this).css('overflow', 'hidden');
            $("body").css('overflow', 'hidden');
        },
        beforeClose: function (event, ui) {
            $("body").css({ overflow: 'inherit' });
        },
        show: {
            effect: "fade",
            duration: 1000
        },
    });
    // click event for opening create Dialog
    $("#OpenDialog").click(function () {
      //  FetchDataDropDown();
        $.ajax({
            url: "/Home/LoadDropDownList",
            type: "GET",

            datatype: "json",
            success: function (data) {
                $("#dialog").dialog("open");
                $("#ChkBoxes").empty();
                $("#ChkBoxes").append("Select Departments:" + "<br/>" + "<br/>");
                var jsonObj = JSON.parse(data);
                debugger;
                console.log(jsonObj);
                if (jsonObj != "") {
                    $.each(jsonObj, function (index, optiondata) {
                       
                        $("#ChkBoxes").append("<input type='checkbox' name='DeptsValue' class='ChkDepts' value='" + optiondata.Id + "'/s>" + optiondata.depart + "<br/>");
                    });
                } else {
                    $("#chkk").empty();
                    $("#chkk").append("<p><b>Please create a new department first to assign it to an employ!</b></p>");
                    setTimeout(function () {
                        $("#dialog").dialog("close");

                        var url = '@Url.Action("Index", "Home")';
                        window.location.href = url;
                    }, 4000);

                }
            },
            error: function (data) {

            }
        });

    });

  
    // click event for editing dialog
    $("#OpenDialog1").click(function () {


        $("#dialog2").dialog("open");
    });


    $(document).on('click', '.Edit', function () {
        FetchDataDropDown();
        var id = $(this).attr("attr1");
        debugger;
        $.ajax({
            url: "/Home/GetEmpById",
            type: "Get",
            async: true,
            contentType: 'application/json; charset=utf-8',
            data: { id: id },
            datatype: "json",
            success: function (result) {
                var jsonObj = JSON.parse(result);
                $("#dialog1").dialog('open');
                $("#Name1").text("hello");
                $(".ChkDepts").prop('checked', false);
                $("#EditId").val(id);
            },
            error: function (result) {


            }
        });
    });

    //click event for Deleteing employee
    $(document).on('click', '.Delete', function () {

        var id = $(this).attr("attr2");
        $.ajax({
            url: "/Home/GetEmpById",
            type: "Get",
            async: true,
            contentType: 'application/json; charset=utf-8',
            data: { id: id },
            datatype: "json",
            success: function (result) {
                var jsonObj = JSON.parse(result);
                $("#dialogDelConEmp").dialog('open');
                $("#PempName").text(jsonObj.Name + " from department " + jsonObj.Department.Name + " ?");
                $("#EditDelId").val(id);
            },
            error: function (result) {


            }
        });
    });
    // click event for editing department
    $(document).on('click', '.EditDept', function () {
        var id = $(this).attr("attr3");

        $.ajax({
            url: "/Home/GetDeptById",
            type: "Get",
            async: true,
            contentType: 'application/json; charset=utf-8',
            data: { id: id },
            datatype: "json",
            success: function (result) {
                var jsonObj = JSON.parse(result);
                $("#dialog3").dialog('open');
                $("#DeptName1").val(jsonObj.Name);
                $("#EditDeptId").val(id);

            },
            error: function (result) {


            }
        });
    });

    // click event for deleteing department
    $(document).on('click', '.DeleteDept', function () {
        var id = $(this).attr("attr4");
        $.ajax({
            url: "/Home/GetDeptById",
            type: "Get",
            async: true,
            contentType: 'application/json; charset=utf-8',
            data: { id: id },
            datatype: "json",
            success: function (result) {
                var jsonObj = JSON.parse(result);
                $("#dialogDelConDept").dialog('open');
                $("#PdeptName").text(jsonObj.Name + "?");
                $("#EditDelDeptId").val(id);
            },
            error: function (result) {


            }
        });
        //DeleteDept($(this));

    });

});
