// const passport = require('passport');
// const LocalStrategy = require('passport-local').Strategy
// const User = require('../models/user')
// const bcrypt = require('bcrypt')

// function initPassport() {
//     passport.use(new LocalStrategy({ usernameField: 'email' }, async (email, password, done) => {
//         //Login
//         //check if email exists
//         const user = await User.findOne({ email: email })
//         if (!user) {
//             return done(null, false, { message: 'No user with this email ' })
//         }

//         bcrypt.compare(password, user.password).then(match => {
//             if (match) {
//                 return done(null, user, { message: 'Logged in sucessfully' })
//             }
//             return done(null, user, { message: 'Wrong username or password' })
//         }).catch(err => {
//             return done(null, user, { message: 'Something went wrong' })
//         })

//     }))

//     passport.serializeUser((user, done) => {
//         done(null, user._id);
//     })

//     passport.deserializeUser((id, done) => {
//         User.findById(id, (err, user) => {
//             done(err, user);
//         })
//     })
// }

// module.exports = initPassport;

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');
const bcrypt = require('bcrypt');

async function initPassport() {
    passport.use(new LocalStrategy({ usernameField: 'email' }, async (email, password, done) => {
        // Login
        // Check if email exists
        const user = await User.findOne({ email: email });
        if (!user) {
            return done(null, false, { message: 'No user with this email' });
        }

        try {
            const match = await bcrypt.compare(password, user.password);
            if (match) {
                return done(null, user, { message: 'Logged in successfully' });
            } else {
                return done(null, false, { message: 'Wrong username or password' });
            }
        } catch (err) {
            return done(null, false, { message: 'Something went wrong' });
        }
    }));

    passport.serializeUser((user, done) => {
        done(null, user._id);
    });

    passport.deserializeUser(async (id, done) => {
        try {
            const user = await User.findById(id);
            done(null, user);
        } catch (err) {
            done(err, null);
        }
    });
}

module.exports = initPassport;
