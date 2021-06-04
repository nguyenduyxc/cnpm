// import { renderUserContent, textInputValidation } from "./common.js";
$(function () {
    $("table tbody").text("");
    $.ajax({
      url: "/usercar",
      type: "GET",
      dataType: "json",
      error: () => console.log("Không thể tải được sữ liệu"),
      success: (usercar) => {
        if (usercar.length > 0) {
          usercar.forEach((usercar, index) => {
            $("table tbody").append(renderUserContent(usercar));
          });
          reorderUsersList();
        } else {
        }
      },
    });
  
    let form = document.forms.userCar;
    $(form).on("submit", (e) => {
      e.preventDefault();
      saveNewUser(form);
    });
  
    let editForm = document.forms.editUserForm;
    $(editForm).on("submit", (e) => {
      e.preventDefault();
      saveEditUser($(editForm).data().userId, editForm);
    });
  });
  
  function saveNewUser(form) {
    let flag = true;
    flag = textInputValidation(form.elements.name, flag);
    flag = textInputValidation(form.elements.address, flag);
    flag = textInputValidation(form.elements.phone, flag);
    flag = textInputValidation(form.elements.car_description, flag);
    flag = textInputValidation(form.elements.price, flag);
    if (flag) {
        let name = $(form.elements.name).val().trim();
        address = $(form.elements.address).val().trim();
        phone = $(form.elements.phone).val().trim();
        car_description = $(form.elements.car_description).val().trim();
        price = $(form.elements.price).val().trim();
      $.ajax({
        url: "/usercar",
        type: "POST",
        dataType: "json",
        contentType: "application/json",
        data: JSON.stringify({ name,address,phone,car_description,price}),
        success: function (result) {
          $("table tbody").append(renderUserContent(result));
          form.reset();
          $(form).find("input").removeClass("is-valid");
          reorderUsersList();
        },
      });
    }
  }
  
  function saveEditUser(id, form) {
    let flag = true;
    flag = textInputValidation(form.elements.name, flag);
    flag = textInputValidation(form.elements.address, flag);
    flag = textInputValidation(form.elements.phone, flag);
    flag = textInputValidation(form.elements.car_description, flag);
    flag = textInputValidation(form.elements.price, flag);
    if (flag) {
      let name = $(form.elements.name).val().trim();
        address = $(form.elements.address).val().trim();
        phone = $(form.elements.phone).val().trim();
        car_description = $(form.elements.car_description).val().trim();
        price = $(form.elements.price).val().trim();
      

      $.ajax({
        url: "/usercar/" + id,
        type: "PUT",
        dataType: "json",
        contentType: "application/json",
        data: JSON.stringify({ name,address,phone,car_description,price}),
        success: function (result) {
          form.reset();
          $("#editUser").modal("hide");
          $(form).data().tr.replaceWith(renderUserContent(result));
          reorderUsersList();
        },
      });
    }
  }
  
  function renderUserContent(usercar) {
    let tr = $("<tr />", {
      class: "user-row",
      html: `
          <td class="text-center order-state"></td>
          <td>${usercar.name}</td>
          <td>${usercar.address}</td>
          <td>${usercar.phone}</td>
          <td>${usercar.car_description}</td>
          <td>${usercar.price}</td>
          <td></td>
          `,
    });
    tr.children().last().append(editBtn(usercar, tr), delBtn(usercar.id, tr));
    return tr;
  }
  
  function editBtn(usercar, tr) {
    let a = $("<a />", {
      class: "text-info mr-3",
      html: `<i class="fa fa-edit" aria-hidden="true"></i> Sửa`,
    });
    a.attr("data-toggle", "modal");
    a.attr("data-target", "#editUser");
  
    a.on("click", function () {
      let edit = document.forms.editUserForm;
      $(edit.elements.name).val(usercar.name);
      $(edit.elements.address).val(usercar.address);
      $(edit.elements.phone).val(usercar.phone);
      $(edit.elements.car_description).val(usercar.car_description);
      $(edit.elements.price).val(usercar.price);
      $(edit).data({ userId: usercar.id, tr: tr });
    });
  
    return a;
  }
  
  function delBtn(id, tr) {
    let a = $("<a />", {
      class: "text-danger",
      html: `<i class="fa fa-trash" aria-hidden="true"></i> Xóa`,
    });
    a.on("click", (e) => {
      e.preventDefault();
      $.ajax({
        url: "/usercar/" + id,
        type: "DELETE",
        success: (res) => {
          tr.remove();
          reorderUsersList();
        },
      });
    });
    return a;
  }
  
  function textInputValidation(fieldInput, flag) {
    let inputContent = $.trim($(fieldInput).val().trim());
    if (inputContent != "") {
      $(fieldInput).addClass("is-valid");
      $(fieldInput).removeClass("is-invalid");
    } else {
      $(fieldInput).removeClass("is-valid");
      $(fieldInput).addClass("is-invalid");
      flag = false;
    }
    return flag;
  }
  
  function reorderUsersList() {
    $(".user-row").each(function (index) {
      $(this)
        .find(".order-state")
        .text(index + 1);
    });
  }
  