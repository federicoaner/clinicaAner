import { TodoMayusculaPipe } from './todo-mayuscula.pipe';

describe('TodoMayusculaPipe', () => {
  it('create an instance', () => {
    const pipe = new TodoMayusculaPipe();
    expect(pipe).toBeTruthy();
  });
});
