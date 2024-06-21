import React from 'react';
import { Provider } from 'react-redux';
import store from './store/store';
import StepForm from './components/StepForm/StepForm';

const App: React.FC = () => {
    return (
        <Provider store={store}>
            <StepForm/>
        </Provider>
    );
};

export default App;
