import { JunoCorePage } from './app.po';

describe('juno-core App', function() {
  let page: JunoCorePage;

  beforeEach(() => {
    page = new JunoCorePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
