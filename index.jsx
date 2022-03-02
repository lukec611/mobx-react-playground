import ReactDOM from 'react-dom';
import React from 'react';
import { runInAction, observable, createAtom, autorun } from 'mobx';
import { observer } from 'mobx-react';

const skeleton = observable.box(() => <div>not loaded</div>);
setTimeout(() => installApp(skeleton), 1000);

const RootApp = observer(() => {
    const Skeleton = skeleton.get();
    return (
        <Skeleton/>
    );
});

ReactDOM.render(
    <RootApp/>,
    document.getElementById('root')
);

function installApp(skeleton) {
    const color = observable.box('red');
    setInterval(updateColorPeriodically, 300);
    runInAction(() => {
        skeleton.set(observer(() => {
            return (
                <div>
                    Color:
                    <div style={{ width: 20, height: 20, backgroundColor: color.get() }}>
                    </div>
                </div>
            );
        }));
    });

    const colorOptions = ['red', 'green', 'blue'];
    function updateColorPeriodically() {
        const nextIndex = (colorOptions.indexOf(color.get()) + 1) % colorOptions.length;
        runInAction(() => color.set(colorOptions[nextIndex]));
    }
}
