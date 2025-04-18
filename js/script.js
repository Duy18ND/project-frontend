document.addEventListener("DOMContentLoaded", function () {
    // Khai bao mang
    let foodList = [
        { id: 1, name: "Udon", image: "/assets/menu-food/udon.jpg", likes: 0, author: "Duy", describe: "Vegetarian", by: "100g", energy: "143kcal", fat: "6g", carbohydrate: "18g", protein: "5g" },
        { id: 2, name: "Pad Thai", image: "/assets/menu-food/PadThai.jpg", likes: 0, author: "Alex", describe: "Vegetarian", by: "100g", energy: "200kcal", fat: "7g", carbohydrate: "25g", protein: "8g" },
        { id: 3, name: "Falafel", image: "/assets/menu-food/Falafel.jpg", likes: 0, author: "Maria", describe: "Vegetarian", by: "100g", energy: "150kcal", fat: "5g", carbohydrate: "20g", protein: "6g" },
        { id: 4, name: "Spaghetti Aglio e Olio", image: "/assets/menu-food/SpaghettiAglioeOlio.jpg", likes: 0, author: "John", describe: "Vegetarian", by: "100g", energy: "180kcal", fat: "8g", carbohydrate: "24g", protein: "4g" },
        { id: 5, name: "Chana Masala", image: "/assets/menu-food/ChanaMasala.jpg", likes: 0, author: "Liam", describe: "Vegetarian", by: "100g", energy: "160kcal", fat: "5g", carbohydrate: "22g", protein: "7g" },
    ];
    // Khai bao id content
    let contentHomePage = document.getElementById("contentHomePage");
    let sectionMyRecipes = document.getElementById("sectionMyRecipes");
    // Khai bao id tu tang
    let counterID = foodList.length + 1;

    // funcition hien thi menu mon an
    function displayFoodList() {
        contentHomePage.innerHTML = "";
        let html = "";
        foodList.forEach(food => {
            html = `
                  <div class="container-menu" data-id = "${food.id}">
                    <div class="tag" id="btnHomePage" data-id = "${food.id}">
                        <img src="${food.image}" alt="${food.name}" class="commmunity-img">
                        <p class="commmunity"><i class="fa-solid fa-people-group"></i> Community Recipes</p>
                    </div>
                    <div>
                        <ul class="info-menu">
                        <li>
                            <h5 style="font-size: 18px;">${food.name}</h5>
                        </li>
                        <li>
                            <div class="title-like">
                                <p>${food.author}</p>
                                <button data-id="${food.id}"><i class="fa-solid fa-heart"></i><span>${food.likes}</span></button>
                            </div>
                        </li>
                        <li> <img src="/assets/icons/describe.png">${food.describe}</li>
                        <li class="nutritional-info">
                            <div class="nutritional">
                                <h5>By</h5>
                                <p>${food.by}</p>
                            </div>
                            <div class="nutritional">
                                <h5>Energy</h5>
                                <p>${food.energy}</p>
                            </div>
                            <div class="nutritional">
                                <h5>Fat</h5>
                                <p>${food.fat}</p>
                            </div>
                            <div class="nutritional">
                                <h5>Carbohydrate</h5>
                                <p>${food.carbohydrate}</p>
                            </div>
                            <div class="nutritional">
                                <h5>Protein</h5>
                                <p>${food.protein}</p>
                            </div>
                        </li>
                    </ul>
                    </div>
            </div>
        `;
            localStorage.setItem("foodList", JSON.stringify(foodList));
            contentHomePage.innerHTML += html;
        });
    }
    displayFoodList();
});
// Them mon an
function addNewFood() {

}
// // nút bấm click homePage => chi tiết về món ăn
// document.addEventListener("click", function(){
// // Nut button
// const btnHomePage = document.getElementById("btnHomePage");

// btnHomePage.addEventListener("click", function(){

// });

// });