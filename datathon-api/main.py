from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse
from pydantic import BaseModel
from app import ask_gpt4o

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
    return "Hello, je suis Ravenfox votre assistant support"


class Answer(BaseModel):
    text: str
@app.post("/answer")
async def chat_bot(answer: Answer):
    try :
        return StreamingResponse(
            ask_gpt4o(answer.text),
            media_type='text/event-stream'
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))