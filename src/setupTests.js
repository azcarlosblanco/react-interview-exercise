import { configure, mount, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import sinon from 'sinon';

configure({ adapter: new Adapter() });

global.mount = mount;
global.shallow = shallow;
global.sinon = sinon;
