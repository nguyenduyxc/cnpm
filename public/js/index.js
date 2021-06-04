// import { renderUserContent, textInputValidation } from "./common.js";
$(function () {
  $("table tbody").text("");
  $.ajax({
    url: "/user",
    type: "GET",
    dataType: "json",
    error: () => console.log("Không thể tải được sữ liệu"),
    success: (user) => {
      if (user.length > 0) {
        user.forEach((user, index) => {
          $("table tbody").append(renderUserContent(user));
        });
        reorderUsersList();
      } else {
      }
    },
  });

  let form = document.forms.userPhone;
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
    flag = textInputValidation(form.elements.phone, flag);
    if (flag) {
      let name = $(form.elements.name).val().trim(),
      
        phone = $(form.elements.phone).val().trim();
      $.ajax({
        url: "/user",
        type: "POST",
        dataType: "json",
        contentType: "application/json",
        data: JSON.stringify({name,phone}),
        success: function (result) {
          $("table tbody").append(renderUserContent(result));
          form.reset();
          $(form).find("input").removeClass("is-valid");
          $("#classesModal").modal("hide");
          reorderUsersList();
        },
      });
    }
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
  function renderUserContent(user) {
    let tr = $("<tr />", {
      class: "user-row",
      html: `
          <td class="text-center order-state"></td>
          <td>${user.name}</td>
          <td>${user.phone}</td>
          <td></td>
          `,
    });
    tr.children().last().append(editBtn(user, tr), delBtn(user.id, tr));
    return tr;
  }
  function saveEditUser(id, form) {
    let flag = true;
    flag = textInputValidation(form.elements.name, flag);
  
    flag = textInputValidation(form.elements.phone, flag);
    if (flag) {
      let name = $(form.elements.name).val().trim(),
        phone = $(form.elements.phone).val().trim();
      $.ajax({
        url: "/user/" + id,
        type: "PUT",
        dataType: "json",
        contentType: "application/json",
        data: JSON.stringify({ name,phone }),
        success: function (result) {
          form.reset();
          $("#editUser").modal("hide");
          $(form).data().tr.replaceWith(renderUserContent(result));
          reorderUsersList();
        },
      });
    }
  }

  function editBtn(user, tr) {
    let a = $("<a />", {
      class: "text-info mr-3",
      html: `<i class="fa fa-edit" aria-hidden="true"></i> Sửa`,
    });
    a.attr("data-toggle", "modal");
    a.attr("data-target", "#editUser");
  
    a.on("click", function () {
      let edit = document.forms.editUserForm;
      $(edit.elements.name).val(user.name);
      $(edit.elements.phone).val(user.phone);
  
      $(edit).data({ userId: user.id, tr: tr });
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
        url: "/user/" + id,
        type: "DELETE",
        success: (res) => {
          tr.remove();
          reorderUsersList();
        },
      });
    });
    return a;  }
    
  