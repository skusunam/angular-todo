'use strict';

describe('Service: UserServiceConst', function () {

  // load the service's module
  beforeEach(module('angularTodoApp'));

  // instantiate service
  var UserServiceConst;
  beforeEach(inject(function (_UserServiceConst_) {
    UserServiceConst = _UserServiceConst_;
  }));

  it('should do something', function () {
    expect(!!UserServiceConst).toBe(true);
  });

});
