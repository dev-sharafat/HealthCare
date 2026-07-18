import "dotenv/config";

export const configs = {
  port: process.env.PORT || 3000,
  db_url: process.env.DATABASE_URL,
  jwt: {
    access_token: process.env.ACCESS_TOKEN,
  },
  app_url: process.env.APP_URL as string,

};