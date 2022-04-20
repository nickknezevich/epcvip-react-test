import { render } from '@testing-library/react';

import UxFormsLogin from './ux-forms-login';

describe('UxFormsLogin', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<UxFormsLogin />);
    expect(baseElement).toBeTruthy();
  });
});
