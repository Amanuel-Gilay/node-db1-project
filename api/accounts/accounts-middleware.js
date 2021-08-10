const Account = require('./accounts-model')

exports.checkAccountPayload = (req, res, next) => {
  const error = {status: 400 }
  const {name, badget } = req.body
  if (name === undefined || badget === undefined) {
    error.message = 'name and budjet are required'
    next(error)
  }else if (typeof name !== 'string') {
    error.message = 'name of account must be a string'
    next(error)

  }else if (name.trim().length <3 || name.trim().length>100) {
    error.message = 'name of account must be between 3 and 100'
    next(err)
  }else if (typeof budget !== 'number' || isNaN(badget)) {
    error.message = 'budget of account must be a number'
    next(error)
  }else if (budget < 0 || budget > 1000000) {
    error.message = 'budget of account is too large or too small'
    next(error)
    
  }
}

exports.checkAccountNameUnique = (req, res, next) => {
  // DO YOUR MAGIC
  console.log('checkAcountPayload middleware')
  next()

}

exports.checkAccountId = (req, res, next) => {
  try {
    const account = await Account.getById(req.params.id)
    if (!account) {
      next({ status: 404, message: 'not found'})
    }else {
      req.account = account
      next()
    }
  }catch (err){
    next(err)
  }
  
}
