const email = document.getElementById("email");
const emailMessage = document.querySelector("#email + .invalid-feedback");

const password = document.getElementById("password");
const passwordMessage = document.querySelector("#password + .invalid-feedback");

const remember = document.getElementById("remember");

const form = document.forms.login;//quyen truy cap bieu mau dk dat ten

function checkEmail(emailVal) {
    let valid = true;

    if (emailVal.length == 0) {
        setFeedback(email, emailMessage, "Vui lòng nhập địa chỉ email");
        valid = false;
    } else if (
        !/^[a-z][a-z0-9_\.]{1,32}@[a-z0-9]{2,}(\.[a-z0-9]{2,4}){1,2}$/.test(
            emailVal
        )
    ) {
        setFeedback(email, emailMessage, "Email không hợp lệ");
        valid = false;
    }

    if (valid) {
        email.classList.remove("is-invalid");
        email.classList.add("is-valid");
    }

    return valid;
}

function checkPassword(passwordVal) {
    let valid = true;

    if (passwordVal.length == 0) {
        setFeedback(password, passwordMessage, "Vui lòng nhập mật khẩu");
        valid = false;
    } else if (passwordVal.length < 6) {
        setFeedback(password, passwordMessage, "Mật khẩu phải từ 6 - 32 ký tự");
        valid = false;
    }

    if (valid) {
        password.classList.remove("is-invalid");
        password.classList.add("is-valid");
    }

    return valid;
}

function setFeedback(el, feedback, content) {
    el.classList.remove("is-valid");
    el.classList.add("is-invalid");
    feedback.textContent = content;
}

form.addEventListener("submit", function (e) {
    e.preventDefault();//Phương thức PreventDefault () hủy sự kiện nếu nó có thể hủy được, có nghĩa là hành động mặc định thuộc về sự kiện sẽ không xảy ra.

    let emailVal = email.value.trim();
    let passwordVal = password.value;

    if (checkEmail(emailVal) && checkPassword(passwordVal)) {
        if (emailVal == "admincar@gmail.com" && passwordVal == "123465") {
            if (remember.checked) {
                localStorage.setItem("re", emailVal);
                localStorage.setItem("rp", passwordVal);
            } else {
                localStorage.removeItem("re");
                localStorage.removeItem("rp");
            }

            window.location.href =
                "http://localhost:3000/quanly.html";
        } else {
            alert("Tài khoản hoặc mật khẩu không đúng");
        }
    }
});

(function () {
    if (localStorage.getItem("re")) {
        email.value = localStorage.getItem("re");
        password.value = localStorage.getItem("rp");
        remember.checked = true;
    }
})();
//     $.ajax({
//       url: "/user",
//       type: "GET",
//       dataType: "json",
//       error: () => console.log("Không thể tải được sữ liệu"),
//       success: (user) => {
//         if (user.length > 0) {
//             form.addEventListener("submit", function (e) {
//                 e.preventDefault();//Phương thức PreventDefault () hủy sự kiện nếu nó có thể hủy được, có nghĩa là hành động mặc định thuộc về sự kiện sẽ không xảy ra.
            
//                 let emailVal = email.value.trim();
//                 let passwordVal = password.value;
            
//                 if (checkEmail(emailVal) && checkPassword(passwordVal)) {
//                     if (emailVal == "ba@techmaster.vn" && passwordVal == "123465") {
//                         if (remember.checked) {
//                             localStorage.setItem("re", emailVal);
//                             localStorage.setItem("rp", passwordVal);
//                         } else {
//                             localStorage.removeItem("re");
//                             localStorage.removeItem("rp");
//                         }
            
//                         window.location.href =
//                             "http://127.0.0.1:5501/js/validate/login.html";
//                     } else {
//                         alert("Tài khoản hoặc mật khẩu không đúng");
//                     }
//                 }
//             });
//         } else {
//         }
//       },
//     });
// ;