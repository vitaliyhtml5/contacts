const validateData = () => {
    return  {
        invalidEmail: ['testtest.com', 'te st@test.com', 'test@test'],
        notRegisteredEmail: 'notregistered-email@test.com',
        incorrectPwd: 'IncorrectPwd@123',
        lengthText31: 'Lorem ipsum dolor sit amet, con',
        lengthEmail31: 'loremipsum@dolorsitametcons.com'
      }
};

module.exports = validateData;