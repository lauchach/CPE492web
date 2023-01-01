const Config = {
  APIURL: 'http://localhost:3000/',
  PART: {
    // auth && user
    LOGIN: 'user/login',
    REGISTER: 'user/register',
    PROFILEUPDATA: 'user/profile/update',
    GETPROFILE: 'user/profile/get',
    // transfer
    TRANSFERSAVE: 'transfer/user/update',
    TRANSFERFETCH: 'transfer/record/fetch',
    TRANSFERRECORDLIST: 'transfer/record/list',
    TRANSFERSUBJECT: 'transfer/subject',
    TRANSFERRSUSAVE: 'transfer/subject/save',
    TRANSFERSUBJECTAPPROVE: 'transfer/subject/approve',
    TRANSFERSUBJECTUNAPPROVE: 'transfer/subject/unApprove',
    // subjectlist
    SUBJECTLIST: 'transfer/subject/list',
    SUBJECTRSULIST: 'transfer/subject/rsu/list'
  }
}

module.exports = {
  Config
}
