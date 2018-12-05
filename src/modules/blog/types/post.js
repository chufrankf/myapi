export const postTypeDefs = `
  type blog_post {
    date: String
    content: String
    status: String
    title: String
    type: String
    author: String
  }

  type Query {
    getAuthorPosts: [blog_post]
  }

  type Mutation {
    addPost(content: String, title: String, type: String): blog_post
  }
`;

export const postResolvers = {
  Query: {
    getAuthorPosts: () => {
    }
  },
  Mutation: {
    addPost: () => {
    }
  }
};