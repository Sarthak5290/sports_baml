
client<llm> GPT4o {
  provider openai
  options {
    model "gpt-4o"
    temperature 0.7
  }
}


client<llm> Claude {
  provider anthropic
  options {
    model "claude-3-sonnet-20240229"
    max_tokens 4000
  }
}

client<llm> GPT4 {
  provider openai
  options {
    model "gpt-4"
    temperature 0.7
  }
}

client<llm> GPT35 {
  provider openai
  options {
    model "gpt-3.5-turbo"
    temperature 0.7
  }
}