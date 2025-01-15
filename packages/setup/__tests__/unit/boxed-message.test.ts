import boxedMessage from 'lib/boxed-message.ts';

describe('boxedMessage', () => {
  it('should generate messages', () => {
    const messages = ['Hello', 'World'];
    const result = boxedMessage({ messages });
    expect(result).toContain('Hello');
    expect(result).toContain('World');
  });

  it('should correctly apply a border based on provided props', () => {
    const messages = ['Hello', 'World'];
    const result = boxedMessage({ messages, rtEdge: '♡', ltEdge: '☆', rbEdge: '( )', lbEdge: '+ ̊' });
    expect(result).toContain('♡');
    expect(result).toContain('☆');
    expect(result).toContain('( )');
    expect(result).toContain('+ ̊');
  });
});
