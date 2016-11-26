'use strict';

describe('ygAdmin.directives.editForm module', function() {
  var $q, deferred, $state, $httpBackend, $compile, $rootScope, apiService;

  beforeEach(module('ygAdmin.directives.editForm'));
  beforeEach(module('templates'));
  beforeEach(module(function($provide) {
    $state = jasmine.createSpyObj('$state', ['href']);
    $provide.value('$state', $state);
    apiService = jasmine.createSpyObj('apiService', ['getAll']);
    $provide.value('apiService', apiService);
  }));

  beforeEach(inject(function(_$q_, $injector, _$compile_, _$rootScope_) {
    $q = _$q_;
    deferred = $q.defer();
    $compile = _$compile_;
    $rootScope = _$rootScope_;
    $httpBackend = $injector.get('$httpBackend');
    $httpBackend.whenGET('components/edit-form/edit-form.html').respond(200, '');
  }));

  beforeEach(function() {
    deferred.resolve({
      data: [{
        id: 1,
        name: 'Bob'
      }, {
        id: 2,
        name: 'Max'
      }]
    });
    apiService.getAll.and.returnValue(deferred.promise);
  });

  describe('the ygEditForm directive', function() {
    it('should render the form shell with a delete, cancel and save button', function() {
      var form = $compile(
        '<yg-edit-form></yg-edit-form>'
      )($rootScope);

      $rootScope.$digest();
      var deleteButton = form.find('form').find('button');
      var saveButton = deleteButton.next();
      var cancelButton = saveButton.next();
      expect(deleteButton.html()).toEqual('Delete');
      expect(saveButton.html()).toEqual('Save');
      expect(cancelButton.html()).toEqual('Cancel');
    });

    it('should render the "title" attribute on the form', function() {
      var form = $compile(
        '<yg-edit-form title="Foobar"></yg-edit-form>'
      )($rootScope);

      $rootScope.$digest();
      expect(form.find('h2').html()).toContain('Foobar');
    });

    it('should render the word "New" in the title of the form if new', function() {
      $rootScope.isNew = true;
      var form = $compile(
        '<yg-edit-form title="Foobar"></yg-edit-form>'
      )($rootScope);

      $rootScope.$digest();
      expect(form.find('h2').html()).toContain('New');
    });

    it('should render the word "Edit" in the title of the form if not new', function() {
      $rootScope.isNew = false;
      var form = $compile(
        '<yg-edit-form title="Foobar"></yg-edit-form>'
      )($rootScope);

      $rootScope.$digest();
      expect(form.find('h2').html()).toContain('Edit');
    });

    it('should not render the delete button if the edit form is for a new item', function() {
      $rootScope.isNew = true;
      var form = $compile(
        '<yg-edit-form></yg-edit-form>'
      )($rootScope);

      $rootScope.$digest();
      var notDeleteButton = form.find('form').find('button');
      expect(notDeleteButton.html()).not.toEqual('Delete')
    });

    it('should transclude any child elements', function() {
      var form = $compile(
        '<yg-edit-form><span>Foo</span></yg-edit-form>'
      )($rootScope);

      $rootScope.$digest();
      var span = form.find('span');
      expect(span.html()).toEqual('Foo');
    });

    it('should call deleteItem() on the scope if delete button is clicked', function() {
      var deleteSpy = jasmine.createSpy('deleteItem');
      $rootScope.deleteItem = deleteSpy;
      var form = $compile(
        '<yg-edit-form></yg-edit-form>'
      )($rootScope);

      $rootScope.$digest();
      var deleteButton = form.find('button');
      deleteButton.triggerHandler('click');
      expect(deleteSpy).toHaveBeenCalled();
    });

    it('should call saveItem() on the scope if save button is clicked', function() {
      var saveSpy = jasmine.createSpy('saveItem');
      $rootScope.saveItem = saveSpy;
      var form = $compile(
        '<yg-edit-form></yg-edit-form>'
      )($rootScope);

      $rootScope.$digest();
      var saveButton = form.find('button').next();
      saveButton.triggerHandler('click');
      expect(saveSpy).toHaveBeenCalled();
    });

    it('should call cancel() on the scope if cancel button is clicked', function() {
      var cancelSpy = jasmine.createSpy('cancel');
      $rootScope.cancel = cancelSpy;
      var form = $compile(
        '<yg-edit-form></yg-edit-form>'
      )($rootScope);

      $rootScope.$digest();
      var cancelButton = form.find('button').next().next();
      cancelButton.triggerHandler('click');
      expect(cancelSpy).toHaveBeenCalled();
    });
  });

  describe('the ygTextInput directive', function() {
    it('Renders with the specified label and has the ng-model value', function() {
      $rootScope.foo = {
        name: 'Bob'
      };
      var input = $compile(
        '<yg-text-input label="Foo" ng-model="foo.name"></yg-text-input>'
      )($rootScope);

      $rootScope.$digest();
      expect(input.find('label').text()).toEqual('Foo');
      expect(input.find('input').val()).toEqual('Bob');
    });

    it('has a name and id property that is the same as the item object property', function() {
      var input = $compile(
        '<yg-text-input label="Foo" ng-model="foo.name"></yg-text-input>'
      )($rootScope);

      $rootScope.$digest();
      expect(input.find('label').attr('for')).toEqual('name');
      expect(input.find('input').attr('id')).toEqual('name');
      expect(input.find('input').attr('name')).toEqual('name');
    });

    it('does not show the label if there is no label attribute', function() {
      var input = $compile(
        '<yg-text-input ng-model="foo.name"></yg-text-input>'
      )($rootScope);

      $rootScope.$digest();
      expect(input.find('label')).toEqual({});
    });

    it('throws and error if ng-model is not provided', function() {
      expect(function() {
        var input = $compile(
          '<yg-text-input></yg-text-input>'
        )($rootScope);
      }).toThrow();
    });
  });

  describe('the ygRichTextBox directive', function() {
    it('Renders with the specified label and has the ng-model value', function() {
      $rootScope.foo = {
        name: 'Bob'
      };
      var input = $compile(
        '<yg-rich-text-box label="Foo" ng-model="foo.name"></yg-rich-text-box>'
      )($rootScope);

      $rootScope.$digest();
      expect(input.find('label').text()).toEqual('Foo');
      expect(input.html()).toContain('Bob');
    });

    it('has a name and id property that is the same as the item object property', function() {
      var input = $compile(
        '<yg-rich-text-box label="Foo" ng-model="foo.name"></yg-rich-text-box>'
      )($rootScope);

      $rootScope.$digest();
      expect(input.find('label').attr('for')).toEqual('name');
      expect(input.html()).toContain('id="name"');
      expect(input.html()).toContain('name="name"');
    });

    it('does not show the label if there is no label attribute', function() {
      var input = $compile(
        '<yg-rich-text-box ng-model="foo.name"></yg-rich-text-box>'
      )($rootScope);

      $rootScope.$digest();
      expect(input.find('label')).toEqual({});
    });

    it('throws and error if ng-model is not provided', function() {
      expect(function() {
        var input = $compile(
          '<yg-rich-text-box></yg-rich-text-box>'
        )($rootScope);
      }).toThrow();
    });
  });

  describe('the ygDropDown directive', function() {
    it('renders with the specified label.', function() {
      $rootScope.foo = {
        name: 'Bob'
      };
      var input = $compile(
        '<yg-drop-down label="Foo" ng-model="foo.id" option-resource="foos"' +
        'option-value="id" option-text="name"></yg-drop-down>'
      )($rootScope);

      $rootScope.$digest();
      expect(input.find('label').text()).toEqual('Foo');
    });

    it('contains options from api call mapped to optionValue and optionText values', function() {
      $rootScope.foo = {
        id: 1
      };
      var input = $compile(
        '<yg-drop-down label="Foo" ng-model="foo.id" option-resource="foos"' +
        'option-value="id" option-text="name"></yg-drop-down>'
      )($rootScope);

      $rootScope.$digest();
      var option1 = input.find('option');
      var option2 = option1.next();

      // See beforeEach at top of file for options api call response
      expect(option1.html()).toEqual('Bob');
      expect(option2.html()).toEqual('Max');
      expect(option1.attr('value')).toContain(1);
      expect(option2.attr('value')).toContain(2);
    });

    it('selects the option equaling the ngModel value', function() {
      $rootScope.foo = {
        id: 1
      };
      var input = $compile(
        '<yg-drop-down label="Foo" ng-model="foo.id" option-resource="foos"' +
        'option-value="id" option-text="name"></yg-drop-down>'
      )($rootScope);

      $rootScope.$digest();
      var option1 = input.find('option');
      var option2 = option1.next();

      // See beforeEach at top of file for options api call response
      expect(option1.attr('selected')).toEqual('selected');
      expect(option2.attr('selected')).toBe(undefined);
    });

    it('has a name and id property that is the same as the item object property', function() {
      var input = $compile(
        '<yg-drop-down label="Foo" ng-model="foo.id" option-resource="foos"' +
        'option-value="id" option-text="name"></yg-drop-down>'
      )($rootScope);

      $rootScope.$digest();
      expect(input.find('label').attr('for')).toEqual('id');
      expect(input.find('select').attr('id')).toEqual('id');
      expect(input.find('select').attr('name')).toEqual('id');
    });

    it('does not show the label if there is no label attribute', function() {
      var input = $compile(
        '<yg-drop-down ng-model="foo.id" option-resource="foos"' +
        'option-value="id" option-text="name"></yg-drop-down>'
      )($rootScope);

      $rootScope.$digest();
      expect(input.find('label')).toEqual({});
    });

    it('throws an error if ng-model is not provided', function() {
      expect(function() {
        $compile(
          '<yg-drop-down option-resource="foos"' +
          'option-value="id" option-text="name"></yg-drop-down>'
        )($rootScope);
      }).toThrow();
    });

    it('throws an error if option-value is not provided', function() {
      expect(function() {
        $compile(
          '<yg-drop-down ng-model="foo.id" option-resource="foos"' +
          'option-text="name"></yg-drop-down>'
        )($rootScope);
      }).toThrowError('ygDropDown directive requires optionValue attribute');
    });

    it('throws an error if option-value is not provided', function() {
      expect(function() {
        $compile(
          '<yg-drop-down ng-model="foo.id" option-resource="foos"' +
          'option-value="id"></yg-drop-down>'
        )($rootScope);
      }).toThrowError('ygDropDown directive requires optionText attribute');
    });

    it('throws an error if option-resource is not provided', function() {
      expect(function() {
        $compile(
          '<yg-drop-down ng-model="foo.id" option-text="name"' +
          'option-value="id"></yg-drop-down>'
        )($rootScope);
      }).toThrowError('ygDropDown directive requires optionResource attribute');
    });
  });
  
  describe('the ygMultiDropDown directive', function() {
    it('renders with the specified label.', function() {
      $rootScope.foo = {
        name: 'Bob'
      };
      var input = $compile(
        '<yg-multi-drop-down label="Foo" ng-model="foo.id" option-resource="foos"' +
        'option-value="id" option-text="name"></yg-multi-drop-down>'
      )($rootScope);

      $rootScope.$digest();
      expect(input.find('label').text()).toEqual('Foo');
    });

    it('contains options from api call mapped to optionValue and optionText values', function() {
      $rootScope.foo = {
        id: [1, 2]
      };
      var input = $compile(
        '<yg-multi-drop-down label="Foo" ng-model="foo.id" option-resource="foos"' +
        'option-value="id" option-text="name"></yg-multi-drop-down>'
      )($rootScope);

      $rootScope.$digest();
      var option1 = input.find('option');
      var option2 = option1.next();

      // See beforeEach at top of file for options api call response
      expect(option1.html()).toEqual('Bob');
      expect(option2.html()).toEqual('Max');
      expect(option1.attr('value')).toContain(1);
      expect(option2.attr('value')).toContain(2);
    });

    it('selects the option equaling the ngModel value', function() {
      $rootScope.foo = {
        id: [1, 2]
      };
      var input = $compile(
        '<yg-multi-drop-down label="Foo" ng-model="foo.id" option-resource="foos"' +
        'option-value="id" option-text="name"></yg-multi-drop-down>'
      )($rootScope);

      $rootScope.$digest();
      var option1 = input.find('option');
      var option2 = option1.next();

      // See beforeEach at top of file for options api call response
      expect(option1.attr('selected')).toEqual('selected');
      expect(option2.attr('selected')).toBe('selected');
    });

    it('has a name and id property that is the same as the item object property', function() {
      var input = $compile(
        '<yg-multi-drop-down label="Foo" ng-model="foo.id" option-resource="foos"' +
        'option-value="id" option-text="name"></yg-multi-drop-down>'
      )($rootScope);

      $rootScope.$digest();
      expect(input.find('label').attr('for')).toEqual('id');
      expect(input.find('select').attr('id')).toEqual('id');
      expect(input.find('select').attr('name')).toEqual('id');
    });

    it('does not show the label if there is no label attribute', function() {
      var input = $compile(
        '<yg-multi-drop-down ng-model="foo.id" option-resource="foos"' +
        'option-value="id" option-text="name"></yg-multi-drop-down>'
      )($rootScope);

      $rootScope.$digest();
      expect(input.find('label')).toEqual({});
    });

    it('throws an error if ng-model is not provided', function() {
      expect(function() {
        $compile(
          '<yg-multi-drop-down option-resource="foos"' +
          'option-value="id" option-text="name"></yg-multi-drop-down>'
        )($rootScope);
      }).toThrow();
    });

    it('throws an error if option-value is not provided', function() {
      expect(function() {
        $compile(
          '<yg-multi-drop-down ng-model="foo.id" option-resource="foos"' +
          'option-text="name"></yg-multi-drop-down>'
        )($rootScope);
      }).toThrowError('ygMultiDropDown directive requires optionValue attribute');
    });

    it('throws an error if option-value is not provided', function() {
      expect(function() {
        $compile(
          '<yg-multi-drop-down ng-model="foo.id" option-resource="foos"' +
          'option-value="id"></yg-multi-drop-down>'
        )($rootScope);
      }).toThrowError('ygMultiDropDown directive requires optionText attribute');
    });

    it('throws an error if option-resource is not provided', function() {
      expect(function() {
        $compile(
          '<yg-multi-drop-down ng-model="foo.id" option-text="name"' +
          'option-value="id"></yg-multi-drop-down>'
        )($rootScope);
      }).toThrowError('ygMultiDropDown directive requires optionResource attribute');
    });
  });
});

