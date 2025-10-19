/**
 * Simple console logger with timestamp and colored log levels
 */
import { format } from '@std/datetime';
export type LogLevel = 'DEBUG' | 'INFO' | 'WARN' | 'ERROR';

interface LogColors {
  DEBUG: string;
  INFO: string;
  WARN: string;
  ERROR: string;
  RESET: string;
}

const LOG_COLORS: LogColors = {
  DEBUG: '\x1b[36m', // Cyan
  INFO: '\x1b[32m', // Green
  WARN: '\x1b[33m', // Yellow
  ERROR: '\x1b[31m', // Red
  RESET: '\x1b[0m', // Reset
};

// Log level hierarchy (lower number = higher priority)
const LOG_LEVELS: Record<LogLevel, number> = {
  DEBUG: 0,
  INFO: 1,
  WARN: 2,
  ERROR: 3,
};

/**
 * Gets the current log level from environment variable APP_DEBUG_LEVEL
 * Defaults to DEBUG if not set or invalid
 */
function getCurrentLogLevel(): LogLevel {
  const envLevel = Deno.env.get('APP_DEBUG_LEVEL');

  if (envLevel && envLevel in LOG_LEVELS) {
    return envLevel as LogLevel;
  }

  return 'DEBUG';
}

/**
 * Checks if a log level should be output based on current log level setting
 */
function shouldLog(level: LogLevel): boolean {
  const currentLevel = getCurrentLogLevel();
  return LOG_LEVELS[level] >= LOG_LEVELS[currentLevel];
}

/**
 * Formats a timestamp in YYYY-MM-DD HH:MM:SS format using system timezone
 */
function formatTimestamp(): string {
  const now = new Date();
  return format(now, 'yyyy-MM-dd HH:mm:ss');
}

/**
 * Formats the log message for various data types
 */
function formatMessage(message: unknown): string {
  if (typeof message === 'string') {
    return message;
  }

  if (typeof message === 'object' && message !== null) {
    try {
      return JSON.stringify(message, null, 2);
    } catch {
      return String(message);
    }
  }

  return String(message);
}

/**
 * Logger class that provides logging functionality with timestamps and colored output
 */
export class Logger {
  /**
   * Core logging function
   */
  private log(level: LogLevel, message: unknown): void {
    if (!shouldLog(level)) {
      return;
    }

    const timestamp = formatTimestamp();
    const coloredLevel = `${LOG_COLORS[level]}${level}${LOG_COLORS.RESET}`;
    const formattedMessage = formatMessage(message);

    console.log(`[${timestamp}] [${coloredLevel}] ${formattedMessage}`);
  }

  /**
   * Debug level logging
   */
  debug(message: unknown): void {
    this.log('DEBUG', message);
  }

  /**
   * Info level logging
   */
  info(message: unknown): void {
    this.log('INFO', message);
  }

  /**
   * Warning level logging
   */
  warn(message: unknown): void {
    this.log('WARN', message);
  }

  /**
   * Error level logging
   */
  error(message: unknown): void {
    this.log('ERROR', message);
  }

  /**
   * Gets the current log level setting
   */
  getLogLevel(): LogLevel {
    return getCurrentLogLevel();
  }
}

// Singleton logger instance
let loggerInstance: Logger | null = null;

/**
 * Returns a singleton Logger instance
 */
export function getLogger(): Logger {
  if (!loggerInstance) {
    loggerInstance = new Logger();
  }
  return loggerInstance;
}
