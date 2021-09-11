// 3. Middleware function to check if user has an active session (=loggedIn)
// if the user has an active session (=loggedIn), continue

module.exports = {
    isLoggedIn: (req, res, next) => {
      if (req.session.loggedInUser) {
        next() 
      } else { 
        res.redirect('/auth/login')
      }
    }
  }