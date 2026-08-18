import { test as base, expect } from '@playwright/test';
import { TestLogger } from '../helper/TestLogger';

export const test = base.extend<{ logger: TestLogger }>({
    logger: async ({}, use, testInfo) => {
        const logger = new TestLogger(testInfo);
        await use(logger);
        logger.finish(testInfo.status);
    },
});

export { expect };
