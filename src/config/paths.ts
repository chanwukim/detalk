const paths = {
  home: {
    getHref: () => "/",
  },
  auth: {
    signIn: {
      getHref: () => "/sign-in",
    },
  },
  product: {
    post: {
      new: {
        getHref: () => "/posts/new",
      },
      detail: {
        getHref: (id: string) => `/posts/${id}`,
      },
    },
  },
  member: {
    profile: {
      getHref: (handle: string) => `/u/${handle}`,
    },
  },
} as const;

export default paths;
