import React from 'react';
import Tabs from './Tabs';
import Form from "./Form";
import User from "./User";

function App() {
  return (
    <div className="App">
        <Tabs>
            <div label="form">
                <Form />
            </div>
            <div label="user">
                <User />
            </div>
        </Tabs>
    </div>
  );
}

export default App;
