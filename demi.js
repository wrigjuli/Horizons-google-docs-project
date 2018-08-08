

app.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if(!err && user) {
      //login user
      req.login(user, (err) => {
        if(err) {
          res.status(500)
        }      })
    }
  })
})
