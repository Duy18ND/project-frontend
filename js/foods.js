document.addEventListener("DOMContentLoaded", function () {
    const btnCancel = document.getElementById("btnCancel");
    const btnContentFoods = document.getElementById("btnContentFoods");
    const foodInformation = document.getElementById("foodInformation");

    btnContentFoods.onclick = function () {
        if (foodInformation.style.display === "none" || foodInformation.style.display === "") {
            foodInformation.style.display = "block";
        } else {
            foodInformation.style.display = "none";
        }
    };
    btnCancel.onclick = function () {
        foodInformation.style.display = "none";
    }
});
