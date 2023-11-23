import express from "express";
import type {
  Request,
  Response,
  NextFunction,
} from "express";
import cors from "cors";
import jwt, { Secret } from "jsonwebtoken";
import {
  findUserById,
  IDecodedUser,
  verifyUser,
  parseToken,
  addPost,
  updatePost,
  posts,
  sleep,
} from "./fakedb";
import "dotenv/config";

const port = 8085;
const app = express();

const authentication = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  const token = parseToken(authHeader, res);
  if (!token) {
    res.status(401).send("Authorization required.");
    return;
  }
  jwt.verify(token, "secret", (err, decoded) => {
    if (err) {
      res.status(403).send("Invalid token.");
      return;
    }
    const user = findUserById((decoded as IDecodedUser).id);
    if (user) {
      res.locals.user = user;
      next();
    }
  });
}

app.use(cors());
app.use(express.json());

app.post("/api/user/login", (req, res) => {
  try {
    const { email, password } = req.body;
    const user = verifyUser(email, password);
    const token = jwt.sign({ id: user.id }, process.env.SECRETKEY as Secret, {
      expiresIn: "2 days",
    });
    res.json({ result: { user, token } });
  } catch (error) {
    res.status(401).json({ error });
  }
});

app.post("/api/user/validation", (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    const token = parseToken(authHeader, res);
    const decodedUser = jwt.verify(token, process.env.SECRETKEY as Secret);
    const user = findUserById((decodedUser as IDecodedUser).id);
    res.json({ result: { user, token } });
  } catch (error) {
    res.status(401).json({ error });
  }
});

app.get("/api/posts", async (req, res) => {
  await sleep(1000);
  res.json(posts);
});


type User = {
  id: number;
  email: string;
  password: string;
};

const getCurrentUser = (req: Request, res: Response): User => {
  const authHeader = req.headers.authorization;
  const token = parseToken(authHeader, res);
  const decodedUser = jwt.verify(token, process.env.SECRETKEY as Secret);
  return findUserById((decodedUser as IDecodedUser).id);
}

app.get("/api/posts/:id", (req, res) => {
  const id = Number(req.params.id);
  const post = posts.find((post) => post.id === id);

  if (post) {
    const currentUser = getCurrentUser(req, res);
    const { id, email } = findUserById(post.userId);
    res.json(Object.assign({}, post, { user: { id, email, isCurrentUser: id === currentUser?.id }}));
  } else {
    res.status(404);
  }
});


type Post = {
  id?: number;
  title: string;
  category?: string;
  content: string;
  image?: string;
  userId?: number;
};

type PostErrors = {
  title?: string;
  content?: string;
}

const validatePost = (post: Post) => {
  const errors: PostErrors = {};
  if (!post.title) {
    errors.title = "Title is required.";
  }
  if (!post.content) {
    errors.content = "Content is required.";
  }
  if (Object.keys(errors).length > 0) {
    return errors;
  }
}

app.post("/api/posts", authentication, (req, res) => {
  const newPost = req.body;
  const user = res.locals.user;
  const errors = validatePost(newPost);
  if (errors) {
    res.status(403).json({ errors: errors });
  } else {
    addPost(newPost, user.id);
    res.status(200).json({ success: true });
  }
});

app.post("/api/posts/update", authentication, (req, res) => {
  const changedPost = req.body;
  const user = res.locals.user;
  const errors = validatePost(changedPost);
  if (errors) {
    res.status(403).json({ errors: errors });
  } else {
    updatePost(changedPost.id, changedPost);
    res.status(200).json({ success: true });
  }
});

app.listen(port, () => console.log("Server is running"));
