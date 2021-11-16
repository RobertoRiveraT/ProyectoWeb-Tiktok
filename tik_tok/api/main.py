from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from database import Database


class NewUser(BaseModel):
    username: str
    password: str
    profile_name: str
    description: str

class LoginData(BaseModel):
    username: str
    password: str

class LikeData(BaseModel):
    username: str
    video_id: int

class NewComment(BaseModel):
    username: str
    video_id: int
    content: str

db = Database()

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/user/create")
def create_user(new_user: NewUser):
    new_user_id = db.createUser(new_user)
    return {
        "id": new_user_id
    }

@app.post("/user/authenticate")
def authenticate_user(login_data: LoginData):
    count = db.authenticate_user(login_data)
    return {
        "count": count
    }

@app.get("/video/all")
def get_all_videos():
    return db.get_all_videos()

@app.get("/video/{video_id}")
def get_video(video_id: int):
    return db.get_video(video_id)

@app.post("/video/likes")
def is_liked(like_data: LikeData):
    return db.is_video_liked(like_data)

@app.post("/video/like")
def like_video(like_data: LikeData):
    return db.like_video(like_data)

@app.post("/video/comment")
def comment_video(new_comment: NewComment):
    db.comment_video(new_comment)
    return new_comment

@app.get("/profile/search/{query}")
def search_profiles(query: str):
    return db.find_profiles(query)

@app.get("/profile/{username}")
def get_profile(username: str):
    return db.get_profile(username)
