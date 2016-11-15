'use strict';

describe('ygAdmin.directives.listTable module', function() {
  var $state, $httpBackend, $compile, $rootScope;

  beforeEach(module('ygAdmin.directives.listTable'));
  beforeEach(module('templates'));
  beforeEach(module(function($provide) {
    $state = jasmine.createSpyObj('$state', ['href']);
    $provide.value('$state', $state);
  }));

  beforeEach(inject(function($injector, _$compile_, _$rootScope_) {
    $compile = _$compile_;
    $rootScope = _$rootScope_;
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

    it('should...', function() {
      $rootScope.items = [{
        id: 1,
        name: 'Foo'
      }, {
        id: 2,
        name: 'Bar'
      }];

      $state.href.and.callFake(function(view, params) {
        return '#' + view + '/' + params.id + '/';
      });

      var table = $compile(
        '<yg-list-table resource="items" columns="[\'Foods\']">' +
        '<yg-link-cell key="name" sref-view="items-edit" sref-param="id" sref-value="id"></yg-link-cell>' +
        '</yg-list-table>'
      )($rootScope);

      $rootScope.$digest();

      var tbody = table.find('tbody');
      var firstRowLink = tbody.find('tr').find('a');
      var secondRowLink = tbody.find('tr').next().find('a');
      expect(firstRowLink.html()).toEqual('Foo');
      expect(firstRowLink.attr('href')).toEqual('#items-edit/1/');
      expect(secondRowLink.html()).toEqual('Bar');
      expect(secondRowLink.attr('href')).toEqual('#items-edit/2/');
    });
  });
});

