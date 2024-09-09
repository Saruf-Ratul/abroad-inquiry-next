// ----------------------------------------------------------------------

function path(root, sublink) {
  return `${root}${sublink}`;
}

const ROOTS_AUTH = "/auth";
const ROOTS_DASHBOARD = "/dashboard";

// ----------------------------------------------------------------------

export const PATH_AUTH = {
  root: ROOTS_AUTH,
  login: path(ROOTS_AUTH, "/login"),
  loginUnprotected: path(ROOTS_AUTH, "/login-unprotected"),
  register: path(ROOTS_AUTH, "/student/studentSignup"),
  registerUnprotected: path(ROOTS_AUTH, "/register-unprotected"),
  forgetPassword: path(ROOTS_AUTH, "/forget-password"),
  verify: path(ROOTS_AUTH, "/verify"),
};

export const PATH_PAGE = {
  home: "/",
  mentors: "/mentors",
  countries: "/countries",
  services: "/services",
  newsfeed: "/newsfeed",
  about: "/about",
  contact: "/contact",
  career: "/career",
};
// comingSoon: '/coming-soon',
// maintenance: '/maintenance',
// pricing: '/pricing',
// payment: '/payment',
// about: '/about-us',
// contact: '/contact-us',
// faqs: '/faqs',
// page404: '/404',
// page500: '/500',

export const PATH_DASHBOARD = {
  root: ROOTS_DASHBOARD,
  mentors: { root: path(ROOTS_DASHBOARD, "/mentors") },
  appointments: { root: path(ROOTS_DASHBOARD, "/appointments") },
  schedule: { root: path(ROOTS_DASHBOARD, "/schedule") },
  messages: { root: path(ROOTS_DASHBOARD, "/messages") },
  explore: { root: path(ROOTS_DASHBOARD, "/explore") },
  chat: {
    root: path(ROOTS_DASHBOARD, "/chat"),
    new: path(ROOTS_DASHBOARD, "/chat/new"),
    view: (name) => path(ROOTS_DASHBOARD, `/chat/${name}`),
    conversation: path(ROOTS_DASHBOARD, "/chat/:conversationKey"),
  },
  notifications: { root: path(ROOTS_DASHBOARD, "/notifications") },
  updates: { root: path(ROOTS_DASHBOARD, "/application-updates") },
  profile: {
    root: path(ROOTS_DASHBOARD, "/profile"),
    profile: path(ROOTS_DASHBOARD, "/user/profile"),
    cards: path(ROOTS_DASHBOARD, "/user/cards"),
    list: path(ROOTS_DASHBOARD, "/user/list"),
    newUser: path(ROOTS_DASHBOARD, "/user/new"),
    editById: path(ROOTS_DASHBOARD, `/user/reece-chung/edit`),
    account: path(ROOTS_DASHBOARD, "/user/account"),
  },
  general: {
    app: path(ROOTS_DASHBOARD, "/app"),
    ecommerce: path(ROOTS_DASHBOARD, "/ecommerce"),
    analytics: path(ROOTS_DASHBOARD, "/analytics"),
    banking: path(ROOTS_DASHBOARD, "/banking"),
    booking: path(ROOTS_DASHBOARD, "/booking"),
  },
  mail: {
    root: path(ROOTS_DASHBOARD, "/mail"),
    all: path(ROOTS_DASHBOARD, "/mail/all"),
  },

  calendar: path(ROOTS_DASHBOARD, "/calendar"),
  kanban: path(ROOTS_DASHBOARD, "/kanban"),

  eCommerce: {
    root: path(ROOTS_DASHBOARD, "/e-commerce"),
    shop: path(ROOTS_DASHBOARD, "/e-commerce/shop"),
    product: path(ROOTS_DASHBOARD, "/e-commerce/product/:name"),
    productById: path(
      ROOTS_DASHBOARD,
      "/e-commerce/product/nike-air-force-1-ndestrukt"
    ),
    list: path(ROOTS_DASHBOARD, "/e-commerce/list"),
    newProduct: path(ROOTS_DASHBOARD, "/e-commerce/product/new"),
    editById: path(
      ROOTS_DASHBOARD,
      "/e-commerce/product/nike-blazer-low-77-vintage/edit"
    ),
    checkout: path(ROOTS_DASHBOARD, "/e-commerce/checkout"),
    invoice: path(ROOTS_DASHBOARD, "/e-commerce/invoice"),
  },
  blog: {
    root: path(ROOTS_DASHBOARD, "/blog"),
    posts: path(ROOTS_DASHBOARD, "/blog/posts"),
    post: path(ROOTS_DASHBOARD, "/blog/post/:title"),
    postById: path(
      ROOTS_DASHBOARD,
      "/blog/post/apply-these-7-secret-techniques-to-improve-event"
    ),
    newPost: path(ROOTS_DASHBOARD, "/blog/new-post"),
  },
};

export const PATH_DOCS = "https://aboradinquiry.com";
