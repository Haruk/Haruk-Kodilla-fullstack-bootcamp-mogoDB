const Employee = require('../employee.model');
const expect = require('chai').expect;
const mongoose = require('mongoose');

describe('Employee', () => {
  it('should throw an error if any of the arguments is missing', () => {
    const cases = [
      { firstName: 'John', lastName: 'Doe' },
      { firstName: 'John', department: 'IT' },
      { lastName: 'Doe', department: 'IT' },
    ];

    for (let item of cases) {
      const emp = new Employee(item);

      emp.validate((err) => {
        expect(
          err.errors.firstName || err.errors.lastName || err.errors.department
        ).to.exist;
      });
    }
  });

  it('should throw an error if any of the arguments is not a string', () => {
    const cases = [
      { firstName: [], lastName: 'Doe', department: 'IT' },
      { firstName: 'John', lastName: [], department: 'IT' },
      { firstName: 'John', lastName: 'Doe', department: [] },
      { firstName: {}, lastName: 'Doe', department: 'IT' },
      { firstName: 'John', lastName: {}, department: 'IT' },
      { firstName: 'John', lastName: 'Doe', department: {} },
    ];

    for (let item of cases) {
      const emp = new Employee(item);

      emp.validate((err) => {
        expect(
          err.errors.firstName || err.errors.lastName || err.errors.department
        ).to.exist;
      });
    }
  });

  it('should not throw an error if all the arguments are written properly', () => {
    const cases = [
      { firstName: 'John', lastName: 'Doe', department: 'IT' },
      { firstName: 'John', lastName: 'Doe', department: 'Marketing' },
    ];

    for (let item of cases) {
      const emp = new Employee(item);

      emp.validate((err) => {
        expect(err).to.not.exist;
      });
    }
  });
});

after(() => {
  mongoose.models = {};
});