import { render } from '@testing-library/react';

import Connector from './connector';

describe('Connector', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Connector />);
    expect(baseElement).toBeTruthy();
  });
});
