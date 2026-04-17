export const envConfig = {
  env: process.env.NODE_ENV || "development",
  port: Number(process.env.PORT) || 3000,
  debug: process.env.APP_DEBUG === "true",
  genderizeApiUrl: process.env.GENDERIZE_API_URL!,
  agifyApiUrl: process.env.AGIFY_API_URL!,
  nationalizeApiUrl: process.env.NATIONALIZE_API_URL!,
  mongoUrl: process.env.MONGO_URL!,
};

const requiredEnvVars = [
  "genderizeApiUrl",
  "agifyApiUrl",
  "nationalizeApiUrl",
  "mongoUrl",
  "port",
  "env",
  "debug",
];

requiredEnvVars.forEach((envVar) => {
  if (!envConfig[envVar as keyof typeof envConfig]) {
    console.error(`[CRITICAL] Environment variable ${envVar} is not defined!`);
  }
});
