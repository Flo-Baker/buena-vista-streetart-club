// 3. Middleware function to check if user has an active sessuin (=loggedIn)

module.exports = {

    isLoggedIn: (req, res, next) => {
      // if the user has an active session (=loggedIn), continue
      if (req.session.loggedInUser) {
        next() // continue
      } else { // go back to login form
        res.redirect('/auth/login')
      }
    }
  
  }