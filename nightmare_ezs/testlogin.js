
const Nightmare = require('nightmare')
const assert = require('assert')

describe('Login Page', function () {
    this.timeout('30s')
  
    let nightmare = null
    beforeEach(() => {
      // show true lets you see wth is actually happening :)
      nightmare = new Nightmare({ show: true })
    })
  
    describe('given bad data', () => {
      it('should fail', done => {
        nightmare
        .goto('http://10.26.2.33:6661/Login')
        .on('page', (type, message) => {
          if (type == 'alert') done()
        })
        .type('UsernameInput', 'skidrow2')
        .type('PassowrdInput', 'SkidRow')
        .click('SubmitButton')
        .wait(2000)
        .end()
        .then()
        .catch(done)
      })
    })
  })