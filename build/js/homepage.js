let button1 = document.getElementById("BMIbtn");

button1.addEventListener("click", () => {
  const height = parseInt(document.getElementById("height").value);
  const currentWeight = parseInt(document.getElementById("weight").value);
  const result = document.getElementById("output1");
  const prediction = document.getElementById("output2");
  const bmiOutput = document.getElementById("BMIoutput");
  bmiOutput.style.display = "block";
  let height_status = false,
    weight_status = false;
  let newWeight, requiredWeight;

  if (height === "" || isNaN(height) || height <= 0) {
    document.getElementById("height_error").innerHTML =
      "Please provide a valid height";
  } else {
    document.getElementById("height_error").innerHTML = "";
    height_status = true;
  }

  if (currentWeight === "" || isNaN(currentWeight) || currentWeight <= 0) {
    document.getElementById("weight_error").innerHTML =
      "Please provide a valid weight";
  } else {
    document.getElementById("weight_error").innerHTML = "";
    weight_status = true;
  }

  if (height_status && weight_status) {
    const bmi = (currentWeight / ((height * height) / 10000)).toFixed(2);

    if (bmi < 18.6) {
      result.innerHTML = "Under Weight : " + bmi;
      newWeight = (18.6 * ((height * height) / 10000)).toFixed(2);
      requiredWeight = (newWeight - currentWeight).toFixed(2);
      prediction.innerHTML =
        "You need to gain " + requiredWeight + "kgs of weight.";
    } else if (bmi >= 18.6 && bmi < 24.9) {
      result.innerHTML = "Normal : " + bmi;
      prediction.style.display = "none";
    } else {
      result.innerHTML = "Over Weight : " + bmi;
      newWeight = (24.9 * ((height * height) / 10000)).toFixed(2);
      requiredWeight = (currentWeight - newWeight).toFixed(2);
      prediction.innerHTML =
        "You need to lose " + requiredWeight + "kgs of weight.";
    }
  } else {
    alert("The form has errors");
    result.innerHTML = "";
  }
});

let button2 = document.getElementById("Lossbtn");
let isShowingAll = false;

button2.addEventListener("click", () => {
  const LossOutput = document.getElementById("MoreLoss");

  if (isShowingAll) {
    LossOutput.style.display = "none";
    button2.innerHTML = "Show All";
  } else {
    LossOutput.style.display = "inline";
    button2.innerHTML = "Show Less";
  }

  isShowingAll = !isShowingAll;
});

let button3 = document.getElementById("Gainbtn");
let isShowingAll_1 = false;

button3.addEventListener("click", () => {
  const GainOutput = document.getElementById("MoreGain");

  if (isShowingAll_1) {
    GainOutput.style.display = "none";
    button3.innerHTML = "Show All";
  } else {
    GainOutput.style.display = "inline";
    button3.innerHTML = "Show Less";
  }

  isShowingAll_1 = !isShowingAll_1;
});

function sendEmail() {
  Email.send({
    SecureToken: "b5ea760a-afb3-421f-b91b-56b4c592ed44",
    To: "body.balance.bites@gmail.com",
    From: "body.balance.bites@gmail.com",
    Subject: "Users feedback",
    Body: "Message :" + document.getElementById("message").value,
  }).then((message) => alert(message));
}

fetch(
  "https://api.spoonacular.com/recipes/random?apiKey=514bff3015454e7f9b2cecb750e09eb0&number=5"
)
  .then((response) => response.json())
  .then((data) => {
    console.log(data); // Log the response to inspect its structure

    // Check if the data contains recipes
    if (data && data.recipes && data.recipes.length > 0) {
      const recipes = data.recipes;

      // Assuming you have an element with the id "recipeContainer" to display the data
      const recipeContainer = document.getElementById("recipeContainer");

      // Create HTML for each recipe
      const html = recipes
        .map(
          (recipe) => `
        <div>
        <li>
        <img src="${recipe.image}" alt="${recipe.title}">
        <h2 class="text-red-600 text-3xl">${recipe.title}</h2>
        <p class="text-yellow-600 text-sm">${recipe.instructions}</p>
        </li>
        </div>
      `
        )
        .join("");

      // Set the HTML content of the recipeContainer
      recipeContainer.innerHTML = html;
    } else {
      console.error("No recipes found in the response.");
    }
  })
  .catch((error) => console.error("Error fetching data:", error));
