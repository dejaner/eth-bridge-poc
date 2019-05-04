const config = {
  development: {
    ormtype: {
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      database: 'eth-bridge',
      username: 'root',
      password: 'root',
      synchronize: true,
      entities: ['src/**/**.entity{.ts,.js}'],
    },
  },
  production: {
    ormtype: {
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      database: 'eth-bridge',
      username: 'root',
      password: 'root',
      synchronize: true,
      entities: ['dist/**/**.entity{.ts,.js}'],
    },
  },
};

const envConfig = config[process.env.NODE_ENV || 'development'];

export default envConfig;
