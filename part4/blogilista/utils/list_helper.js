const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  const sum = blogs.reduce((sum, item) => {
    return sum + item.likes;
  }, 0);
  return sum;
};

const favoriteBlog = (blogs) => {
  const blogWithMostLikes = blogs.reduce((prev, curr) =>
    prev.likes > curr.likes ? prev : curr
  );

  return {
    title: blogWithMostLikes.title,
    author: blogWithMostLikes.author,
    likes: blogWithMostLikes.likes,
  };
};

const mostBlogs = (blogs) => {
  const allAuthors = blogs.map((blog) => blog.author);

  const sumAuthorBlogs = allAuthors.reduce((acc, curr) => {
    acc[curr] ? acc[curr]++ : (acc[curr] = 1);

    return acc;
  }, {});

  const authorWithMostBlogs = Object.entries(sumAuthorBlogs).reduce((a, b) =>
    sumAuthorBlogs[a] > sumAuthorBlogs[b] ? a : b
  );

  return {
    author: authorWithMostBlogs[0],
    blogs: authorWithMostBlogs[1],
  };
};

const mostLikes = (blogs) => {
  const allAuthors = blogs.map((blog) => blog.author);

  let filterDoubles = [...new Set(allAuthors)];

  const likesForAuthor = filterDoubles.map((author) => {
    const authorsBlogs = blogs.filter((blog) => blog.author === author);

    const sumLikesForEachAuthor = authorsBlogs.reduce(
      (acc, curr) => acc + curr.likes,
      0
    );

    return {
      author: author,
      likes: sumLikesForEachAuthor,
    };
  });

  return likesForAuthor.reduce((a, b) => (a.likes > b.likes ? a : b));
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};
