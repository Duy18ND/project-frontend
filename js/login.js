// Giả sử bạn có mã đăng nhập như sau:

document.addEventListener("DOMContentLoaded", function () {
    let signLogin = document.getElementById("signLogin");
    let users = JSON.parse(localStorage.getItem("users"));

    // Phần đăng nhập
    signLogin.addEventListener("click", function (event) {
        event.preventDefault();

        const inputLoginEmail = document.getElementById("inputLoginEmail").value.trim();
        const inputLoginPassword = document.getElementById("inputLoginPassword").value.trim();

        //Phần hiển thị thông báo đăng nhập
        let succes = document.getElementById("succes");
        let error = document.getElementById("error");
        // Ẩn thông báo khi mở tab
        succes.style.display = "none";
        error.style.display = "none";
        // Tìm người dùng có email và mật khẩu khớp
        let checkUser = users.find(user => user.email === inputLoginEmail && user.password === inputLoginPassword);
        //Kiểm tra email có hợp lệ hay không? nếu không hợp lệ find sẽ trả về  undefined
        if (checkUser) {
            succes.innerHTML = `
             <p><i class="fa-solid fa-circle-check"></i>
             Đăng nhập thành công</p>
             `;
            succes.style.display = "block";
            setTimeout(() => {
                window.location.href = "../components/homePage.html";  // Đường dẫn từ cd về thư mục gốc và vào thư mục components
            }, 1500);

        } else {
            error.innerHTML = `
             <div>
                <i class="fa-solid fa-circle-exclamation"></i><span
                    style="font-weight: bold; padding: 0px 5px;">Error</span>
            </div>
           <p>Email hoặc Password Lỗi!. Vui lòng kiểm tra lại</p>
            `;
            error.style.display = "block";
            setTimeout(() => {
                error.style.display = "none";
            }, 1500);
        };

        //Kiểm tra Email và mật khảu có trống không?
        if (inputLoginEmail === "") {
            error.innerHTML = `
            <div>
               <i class="fa-solid fa-circle-exclamation"></i><span
                   style="font-weight: bold; padding: 0px 5px;">Error</span>
           </div>
          <p>Email của bạn trống. Vui lòng kiểm tra lại!</p>
           `;
            error.style.display = "block";
            setTimeout(() => {
                error.style.display = "none";
            }, 1500);
        } else if (inputLoginPassword === "") {
            error.innerHTML = `
            <div>
               <i class="fa-solid fa-circle-exclamation"></i><span
                   style="font-weight: bold; padding: 0px 5px;">Error</span>
           </div>
          <p>Password của bạn trống. Vui lòng kiểm tra lại!</p>
           `;
            error.style.display = "block";
            setTimeout(() => {
                error.style.display = "none";
            }, 1500);
        };
    });
});
