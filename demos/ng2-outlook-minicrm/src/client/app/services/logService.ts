import { Injectable } from '@angular/core';

@Injectable()
export class LogService {
  public category: string = '';
  private LOG_PREFIX: string = 'ng2MiniCrm';

  constructor() { }

  /**
   * Wrapper function to console logger.
   *
   * @param  {string} message   - Message to write to console.
   * @param  {any} more?        - Optional additional objec to include in message.
   * @returns void
   */
  public log(message: string, more?: any): void {
    if (more === undefined) {
      console.log('%s:%s | %s', this.LOG_PREFIX, this.category, message);
    } else {
      console.log('%s:%s | %s', this.LOG_PREFIX, this.category, message, more);
    }
  }

  /**
   * Wrapper function to console logger.
   *
   * @param  {string} message   - Message to write to console.
   * @param  {any} more?        - Optional additional objec to include in message.
   * @returns void
   */
  public info(message: string, more?: any): void {
    if (more === undefined) {
      console.info('%s:%s | %s', this.LOG_PREFIX, this.category, message);
    } else {
      console.info('%s:%s | %s', this.LOG_PREFIX, this.category, message, more);
    }
  }

  /**
   * Wrapper function to console logger.
   *
   * @param  {string} message   - Message to write to console.
   * @param  {any} more?        - Optional additional objec to include in message.
   * @returns void
   */
  public warn(message: string, more?: any): void {
    if (more === undefined) {
      console.warn('%s:%s | %s', this.LOG_PREFIX, this.category, message);
    } else {
      console.warn('%s:%s | %s', this.LOG_PREFIX, this.category, message, more);
    }
  }

  /**
   * Wrapper function to console logger.
   *
   * @param  {string} message   - Message to write to console.
   * @param  {any} more?        - Optional additional objec to include in message.
   * @returns void
   */
  public error(message: string, more?: any): void {
    if (more === undefined) {
      console.error('%s:%s | %s', this.LOG_PREFIX, this.category, message);
    } else {
      console.error('%s:%s | %s', this.LOG_PREFIX, this.category, message, more);
    }
  }
}
