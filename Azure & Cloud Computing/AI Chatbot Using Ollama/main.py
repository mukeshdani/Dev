import boto3
import pandas as pd
import fitz  # PyMuPDF
import docx  # python-docx
from langchain_ollama import OllamaLLM
from langchain.prompts.chat import ChatPromptTemplate

# Define the template
template = """
Answer the question below.
Your Are Adani Bot and your name is Adani Bot
What is your purpose?
purpose to answer only Adani Cloud Related Data

Then Analysis the question accordingly what user ask

Total 3 Super admin presnet in our cloud 
total 1137 subscription are there

if someone ask you question outside this template then reply that Please ask Adani Cloud Related question only

Here is the conversation history: {context}
Question: {question}
Answer: 
"""

# Initialize the model and prompt
model = OllamaLLM(model="llama3")
prompt = ChatPromptTemplate.from_template(template)
chain = prompt | model

# Function to read data from local Word file
def read_from_word(file_path):
    doc = docx.Document(file_path)
    full_text = []
    for para in doc.paragraphs:
        full_text.append(para.text)
    return '\n'.join(full_text)

# Function to get data from all sources
def get_data_from_sources():
    # Example Word file path
    word_file_path = r"D:\OneDrive - Adani\Desktop\Pandas\Dev\Azure & Cloud Computing\AI Chatbot Using Ollama\Adani - Landing Zone Solution using AWS Control Tower - Draft v0.2.docx"
    word_data = read_from_word(word_file_path)

    return {
        "word_data": word_data
    }

# Main conversation handler
def handle_conversation():
    context = ""
    # data_sources = get_data_from_sources()
    # print(data_sources)
    print("Welcome to the Adani Chatbot! Type 'exit' to quit")
    print("_________________________________________________")
    print()

    while True:
        user_input = input("Please ask question related to cloud only: ")
        if user_input.lower() == "exit":
            break

        # Integrate data from sources into the context
        # context += f"\nData Sources: {data_sources}\n"
        # print(context)
        
        result = chain.invoke({"context": context, "question": user_input})
        print()
        print("Adani Bot: ", result)
        print()
        context += f"\nUser: {user_input}\nAI: {result}"

if __name__ == "__main__":
    handle_conversation()
