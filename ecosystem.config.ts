export default {
  apps: [
    {
      name: "dashboard-app",
      script: "npm",
      args: "start",
      env: {
        NODE_ENV: "production",
        PORT: "3000",
        HOST: "0.0.0.0",
        DATABASE_URL: `${process.env.RDS_DATABASE_URL}`,
      },
    },
  ],
};
