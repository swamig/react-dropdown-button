'use strict';

var React = require('react')
var Button = require('./src')
var B = require('react-button')

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

                <Button xdisabled={true} items={items} onClick={fn} style={{xwidth: 50}} label="hello world">

                </Button>
                <Button href="#test" menu={menu}>world</Button>
                <B href="#test" menu={menu}>world</B>
            </div>
        )
    }
})

React.render(<App />, document.getElementById('content'))