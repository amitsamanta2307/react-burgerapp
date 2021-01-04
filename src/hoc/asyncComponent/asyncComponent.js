import React from 'react';

const asyncComponent = (importComponent) => {
    return class extends React.Component {
        state = {
            component: null,
        }

        componentDidMount() {
            importComponent()
                .then(cmp => {
                    this.setState({ component: cmp.default });
                });
        }

        render() {
            const Element = this.state.component;
            return Element ? <Element {...this.state} /> : null;
        }
    }
}

export default asyncComponent;