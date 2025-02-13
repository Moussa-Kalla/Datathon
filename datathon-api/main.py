from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from app import Ravenfox_chat

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)



@app.get("/")
async def root():
    return {"message": "Hello World"}

class Answer(BaseModel):
    text: str
@app.post("/answer")
async def say_hello(answer: Answer):
    return {"message": Ravenfox_chat(answer.text)}