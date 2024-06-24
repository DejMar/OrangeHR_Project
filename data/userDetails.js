import { faker } from '@faker-js/faker/locale/en'

export const adminDetails = {
    username: "Admin",
    password: "admin123",
    invalidUsername: "Administrator",
    invalidPassword: "administrator123"
}
export const employeeDetails = {
    firstName: faker.person.firstName(),
    middleName: faker.person.middleName(),
    lastName: faker.person.lastName(),
    id: faker.finance.accountNumber()
}
