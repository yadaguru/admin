'use strict';

describe('ygAdmin.directives.listTable module', function() {
  var $state, $httpBackend, $compile, $rootScope, $sce;

  beforeEach(module('ygAdmin.directives.listTable'));
  beforeEach(module('templates'));
  beforeEach(module(function($provide) {
    $state = jasmine.createSpyObj('$state', ['href', 'go']);
    $provide.value('$state', $state);
  }));

  beforeEach(inject(function($injector, _$compile_, _$rootScope_, _$sce_) {
    $compile = _$compile_;
    $rootScope = _$rootScope_;
    $sce = _$sce_;
    $httpBackend = $injector.get('$httpBackend');
    $httpBackend.whenGET('components/list-table/list-table.html').respond(200, '');
  }));

  describe('the ygListTable directive', function() {
    it('should render column headings at the top of the table', function() {
      var table = $compile(
        '<yg-list-table resource="foo" columns="[\'bar\', \'bazz\']"></yg-list-table>'
      )($rootScope);

      $rootScope.$digest();
      expect(table.find('th').html()).toEqual('bar');
      expect(table.find('th').next().html()).toEqual('bazz');
    });

    it('should render the "items" attribute at the top of the table', function() {
      var table = $compile(
        '<yg-list-table items="foos"></yg-list-table>'
      )($rootScope);

      $rootScope.$digest();
      expect(table.find('h2').text()).toEqual('foos');
    });

    it('should render a new button using the text of the "item" attribute', function() {
      var table = $compile(
        '<yg-list-table item="foo"></yg-list-table>'
      )($rootScope);

      $rootScope.$digest();
      expect(table.find('button').text()).toEqual('New foo');
    });

    it('should go to the item edit (new) view when the new item button is clicked', function() {
      var table = $compile(
        '<yg-list-table edit-view="foosEdit"></yg-list-table>'
      )($rootScope);

      $rootScope.$digest();
      table.find('button').triggerHandler('click');
      expect($state.go).toHaveBeenCalledWith('foosEdit');
    });

    it('should go to teh item edit view for a particular item when the row is clicked', function() {
      $rootScope.items = [{
        id: 1,
        name: 'Foo'
      }, {
        id: 2,
        name: 'Bar'
      }];

      var table = $compile(
        '<yg-list-table resource="items" columns="[\'name\']" edit-view="foosEdit">' +
        '<yg-text-cell key="name"></yg-text-cell>' +
        '</yg-list-table>'
      )($rootScope);

      $rootScope.$digest();

      var tbody = table.find('tbody');
      var rows = tbody.find('tr');

      rows.triggerHandler('click');
      expect($state.go).toHaveBeenCalledWith('foosEdit', {id: 1});
      expect($state.go).toHaveBeenCalledWith('foosEdit', {id: 2});
    });

    it('should allow a custom edit view parameter to be declared on the directive', function() {
      $rootScope.items = [{
        id: 1,
        name: 'Foo'
      }, {
        id: 2,
        name: 'Bar'
      }];

      var table = $compile(
        '<yg-list-table resource="items" columns="[\'name\']" edit-view="foosEdit" edit-view-param="name">' +
        '<yg-text-cell key="name"></yg-text-cell>' +
        '</yg-list-table>'
      )($rootScope);

      $rootScope.$digest();

      var tbody = table.find('tbody');
      var rows = tbody.find('tr');

      rows.triggerHandler('click');
      expect($state.go).toHaveBeenCalledWith('foosEdit', {name: 'Foo'});
      expect($state.go).toHaveBeenCalledWith('foosEdit', {name: 'Bar'});
    });

    it('should render nested text-cells for each resource', function() {
      $rootScope.items = [{
        name: 'Foo',
        value: 1
      }, {
        name: 'Bar',
        value: 2
      }];

      var table = $compile(
        '<yg-list-table resource="items" columns="[\'name\']">' +
          '<yg-text-cell key="name"></yg-text-cell>' +
          '<yg-text-cell key="value"></yg-text-cell>' +
          '</yg-list-table>'
      )($rootScope);

      $rootScope.$digest();

      var tbody = table.find('tbody');
      var firstRow = tbody.find('tr');
      var secondRow = firstRow.next();

      expect(firstRow.find('td').html()).toEqual('Foo');
      expect(firstRow.find('td').next().html()).toEqual('1');
      expect(secondRow.find('td').html()).toEqual('Bar');
      expect(secondRow.find('td').next().html()).toEqual('2');
    });

    it('should not escape HTML on a yg-rich-text-cell element', function() {
      $rootScope.items = [{
        plain: $sce.trustAsHtml('<b>Foo</b>'),
        rich: $sce.trustAsHtml('<b>Bar</b>')
      }];

      var table = $compile(
        '<yg-list-table resource="items" columns="[\'name\']">' +
        '<yg-text-cell key="plain"></yg-text-cell>' +
        '<yg-rich-text-cell key="rich"></yg-rich-text-cell>' +
        '</yg-list-table>'
      )($rootScope);

      $rootScope.$digest();

      var tbody = table.find('tbody');
      var firstRow = tbody.find('tr');

      expect(firstRow.find('td').html()).toEqual('&lt;b&gt;Foo&lt;/b&gt;');
      expect(firstRow.find('td').next().html()).toEqual('<b>Bar</b>');
    });

    it('should have separate divs for each value in an array-cell directive', function() {
      $rootScope.items = [{
        foods: ['pizza', 'taco']
      }, {
        foods: ['cake', 'pie']
      }];


      var table = $compile(
        '<yg-list-table resource="items" columns="[\'Foods\']">' +
        '<yg-array-cell key="foods"></yg-array-cell>' +
        '</yg-list-table>'
      )($rootScope);

      $rootScope.$digest();

      var tbody = table.find('tbody');
      var firstRowCell = tbody.find('tr').find('td');
      var secondRowCell = tbody.find('tr').next().find('td');

      expect(firstRowCell.find('div').html()).toEqual('pizza');
      expect(firstRowCell.find('div').next().html()).toEqual('taco');
      expect(secondRowCell.find('div').html()).toEqual('cake');
      expect(secondRowCell.find('div').next().html()).toEqual('pie');
    });

    it('should render formatted date when using a date-cell directive', function() {
      $rootScope.items = [{
        registrationDate: '2017-02-01',
        adminDate: '2017-02-15'
      }, {
        registrationDate: '2017-03-01',
        adminDate: '2017-03-15'
      }];

      var table = $compile(
        '<yg-list-table resource="items" columns="[\'Registration Date\', \'Admin Date\']">' +
        '<yg-date-cell key="registrationDate"></yg-date-cell>' +
        '<yg-date-cell key="adminDate" format="YYYY/MM/DD"></yg-date-cell>' +
        '</yg-list-table>'
      )($rootScope);

      $rootScope.$digest();

      var tbody = table.find('tbody');
      var firstRow = tbody.find('tr');
      var secondRow = tbody.find('tr').next();
      expect(firstRow.find('td').html()).toEqual('2/1/2017');
      expect(firstRow.find('td').next().html()).toEqual('2017/02/15');
      expect(secondRow.find('td').html()).toEqual('3/1/2017');
      expect(secondRow.find('td').next().html()).toEqual('2017/03/15');
    });
  });
});

