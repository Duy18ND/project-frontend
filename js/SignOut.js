function signOut() {
    let check = confirm("Bạn có chắc đăng xuất không?");
    if (check) {
        window.location.href = "../pages/login.html";
    }
}