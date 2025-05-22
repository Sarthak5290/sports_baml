// Client configuration - using Groq via OpenAI-compatible endpoint
client<llm> GroqClient {
  provider "openai"
  options {
    base_url "https://api.groq.com/openai/v1"
    model "llama-3.1-70b-versatile"
    api_key env.GROQ_API_KEY
  }
}