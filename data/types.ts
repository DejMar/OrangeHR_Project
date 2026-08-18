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

export type AdminSearch = {
    username?: string;
    userRole?: string;
    employeeName?: string;
    status?: string;
};

export type AdminExpectedUser = {
    username: string;
    userRole?: string;
    status?: string;
};

export type AdminCase = {
    title: string;
    login: Credentials;
    search?: AdminSearch;
    expected?: AdminExpectedUser;
    navigation?: {
        jobItem?: string;
        userManagementItem?: string;
        nationalities?: boolean;
        addUser?: boolean;
    };
};

export type Messages = {
    required: string;
    invalidCredentials: string;
};
