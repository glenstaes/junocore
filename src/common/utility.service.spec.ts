/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { UtilityService } from './utility.service';

describe('UtilityService', () => {
    let u: UtilityService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [UtilityService]
        });
        u = TestBed.get(UtilityService);
    });

    describe("isDefined function", () => {
        it("should return true if the value is defined", () => {
            let definedValues = [[], 2, "string", {}];
            definedValues.forEach(element => {
                expect(u.isDefined(element)).toBeTruthy();
            });
        });

        it("should return false if the value is undefined", () => {
            expect(u.isDefined(undefined)).toBeFalsy();

            let variable;
            expect(u.isDefined(variable)).toBeFalsy();
        });
    });

    describe("isUndefined function", () => {
        it("should return false if the value is defined", () => {
            let definedValues = [[], 2, "string", {}];
            definedValues.forEach(element => {
                expect(u.isUndefined(element)).toBeFalsy();
            });
        });

        it("should return true if the value is undefined", () => {
            expect(u.isUndefined(undefined)).toBeTruthy();

            let variable;
            expect(u.isUndefined(variable)).toBeTruthy();
        });
    });
});
