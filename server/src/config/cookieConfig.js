const jwtConfig = require('./jwtConfig');

const cookieConfig = {
  refresh: {
    maxAge: jwtConfig.refresh.expiresIn,
    httpOnly: true,
  },
};

module.exports = cookieConfig;