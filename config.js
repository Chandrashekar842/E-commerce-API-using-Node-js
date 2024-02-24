const config = {
    database: {
      username: process.env.DB_USERNAME || 'root',
      password: process.env.DB_PASSWORD || 'Chandu@21',
      database: process.env.DB_NAME || 'e_commerce',
    },
  };
  
  export default config;