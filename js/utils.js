// Tải header.html vào div #header
fetch("/components/header.html")
    .then(response => response.text())
    .then(data => {
        const header = document.getElementById("header");
        if (header) {
            header.innerHTML = data;
        }
    })
    .catch(error => console.error("Lỗi khi tải header:", error));

// Tải file login.html
fetch("/pages/login.html")
    .then(response => response.text())
    .then(data => {
        const login = document.getElementById("login");
        if (login) {
            login.innerHTML = data;
        }
    })
    .catch(error => console.error("Lỗi khi tải login:", error));

//Tải dữ liệu homaPage vào recipes
fetch("/components/homePage.html")
    .then(response => response.text())
    .then(data => {
        const header = document.getElementById("homePage");
        if (header) {
            header.innerHTML = data;
        }
    })
    .catch(error => console.error("Lỗi khi tải homePage:", error));

// Nút bấm đóng mở header
document.addEventListener("DOMContentLoaded", function () {
    const header = document.getElementById("header");

    // Xử lý nút btnNavHomePage
    const btnNavHomePage = document.getElementById("btnNavHomePage");
    const navHomePage = document.getElementById("navHomePage");
    const contentHomePage = document.getElementById("mainHomePage");

    if (btnNavHomePage && header && navHomePage && contentHomePage) {
        btnNavHomePage.addEventListener("click", function () {
            const isHidden = header.style.display === "none";
            header.style.display = isHidden ? "block" : "none";

            navHomePage.classList.toggle("navHomePage", !isHidden);
            contentHomePage.classList.toggle("mainHomePage", !isHidden);
        });
    }

    // Xử lý nút btnNavFood
    const btnNavFood = document.getElementById("btnNavFood");
    const navFood = document.getElementById("navFood");
    const contentFood = document.getElementById("mainFood");

    if (btnNavFood && header && navFood && contentFood) {
        btnNavFood.addEventListener("click", function () {
            const isHidden = header.style.display === "none";
            header.style.display = isHidden ? "block" : "none";

            navFood.classList.toggle("navFood", !isHidden);
            contentFood.classList.toggle("mainFood", !isHidden);
        });
    }

    // xử lý nút Recipes
    const btnNavRecipes = document.getElementById("btnNavRecipes");
    const navRecipes = document.getElementById("navRecipes");
    const contentRecipes = document.getElementById("mainRecipes");

    if (btnNavRecipes && header && navRecipes && contentRecipes) {
        btnNavRecipes.addEventListener("click", function () {
            const isHidden = header.style.display === "none";
            header.style.display = isHidden ? "block" : "none";

            navRecipes.classList.toggle("navRecipes", !isHidden);
            contentRecipes.classList.toggle("mainRecipes", !isHidden);
        });
    }
    // xử lý nút Recipes-detail.html
    const btnNavRecipesDetail = document.getElementById("btnNavRecipesDetail");
    const navRecipesDetail = document.getElementById("navRecipesDetail");
    const mainRecipesDetail = document.getElementById("mainRecipesDetail");
    const contentNavRecipesDetail = document.getElementById("contentNavRecipesDetail");
    const contentSectionRecipesDetail = document.getElementById("contentSectionRecipesDetail");
    if (btnNavRecipesDetail && header && navRecipesDetail && mainRecipesDetail && contentNavRecipesDetail && contentSectionRecipesDetail) {
        btnNavRecipesDetail.addEventListener("click", function () {
            const isHidden = header.style.display === "none";
            header.style.display = isHidden ? "block" : "none";

            navRecipesDetail.classList.toggle("navRecipesDetail", !isHidden);
            mainRecipesDetail.classList.toggle("mainRecipesDetail", !isHidden);
            contentNavRecipesDetail.classList.toggle("contentNavRecipesDetail", !isHidden);
            contentSectionRecipesDetail.classList.toggle("contentSectionRecipesDetail", !isHidden);
        });
    }
});
