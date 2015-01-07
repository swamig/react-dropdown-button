'use strict';

var React = require('react')
var Button = require('./src')

require('./index.styl')

var VALUE = 'xxx'

var App = React.createClass({

    onChange: function(value){
        VALUE = value
        this.setState({})
    },

    render: function() {

        var style = {
            width: '50%'
        }

        function fn(value){
            console.log('clicked')
        }

        // <Field placeholder="x" style={style} label='First Name' value={VALUE} onChange={this.onChange}/>

        return (
            <div className="App" style={{padding: 10}}>
                <input placeholder="X"/>
                <Button focusedClassName="focused" focusedStyle={{color: 'black'}} activeStyle={{position: 'relative', top: 1}} style={{color: 'red', padding: 50}} overStyle={{color: 'magenta'}} overClassName="over" activeClassName="active" fn={fn}>
                    hello
                </Button>
                <Button overClassName="over" href="#test">world</Button>
            </div>
        )
    }
})

React.render(<App />, document.getElementById('content'))