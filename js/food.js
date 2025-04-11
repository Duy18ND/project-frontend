document.addEventListener("DOMContentLoaded", function () {
    let foodList = [];
    let counter = 1;
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


    //Khai báo container chứa nội dung về thêm nội dung
    const contentFoods = document.getElementById("contentFoods");

    // khai báo nút createFood
    const createFood = document.getElementById("createFood");
    const foodAdd = document.getElementById("foodAdd");
    const btnContentFoods = document.getElementsByClassName("container-foods");

    // Nút thoát ra ngoài và nút lưu
    const btnAddCancel = document.getElementById("btnAddCancel");
    const btnSaveFood = document.getElementById("btnSaveFood");

    const foodInformation = document.getElementById("foodInformation");
    const overlay = document.getElementById('overlay');

    // Nút phân trang
    const btnPrevFood = document.getElementById("btnPrevFood");
    const iPrevFood = document.getElementById("iPrevFood");
    const btnNextFood = document.getElementById("btnNextFood");
    const iNextFood = document.getElementById("iNextFood");
    const btnPagesFood = document.getElementById("btnPagesFood");

    // Trang hiện tại
    let curentPage = 1;
    // Tổng số mục mỗi trang
    let totalPerPage = 5;
    // Tổng số trang 
    let totalPage = Math.ceil(foodList.length / totalPerPage);
    // Hàm load
    function getFromLocalStorage(key) {
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : null;
    }


    //Thêm food
    function collectFoodData() {
        const newFood = { id: counter++ };
        const checkList = ["name", "source", "category", "quantity", "energy", "fat", "carbohydrate", "protein"];
        inputMap.forEach(({ id, key }) => {
            const input = document.getElementById(id);
            if (input) {
                newFood[key] = input.value.trim();
            } else {
                newFood[key] = "";
            }
        });
        const result = checkList.filter(key => newFood[key] === "");

        if (result.length > 0) {
            alert("Vui lòng nhập đầy đủ các trường sau: " + result.join(", "));
            return;
        }

        foodList.push(newFood);
        alert("Đã thêm món ăn thành công!");
        saveToLocalStorage("foodList", foodList);
    }

    // Hiển thị thông tin food
    function displayFoodList() {
        contentFoods.innerHTML = "";

        // Cập nhật lại tổng số trang
        totalPage = Math.ceil(foodList.length / totalPerPage);

        // Tính vị trí bắt đầu và kết thúc
        const startIndex = (curentPage - 1) * totalPerPage;
        const endIndex = startIndex + totalPerPage;

        // Cắt danh sách food theo trang
        const foodSlice = foodList.slice(startIndex, endIndex);

        // Hiển thị danh sách food
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

        // Gán sự kiện click sau khi render xong
        const foodButtons = document.querySelectorAll(".container-foods");
        foodButtons.forEach((btn) => {
            btn.onclick = function () {
                const foodId = this.dataset.id;
                const food = foodList.find(f => f.id == foodId); // Tìm đối tượng food
                if (food) {
                    foodInformation.style.display = "block";
                    overlay.style.display = "block";
                    displayDetail(food); // Truyền object đầy đủ vào
                }
            };
        });

        // Cập nhật lại phân trang
        renderPage();
    }


    // Hiển thị thông tin chi tiết về food
    function displayDetail(food) {
        let html = `
                    <div class="container-foods-header">
                        <h3 class="tagH3" style="font-size: 30px;">Food information</h3>
                        <p style="color: #676a6c;">Check and update the information about the food</p>
                    </div>

                    <ul class="container-foods-info">
                        <li class="container-foods-child01">
                            <p>Name</p>
                            <p>${food.name}</p>
                        </li>
                        <li class="container-foods-child01">
                            <p>Source</p>
                            <p>${food.source}</p>
                        </li>
                        <li class="container-foods-child01">
                            <p>Category</p>
                            <p>${food.category}</p>
                        </li>
                        <li class="container-foods-child02">
                            <p>Quantity</p>
                            <p style="background-color: white;">${food.quantity}</p>
                            <p style="background-color: white;">gram</p>
                        </li>
                    </ul>

                    <div class="nutritional-value">Nutritional value per 100 g</div>

                    <div class="container-foods-macronutrients">
                        <h3 class="tagH3">Macronutrients</h3>
                        <ul class="macronutrients">
                            <li>
                                <p>Energy</p>
                                <p>${food.energy}</p>
                                <p>kcal</p>
                            </li>
                            <li>
                                <p>Fat</p>
                                <p>${food.fat}</p>
                                <p>g</p>
                            </li>
                            <li>
                                <p>Carbohydrate</p>
                                <p>${food.carbohydrate}</p>
                                <p>g</p>
                            </li>
                            <li>
                                <p>Protein</p>
                                <p>${food.protein}</p>
                                <p>g</p>
                            </li>
                        </ul>
                    </div>

                    <!--Phần hiển thị thông tin giá trị dinh dưỡng thức ăn  -->
                    <div class="container-foods-micronutrients" id="container-foods-micronutrients">
                        <h3 class="tagH3">Micronutrients</h3>
                        <ul class="micronutrients">

                            <li>
                                <p>Cholesterol</p>
                                <p>${food.cholesterol}</p>
                                <p>mg</p>
                            </li>
                            <li>
                                <p>Water</p>
                                <p>${food.water}</p>
                                <p>%</p>
                            </li>
                            <li>
                                <p>Vitamin B-12</p>
                                <p>${food.vitaminB12}</p>
                                <p>µg</p>
                            </li>
                            <li>
                                <p>Vitamin E</p>
                                <p>${food.vitaminE}</p>
                                <p>mg</p>
                            </li>
                            <li>
                                <p>Lactose</p>
                                <p>${food.lactose}</p>
                                <p>g</p>
                            </li>
                            <li>
                                <p>Sugars</p>
                                <p>${food.sugars}</p>
                                <p>g</p>
                            </li>
                            <li>
                                <p>Magnesium</p>
                                <p>${food.magnesium}</p>
                                <p>mg</p>
                            </li>
                            <li>
                                <p>Zinc</p>
                                <p>${food.zinc}</p>
                                <p>mg</p>
                            </li>
                            <li>
                                <p>Riboflavin</p>
                                <p>${food.riboflavin}</p>
                                <p>mg</p>
                            </li>
                            <li>
                                <p>Fatty acids, total saturated</p>
                                <p>${food.fattyAcidsTotalSaturated}</p>
                                <p>g</p>
                            </li>
                            <li>
                                <p>Chloride</p>
                                <p>${food.chloride}</p>
                                <p>mg</p>
                            </li>
                            <li>
                                <p>Fiber</p>
                                <p>${food.fiber}</p>
                                <p>g</p>
                            </li>
                            <li>
                                <p>Vitamin A</p>
                                <p>${food.vitaminA}</p>
                                <p>µg</p>
                            </li>
                            <li>
                                <p>Vitamin C</p>
                                <p>${food.vitaminC}</p>
                                <p>mg</p>
                            </li>
                            <li>
                                <p>Vitamin K</p>
                                <p>${food.vitaminK}</p>
                                <p>µg</p>
                            </li>
                            <li>
                                <p>Moist</p>
                                <p>${food.moist}</p>
                                <p>g</p>
                            </li>
                            <li>
                                <p>Calcium</p>
                                <p>${food.calcium}</p>
                                <p>mg</p>
                            </li>
                            <li>
                                <p>Phosphorus</p>
                                <p>${food.phosphorus}</p>
                                <p>mg</p>
                            </li>
                            <li>
                                <p>Copper</p>
                                <p>${food.copper}</p>
                                <p>mg</p>
                            </li>
                            <li>
                                <p>Selenium</p>
                                <p>${food.selenium}</p>
                                <p>µg</p>
                            </li>
                            <li>
                                <p>Sodium</p>
                                <p>${food.sodium}</p>
                                <p>mg</p>
                            </li>
                            <li>
                                <p>Vitamin B6</p>
                                <p>${food.vitaminB6}</p>
                                <p>mg</p>
                            </li>
                            <li>
                                <p>Vitamin D</p>
                                <p>${food.vitaminD}</p>
                                <p>µg</p>
                            </li>
                            <li>
                                <p>Starch</p>
                                <p>${food.starch}</p>
                                <p>g</p>
                            </li>
                            <li>
                                <p>Caffeine</p>
                                <p>${food.caffeine}</p>
                                <p>mg</p>
                            </li>
                            <li>
                                <p>Fluoride</p>
                                <p>${food.fluoride}</p>
                                <p>µg</p>
                            </li>
                            <li>
                                <p>Thiamin</p>
                                <p>${food.thiamin}</p>
                                <p>mg</p>
                            </li>
                            <li>
                                <p>Pantothenic acid</p>
                                <p>${food.pantothenicAcid}</p>
                                <p>mg</p>
                            </li>
                            <li>
                                <p>Fatty acids, total monounsaturated</p>
                                <p>${food.fattyAcidsTotalMonounsaturated}</p>
                                <p>g</p>
                            </li>
                            <li>
                                <p>Fatty acids, total polyunsaturated</p>
                                <p>${food.fattyAcidsTotalPolyunsaturated}</p>
                                <p>g</p>
                            </li>

                        </ul>
                    </div>

                    <div class="btn-food-info">
                        <button id="btnCancel">Cancel</button>
                            </div>`;

        // Gán vào DOM
        foodInformation.innerHTML = html;
        foodInformation.style.display = "block";
        overlay.style.display = "block";

        // Gán sự kiện cho nút Cancel
        const btnCancel = document.getElementById("btnCancel");
        btnCancel.onclick = function () {
            foodInformation.style.display = "none";
            overlay.style.display = "none";
            clearInputs();
        };
    }

    // Hàm render nút phân trang
    const renderPage = () => {
        btnPagesFood.innerHTML = "";

        const maxVisible = 5;
        const half = Math.floor(maxVisible / 2);
        let start = Math.max(1, curentPage - half);
        let end = Math.min(totalPage, curentPage + half);

        // Điều chỉnh nếu số lượng nút chưa đủ maxVisible
        if (end - start + 1 < maxVisible) {
            if (start === 1) {
                end = Math.min(totalPage, start + maxVisible - 1);
            } else if (end === totalPage) {
                start = Math.max(1, end - maxVisible + 1);
            }
        }

        // Tạo các nút trang
        for (let i = start; i <= end; i++) {
            const btn = document.createElement("button");
            btn.textContent = i;
            btn.classList.add("btn-page");
            if (i === curentPage) {
                btn.classList.add("btn-active");
            }

            btn.addEventListener("click", function () {
                curentPage = i;
                renderPage();
                displayFoodList();
            });

            btnPagesFood.appendChild(btn);
        }

        // Cập nhật trạng thái nút Prev
        if (curentPage === 1) {
            btnPrevFood.setAttribute("disabled", true);
            iPrevFood.style.color = "#c5c5c5";
        } else {
            btnPrevFood.removeAttribute("disabled");
            iPrevFood.style.color = "black";
        }

        // Cập nhật trạng thái nút Next
        if (curentPage === totalPage) {
            btnNextFood.setAttribute("disabled", true);
            iNextFood.style.color = "#c5c5c5";
        } else {
            btnNextFood.removeAttribute("disabled");
            iNextFood.style.color = "black";
        }
    };

    // Lắng nghe sự kiện click nút Next
    btnNextFood.addEventListener("click", function () {
        if (curentPage < totalPage) {
            curentPage++;
            renderPage();
            displayFoodList();
        }
    });

    // Lắng nghe sự kiện click nút Prev
    btnPrevFood.addEventListener("click", function () {
        if (curentPage > 1) {
            curentPage--;
            renderPage();
            displayFoodList();
        }
    });


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





    // Tìm lại id cho button food
    function attachFoodClickEvents() {
        const foodButtons = document.querySelectorAll(".container-foods");
        foodButtons.forEach((btn) => {
            btn.onclick = function () {
                const id = parseInt(btn.dataset.id);
                const food = foodList.find(findID => findID.id == id);
                if (food) {
                    displayDetail(food); // Truyền food vào
                }
            };
        });
    }

    // button chi tiết thông tin food
    btnContentFoods.onclick = function () {
        const isHidden = foodInformation.style.display === "none" || foodInformation.style.display === "";
        if (isHidden) {
            displayDetail(food);
            foodInformation.style.display = "block";
            overlay.style.display = "block";
        } else {
            foodInformation.style.display = "none";
            overlay.style.display = "none";
        }
    };

    // reset input khi nhập xong
    function clearInputs() {
        inputMap.forEach(({ id }) => {
            const input = document.getElementById(id);
            if (input) input.value = "";
        });
    }

    // Nút Cancel và Save
    createFood.addEventListener("click", function () {
        foodAdd.style.display = "block";
    });

    // Nút Cancel
    btnAddCancel.addEventListener("click", function () {
        foodAdd.style.display = "none";
        clearInputs();
    });

    // Nút Save
    btnSaveFood.addEventListener("click", function () {
        collectFoodData();
        displayFoodList();
        foodAdd.style.display = "none";
        clearInputs();
    });

    // Khi click vào vùng tối overlay
    overlay.onclick = function () {
        foodInformation.style.display = "none";
        overlay.style.display = "none";
    };
    // Lưu food vào localtion
    function saveToLocalStorage(save, data) {
        localStorage.setItem(save, JSON.stringify(data));
    }
    // Load dữ liệu khi mở trang
    const storedFood = getFromLocalStorage("foodList");
    if (storedFood) {
        foodList = storedFood;
        // Cập nhật counter để không trùng id
        counter = storedFood.length > 0 ? Math.max(...storedFood.map(f => f.id)) + 1 : 1;
        displayFoodList();
    }

    // btn bấm mở header
});
