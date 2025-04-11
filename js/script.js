document.addEventListener("DOMContentLoaded", function () {
    // Gán giá trị ban đầu
    let foodList = [];

    const storedData = localStorage.getItem("foodList");
    if (storedData) {
        foodList = JSON.parse(storedData);
    }

    // Sau đó mới dùng foodList cho các thao tác khác như:
    let curentPage = 1;
    const totalPerPage = 6;
    let totalPage = Math.ceil(foodList.length / totalPerPage);



    // Khai bao id content
    let contentHomePage = document.getElementById("contentHomePage");

    // khai báo nút phân trang
    const btnPrev = document.getElementById("btnPrev");
    const iPrev = document.getElementById("iPrev");
    const btnNext = document.getElementById("btnNext");
    const iNext = document.getElementById("iNext");
    const btnPages = document.getElementById("btnPages");

    // Hàm render các nút bấm phân trang
    const renderPage = () => {
        btnPages.innerHTML = "";

        const maxVisible = 5;
        const halfBtn = Math.floor(maxVisible / 2);
        let startBtn = Math.max(1, curentPage - halfBtn);
        let endBtn = Math.min(totalPage, curentPage + halfBtn);

        if (endBtn - startBtn + 1 < maxVisible) {
            if (startBtn === 1) {
                endBtn = Math.min(totalPage, startBtn + maxVisible - 1);
            } else if (endBtn === totalPage) {
                startBtn = Math.max(1, endBtn - maxVisible + 1);
            }
        }

        for (let i = startBtn; i <= endBtn; i++) {
            const btnElement = document.createElement("button");
            btnElement.textContent = i;

            if (curentPage === i) {
                btnElement.classList.add("btn-active");
            }

            btnElement.addEventListener("click", function () {
                curentPage = i;
                renderPage();
                displayFoodList();
            });

            btnPages.appendChild(btnElement);
        }

        // Prev
        if (curentPage === 1) {
            btnPrev.setAttribute("disabled", "disabled");
            iPrev.style.color = "#c5c5c5";
        } else {
            btnPrev.removeAttribute("disabled");
            iPrev.style.color = "black";
        }

        // Next
        if (curentPage === totalPage) {
            btnNext.setAttribute("disabled", "disabled");
            iNext.style.color = "#c5c5c5";
        } else {
            btnNext.removeAttribute("disabled");
            iNext.style.color = "black";
        }
    };

    // Sự kiện nút Next và Prev
    btnNext.addEventListener("click", function () {
        if (curentPage < totalPage) {
            curentPage++;
            renderPage();
            displayFoodList();
        }
    });

    btnPrev.addEventListener("click", function () {
        if (curentPage > 1) {
            curentPage--;
            renderPage();
            displayFoodList();
        }
    });
    // Hàm hiển thị food
    function displayFoodList() {
        // Cập nhật lại foodList từ localStorage (nếu cần)
        const storedData = localStorage.getItem("foodList");
        foodList = storedData ? JSON.parse(storedData) : [];

        // Cập nhật lại số trang
        totalPage = Math.ceil(foodList.length / totalPerPage);

        // Reset nội dung trước khi render lại
        contentHomePage.innerHTML = "";

        // Phân trang
        const getStartIndex = (curentPage - 1) * totalPerPage;
        const getEndIndex = getStartIndex + totalPerPage;
        const foodListSlice = foodList.slice(getStartIndex, getEndIndex);

        // Tạo HTML hiển thị
        const html = foodListSlice.map(food => `
            <a href="/components/recipes-detail.html" class="container-menu" data-id="${food.id}">
                <div class="tag" data-id="${food.id}">
                    <img src="${food.image}" alt="${food.name}" class="commmunity-img">
                    <p class="commmunity"><i class="fa-solid fa-people-group"></i> Community Recipes</p>
                </div>
                <div class="containerInfoFood">
                    <ul class="info-menu">
                        <li><h5 style="font-size: 18px;">${food.name}</h5></li>
                        <li>
                            <div class="title-like">
                                <p style="font-size: 18px;">${food.author}</p>
                                <button data-id="${food.id}">
                                    <i class="fa-solid fa-heart"></i><span>${food.likes}</span>
                                </button>
                            </div>
                        </li>
                        <li><img src="/assets/icons/describe.png">${food.describe}</li>
                        <li class="nutritional-info">
                            <div class="nutritional"><h5>By</h5><p>${food.by}<span>g</span></p></div>
                            <div class="nutritional"><h5>Energy</h5><p>${food.energy}<span>kcal</span></p></div>
                            <div class="nutritional"><h5>Fat</h5><p>${food.fat}<span>g</span></p></div>
                            <div class="nutritional"><h5>Carbohydrate</h5><p>${food.carbohydrate}<span>g</span></p></div>
                            <div class="nutritional"><h5>Protein</h5><p>${food.protein}<span>g</span></p></div>
                        </li>
                    </ul>
                </div>
            </a>
        `).join("");

        contentHomePage.innerHTML = html;

        // Gán sự kiện click để lưu ID vào sessionStorage
        document.querySelectorAll(".container-menu").forEach(item => {
            item.addEventListener("click", function () {
                const id = this.dataset.id;
                sessionStorage.setItem("foodID", id);
            });
        });
    }
    displayFoodList();
    renderPage();







    // // Phần search lọc
    // Phần search lọc
    // Hàm load
    function getFromLocalStorage(key) {
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : null;
    }
    const selectNutrient = document.getElementById("selectNutrient");
    const selectCategory = document.getElementById("selectCategory");
    const searchInput = document.getElementById("searchItem");
    let isAsc = true;
    let currentFilteredList = [];
    let currentSortKey = "";

    const btnINutrient = document.getElementById("btnINutrient");
    const iSelectNutrient01 = document.getElementById("iSelectNutrient01");
    const iSelectNutrient02 = document.getElementById("iSelectNutrient02");

    const inputSortNutrient = {
        energy: "energy",
        fat: "fat",
        protein: "protein",
        carbohydrate: "carbohydrate",
    };


    // Tìm kiếm món ăn
    searchInput.addEventListener("input", function () {
        const keyword = this.value.trim().toLowerCase();
        contentHomePage.innerHTML = "";

        if (!keyword) {
            filteredList = foodList;
            curentPage = 1;
            totalPage = Math.ceil(foodList.length / totalPerPage);
            renderPage();
            displayFoodList();
            return;
        }

        const result = foodList.filter(food =>
            food.name.toLowerCase().includes(keyword)
        );

        if (result.length === 0) {
            contentHomePage.innerHTML = `<p style="padding: 2rem; font-weight: bold">Không tìm thấy món ăn nào!</p>`;
            btnPages.innerHTML = "";
            return;
        }

        filteredList = result;
        curentPage = 1;
        totalPage = Math.ceil(result.length / totalPerPage);

        renderSearchPage(result);
        displaySearchFoodList(result);
    });

    // Hàm hiển thị danh sách tìm kiếm
    function displaySearchFoodList(result) {
        const startIndex = (curentPage - 1) * totalPerPage;
        const endIndex = startIndex + totalPerPage;
        const pageSlice = result.slice(startIndex, endIndex);

        contentHomePage.innerHTML = "";

        pageSlice.forEach(food => {
            const html = `
                  <a href="/components/recipes-detail.html" class="container-menu" data-id="${food.id}">
                <div class="tag" data-id="${food.id}">
                    <img src="${food.image}" alt="${food.name}" class="commmunity-img">
                    <p class="commmunity"><i class="fa-solid fa-people-group"></i> Community Recipes</p>
                </div>
                <div class="containerInfoFood">
                    <ul class="info-menu">
                        <li><h5 style="font-size: 18px;">${food.name}</h5></li>
                        <li>
                            <div class="title-like">
                                <p style="font-size: 18px;">${food.author}</p>
                                <button data-id="${food.id}">
                                    <i class="fa-solid fa-heart"></i><span>${food.likes}</span>
                                </button>
                            </div>
                        </li>
                        <li><img src="/assets/icons/describe.png">${food.describe}</li>
                        <li class="nutritional-info">
                            <div class="nutritional"><h5>By</h5><p>${food.by}<span>g</span></p></div>
                            <div class="nutritional"><h5>Energy</h5><p>${food.energy}<span>kcal</span></p></div>
                            <div class="nutritional"><h5>Fat</h5><p>${food.fat}<span>g</span></p></div>
                            <div class="nutritional"><h5>Carbohydrate</h5><p>${food.carbohydrate}<span>g</span></p></div>
                            <div class="nutritional"><h5>Protein</h5><p>${food.protein}<span>g</span></p></div>
                        </li>
                    </ul>
                </div>
            </a>
        `;
            contentHomePage.innerHTML += html;
        });
    }

    // Hàm phân trang riêng khi tìm kiếm
    function renderSearchPage(result) {
        btnPages.innerHTML = "";

        const maxVisible = 5;
        const half = Math.floor(maxVisible / 2);
        let start = Math.max(1, curentPage - half);
        let end = Math.min(totalPage, curentPage + half);

        if (end - start + 1 < maxVisible) {
            if (start === 1) {
                end = Math.min(totalPage, start + maxVisible - 1);
            } else if (end === totalPage) {
                start = Math.max(1, end - maxVisible + 1);
            }
        }

        for (let i = start; i <= end; i++) {
            const btn = document.createElement("button");
            btn.textContent = i;
            btn.classList.add("btn-page");

            if (i === curentPage) {
                btn.classList.add("btn-active");
            }

            btn.addEventListener("click", () => {
                curentPage = i;
                displaySearchFoodList(result);
                renderSearchPage(result);
            });

            btnPages.appendChild(btn);
        }
    }






    // Lọc nutrient
    iSelectNutrient01.style.display = "block";
    iSelectNutrient02.style.display = "none";

    // Lắng nghe khi chọn nutrient
    selectNutrient.addEventListener("change", () => {
        currentSortKey = selectNutrient.value;

        const foodListFromStorage = getFromLocalStorage("foodList") || foodList;

        if (!inputSortNutrient[currentSortKey]) {
            curentPage = 1;
            totalPage = Math.ceil(foodListFromStorage.length / totalPerPage);
            displayFoodListLoad(foodListFromStorage);
            renderPageCustom(foodListFromStorage);
            currentFilteredList = [];
            return;
        }

        currentFilteredList = foodListFromStorage.filter(food => {
            const value = food[currentSortKey];
            return (
                value !== undefined &&
                value !== null &&
                value.toString().trim() !== "" &&
                value.toString().trim() !== "0"
            );
        });

        // Mặc định tăng dần
        isAsc = true;
        iSelectNutrient01.style.display = "block";
        iSelectNutrient02.style.display = "none";
        sortAndRender();
    });

    // Toggle tăng/giảm khi click icon
    btnINutrient.addEventListener("click", () => {
        isAsc = !isAsc;

        if (isAsc) {
            iSelectNutrient01.style.display = "block";
            iSelectNutrient02.style.display = "none";
        } else {
            iSelectNutrient01.style.display = "none";
            iSelectNutrient02.style.display = "block";
        }

        sortAndRender();
    });
    // Sắp xếp và hiển thị
    function sortAndRender() {
        if (!currentSortKey || currentFilteredList.length === 0) return;

        currentFilteredList.sort((a, b) => {
            const valueA = parseFloat(a[currentSortKey]) || 0;
            const valueB = parseFloat(b[currentSortKey]) || 0;
            return isAsc ? valueA - valueB : valueB - valueA;
        });

        curentPage = 1;
        totalPage = Math.ceil(currentFilteredList.length / totalPerPage);
        displayFoodListLoad(currentFilteredList);
        renderPageCustom(currentFilteredList);
    }

    // Hàm riêng display nutrient
    function displayFoodListLoad(inputList) {
        contentHomePage.innerHTML = "";

        const startIndex = (curentPage - 1) * totalPerPage;
        const endIndex = startIndex + totalPerPage;
        const foodSlice = inputList.slice(startIndex, endIndex);

        foodSlice.forEach((food) => {
            const html = `
                <a href="/components/recipes-detail.html" class="container-menu" data-id="${food.id}">
                <div class="tag" data-id="${food.id}">
                    <img src="${food.image}" alt="${food.name}" class="commmunity-img">
                    <p class="commmunity"><i class="fa-solid fa-people-group"></i> Community Recipes</p>
                </div>
                <div class="containerInfoFood">
                    <ul class="info-menu">
                        <li><h5 style="font-size: 18px;">${food.name}</h5></li>
                        <li>
                            <div class="title-like">
                                <p style="font-size: 18px;">${food.author}</p>
                                <button data-id="${food.id}">
                                    <i class="fa-solid fa-heart"></i><span>${food.likes}</span>
                                </button>
                            </div>
                        </li>
                        <li><img src="/assets/icons/describe.png">${food.describe}</li>
                        <li class="nutritional-info">
                            <div class="nutritional"><h5>By</h5><p>${food.by}<span>g</span></p></div>
                            <div class="nutritional"><h5>Energy</h5><p>${food.energy}<span>kcal</span></p></div>
                            <div class="nutritional"><h5>Fat</h5><p>${food.fat}<span>g</span></p></div>
                            <div class="nutritional"><h5>Carbohydrate</h5><p>${food.carbohydrate}<span>g</span></p></div>
                            <div class="nutritional"><h5>Protein</h5><p>${food.protein}<span>g</span></p></div>
                        </li>
                    </ul>
                </div>
            </a>
            `;
            contentHomePage.innerHTML += html;
        });

        // Sự kiện click item
        document.querySelectorAll(".container-foods").forEach((btn) => {
            btn.onclick = function () {
                const foodId = this.dataset.id;
                const selectedFood = inputList.find(f => f.id == foodId);
                foodInformation.style.display = "block";
                overlay.style.display = "block";
                displayDetail(selectedFood);
            };
        });
    }
    // hàm riêng renderPage nutrient
    function renderPageCustom(inputList) {
        btnPages.innerHTML = "";

        const maxVisible = 5;
        const half = Math.floor(maxVisible / 2);
        let start = Math.max(1, curentPage - half);
        let end = Math.min(totalPage, curentPage + half);

        if (end - start + 1 < maxVisible) {
            if (start === 1) {
                end = Math.min(totalPage, start + maxVisible - 1);
            } else if (end === totalPage) {
                start = Math.max(1, end - maxVisible + 1);
            }
        }

        for (let i = start; i <= end; i++) {
            const btnElement = document.createElement("button");
            btnElement.textContent = i;
            btnElement.classList.add("btn-page");

            if (curentPage === i) {
                btnElement.classList.add("btn-active");
            }

            btnElement.addEventListener("click", function () {
                curentPage = i;
                displayFoodListLoad(inputList);
                renderPageCustom(inputList);
            });

            btnPages.appendChild(btnElement);
        }

        // Trạng thái nút prev/next
        btnPrev.disabled = curentPage === 1;
        btnNext.disabled = curentPage === totalPage;
        iPrev.style.color = curentPage === 1 ? "#c5c5c5" : "black";
        iNext.style.color = curentPage === totalPage ? "#c5c5c5" : "black";

        btnNext.onclick = () => {
            if (curentPage < totalPage) {
                curentPage++;
                displayFoodListLoad(inputList);
                renderPageCustom(inputList);
            }
        };

        btnPrev.onclick = () => {
            if (curentPage > 1) {
                curentPage--;
                displayFoodListLoad(inputList);
                renderPageCustom(inputList);
            }
        };
    }





    // Lọc category
    selectCategory.addEventListener("change", function () {
        const selectedCategory = selectCategory.value;
        const foodListFromStorage = getFromLocalStorage("food") || food;

        const filteredCategoryList =
            selectedCategory === "All categories"
                ? foodListFromStorage
                : foodListFromStorage.filter(item => item.category === selectedCategory);

        if (filteredCategoryList.length > 0) {
            curentPage = 1;
            totalPage = Math.ceil(filteredCategoryList.length / totalPerPage);
            displayCategoryListLoad(filteredCategoryList);
            renderPageCategory(filteredCategoryList);
        } else {
            contentHomePage.innerHTML = `<p style="padding: 2rem; font-weight: bold">Không có món nào trong mục "${selectedCategory}"</p>`;
            btnPages.innerHTML = "";
        }
    });


    function displayCategoryListLoad(categoryList) {
        contentFoods.innerHTML = "";

        const startIndex = (curentPage - 1) * totalPerPage;
        const endIndex = startIndex + totalPerPage;
        const foodSlice = categoryList.slice(startIndex, endIndex);

        foodSlice.forEach((food) => {
            const html = `
               <a href="/components/recipes-detail.html" class="container-menu" data-id="${food.id}">
                <div class="tag" data-id="${food.id}">
                    <img src="${food.image}" alt="${food.name}" class="commmunity-img">
                    <p class="commmunity"><i class="fa-solid fa-people-group"></i> Community Recipes</p>
                </div>
                <div class="containerInfoFood">
                    <ul class="info-menu">
                        <li><h5 style="font-size: 18px;">${food.name}</h5></li>
                        <li>
                            <div class="title-like">
                                <p style="font-size: 18px;">${food.author}</p>
                                <button data-id="${food.id}">
                                    <i class="fa-solid fa-heart"></i><span>${food.likes}</span>
                                </button>
                            </div>
                        </li>
                        <li><img src="/assets/icons/describe.png">${food.describe}</li>
                        <li class="nutritional-info">
                            <div class="nutritional"><h5>By</h5><p>${food.by}<span>g</span></p></div>
                            <div class="nutritional"><h5>Energy</h5><p>${food.energy}<span>kcal</span></p></div>
                            <div class="nutritional"><h5>Fat</h5><p>${food.fat}<span>g</span></p></div>
                            <div class="nutritional"><h5>Carbohydrate</h5><p>${food.carbohydrate}<span>g</span></p></div>
                            <div class="nutritional"><h5>Protein</h5><p>${food.protein}<span>g</span></p></div>
                        </li>
                    </ul>
                </div>
            </a>
            `;
            contentFoods.innerHTML += html;
        });

        // Sự kiện click để hiển thị chi tiết
        document.querySelectorAll(".container-foods").forEach((btn) => {
            btn.onclick = function () {
                const foodId = this.dataset.id;
                const selectedFood = categoryList.find(f => f.id == foodId);
                foodInformation.style.display = "block";
                overlay.style.display = "block";
                displayDetail(selectedFood);
            };
        });
    }
    function renderPageCategory(categoryList) {
        btnPagesFood.innerHTML = "";

        const maxVisible = 5;
        const half = Math.floor(maxVisible / 2);
        let start = Math.max(1, curentPage - half);
        let end = Math.min(totalPage, curentPage + half);

        if (end - start + 1 < maxVisible) {
            if (start === 1) {
                end = Math.min(totalPage, start + maxVisible - 1);
            } else if (end === totalPage) {
                start = Math.max(1, end - maxVisible + 1);
            }
        }

        for (let i = start; i <= end; i++) {
            const btnElement = document.createElement("button");
            btnElement.textContent = i;
            btnElement.classList.add("btn-page");

            if (curentPage === i) {
                btnElement.classList.add("btn-active");
            }

            btnElement.addEventListener("click", function () {
                curentPage = i;
                displayCategoryListLoad(categoryList);
                renderPageCategory(categoryList);
            });

            btnPagesFood.appendChild(btnElement);
        }

        // Trạng thái nút prev/next
        btnPrevFood.disabled = curentPage === 1;
        btnNextFood.disabled = curentPage === totalPage;
        iPrevFood.style.color = curentPage === 1 ? "#c5c5c5" : "black";
        iNextFood.style.color = curentPage === totalPage ? "#c5c5c5" : "black";

        btnNextFood.onclick = () => {
            if (curentPage < totalPage) {
                curentPage++;
                displayCategoryListLoad(categoryList);
                renderPageCategory(categoryList);
            }
        };

        btnPrevFood.onclick = () => {
            if (curentPage > 1) {
                curentPage--;
                displayCategoryListLoad(categoryList);
                renderPageCategory(categoryList);
            }
        };
    }


});


