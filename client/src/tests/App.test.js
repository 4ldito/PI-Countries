import { render, screen } from '@testing-library/react';
// import App from './../components/App';
// import Index from '../index';
// import Home from '../components/Home/Home';
import About from './../components/About/About';

test('renders about page', () => {
  render(<About />);
  const linkElement = screen.getByTestId('test');
  console.log(linkElement);
  expect(linkElement).toBeInTheDocument();
});
