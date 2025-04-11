document.addEventListener("DOMContentLoaded", function () {



    // khai báo id thêm ảnh
    const btnMyRecipes = document.getElementById("btnMyRecipes");
    const fileInput = document.getElementById("fileImageInput");
    const addRecipesImage = document.getElementById("addRecipesImage");

    // New catagory
    const btnNewCategory = document.getElementById("btnNewCategory");
    const NewCatagory = document.getElementById("NewCatagory");
    const icatagory = document.getElementById("icatagory");
    const NewCatagoryRecipes = document.getElementById("NewCatagoryRecipes");


    // Input container-ul-recipes-add
    const inputName = document.getElementById("inputName").value.trim();
    const inputDescription = document.getElementById("inputDescription").value.trim();
    const inputTotalTime = document.getElementById("inputTotalTime").value.trim();
    const inputPrepTime = document.getElementById("inputPrepTime").value.trim();
    const inputFinalWeight = document.getElementById("inputFinalWeight").value.trim();
    const inputPortions = document.getElementById("inputPortions").value.trim();


    // nút bấm button
    const btnAddIngedient = document.getElementById("btnAddIngedient");
    // Phần Ingredients
    const child02AddIngredient = document.getElementById("child02-add-ingredient");
    const child03AddIngredient = document.getElementById("child03-add-ingredient");
    const iIngredient01 = document.getElementById("iIngredient01");
    const iIngredient02 = document.getElementById("iIngredient02");

    // thêm dữ liệu Ingredients
    const containerUlRecipesInfo = document.getElementById("container-ul-recipes-info");
    // thêm ảnh
    window.onload = function () {
        btnMyRecipes.onclick = function () {
            const choice = confirm(`
            Bạn có muốn chọn ảnh từ máy tính không?
            Nhấn 'OK' để chọn từ máy tính
            Nhấn 'Cancel' để nhập URL`);

            if (choice) {
                fileInput.value = ""; // reset lại input

                fileInput.onchange = function (event) {
                    const file = event.target.files[0];
                    if (file) {
                        const reader = new FileReader();
                        reader.onload = function (input) {
                            const htmlImage = `<img src="${input.target.result}" alt="Image">`;
                            addRecipesImage.innerHTML = htmlImage;
                        };
                        reader.readAsDataURL(file);
                    }
                };

                fileInput.click();
            } else {
                const takeImg = prompt("Mời bạn nhập URL hình ảnh món ăn:");
                if (takeImg) {
                    const htmlImage = `<img src="${takeImg}" alt="Image">`;
                    addRecipesImage.innerHTML = htmlImage;
                }
            }
        };
    };

    // Thêm catagory
    btnNewCategory.onclick = function (event) {
        event.stopPropagation();
        NewCatagoryRecipes.style.display = "block";
        NewCatagory.style.display = "none";
        icatagory.style.display = "none";
        btnNewCategory.style.display = "none";
    };

    // Giữ menu mở nếu đang click vào select
    NewCatagoryRecipes.addEventListener("click", function (event) {
        event.stopPropagation();
    });

    // Ẩn nếu click ra ngoài và chưa chọn gì
    document.addEventListener("click", function () {
        if (NewCatagoryRecipes.value === "New Category") {
            NewCatagoryRecipes.style.display = "none";
            NewCatagory.style.display = "block";
            icatagory.style.display = "block";
            btnNewCategory.style.display = "flex";
        } else {
            NewCatagoryRecipes.style.display = "flex";
        }
    });

    // Hiển thị food có sẵn ingredient
    function displayFood() {
        food.Foreach(food => {
            let html = `
             <li class="container-ul-li-recipes-info" style="color: #424242;">
                                    <div class="container-ul-li-recipes-info-01">
                                        <div style="font-weight: 500;">Keto 90 Second Bread</div>
                                        <div style="color: #888888; font-size: 14px;">Community Recipes</div>
                                        <div style="font-size: 12px; color: #888;" class="container-ul-li-child">
                                            <div class="quantity-ul-li-child"><input type="number" class ="inputQuantity"></div>
                                            <div class="quantity-ul-li-child">portion (${food} grams)</div>
                                            <div class="quantity-ul-li-child">87g</div>
                                        </div>
                                    </div>
                                    <div class="container-ul-li-recipes-info-02">
                                        <div style="width: 23%;">301 kcal</div>
                                        <div style="width: 23%;">27 g</div>
                                        <div style="width: 23%;">6 g</div>
                                        <div style="width: 23%;">11 g</div>
                                        <button class="btn-add-recipes-detail" data-id=""><i
                                                class="fa-solid fa-plus"></i></button>
                                    </div>
                                </li>
            `;
        });
    }


    // Trạng thái ban đầu
    iIngredient02.style.display = "none";
    iIngredient01.style.display = "block";

    btnAddIngedient.onclick = function () {

        if (iIngredient01.style.display !== "none") {
            // Hiển thị lại phần tử
            child02AddIngredient.style.display = "flex";
            child03AddIngredient.style.display = "flex";

            // Đổi icon
            iIngredient01.style.display = "none";
            iIngredient02.style.display = "block";
        } else {
            // Ẩn phần tử
            child02AddIngredient.style.display = "none";
            child03AddIngredient.style.display = "none";

            // Đổi icon lại
            iIngredient01.style.display = "block";
            iIngredient02.style.display = "none";
        }
    };



});

