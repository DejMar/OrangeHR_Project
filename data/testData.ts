import { faker } from '@faker-js/faker/locale/en';
import credentials from './json/credentials.json';
import loginCases from './json/login-cases.json';
import messagesJson from './json/messages.json';
import pimCases from './json/pim-cases.json';
import type { LoginCase, Messages, PimCase } from './types';

type JsonValue = string | number | boolean | null | JsonValue[] | { [key: string]: JsonValue };

export const messages: Messages = messagesJson;

export type LoginCaseId = keyof typeof loginCases;
export type PimCaseId = keyof typeof pimCases;

export function getLoginCase(caseId: LoginCaseId): LoginCase {
    return hydrate(loginCases[caseId]) as LoginCase;
}

export function getLoginCaseTitle(caseId: LoginCaseId): string {
    return loginCases[caseId].title;
}

export function getLoginCaseIds(): LoginCaseId[] {
    return Object.keys(loginCases) as LoginCaseId[];
}

export function getPimCase(caseId: PimCaseId): PimCase {
    return hydrate(pimCases[caseId]) as PimCase;
}

export function getPimCaseTitle(caseId: PimCaseId): string {
    return pimCases[caseId].title;
}

export function getCredentials(user: keyof typeof credentials) {
    return credentials[user];
}

function hydrate<T>(value: T): T {
    return resolveValue(value) as T;
}

function resolveValue(value: unknown): unknown {
    if (typeof value === 'string') {
        return resolveToken(value);
    }

    if (Array.isArray(value)) {
        return value.map(resolveValue);
    }

    if (value && typeof value === 'object') {
        return Object.fromEntries(
            Object.entries(value).map(([key, nested]) => [key, resolveValue(nested)])
        );
    }

    return value;
}

function resolveToken(token: string): string {
    if (!token.startsWith('$')) {
        return token;
    }

    if (token.startsWith('$credentials.')) {
        return getByPath(credentials, token.slice('$credentials.'.length));
    }

    if (token.startsWith('$faker.')) {
        return callFaker(token.slice('$faker.'.length));
    }

    if (token === '$unique.employeeId') {
        return `E${Date.now().toString().slice(-8)}${faker.string.numeric(2)}`;
    }

    throw new Error(`Unknown data token: ${token}`);
}

function getByPath(source: JsonValue, path: string): string {
    const resolved = path.split('.').reduce<JsonValue | undefined>((current, key) => {
        if (current && typeof current === 'object' && !Array.isArray(current) && key in current) {
            return current[key];
        }
        return undefined;
    }, source);

    if (typeof resolved !== 'string') {
        throw new Error(`Credential path "${path}" did not resolve to a string`);
    }

    return resolved;
}

function callFaker(expression: string): string {
    const match = expression.match(/^([A-Za-z]+)\.([A-Za-z]+)(?:\((.*)\))?$/);
    if (!match) {
        throw new Error(`Invalid faker token: $faker.${expression}`);
    }

    const [, moduleName, methodName, rawArgs] = match;
    const fakerModule = (faker as unknown as Record<string, unknown>)[moduleName];
    if (!fakerModule || typeof fakerModule !== 'object') {
        throw new Error(`Unknown faker module: ${moduleName}`);
    }

    const method = (fakerModule as Record<string, unknown>)[methodName];
    if (typeof method !== 'function') {
        throw new Error(`Unknown faker method: ${moduleName}.${methodName}`);
    }

    const result = method.apply(fakerModule, parseArgs(rawArgs));
    return String(result);
}

function parseArgs(rawArgs?: string): unknown[] {
    if (!rawArgs?.trim()) {
        return [];
    }

    return rawArgs.split(',').map((part) => {
        const trimmed = part.trim();
        if (/^-?\d+(\.\d+)?$/.test(trimmed)) {
            return Number(trimmed);
        }
        if (trimmed === 'true') {
            return true;
        }
        if (trimmed === 'false') {
            return false;
        }
        return trimmed.replace(/^['"]|['"]$/g, '');
    });
}
