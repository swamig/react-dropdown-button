'use strict';

var React = require('react')
var Button = require('./src')

require('./index.styl')

var VALUE = 'xxx'

var items = [
    {
        label: 'Save',
        items: [
            {
                label: 'as pdf',
                fn: function() {
                    console.log('as PDF')
                }
            }
        ]
    },
    {
        label: 'Export'
    }
]

var Menu = require('react-menus/src')

function great(){
    console.log('well done')
}

var menu = <Menu >
        <Menu.Item>
            <Menu.Item.Cell onClick={great}>great</Menu.Item.Cell>
        </Menu.Item>
    </Menu>

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

        function arrowClick(){
            // console.log('arrow click')
        }

        return (
            <div className="App" style={{padding: 10}}>
                <input placeholder="X"/>
                <Button items={items} fn={fn} overArrowStyle={{color: 'blue'}} overClassName="over" onArrowClick={arrowClick} activeStyle={{position: 'relative', top: 1}} style={{textAlign: 'right', color: 'red', width: 130, height: 100, borderRadius: 10}}>
                    hello
                </Button>
                <Button overClassName="over" href="#test" menu={menu}>world</Button>
            </div>
        )
    }
})

React.render(<App />, document.getElementById('content'))