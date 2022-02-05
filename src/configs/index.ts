const Config = {
  domain: process.env.REACT_APP_AUTH0_DOMAIN || "localhost",
  clientId: process.env.REACT_APP_AUTH0_CLIENT_ID || "0",
  reactUrl: process.env.REACT_APP_URL || "http://localhost",
  djangoUrl: process.env.REACT_APP_DJANGO_URL || "http://localhost/api",
};

export default Config;
