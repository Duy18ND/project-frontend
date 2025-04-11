document.addEventListener("DOMContentLoaded", function () {
    let foodList = [];
    const inputMap = [
        { id: "inputName", key: "name" },
        { id: "inputSource", key: "source" },
        { id: "inputCategory", key: "category" },
        { id: "inputQuantity", key: "quantity" },
        { id: "inputEnergy", key: "energy" },
        { id: "inputFat", key: "fat" },
        { id: "inputCarbohydrate", key: "carbohydrate" },
        { id: "inputProtein", key: "protein" },
        { id: "inputCholesterol", key: "cholesterol" },
        { id: "inputWater", key: "water" },
        { id: "inputVitaminB12", key: "vitaminB12" },
        { id: "inputVitaminE", key: "vitaminE" },
        { id: "inputLactose", key: "lactose" },
        { id: "inputSugars", key: "sugars" },
        { id: "inputMagnesium", key: "magnesium" },
        { id: "inputZinc", key: "zinc" },
        { id: "inputRiboflavin", key: "riboflavin" },
        { id: "inputFattyAcidsTotalSaturated", key: "fattyAcidsTotalSaturated" },
        { id: "inputChloride", key: "chloride" },
        { id: "inputFiber", key: "fiber" },
        { id: "inputVitaminA", key: "vitaminA" },
        { id: "inputVitaminC", key: "vitaminC" },
        { id: "inputVitaminK", key: "vitaminK" },
        { id: "inputMoist", key: "moist" },
        { id: "inputCalcium", key: "calcium" },
        { id: "inputPhosphorus", key: "phosphorus" },
        { id: "inputCopper", key: "copper" },
        { id: "inputSelenium", key: "selenium" },
        { id: "inputSodium", key: "sodium" },
        { id: "inputVitaminB6", key: "vitaminB6" },
        { id: "inputVitaminD", key: "vitaminD" },
        { id: "inputStarch", key: "starch" },
        { id: "inputCaffeine", key: "caffeine" },
        { id: "inputFluoride", key: "fluoride" },
        { id: "inputThiamin", key: "thiamin" },
        { id: "inputPantothenicAcid", key: "pantothenicAcid" },
        { id: "inputFattyAcidsTotalMonounsaturated", key: "fattyAcidsTotalMonounsaturated" },
        { id: "inputFattyAcidsTotalPolyunsaturated", key: "fattyAcidsTotalPolyunsaturated" }
    ];
    //object lọc nutrient 
    const inputSortNutrient = {
        energy: "energy",
        fat: "fat",
        protein: "protein",
        carbohydrate: "carbohydrate",
    };
    // khai id tìm kiếm food
    const selectNutrient = document.getElementById("selectNutrient");
    const selectCategory = document.getElementById("selectCategory");
    const searchInput = document.getElementById("searchItem");

    // Thẻ sắp xếp tăng dần giảm dần selectNutrient
    let isAsc = true; // Mặc định: tăng dần
    let currentFilteredList = []; // Biến toàn cục để lưu danh sách đã lọc hiện tại
    let currentSortKey = ""; // Biến lưu nutrient hiện tại
    // btn sort
    const btnINutrient = document.getElementById("btnINutrient");
    const iSelectNutrient01 = document.getElementById("iSelectNutrient01");
    const iSelectNutrient02 = document.getElementById("iSelectNutrient02");

    // Tìm kiếm food
    searchInput.addEventListener("input", function () {
        const searchItemFood = this.value.trim().toLowerCase();
        contentFoods.innerHTML = "";

        // Nếu input rỗng => hiển thị lại danh sách gốc
        if (!searchItemFood) {
            curentPage = 1;
            totalPage = Math.ceil(foodList.length / totalPerPage);
            displayFoodList();
            return;
        }

        // Lọc danh sách theo tên món ăn
        const result = foodList.filter(food =>
            food.name.toLowerCase().includes(searchItemFood)
        );

        // Nếu không có kết quả
        if (result.length === 0) {
            contentFoods.innerHTML = `<p style="padding: 2rem; font-weight: bold">Không tìm thấy món ăn nào!</p>`;
            btnPagesFood.innerHTML = ""; // Xoá phân trang
            return;
        }

        // Cắt danh sách tìm kiếm theo phân trang
        const startIndex = (curentPage - 1) * totalPerPage;
        const endIndex = startIndex + totalPerPage;
        const searchSlice = result.slice(startIndex, endIndex);

        // Hiển thị danh sách tìm được
        searchSlice.forEach(food => {
            let html = `
            <button class="container-foods" data-id="${food.id}">
                <div>
                    <p class="food-title">${food.name}</p>
                    <p class="food-reference">${food.source}</p>
                </div>
                <ul class="container-li-foods">
                    <li><p class="food-title">${food.energy}<span> kcal</span></p><p class="food-reference">Energy</p></li>
                    <li><p class="food-title">${food.fat}<span> g</span></p><p class="food-reference">Fat</p></li>
                    <li><p class="food-title">${food.carbohydrate}<span> g</span></p><p class="food-reference">Carbohydrate</p></li>
                    <li><p class="food-title">${food.protein}<span> g</span></p><p class="food-reference">Protein</p></li>
                </ul>
            </button>
        `;
            contentFoods.innerHTML += html;
        });

        // Cập nhật lại phân trang theo danh sách đã lọc
        totalPage = Math.ceil(result.length / totalPerPage);
        renderSearchPage(result); // Dùng riêng cho phân trang khi search

        attachFoodClickEvents();
    });
    // Hàm phân trang riêng của searchInput
    function renderSearchPage(result) {
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
            const btn = document.createElement("button");
            btn.textContent = i;
            btn.classList.add("btn-page");

            if (i === curentPage) {
                btn.classList.add("btn-active");
            }

            btn.addEventListener("click", () => {
                curentPage = i;
                contentFoods.innerHTML = "";

                const startIndex = (curentPage - 1) * totalPerPage;
                const endIndex = startIndex + totalPerPage;
                const pageSlice = result.slice(startIndex, endIndex);

                pageSlice.forEach(food => {
                    const html = `
                        <button class="container-foods" data-id="${food.id}">
                            <div>
                                <p class="food-title">${food.name}</p>
                                <p class="food-reference">${food.source}</p>
                            </div>
                            <ul class="container-li-foods">
                                <li><p class="food-title">${food.energy}<span> kcal</span></p><p class="food-reference">Energy</p></li>
                                <li><p class="food-title">${food.fat}<span> g</span></p><p class="food-reference">Fat</p></li>
                                <li><p class="food-title">${food.carbohydrate}<span> g</span></p><p class="food-reference">Carbohydrate</p></li>
                                <li><p class="food-title">${food.protein}<span> g</span></p><p class="food-reference">Protein</p></li>
                            </ul>
                        </button>
                    `;
                    contentFoods.innerHTML += html;
                });

                renderSearchPage(result);
                attachFoodClickEvents();
            });

            btnPagesFood.appendChild(btn);
        }
    }

    // Lọc nutrient
    // Hiện icon tăng mặc định
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
        contentFoods.innerHTML = "";

        const startIndex = (curentPage - 1) * totalPerPage;
        const endIndex = startIndex + totalPerPage;
        const foodSlice = inputList.slice(startIndex, endIndex);

        foodSlice.forEach((food) => {
            const html = `
                <button class="container-foods" data-id="${food.id}">
                    <div>
                        <p class="food-title">${food.name}</p>
                        <p class="food-reference">${food.source}</p>
                    </div>
                    <ul class="container-li-foods">
                        <li><p class="food-title">${food.energy}<span> kcal</span></p><p class="food-reference">Energy</p></li>
                        <li><p class="food-title">${food.fat}<span> g</span></p><p class="food-reference">Fat</p></li>
                        <li><p class="food-title">${food.carbohydrate}<span> g</span></p><p class="food-reference">Carbohydrate</p></li>
                        <li><p class="food-title">${food.protein}<span> g</span></p><p class="food-reference">Protein</p></li>
                    </ul>
                </button>
            `;
            contentFoods.innerHTML += html;
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
                displayFoodListLoad(inputList);
                renderPageCustom(inputList);
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
                displayFoodListLoad(inputList);
                renderPageCustom(inputList);
            }
        };

        btnPrevFood.onclick = () => {
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
        const foodListFromStorage = getFromLocalStorage("foodList") || foodList;

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
            contentFoods.innerHTML = `<p style="padding: 2rem; font-weight: bold">Không có món nào trong mục "${selectedCategory}"</p>`;
            btnPagesFood.innerHTML = "";
        }
    });
    function displayCategoryListLoad(categoryList) {
        contentFoods.innerHTML = "";

        const startIndex = (curentPage - 1) * totalPerPage;
        const endIndex = startIndex + totalPerPage;
        const foodSlice = categoryList.slice(startIndex, endIndex);

        foodSlice.forEach((food) => {
            const html = `
                <button class="container-foods" data-id="${food.id}">
                    <div>
                        <p class="food-title">${food.name}</p>
                        <p class="food-reference">${food.source}</p>
                    </div>
                    <ul class="container-li-foods">
                        <li><p class="food-title">${food.energy}<span> kcal</span></p><p class="food-reference">Energy</p></li>
                        <li><p class="food-title">${food.fat}<span> g</span></p><p class="food-reference">Fat</p></li>
                        <li><p class="food-title">${food.carbohydrate}<span> g</span></p><p class="food-reference">Carbohydrate</p></li>
                        <li><p class="food-title">${food.protein}<span> g</span></p><p class="food-reference">Protein</p></li>
                    </ul>
                </button>
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
