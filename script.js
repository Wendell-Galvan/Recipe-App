// axios.get('https://www.themealdb.com/api/json/v1/1/random.php')
//      .then(response => {
//            console.log(response);	
//         })


// const displayMeal = document.getElementById('displayMeal');
let mealURL = 'https://www.themealdb.com/api/json/v1/1/random.php';


fetch(mealURL)
  .then((response) => {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error("NETWORK RESPONSE ERROR");
    }
  })
  .then(data => {
    console.log(data);
    displayMeal(data)
  })
  .catch((error) => console.error("FETCH ERROR:", error));



  function displayMeal(data){
     const meal = data.meals[0];
     const mealDiv = document.getElementById('displayMeal');

     //show meal name 
     const mealName = meal.strMeal;
     const heading = document.createElement("h1");
     heading.innerHTML = mealName;
     mealDiv.appendChild(heading);

     //display meal image 
     const mealImg = document.createElement("img");
     mealImg.src = meal.strMealThumb;
     mealDiv.appendChild(mealImg);
     document.body.style.backgroundImage = meal.strMealThumb;

     //show ingredients on UI 
     const ingredients = document.createElement("ul");
     mealDiv.appendChild(ingredients);

     //Ingredient list from API 
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

     //Instruction on how to make meal
     const mealInstructions = meal.strInstructions;
     const paragraph = document.createElement("p");
     paragraph.innerHTML = mealInstructions;
     mealDiv.appendChild(paragraph);


     //Link to Youtube
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
     location.reload();
  }

