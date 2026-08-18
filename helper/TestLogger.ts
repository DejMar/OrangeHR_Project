import fs from 'fs';
import path from 'path';
import { test, type TestInfo } from '@playwright/test';

type StepStatus = 'PASS' | 'FAIL';

export class TestLogger {
    private readonly logPath: string;
    private stepIndex = 0;

    constructor(testInfo: TestInfo) {
        const logsDir = path.join(process.cwd(), 'logs');
        fs.mkdirSync(logsDir, { recursive: true });

        this.logPath = path.join(logsDir, `${sanitize(testInfo.title)}.txt`);
        fs.writeFileSync(this.logPath, '', 'utf8');

        this.append(`TEST START | ${testInfo.title}`);
        this.append(`FILE | ${testInfo.file}`);
    }

    async step<T>(name: string, action: () => Promise<T>): Promise<T> {
        this.stepIndex += 1;
        const index = String(this.stepIndex).padStart(2, '0');

        return test.step(name, async () => {
            try {
                const result = await action();
                this.recordStep(index, name, 'PASS');
                return result;
            } catch (error) {
                const message = stripAnsi(error instanceof Error ? error.message : String(error));
                this.recordStep(index, name, 'FAIL', message.split('\n')[0]);
                throw error;
            }
        });
    }

    finish(status?: TestInfo['status']): void {
        this.append(`TEST END | ${(status ?? 'unknown').toUpperCase()}`);
    }

    private recordStep(index: string, name: string, status: StepStatus, error?: string): void {
        this.append(`STEP ${index} ${status} | ${name}${error ? ` | Error: ${error}` : ''}`);
        console.log(`[${status}] ${index} ${name}`);
    }

    private append(message: string): void {
        fs.appendFileSync(this.logPath, `${message}\n`, 'utf8');
    }
}

function sanitize(value: string): string {
    return value
        .replace(/[<>:"/\\|?*]/g, '')
        .replace(/\s+/g, '_')
        .slice(0, 80);
}

function stripAnsi(value: string): string {
    return value.replace(/\u001B\[[0-9;]*m/g, '');
}
