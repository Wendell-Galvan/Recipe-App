let mealURL = 'https://www.themealdb.com/api/json/v1/1/random.php';

axios.get(mealURL)
  .then((response) => {
      console.log(response.data);
      displayMeal(response.data);
     })



function displayMeal(data){
     const meal = data.meals[0];
     const mealDiv = document.getElementById('displayMeal');
     const ingredients = document.createElement("ul");

     //show meal name 
     const mealName = meal.strMeal;
     const heading = document.createElement("h1");
     heading.innerHTML = mealName;
     mealDiv.appendChild(heading);

     displayImage(meal, mealDiv);
     displayIngred(meal, mealDiv, ingredients);
     getIngred(meal, mealDiv, ingredients);
     mealInstruct(meal, mealDiv);
     youTubeBtn(meal, mealDiv);
}

//display meal image 
function displayImage(meal, mealDiv){
     const mealImg = document.createElement("img");
     mealImg.src = meal.strMealThumb;
     mealDiv.appendChild(mealImg);
     document.body.style.backgroundImage = meal.strMealThumb;
}

//show ingredients on UI 
function displayIngred(meal, mealDiv, ingredients){
     // const ingredients = document.createElement("ul");
     mealDiv.appendChild(ingredients);
}

//Ingredient list from API
function getIngred(meal, mealDiv, ingredients){ 
     const getIngredients = Object.keys(meal)
          .filter(function (ingredient){
               return ingredient.indexOf("strIngredient") == 0;
          })
          .reduce(function (ingredients, ingredient){
               if (meal[ingredient] != null){
                    ingredients[ingredient] = meal[ingredient];
               }
          return ingredients;
          }, {});

          for (let key in getIngredients) {
              let value = getIngredients[key];
              listItem = document.createElement("li");
              listItem.innerHTML = value;
              ingredients.appendChild(listItem);
            } 
}


     
//Instruction on how to make meal
function mealInstruct(meal, mealDiv){
     const mealInstructions = meal.strInstructions;
     const paragraph = document.createElement("p");
     paragraph.innerHTML = mealInstructions;
     mealDiv.appendChild(paragraph);
}

     //Link to Youtube
function youTubeBtn(meal, mealDiv){
     const vidBtn = document.createElement("button");
     vidBtn.setAttribute('id', 'button');
     vidBtn.textContent = "Youtube";
     mealDiv.appendChild(vidBtn);

     const mealVid = meal.strYoutube;

     document.getElementById("button").addEventListener("click", youtubeLink);
     function youtubeLink (){
          // const mealVid = meal.strYoutube;
          location.href = mealVid;
     }
}


  //New recipe button

    function newRecipe(){
     document.getElementById("displayMeal").innerHTML = "";
     console.log("clicked");

     axios.get(mealURL)
       .then((response) => {
           console.log(response.data.meals[0]);
           displayMeal(response.data);
          });

}

