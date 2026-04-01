import { describe, it } from 'node:test';
import { FirstMiddleware } from './first-middleware.middleware';
import { expect } from 'chai';
describe('FirstMiddleware', () => {
  it('should be defined', () => {
    expect(new FirstMiddleware()).toBeDefined();
  });
});
