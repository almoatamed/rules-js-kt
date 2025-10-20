// oxlint-disable no-useless-escape
// oxlint-disable no-control-regex

export type Input = {
    validationErrorMessage: null | string;
    currentValue: any;
    rules: RulesList;
    onReset: (mountedReset: boolean) => void;
};

export type InputsMap = {
    [id: string]: Input;
};

let t: Function = (phrase: string) => {
    return phrase;
};
export const setTranslationFunction = (providedT: Function) => {
    t = providedT;
};

const capitalize = (inputString: string) => {
    if (!inputString) {
        return inputString;
    }
    try {
        let string = inputString.replaceAll(/\b([a-zA-Z]+)\b/g, (word) => {
            return word[0]?.toUpperCase() + word.toLocaleLowerCase().slice(1);
        });
        return string;
    } catch (error) {
        console.error(error);

        return inputString;
    }
};

const isEmpty = (value: any) => {
    return value === "" || value === null || value === undefined;
};

export const rules = {
    ipAndHostname(field: string) {
        field = capitalize(field);
        return (value: any) => {
            if (isEmpty(value)) {
                return true;
            }
            const msg = `${field} is not valid a hostname address`;
            try {
                const regex =
                    /^\blocalhost|(((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)|([a-zA-Z0-9]([a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(\.[a-zA-Z]{2,}){1,}))\b$/i;
                if (typeof value != "string") {
                    return msg;
                }
                if (!value.match(regex)) {
                    return msg;
                }
                return true;
            } catch {
                return msg;
            }
        };
    },
    inValues: (field: string, source_list: Array<any>) => {
        field = capitalize(field);
        return function inValues(value: any) {
            if (value === null || value === undefined || value === "") {
                return true;
            }
            return !!source_list?.includes(value) || `${t?.(field)} ${t?.("must be one of required values")}`;
        };
    },
    notInValues: (field: string, source_list: Array<any>) => {
        field = capitalize(field);
        return function inValues(value: any) {
            if (value === null || value === undefined || value === "") {
                return true;
            }
            return !source_list?.includes(value) || `${t?.(field)} ${t?.("must be one of the allowed values")}`;
        };
    },
    boolean(field: string) {
        field = capitalize(field);
        return function boolean(value: any) {
            if (value === true || value === false || value === 0 || value === 1) {
                return true;
            }
            return `${t?.(field)} ${t?.(`must Valid Boolean`)}`;
        };
    },

    required: (field: string) => {
        field = capitalize(field);
        return function required(value: any) {
            const message = `${t?.(field)} ${t?.("is required")}`;
            if (typeof value == "object" && Array.isArray(value)) {
                return !!value.length || message;
            } else {
                const result = !isEmpty(value) || message;
                return result;
            }
        };
    },

    taxNumber: (field: string) => {
        field = capitalize(field);
        return function TaxNumber(value: string) {
            if (isEmpty(value)) {
                return true;
            }

            return (
                !!String(value).match(/^[0-9a-zA-Z]{3,20}$/) ||
                t?.(`invalid tax number, must be between 3 and 20 number or english characters`)
            );
        };
    },

    commercialRegistryNo: (field: string) => {
        field = capitalize(field);
        return function commercialRegistryNo(value: string) {
            if (isEmpty(value)) {
                return true;
            }

            return (
                !!String(value).match(/^[0-9a-zA-Z]{3,20}$/) ||
                t?.(`invalid commercial registry number, must be between 3 and 20 number or english characters`)
            );
        };
    },

    commercialChamberNo: (field: string) => {
        field = capitalize(field);
        return function commercialChamberNo(value: string) {
            if (isEmpty(value)) {
                return true;
            }

            return (
                !!String(value).match(/^[0-9a-zA-Z]{3,20}$/) ||
                t?.(`invalid Commercial Chamber number, must be between 3 and 20 number or english characters`)
            );
        };
    },
    commercialNo: (field: string) => {
        field = capitalize(field);
        return function commercialNo(value: string) {
            if (isEmpty(value)) {
                return true;
            }

            return (
                !!String(value).match(/^[0-9a-zA-Z]{3,20}$/) ||
                t?.(`invalid commercial number, must be between 3 and 20 number or english characters`)
            );
        };
    },
    // ^\d{3}$
    branchNo: (field: string) => {
        field = capitalize(field);
        return function branchNo(value: string) {
            if (isEmpty(value)) {
                return true;
            }

            return !!String(value).match(/^\d{3}$/) || t?.(`invalid branch number, must be 3 numbers`);
        };
    },

    // ^\d{15}$
    accountNo: (field: string) => {
        field = capitalize(field);
        return function accountNo(value: string) {
            if (isEmpty(value)) {
                return true;
            }

            return !!String(value).match(/^\d{15}$/) || t?.(`invalid account number, must be 15 number`);
        };
    },

    //^[0-9A-Z]{3,8}$
    accountClass: (field: string) => {
        field = capitalize(field);
        return function accountClass(value: string) {
            if (isEmpty(value)) {
                return true;
            }

            return (
                !!String(value).match(/^[0-9A-Z]{3,8}$/) ||
                t?.(`invalid account number, must be 3 to 8 numbers and Upper case English characters`)
            );
        };
    },
    iban: (field: string) => {
        field = capitalize(field);
        return function iban(value: string) {
            if (isEmpty(value)) {
                return true;
            }

            return (
                !!String(value).match(/^[A-Z]{2}[0-9]{23}$/) ||
                t?.(`invalid account number, must start with "LY" and 23 number`)
            );
        };
    },
    ibanLibya: (field: string) => {
        field = capitalize(field);
        return function ibanLibya(value: string) {
            if (isEmpty(value)) {
                return true;
            }

            return (
                !!String(value).match(/^LY[0-9]{23}$/) ||
                t?.(`invalid account number, must start with "LY" and 23 number`)
            );
        };
    },

    identificationNumber: (field: string) => {
        field = capitalize(field);
        return function identificationNumber(value: string) {
            if (isEmpty(value)) {
                return true;
            }
            return (
                !!String(value).match(/^[0-9A-Z]{4,12}$/) ||
                t?.("Invalid Identification Number, must be 4 to 12 Numbers and Upper Case English characters")
            );
        };
    },

    residencePermitNumber: (field: string) => {
        field = capitalize(field);
        return function residencePermitNumber(value: string) {
            if (isEmpty(value)) {
                return true;
            }

            return (
                !!String(value).match(/^[0-9A-Z]{3,25}$/) ||
                `this is not valid residence permit number, it should only contain upper case english characters or numbers`
            );
        };
    },

    identificationOnlyNumber: (field: string) => {
        field = capitalize(field);
        return function identificationOnlyNumber(value: string) {
            if (isEmpty(value)) {
                return true;
            }
            return (
                !!String(value).match(/^[0-9]{4,12}$/) || t?.("Invalid Identification Number, must be 4 to 12 Numbers")
            );
        };
    },

    licenseNo: (field: string) => {
        field = capitalize(field);
        return function licenseNo(value: string) {
            if (isEmpty(value)) {
                return true;
            }

            return (
                !!String(value).match(/^[0-9a-zA-Z]{3,20}$/) ||
                t?.(`invalid license number, must be between 3 and 20 number or english characters`)
            );
        };
    },

    nationalIdNumber: (field: string) => {
        field = capitalize(field);
        return function NationalIdNumber(value: string) {
            if (isEmpty(value)) {
                return true;
            }
            return (
                !!String(value).match(/^[12]19[0-9]{9}$/) ||
                t?.(field) + t?.(" is invalid, must only contain characters and be 12 in length")
            );
        };
    },
    description: (field: string, max_length = 1e4, min_length = 0) => {
        field = capitalize(field);
        return function title(value: any) {
            if (isEmpty(value)) {
                return true;
            }

            if (typeof value != "string") {
                return `${field} must be a string`;
            }

            if (value.length > max_length) {
                return `${field} must be less then ${max_length} in length`;
            }
            if (min_length && value.length < min_length) {
                return `${field} must be greater then ${min_length} in length`;
            }

            return true;
        };
    },
    employeeNumber: (field: string) => {
        field = capitalize(field);
        return function employeeNumber(value: any) {
            if (isEmpty(value)) {
                return true;
            }

            return (
                !!String(value).match(/^[0-9]{3,10}$/) ||
                "invalid employee id, must be a number (digits) between 3 to 10 and length"
            );
        };
    },
    title: (field: string, max_length = 250, min_length = 0) => {
        field = capitalize(field);
        return function title(value: any) {
            if (isEmpty(value)) {
                return true;
            }

            if (typeof value != "string") {
                return `${t?.(field)} ${t?.("must be a string")}`;
            }

            if (
                (typeof max_length == "number" && max_length === min_length && value.length < max_length) ||
                value.length > max_length
            ) {
                return `${t?.(field)} ${t?.("must equals")} ${max_length} ${t?.("in length")}`;
            }

            if (value.length > max_length) {
                return `${field} ${t?.("must be less then or equals")} ${max_length} ${t?.("in length")}`;
            }
            if (min_length && value.length < min_length) {
                return `${field} ${t?.("must be greater then or equals")} ${min_length} ${t?.("in length")}`;
            }

            return true;
        };
    },
    hex: (field: string, max_length = 250, min_length = 0) => {
        field = capitalize(field);
        return function hex(value: any) {
            if (isEmpty(value)) {
                return true;
            }
            if (typeof value != "string") {
                return `${field} must be a string`;
            }
            if (value.length > max_length) {
                return `${field} must be less then ${max_length} in length`;
            }
            if (min_length && value.length < min_length) {
                return `${field} must be greater then ${min_length} in length`;
            }
            if (!value.match(/^[A-Fa-f0-9]*$/)) {
                return `${field} must be valid hex containing only '0' to '9' and 'a' to 'f'`;
            }
            return true;
        };
    },
    name: (field: string) => {
        field = capitalize(field);
        return function name(value: any) {
            if (isEmpty(value)) {
                return true;
            }
            try {
                return !!value.trim().match(/^(?:(\p{L}{1,})\s)*?(\p{L}{1,})$/iu) || `${field} is not valid name`;
            } catch {
                return `${field} is not valid name`;
            }
        };
    },
    email: (field: string) => {
        field = capitalize(field);
        return function email(value: any) {
            if (isEmpty(value)) {
                return true;
            }
            try {
                return (
                    !!value
                        .trim()
                        .match(
                            /^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/
                        ) || `${t?.(field)} ${t?.("is not valid email")}`
                );
            } catch {
                return `${t?.(field)} ${t?.("is not valid email")}`;
            }
        };
    },
    senderId: (field: string) => {
        field = capitalize(field);
        return function senderId(value: any) {
            if (isEmpty(value)) {
                return true;
            }
            try {
                return value.trim().match(/^[\p{L}0-9][\p{L} ,-_\/\|0-9]{0,}[\p{L}0-9]$/iu) || `invalid sender id`;
            } catch {
                return `invalid sender id`;
            }
        };
    },
    entityNameEn: (field: string) => {
        field = capitalize(field);
        return function entityNameEn(value: string) {
            if (isEmpty(value)) {
                return true;
            }

            try {
                return (
                    !!value.match(/^[a-zA-Z][a-zA-Z\s]{4,}$/) ||
                    `${t?.("English Entity Name is not valid, is must be only English Characters and spaces")}`
                );
            } catch (error) {
                console.error(error);
                return `${t?.("English Entity Name is not valid, is must be only English Characters and spaces")}`;
            }
        };
    },

    onlyArabic: (field: string) => {
        field = capitalize(field);
        return function onlyArabic(value: string) {
            if (isEmpty(value)) {
                return true;
            }

            const message = `${t?.(`${field} must contain only Arabic Characters and spaces`)}`;
            try {
                return !!value.match(/^[\u0600-\u06ff][\u0600-\u06ff\s]*?$/iu) || message;
            } catch (error) {
                console.error(error);
                return message;
            }
        };
    },

    onlyEnglish: (field: string) => {
        field = capitalize(field);
        return function onlyArabic(value: string) {
            if (isEmpty(value)) {
                return true;
            }

            const message = `${t?.(`${field} must contain only Arabic Characters and spaces`)}`;
            try {
                return !!value.match(/^[a-zA-Z][a-zA-Z\s]*?$/iu) || message;
            } catch (error) {
                console.error(error);
                return message;
            }
        };
    },

    entityNameAr: (field: string) => {
        field = capitalize(field);
        return function entityNameAr(value: string) {
            if (isEmpty(value)) {
                return true;
            }

            const message = `${t?.("Arabic Entity Name is not valid, is must be only Arabic Characters and spaces")}`;
            try {
                return !!value.match(/^[\u0600-\u06ff][\u0600-\u06ff\s]{4,}$/iu) || message;
            } catch (error) {
                console.error(error);
                return message;
            }
        };
    },
    passportNo: (field: string) => {
        field = capitalize(field);
        return function passportNo(value: string | null) {
            if (isEmpty(value)) {
                return true;
            }
            try {
                return (
                    !!value?.trim().match(/^[0-9A-Z]{4,12}$/iu) ||
                    `${t?.(field)} ${t?.("is not valid passport number")}`
                );
            } catch {
                return `${t?.(field)} ${t?.("is not valid passport number")}`;
            }
        };
    },
    identityNumber: (field: string) => {
        field = capitalize(field);
        return function identityNumber(v: string) {
            if (isEmpty(v)) {
                return true;
            }
            try {
                return !!v.trim().match(/^[0-9]{4,12}$/iu) || `${t?.(field)} ${t?.("is not valid identity number")}`;
            } catch {
                return `${t?.(field)} ${t?.("is not valid identity number")}`;
            }
        };
    },
    password: (field: string) => {
        field = capitalize(field);
        return function password(value: any) {
            if (isEmpty(value)) {
                return true;
            }
            try {
                return typeof value == "string" || `${t?.(field)} ${t?.("is not valid password")}`;
            } catch {
                return `${t?.(field)} ${t?.("is not valid password")}`;
            }
        };
    },
    username: (field: string) => {
        field = capitalize(field);
        return function username(value: any) {
            if (isEmpty(value)) {
                return true;
            }
            try {
                return (
                    !!value.trim().match(/^[a-zA-z_][a-zA-z0-9_\-]{3,}$/) ||
                    `${t?.(field)} ${t?.("is not valid username")}`
                );
            } catch {
                return `${t?.(field)} ${t?.("is not valid username")}`;
            }
        };
    },
    fieldName: (field: string) => {
        field = capitalize(field);
        return function fieldName(value: string) {
            if (isEmpty(value)) {
                return true;
            }

            return (
                !!String(value).match(/^[a-zA-Z][a-zA-Z_0-9]*?$/) ||
                t?.(
                    `invalid field name, must start english character and contain english characters, underscore or numbers`
                )
            );
        };
    },

    number: (field: string, inclusiveMax?: number, inclusiveMin?: number) => {
        field = capitalize(field);
        return function number(value: any) {
            if (isEmpty(value)) {
                return true;
            }
            const msg = `${field} is not a valid number`;
            try {
                const number_value = parseFloat(value);
                if (Number.isNaN(number_value)) {
                    return msg;
                }

                if (typeof inclusiveMax === "number" && number_value > inclusiveMax) {
                    return `${field} must be less then ${inclusiveMax}`;
                }

                if (typeof inclusiveMin === "number" && number_value < inclusiveMin) {
                    return `${field} must be greater then ${inclusiveMin}`;
                }
                return true;
            } catch {
                return msg;
            }
        };
    },
    confirmPassword(field: string, password: null | string) {
        return (v: any) => {
            return v === password || `${field} does not match password`;
        };
    },
    phone: (field: string) => {
        field = capitalize(field);
        return function phone(value: any) {
            if (isEmpty(value)) {
                return true;
            }
            try {
                return (
                    !!value.trim().match(/^(?:(?:(?:00|\+)[1-9]{1,3})|0)?([0-9]{1,3}[0-9]{7})$/iu) ||
                    `${field} is not valid phone`
                );
            } catch {
                return `${field} is not valid phone`;
            }
        };
    },
    phoneLibya: (field: string) => {
        field = capitalize(field);
        return function phoneLibya(value: any) {
            if (isEmpty(value)) {
                return true;
            }
            try {
                return (
                    !!value.trim().match(/^(?:00218|\+218|0)?(9(?:1|2|3|4|5)[0-9]{7})$/iu) ||
                    `${field} is not valid libyan phone`
                );
            } catch {
                return `${field} is not valid libyan phone`;
            }
        };
    },
};

export type Rule = (v: any, inputsMap?: InputsMap) => string | boolean;
export type RulesList = Rule[];

export const createValidator = <
    R extends {
        [key: string]: ((v: any, inputsMap?: InputsMap) => string | boolean)[] | undefined;
    }
>(
    rules: R,
    inputsMap?: InputsMap
) => {
    return (values: { [key in keyof R]: any }) => {
        const errors: { [key in keyof R]: string | undefined } = {} as any;
        for (const key in values) {
            const fieldRules = rules[key];
            for (const rule of fieldRules || []) {
                const validationResult = rule(values[key], inputsMap);
                if (typeof validationResult === "string") {
                    errors[key] = validationResult;
                    break;
                }
            }
        }
        return errors;
    };
};
