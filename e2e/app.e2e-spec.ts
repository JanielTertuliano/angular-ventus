import { WindowTestePage } from './app.po';

describe('window-teste App', () => {
  let page: WindowTestePage;

  beforeEach(() => {
    page = new WindowTestePage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
