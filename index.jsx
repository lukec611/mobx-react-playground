import ReactDOM from 'react-dom';
import React from 'react';
import { runInAction, observable, createAtom, autorun } from 'mobx';
import { observer } from 'mobx-react';

let vb = 'ok';

const atom = createAtom('my-at', onBecomeObserved, onBecomeUnobserved);
function getV() {
    if (atom.reportObserved()) {
        return vb;
    } else {
        return '100';
    }
}
let tok = undefined;
function onBecomeObserved() {
    tok = setTimeout(() => {
        vb = '101';
        atom.reportChanged()

        tok = undefined;
    }, 1000);
}
function onBecomeUnobserved() {
    if (tok != null) {
        clearTimeout(tok)
        tok = undefined;
    }
}


const v = observable.box(4);

const App = observer(() => {
    return (
        <div>
            1-2-3-{v.get()}
            <br/>
            vb={getV()}
        </div>
    );
});

let i = 0;
setInterval(() => {
    runInAction(() => {
        v.set(i++);
    });
}, 500);

ReactDOM.render(
    <App/>,
    document.getElementById('root')
);
