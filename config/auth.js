// config/auth.js

module.exports = {
    'googleAuth': {
        'clientID': '<<Your Google Api Client ID>>',
        'clientSecret': '<<Your Google Api Client Secret>>',
        'callbackURL': 'http://localhost:8000/auth/google/callback'
    }
};