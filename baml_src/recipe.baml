
class Ingredient {
  name string
  amount float?
  unit string?
}

class PartIngredient {
  title string
  ingredients Ingredient[]
}

class PartSteps {
  title string
  steps string[]
}

class Recipe {
  number_of_servings int
  ingredients (Ingredient | PartIngredient)[]
  instructions (string | PartSteps)[]
}

function GetRecipe(query: string) -> Recipe {
  client GPT4o
  prompt #"
    Generate a detailed recipe for: {{query}}
    
    Return a Recipe object with:
    - number_of_servings: How many servings this recipe makes
    - ingredients: Either simple ingredients with name/amount/unit, or grouped ingredients with a title
    - instructions: Either simple string steps, or grouped steps with a title
    
    Make sure to:
    - Use appropriate measurements (cups, tablespoons, etc.)
    - Group ingredients logically (e.g., "For the sauce", "For the marinade")
    - Provide clear, step-by-step instructions
    - Group instructions into logical sections when appropriate
  "#
}