export const envConfig = {
  env: process.env.NODE_ENV || "development",
  port: Number(process.env.PORT) || 3000,
  debug: process.env.APP_DEBUG === "true",
  genderizeApiUrl: process.env.GENDERIZE_API_URL || "https://api.genderize.io",
  agifyApiUrl: process.env.AGIFY_API_URL || "https://api.agify.io",
  nationalizeApiUrl:
    process.env.NATIONALIZE_API_URL || "https://api.nationalize.io",
  mongoUrl: process.env.MONGO_URL!,

  githubClientId: process.env.GITHUB_CLIENT_ID!,
  githubClientSecret: process.env.GITHUB_CLIENT_SECRET!,
  githubCallbackUrl: process.env.GITHUB_CALLBACK_URL!,
  githubAccessTokenUrl: process.env.GITHUB_ACCESS_TOKEN_URL!,
  githubUserUrl: process.env.GITHUB_USER_URL!,
  githubLoginUrl: process.env.GITHUB_LOGIN_URL!,
  githubState: process.env.GITHUB_STATE!,
};

const requiredEnvVars = [
  "mongoUrl",
  "genderizeApiUrl",
  "agifyApiUrl",
  "nationalizeApiUrl",
  "port",
  "env",
];

requiredEnvVars.forEach((envVar) => {
  if (!envConfig[envVar as keyof typeof envConfig]) {
    console.error(`[CRITICAL] Environment variable ${envVar} is not defined!`);
  }
});
