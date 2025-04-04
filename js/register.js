document.addEventListener("DOMContentLoaded", function () {
    let signRegister = document.getElementById("signRegister");
    let users = JSON.parse(localStorage.getItem("users")) || [];

    // Xử lý đăng ký
    signRegister.addEventListener("click", function (event) {
        event.preventDefault();  // Ngăn chặn form submit tự động

        let counterRegister = 0;

        // Lấy dữ liệu từ form đăng ký
        const inputRegisterEmail = document.getElementById("inputRegisterEmail").value.trim();
        const inputRegisterUser = document.getElementById("inputRegisterUser").value.trim();
        const inputRegisterPassword = document.getElementById("inputRegisterPassword").value.trim();

        let succes = document.getElementById("succes");
        let error = document.getElementById("error");

        // Reset thông báo lỗi và thành công
        succes.style.display = "none";
        error.style.display = "none";

        // Kiểm tra mật khẩu người dùng
        if (inputRegisterPassword.length < 8) {
            counterRegister++;
            error.innerHTML = `
             <div>
                <i class="fa-solid fa-circle-exclamation"></i><span
                    style="font-weight: bold; padding: 0px 5px;">Error</span>
            </div>
            <p style="margin-left: 20px;">Mật khẩu phải có ít nhất 8 ký tự!</p>
            `;
            error.style.display = "block";
        }

        // Kiểm tra đầu vào
        if (inputRegisterEmail === "" || inputRegisterPassword === "" || inputRegisterUser === "") {
            counterRegister++;
            error.innerHTML = `
             <div>
                <i class="fa-solid fa-circle-exclamation"></i><span
                    style="font-weight: bold; padding: 0px 5px;">Error</span>
            </div>
            <p style="margin-left: 20px;">Email, UserName, Mật Khẩu trống. Vui lòng kiểm tra lại!</p>
            `;
            error.style.display = "block";
        }

        // Kiểm tra email đã tồn tại
        let emailExists = users.find(user => user.email === inputRegisterEmail);
        if (emailExists) {
            counterRegister++;
            error.innerHTML = `
        <div>
           <i class="fa-solid fa-circle-exclamation"></i><span
               style="font-weight: bold; padding: 0px 5px;">Error</span>
       </div>
      <p>Email đã tồn tại. Vui lòng chọn email khác!</p>
       `;
            error.style.display = "block";
        }

        // Hiển thị thông báo
        if (counterRegister === 0) {
            setTimeout(() => {
                succes.style.display = "none";
            }, 1500);
        } else {
            setTimeout(() => {
                error.style.display = "none";
            }, 1500);
        }
        let userInfo = {
            email: inputRegisterEmail,
            name: inputRegisterUser,
            password: inputRegisterPassword
        };

        // Nếu không có lỗi, tiến hành lưu thông tin người dùng
        if (counterRegister === 0) {
            succes.style.display = "block";
            succes.innerHTML = `
            <p><i class="fa-solid fa-circle-check"></i>
             Đăng nhập thành công</p>
            `;

            users.push(userInfo);  // Thêm người dùng vào mảng
            localStorage.setItem("users", JSON.stringify(users));  // Lưu vào localStorage

            setTimeout(() => {
                window.location.href = "login.html";
            }, 1500);
        }
    });
});
