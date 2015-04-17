
/*global describe, beforeEach, afterEach, it, inject, expect, module, dump, $*/
describe('uiTimepicker', function() {
    'use strict';
    beforeEach(module('ui.timepicker'));
    describe('simple use on span element', function() {
        it('should not work without ngModel', function() {
            inject(function($compile, $rootScope) {
                expect(function() { $compile("<span ui-timepicker/>")($rootScope); }).toThrow();
            });
        });

        it('should be able to get the date from the model', function() {
            inject(function($compile, $rootScope) {
                var element, aDate;
                aDate = new Date(2010, 12, 1, 14, 15);
                element = $compile("<span ui-timepicker ng-model='x'/>")($rootScope);
                $rootScope.$apply(function() {
                    $rootScope.x = aDate;
                });
                expect(element.timepicker('getTime', aDate)).toEqual(aDate);
            });
        });

        it('should put the date in the model', function() {
            inject(function($compile, $rootScope) {
                var element, aDate;
                aDate = new Date(2010, 12, 1, 14, 15);
                element = $compile("<span ui-timepicker ng-model='x'/>")($rootScope);
                $rootScope.$apply(function() {
                    $rootScope.x = aDate;
                });
                element.timepicker('setTime', aDate);
                expect($rootScope.x.hour).toEqual(aDate.hour);
                expect($rootScope.x.minute).toEqual(aDate.minute);
            });
        });

    });

    describe('simple use on input element', function() {
        it('should not work without ngModel', function() {
            inject(function($compile, $rootScope) {
                expect(function() { $compile("<input ui-timepicker/>")($rootScope); }).toThrow();
            });
        });

        it('should be able to get the date from the model', function() {
            inject(function($compile, $rootScope) {
                var element, aDate;
                aDate = new Date(2010, 12, 1, 14, 15);
                element = $compile("<input ui-timepicker ng-model='x'/>")($rootScope);
                $rootScope.$apply(function() {
                    $rootScope.x = aDate;
                });
                expect(element.timepicker('getTime', aDate)).toEqual(aDate);
            });
        });

        it('should put the date in the model', function() {
            inject(function($compile, $rootScope) {
                var element, aDate;
                aDate = new Date(2010, 12, 1, 14, 15);
                element = $compile("<input ui-timepicker ng-model='x'/>")($rootScope);
                $rootScope.$apply(function() {
                    $rootScope.x = aDate;
                });
                element.timepicker('setTime', aDate);
                expect($rootScope.x.hour).toEqual(aDate.hour);
                expect($rootScope.x.minute).toEqual(aDate.minute);
            });
        });

        it('should mark model valid for valid user input', function() {
            inject(function($compile, $rootScope) {
                var element, aDate;
                aDate = new Date(2010, 12, 1, 14, 15);
                element = $compile("<input ui-timepicker ng-model='x'/>")($rootScope);
                $rootScope.$apply(function() {
                    $rootScope.x = aDate;
                });

                element.val('05:30').trigger('input');
                expect(element.hasClass('ng-invalid-time')).toBe(false);
            });
        });

        it('should mark model invalid for invalid user input', function() {
            inject(function($compile, $rootScope) {
                var element, aDate;
                aDate = new Date(2010, 12, 1, 14, 15);
                element = $compile("<input ui-timepicker ng-model='x'/>")($rootScope);
                $rootScope.$apply(function() {
                    $rootScope.x = aDate;
                });

                element.val('abcd').trigger('input');
                expect(element.hasClass('ng-invalid-time')).toBe(true);
            });
        });

    });

    describe('when ngModel is a moment', function() {
        beforeEach(function () {
            angular.module('ui.timepicker').value('uiTimepickerConfig', {
                step: 5,
                asMoment: true
            });
        });

        it('should be able to get the date from the model', function() {
            inject(function($compile, $rootScope) {
                var element, aMoment;
                aMoment = moment("2010-12-01 07:14:00");
                element = $compile("<input ui-timepicker ng-model='x'/>")($rootScope);
                $rootScope.$apply(function() {
                    $rootScope.x = aMoment;
                });
                expect(element.timepicker('getTime', aMoment)).toEqual(aMoment.toDate());
                $rootScope.$apply(function() {
                   expect(moment.isMoment($rootScope.x)).toBeTruthy();
                });
            });
        });
    });

    describe('using custom options', function() {
        it('should work with custom options', function() {
            inject(function($compile, $rootScope) {
                var element, aDate, opts;
                aDate = new Date(2010, 12, 1, 14, 15);
                opts = {
                    timeFormat: 'H:i',
                };
                $rootScope.$apply(function() {
                    $rootScope.opts = opts;
                });
                element = $compile("<input ui-timepicker='opts' ng-model='x'/>")($rootScope);
                $rootScope.$apply(function() {
                    $rootScope.x = aDate;
                });
                expect(element.val()).toEqual('14:15');
            });
        });
    });
});
