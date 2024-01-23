const passport = require('passport')
const User = require('../../models/user')
const bcrypt = require('bcrypt')
const { message } = require('laravel-mix/src/Log')

function authController() {

    const _getRedirectUrl = (req) => {
        return req.user.role === 'admin' ? '/admin/orders' : '/customer/orders'
    }

    return {

        login(req, res) {
            res.render('auth/login')
        },

        postLogin(req, res, next) {
            const { email, password } = req.body

            //validate request
            if (!email || !password) {
                req.flash('error', 'All fields are required*')
                return res.redirect('/login')
            }

            passport.authenticate('local', (err, user, info) => {
                if (err) {
                    req.flash('error', info.message)
                    return next(err)
                }

                if (!user) {
                    req.flash('error', info.message)
                    return res.redirect('/login')
                }

                req.logIn(user, (err) => {
                    if (err) {
                        req.flash('error', info.message)
                        return next(err)
                    }
                    return res.redirect(_getRedirectUrl(req))
                })
            })(req, res, next)
        },

        register(req, res) {
            res.render('auth/register')
        },

        //async
        async postRegister(req, res) {
            // // res.render('auth/register')
            const { email, password, first_name, last_name, dob, country } = req.body

            //validate request
            if (!email || !password || !first_name || !last_name || !dob || !country) {
                req.flash('error', 'All fields are required*')
                // req.flash('name', name)
                req.flash('email', email)
                req.flash('first_name', first_name)
                req.flash('last_name', last_name)
                req.flash('dob', dob)
                req.flash('countries', country)
                // req.flash('gender', gender)
                return res.redirect('/register')
            }

            //check if email exists
            const userExists = await User.exists({ email: email })

            if (userExists) {
                req.flash('error', 'E-mail already taken*')
                // req.flash('name', name)
                req.flash('email', email)
                req.flash('first_name', first_name)
                req.flash('last_name', last_name)
                req.flash('dob', dob)
                req.flash('countries', country)
                // req.flash('gender', gender)
                return res.redirect('/register')
            }


            //hash password
            const hashedPassword = await bcrypt.hash(password, 10)   //always use async in fucntion while using await


            //If all required feilds are checked and email does not exists the 
            //Create new user
            const user = new User({
                // name,
                email,
                password: hashedPassword,
                first_name,
                last_name,
                dob,
                country
                // gender: gender
            })

            //saving user
            user.save().then((user) => {
                req.flash('error', 'Registration successful!')


                //Login directly after registration
                /*

                */

                return res.redirect('/')
            }).catch(err => {
                req.flash('error', 'Something went wrong*')
                req.flash('email', email)
                req.flash('first_name', first_name)
                req.flash('last_name', last_name)
                req.flash('dob', dob)
                req.flash('countries', country)
                return res.redirect('/register')
            })

            // console.log(req.body)
        },
        logout(req, res) {
            req.logout((err) => {
                if (err) {
                    // Handle any error that might occur during logout
                    console.error(err);
                    return next(err);
                }
                // Redirect to the login page after successful logout
                return res.redirect('/login');
            });
        }

    }
}

module.exports = authController




















// const User = require('../../models/user');
// const bcrypt = require('bcrypt');

// async function authController() {
//     return {
//         login(req, res) {
//             res.render('auth/login')
//         },
//         register(req, res) {
//             res.render('auth/register')
//         },
//         // ... other functions ...

//         async postRegister(req, res) {
//             const { email, password, name, dob, countries } = req.body;

//             if (!email || !password || !name || !dob || !countries) {
//                 req.flash('error', 'All fields are required*')
//                 req.flash('email', email)
//                 req.flash('name', name)
//                 // req.flash('firstname', firstname)
//                 // req.flash('lastname', lastname)
//                 req.flash('dob', dob)
//                 req.flash('countries', countries)
//                 // req.flash('gender', gender)
//                 return res.redirect('/register')
//             }

//             try {
//                 // Check if email exists
//                 const userExists = await User.exists({ email: email });
//                 if (userExists) {
//                     req.flash('error', 'E-mail already taken*');
//                     req.flash('email', email)
//                     req.flash('name', name)
//                     // req.flash('firstname', firstname)
//                     // req.flash('lastname', lastname)
//                     req.flash('dob', dob)
//                     req.flash('countries', countries)
//                     // req.flash('gender', gender)
//                     return res.redirect('/register');
//                 }

//                 // Hash password
//                 const hashedPassword = await bcrypt.hash(password, 10);

//                 // Create user
//                 const user = new User({
//                     email,
//                     password: hashedPassword,
//                     name,
//                     dob,
//                     countries,
//                 });

//                 await user.save(); // Wait for user to be saved

//                 // Redirect after successful registration
//                 return res.redirect('/');
//             } catch (error) {
//                 req.flash('error', 'Something went wrong*');
//                 return res.redirect('/register');
//             }
//         }
//     };
// }

// module.exports = authController;