const Config = {
  APIURL: 'http://localhost:3000/',
  PART: {
    // auth && user
    LOGIN: 'user/login',
    REGISTER: 'user/register',
    PROFILEUPDATA: 'user/profile/update',
    GETPROFILE: 'user/profile/get',
    // transfer
    TRANSFSAVE: 'transfer/user/update',
    TRANSFFETCH: 'transfer/record/fetch'
  }
}

module.exports = {
  Config
}
