export type Credentials = {
    username: string;
    password: string;
};

export type LoginExpectation =
    | 'success'
    | 'invalidCredentials'
    | 'requiredAll'
    | 'requiredUsername'
    | 'requiredPassword';

export type LoginCase = {
    title: string;
    username: string;
    password: string;
    expected: LoginExpectation;
};

export type Employee = {
    firstName: string;
    middleName: string;
    lastName: string;
    id: string;
};

export type PimCase = {
    title: string;
    login: Credentials;
    filters?: string[];
    employee: Employee;
};

export type Messages = {
    required: string;
    invalidCredentials: string;
};
