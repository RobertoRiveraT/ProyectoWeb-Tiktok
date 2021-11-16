import mysql.connector
from mysql.connector import Error
from config import DB_HOST

class Database:
    def __init__(self):
        self.connection = mysql.connector.connect(
            host=DB_HOST,
            database="tik_tok",
            user="tik_tok",
            password="UnEevMNzCj"
        )
        self.cursor = self.connection.cursor()

    def createUser(self, new_user):
        query = """
        INSERT INTO user
        (username, profile_name, description, password)
        VALUES(%s, %s, %s, %s);"""
        user_data = (new_user.username, new_user.profile_name, new_user.description, new_user.password)
        self._exec_query(query, user_data)
        new_user_id = self.cursor.lastrowid
        return new_user_id

    def authenticate_user(self, login_data):
        query = """
        SELECT * FROM user
        WHERE username = %s AND password = %s;"""
        user_data = (login_data.username, login_data.password)
        self.cursor.execute(query, user_data)
        authenticated_users = len(self.cursor.fetchall())
        return authenticated_users

    def get_all_videos(self):
        query = """
        SELECT v.video_id as video_id, username, profile_name, title
        FROM video as v JOIN user AS u
        ON v.user_id = u.user_id;"""
        self.cursor.execute(query)
        videos = []
        for (video_id, username, profile_name, title) in self.cursor:
            likes = -1
            video = {
                "video_id": video_id,
                "username": username,
                "profile_name": profile_name,
                "title": title,
                "likes": likes
            }
            videos.append(video)
        for video in videos:
            video["likes"] = self._count_likes(video["video_id"])
        return videos

    def get_video(self, video_id):
        query = """
        SELECT username, profile_name, title, url FROM video AS v JOIN user AS u ON v.user_id = u.user_id
        WHERE v.video_id = %s;
        """
        self.cursor.execute(query, (video_id,))
        (username, profile_name, title, url) = self.cursor.fetchone()
        likes = self._count_likes(video_id)
        comments = self._get_comments(video_id)
        video = {
            "video_id": video_id,
            "username": username,
            "profile_name": profile_name,
            "title": title,
            "url": url,
            "likes": likes,
            "comments": comments
        }
        return video

    def find_profiles(self, search_query):
        query = """
        SELECT user_id, username, profile_name FROM user
        WHERE username LIKE %s OR profile_name LIKE %s;"""
        self.cursor.execute(query, (f"%{search_query}%", f"%{search_query}%"))
        profiles = []
        for (user_id, username, profile_name) in self.cursor:
            profile = {
                "user_id": user_id,
                "username": username,
                "profile_name": profile_name
            }
            profiles.append(profile)
        return profiles

    def get_profile(self, username):
        query = """
        SELECT user_id, profile_name, description FROM user
        WHERE username LIKE %s;"""
        self.cursor.execute(query, (username,))
        (user_id, profile_name, description) = self.cursor.fetchone()
        query = """
        SELECT COUNT(*) AS likes FROM
        video AS v JOIN video_like AS vl ON v.video_id = vl.video_id
        WHERE v.user_id = %s;"""
        self.cursor.execute(query, (user_id,))
        (likes,) = self.cursor.fetchone()
        query = """
        SELECT video_id, title FROM video
        WHERE user_id = %s;"""
        profile = {
            "username": username,
            "profile_name": profile_name,
            "description": description,
            "likes": likes,
            "videos": []
        }
        self.cursor.execute(query, (user_id,))
        for (video_id, title) in self.cursor:
            video = {"video_id": video_id, "title": title}
            profile["videos"].append(video)
        return profile

    def is_video_liked(self, like_data):
        query = """
        SELECT COUNT(*) AS likes
        FROM video_like JOIN user ON user.user_id = video_like.user_id
        WHERE user.username LIKE %s AND video_id = %s"""
        self.cursor.execute(query, (like_data.username, like_data.video_id))
        likes = self.cursor.fetchone()
        return {"count": likes}

    def like_video(self, like_data):
        query = """
        INSERT INTO video_like(user_id, video_id) VALUES ((SELECT user_id FROM user WHERE username LIKE %s), %s);"""
        self.cursor.execute(query, (like_data.username, like_data.video_id))
        return {"count": 1}

    def comment_video(self, new_comment):
        query = """
        INSERT INTO comment(user_id, video_id, content) VALUES ((SELECT user_id FROM user WHERE username LIKE %s), %s, %s);"""
        self.cursor.execute(query, (new_comment.username, new_comment.video_id, new_comment.content))
        

    def disconnect(self):
        self.connection.close()

    def _exec_query(self, query, data):
        self.cursor.execute(query, data)
        self.connection.commit()

    def _count_likes(self, video_id):
        query = """
        SELECT COUNT(*) AS likes FROM video_like
        WHERE video_id = %s"""
        self.cursor.execute(query, (video_id,))
        likes = self.cursor.fetchone()
        return likes[0]

    def _get_comments(self, video_id):
        query = """
        SELECT comment_id, profile_name, content 
        FROM user JOIN comment ON user.user_id = comment.user_id
        WHERE video_id = %s
        ORDER BY comment.created_at;"""
        self.cursor.execute(query, (video_id,))
        comments = []
        for (comment_id, profile_name, content) in self.cursor:
            comment = {
                "comment_id": comment_id,
                "profile_name": profile_name,
                "content": content
            }
            comments.append(comment)
        return comments

