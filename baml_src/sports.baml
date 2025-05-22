// Define the data structure for sport information
class SportInfo {
  name string
  description string
  origin string
  equipment string[]
  players_count string
  fun_facts string[]
}

// BAML function to get sport information
function GetSportInfo(sport_name: string) -> SportInfo {
  client GroqClient
  prompt #"
    You are a sports expert. Given a sport name, provide comprehensive information about it.
    
    Sport: {{sport_name}}
    
    Please provide detailed information about this sport including:
    - A clear description of how the sport is played
    - The origin/history of the sport
    - Equipment needed
    - Number of players typically involved
    - Interesting fun facts
    
    Make sure your response is informative, accurate, and engaging.
    
    {{ ctx.output_format }}
  "#
}