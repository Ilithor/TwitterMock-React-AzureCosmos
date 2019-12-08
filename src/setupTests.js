import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

// You can globally mock out any packages here you don't care to test.
// A common example of this would be application insights, which you
// could mock out by adding this line here:
// jest.mock('applicationinsights-js', () => {});
