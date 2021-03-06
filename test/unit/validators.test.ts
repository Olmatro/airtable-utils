import {
    validate,
    apiKeyIsValid,
    baseIdIsValid,
    tableIdIsValid,
    viewIdIsValid,
    tableNameIsValid,
} from '../../src/validators'

// valid in format, not actuality
const validApiKey = 'key'.padEnd(17, '0')
const validBaseId = 'app'.padEnd(17, '0')
const validTableId = 'tbl'.padEnd(17, '0')
const validViewId = 'viw'.padEnd(17, '0')
const validTableName = 'Table Name'

describe('validate', () => {
    test('Return a boolean', () => {
        expect(typeof validate('', '')).toBe('boolean')
    })

    describe('Always return `false` on non-string credential input', () => {
        const fn = (arg: any) => validate('', (arg as unknown) as any)

        test('boolean', () => {
            expect(fn(true)).toBe(false)
        })
        test('number', () => {
            expect(fn(234)).toBe(false)
        })
        test('undefined', () => {
            expect(fn(undefined)).toBe(false)
        })
        test('null', () => {
            expect(fn(null)).toBe(false)
        })
        test('object', () => {
            expect(fn({ key: 'value' })).toBe(false)
        })
        test('function', () => {
            expect(fn(() => validApiKey)).toBe(false)
        })
    })

    describe('Return false when the credential is a string that...', () => {
        test('Is less than 17 characters in length', () => {
            const shortApiKey = validApiKey.substring(0, 15)
            expect(validate('key', shortApiKey)).toBe(false)
        })
        test('Is greater than 17 characters in length', () => {
            const longApiKey = `${validApiKey}0`
            expect(validate('key', longApiKey)).toBe(false)
        })
        test('Does not begin with the given prefix ', () => {
            const invalidApiKey = `kei${validApiKey}`.substring(0, 17)
            expect(validate('key', invalidApiKey)).toBe(false)
        })
        test('Contains non-alphanumeric characters', () => {
            const invalidApiKey = `key`.padEnd(17, '$')
            expect(validate('key', invalidApiKey)).toBe(false)
        })
    })

    test('Return `true` when the argument is a valid string', () => {
        expect(validate('key', validApiKey)).toBe(true)
    })
})

describe('When the credentials are the proper length and only contain alpha-numeric characters', () => {
    describe('apiKeyIsValid', () => {
        test('Return `true` when api key starts with "key"', () => {
            expect(apiKeyIsValid(validApiKey)).toBe(true)
        })
        test('Return `false` when api key does not start with "key"', () => {
            const invalidApiKey = 'kei'.padEnd(17, '0')
            expect(apiKeyIsValid(invalidApiKey)).toBe(false)
        })
    })

    describe('baseIdIsValid', () => {
        test('Return `true` when base id starts with "app"', () => {
            expect(baseIdIsValid(validBaseId)).toBe(true)
        })
        test('Return `false` when base id does not start with "app"', () => {
            const invalidBaseId = 'apq'.padEnd(17, '0')
            expect(baseIdIsValid(invalidBaseId)).toBe(false)
        })
    })

    describe('tableIdIsValid', () => {
        test('Return `true` when table id starts with "tbl"', () => {
            expect(tableIdIsValid(validTableId)).toBe(true)
        })
        test('Return `false` when api key does not start with "tbl"', () => {
            const invalidTableId = 'tbb'.padEnd(17, '0')
            expect(tableIdIsValid(invalidTableId)).toBe(false)
        })
    })

    describe('viewIdIsValid', () => {
        test('Return `true` when view id starts with "viw"', () => {
            expect(viewIdIsValid(validViewId)).toBe(true)
        })
        test('Return `false` when view id does not start with "viw"', () => {
            const invalidViewId = 'vew'.padEnd(17, '0')
            expect(viewIdIsValid(invalidViewId)).toBe(false)
        })
    })
})

describe('tableNameIsValid', () => {
    describe('Return `false` when "tableName"', () => {
        describe('Is not a string', () => {
            const fn = (arg: any) => tableNameIsValid((arg as unknown) as any)

            test('boolean', () => {
                expect(fn(true)).toBe(false)
            })
            test('number', () => {
                expect(fn(234)).toBe(false)
            })
            test('undefined', () => {
                expect(fn(undefined)).toBe(false)
            })
            test('null', () => {
                expect(fn(null)).toBe(false)
            })
            test('object', () => {
                expect(fn({ key: 'value' })).toBe(false)
            })
            test('function', () => {
                expect(fn(() => validApiKey)).toBe(false)
            })
        })

        test('Is an empty string', () => {
            expect(tableNameIsValid('')).toBe(false)
        })
    })

    test('Return `true` when table name is valid', () => {
        expect(tableNameIsValid(validTableName)).toBe(true)
    })
})
