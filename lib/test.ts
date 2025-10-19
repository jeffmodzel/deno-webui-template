import { assertEquals, assertExists, assertInstanceOf } from '@std/assert';
import { APP_VERSION, capitalize, formatDate, getLogger, greet, Logger, slugify } from './mod.ts';

Deno.test('formatDate formats date correctly', () => {
  const date = new Date('2023-12-25T10:30:00Z');
  assertEquals(formatDate(date), '2023-12-25');
});

Deno.test('capitalize capitalizes first letter', () => {
  assertEquals(capitalize('hello'), 'Hello');
  assertEquals(capitalize('WORLD'), 'WORLD');
});

Deno.test('slugify creates URL-friendly slugs', () => {
  assertEquals(slugify('Hello World!'), 'hello-world');
  assertEquals(slugify('Test_String-123'), 'test-string-123');
});

Deno.test('greet returns formatted greeting', () => {
  assertEquals(greet('world'), 'Hello, World!');
  assertEquals(greet('deno'), 'Hello, Deno!');
});

Deno.test('APP_VERSION is defined', () => {
  assertEquals(typeof APP_VERSION, 'string');
  assertEquals(APP_VERSION, '1.0.0');
});

// Logger Tests
Deno.test('getLogger returns Logger instance', () => {
  const logger = getLogger();
  assertExists(logger);
  assertInstanceOf(logger, Logger);
});

Deno.test('getLogger returns singleton instance', () => {
  const logger1 = getLogger();
  const logger2 = getLogger();
  assertEquals(logger1, logger2);
});

Deno.test('Logger has all required methods', () => {
  const logger = getLogger();
  assertEquals(typeof logger.debug, 'function');
  assertEquals(typeof logger.info, 'function');
  assertEquals(typeof logger.warn, 'function');
  assertEquals(typeof logger.error, 'function');
  assertEquals(typeof logger.getLogLevel, 'function');
});

Deno.test('Logger getLogLevel returns default DEBUG when no env var', () => {
  // Clear environment variable
  Deno.env.delete('APP_DEBUG_LEVEL');
  const logger = getLogger();
  assertEquals(logger.getLogLevel(), 'DEBUG');
});

Deno.test('Logger getLogLevel respects APP_DEBUG_LEVEL environment variable', () => {
  // Test each valid log level
  const levels = ['DEBUG', 'INFO', 'WARN', 'ERROR'] as const;

  for (const level of levels) {
    Deno.env.set('APP_DEBUG_LEVEL', level);
    const logger = getLogger();
    assertEquals(logger.getLogLevel(), level);
  }

  // Clean up
  Deno.env.delete('APP_DEBUG_LEVEL');
});

Deno.test('Logger getLogLevel defaults to DEBUG for invalid env var', () => {
  Deno.env.set('APP_DEBUG_LEVEL', 'INVALID_LEVEL');
  const logger = getLogger();
  assertEquals(logger.getLogLevel(), 'DEBUG');

  // Clean up
  Deno.env.delete('APP_DEBUG_LEVEL');
});

Deno.test("Logger methods don't throw errors", () => {
  const logger = getLogger();

  // Test with different data types
  logger.debug('debug message');
  logger.info('info message');
  logger.warn('warn message');
  logger.error('error message');

  // Test with objects
  logger.info({ key: 'value', number: 42 });

  // Test with arrays
  logger.debug([1, 2, 3, 'test']);

  // Test with null/undefined
  logger.warn(null);
  logger.error(undefined);

  // Test with numbers and booleans
  logger.info(42);
  logger.debug(true);
});

Deno.test('Logger respects log level filtering', () => {
  // Mock console.log to capture output
  const originalConsoleLog = console.log;
  const logCalls: string[] = [];
  console.log = (message: string) => {
    logCalls.push(message);
  };

  try {
    // Test INFO level filtering (should not show DEBUG)
    Deno.env.set('APP_DEBUG_LEVEL', 'INFO');
    const logger = getLogger();

    logCalls.length = 0; // Clear previous calls

    logger.debug('debug message');
    logger.info('info message');
    logger.warn('warn message');
    logger.error('error message');

    // Should have 3 calls (info, warn, error) but not debug
    assertEquals(logCalls.length, 3);
    assertEquals(logCalls.some((call) => call.includes('INFO')), true);
    assertEquals(logCalls.some((call) => call.includes('WARN')), true);
    assertEquals(logCalls.some((call) => call.includes('ERROR')), true);
    assertEquals(logCalls.some((call) => call.includes('DEBUG')), false);
  } finally {
    // Restore console.log and clean up
    console.log = originalConsoleLog;
    Deno.env.delete('APP_DEBUG_LEVEL');
  }
});

Deno.test('Logger formats timestamps correctly', () => {
  // Mock console.log to capture output
  const originalConsoleLog = console.log;
  const logCalls: string[] = [];
  console.log = (message: string) => {
    logCalls.push(message);
  };

  try {
    const logger = getLogger();
    logger.info('test message');

    assertEquals(logCalls.length, 1);
    const logMessage = logCalls[0];

    // Check timestamp format: YYYY-MM-DD HH:MM:SS
    const timestampRegex = /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}/;
    assertEquals(timestampRegex.test(logMessage), true);
  } finally {
    // Restore console.log
    console.log = originalConsoleLog;
  }
});
