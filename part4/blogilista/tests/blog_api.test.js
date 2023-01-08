const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const Blog = require("../models/blog");
const bcrypt = require("bcrypt");
const User = require("../models/user");
const helper = require("./test_helper");
const api = supertest(app);

describe("get method", () => {
  test("blogs are returned as json", async () => {
    await api
      .get("/api/blogs")
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });

  test("all blogs are returned", async () => {
    const response = await api.get("/api/blogs");
    expect(response.body).toHaveLength(helper.initialBlogs.length);
  });

  test("id to be defined", async () => {
    const response = await api.get("/api/blogs");
    response.body.forEach((blog) => expect(blog.id).toBeDefined());
  });
});

describe("post method", () => {
  test("a valid blog can be added ", async () => {
    const newBlog = {
      title: "New Blog Part 5",
      author: "Tarja",
      url: "https://www.google.fi",
      likes: 2,
    };

    await api
      .post("/api/blogs")
      .send(newBlog)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const response = await api.get("/api/blogs");
    expect(response.body).toHaveLength(helper.initialBlogs.length + 1);
  });

  test("default 0 likes", async () => {
    const defaultZeroLikes = {
      title: "New Blog Part 10",
      author: "Sauli",
      url: "https://www.google.com",
    };

    const response = await api
      .post("/api/blogs")
      .send(defaultZeroLikes)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    expect(response.body.likes).toBe(0);
  });

  test("bad request without title", async () => {
    const blogWithoutTitle = {
      author: "Rauli",
      url: "https://www.google.com",
      likes: 999,
    };

    await api.post("/api/blogs").send(blogWithoutTitle).expect(400);
  });

  test("bad request without url", async () => {
    const blogWithoutUrl = {
      title: "Url Missing Book",
      author: "Rauli",
      likes: 999,
    };

    await api.post("/api/blogs").send(blogWithoutUrl).expect(400);
  });
});

describe("delete method", () => {
  test("blog successfully deleted", async () => {
    const blogs = await Blog.find({});
    const blogToDelete = blogs[0];

    await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204);

    const remainingBlogs = await Blog.find({});

    expect(remainingBlogs).toHaveLength(blogs.length - 1);
  });

  test("blogs not including deleted blog's title", async () => {
    const blogs = await Blog.find({});
    const blogToDelete = blogs[0];

    await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204);

    const remainingBlogs = await Blog.find({});

    const titles = remainingBlogs.map((blog) => blog.title);
    expect(titles).not.toContain(blogToDelete.title);
  });

  test("blogs not including deleted blog's id", async () => {
    const blogs = await Blog.find({});
    const blogToDelete = blogs[0];

    await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204);

    const remainingBlogs = await Blog.find({});

    const ids = remainingBlogs.map((blog) => blog.id);
    expect(ids).not.toContain(blogToDelete.id);
  });
});

describe("update method", () => {
  test("blog successfully updated", async () => {
    const blogs = await Blog.find({});
    const blogToUpdate = blogs[0];

    expect(blogToUpdate.likes).toBe(0);

    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send({ likes: 999 })
      .expect(200);

    const updatedBlogs = await Blog.find({});
    const updatedBlog = updatedBlogs[0];
    expect(updatedBlog.likes).toBe(999);
  });
});

describe("when there is initially one user at db", () => {
  beforeEach(async () => {
    await User.deleteMany({});

    const passwordHash = await bcrypt.hash("sekret", 10);
    const user = new User({ username: "root", passwordHash });

    await user.save();
  });

  test("creation succeeds with a fresh username", async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: "jonit",
      name: "Joni Tanhuansuu",
      password: "salasana",
    };

    await api
      .post("/api/users")
      .send(newUser)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1);

    const usernames = usersAtEnd.map((u) => u.username);
    expect(usernames).toContain(newUser.username);
  });

  test("creation fails with proper statuscode and message if username already taken", async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: "root",
      name: "Joni Tanhuansuu",
      password: "salasana",
    };

    const result = await api
      .post("/api/users")
      .send(newUser)
      .expect(400)
      .expect("Content-Type", /application\/json/);

    expect(result.body.error).toContain("username must be unique");

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toHaveLength(usersAtStart.length);
  });

  test("creation fails with proper statuscode and message if username is too short", async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: "r",
      name: "Joni Tanhuansuu",
      password: "salasana",
    };

    const result = await api
      .post("/api/users")
      .send(newUser)
      .expect(400)
      .expect("Content-Type", /application\/json/);

    expect(result.body.error).toContain(
      "username must be at least three characters"
    );

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toHaveLength(usersAtStart.length);
  });

  test("creation fails with proper statuscode and message if password is too short", async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: "superRoot",
      name: "Joni Tanhuansuu",
      password: "s",
    };

    const result = await api
      .post("/api/users")
      .send(newUser)
      .expect(400)
      .expect("Content-Type", /application\/json/);

    expect(result.body.error).toContain(
      "password must be at least three characters"
    );

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toHaveLength(usersAtStart.length);
  });
});

afterAll(() => {
  mongoose.connection.close();
});
