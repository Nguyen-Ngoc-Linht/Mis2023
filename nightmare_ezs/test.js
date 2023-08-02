// https://github.com/segmentio/nightmare#readme
// https://www.scaledrone.com/blog/automated-ui-testing-with-nightmare/
// https://stackoverflow.com/questions/40292143/nightmarejs-multiple-evaluations


const Nightmare = require('nightmare')
const assert = require('assert')

describe('Login Page', function () {
    this.timeout('30s')
  
    let nightmare = null
    beforeEach(() => {
      // show true lets you see wth is actually happening :)
      nightmare = new Nightmare({ show: true })
    })
  
    describe('auto login', () => {
      it('should success', done => {
        nightmare
        .goto('http://10.26.2.33:6661/Login')
        .on('page', (type, message) => {
          if (type == 'alert') done()
        })
        .wait(2000)
        .type('#UsernameInput', 'skidrow2')
        .wait(2000)
        .type('#PasswordInput', 'SkidRow')        
        .wait(2000)
        .click('#SubmitButton')
        .wait(2000)
        .evaluate(function () {
            return document.querySelector('#ddResultCode').innerHTML;
        })        
        .then(function(resultCode) {
            console.log("Code" , resultCode);            
            assert.ok(resultCode,'0') ;            
            nightmare.evaluate(function () {
                return document.querySelector('#ddResultMsg').innerHTML
            })
            .end()
            .then(function(resultMsg) {
                console.log("Msg" , resultMsg);            
                assert.ok(resultMsg,'Login thành công') ;                            
                done();
            })
        })
        .catch(function(error) {
            done(new Error(error))
        })        
      })
    })
  })