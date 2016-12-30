import { Injectable } from '@angular/core';

@Injectable()
export class UtilityService {

    constructor() { }

    /**
     * @function isDefined
     * @description Checks whether the value is defined.
     * @param {any} value - The value to check.
     * @return {boolean} True if the value is defined, false if it is not defined.
     */
    isDefined(value) {
        return typeof (value) !== "undefined";
    }

    /**
     * @function isUndefined
     * @description Checks whether the value is undefined.
     * @param {any} value - The value to check.
     * @return {boolean} True if the value is undefined, false if it is defined.
     */
    isUndefined(value) {
        return !this.isDefined(value);
    }
}