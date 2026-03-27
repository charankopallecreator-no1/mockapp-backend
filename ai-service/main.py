from fastapi import FastAPI
from pydantic import BaseModel
import openai
import os
from dotenv import load_dotenv

load_dotenv()

openai.api_key = os.getenv("OPENAI_API_KEY")

app = FastAPI()

class QuestionRequest(BaseModel):
    topic: str
    difficulty: str

class EvaluateRequest(BaseModel):
    question: str
    answer: str

@app.post("/generate-question")
async def generate_question(request: QuestionRequest):
    try:
        prompt = f"Generate a {request.difficulty} level question on {request.topic} for JEE/NEET preparation."
        response = openai.Completion.create(
            engine="text-davinci-003",
            prompt=prompt,
            max_tokens=200
        )
        question = response.choices[0].text.strip()
        return {"question": question}
    except Exception as e:
        return {"error": str(e)}

@app.post("/evaluate-answer")
async def evaluate_answer(request: EvaluateRequest):
    try:
        prompt = f"Evaluate the answer '{request.answer}' for the question '{request.question}'. Provide score out of 4, feedback, and correct answer if wrong."
        response = openai.Completion.create(
            engine="text-davinci-003",
            prompt=prompt,
            max_tokens=300
        )
        evaluation = response.choices[0].text.strip()
        # Parse score, etc. - placeholder
        return {"evaluation": evaluation, "score": 3}  # Placeholder
    except Exception as e:
        return {"error": str(e)}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)