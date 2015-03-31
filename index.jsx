'use strict';

require('./index.styl')

var React  = require('react')
var Button = require('react-dropdown-button')
var Menu   = require('react-menus')

var saveItems = [
    {
        label: 'Text'
    },
    {
        label: 'PDF'
    },
    {
        label: 'Office',
        items: [
            {
                label: 'MS Office'
            },
            {
                label: 'Open Office'
            }
        ]
    },
    {
        label: 'CSV'
    },
    {
        label: 'JSON'
    },
    {
        label: 'YAML'
    },
    {
        label: 'Other',
        items: [
            {
                label: 'PS'
            },
            {
                label: 'BMP'
            }
        ]
    }
]

function onClick(event, itemProps){
    console.log('Clicked: ' + itemProps.data.label + ' at index ' + itemProps.index)
}

var exportItems = [
    {
        label: 'As PDF',
        onClick: function(){
            console.log('Export as PDF!')
        }
    },
    '-',
    {
        label: 'As Proprietary',
        items: [
            {
                label: 'Office',
                items: [
                    {
                        label: 'MS Office'
                    },
                    {
                        label: 'Open Office'
                    }
                ]
            }
        ]
    },
    {
        label: 'As CSV'
    },
    {
        label: 'As Excel',
        items: [
            {
                label: 'Excel 2007'
            },
            {
                label: 'Excel 2012'
            },
            {
                label: 'Excel 2014'
            },
            {
                label: 'Latest Excel'
            }
        ]
    }
]

var importItems = [
    {
        label: 'From CSV'
    },
    {
        label: 'From Excel',
        disabled: true
    },
    {
        label: 'From text'
    }
]

function onOpenClick(event, itemProps){
    console.log('Clicked at index ', itemProps.index)
}

var openMenu = <Menu onChildClick={onOpenClick}>
        <Menu.Item>
            <Menu.Item.Cell>Open later</Menu.Item.Cell>
        </Menu.Item>

        <Menu.Item>
            <Menu.Item.Cell>Open image</Menu.Item.Cell>
        </Menu.Item>
    </Menu>


var App = React.createClass({
    render: function() {
        return (
            <div className="App" style={{padding: 10}}>
                <p>
                    <h2>Demo for react-dropdown-button</h2>
                    See <a href="http://github.com/zippyui/react-dropdown-button">zippyui/react-dropdown-button</a> and <a href="https://www.npmjs.com/package/react-dropdown-button">npm/package/react-dropdown-button</a>
                </p>
                <p>
                    To see something happening on click, open the developer console
                </p>
                <Button arrowPosition="left" items={saveItems} onMenuClick={onClick}>
                    Save as
                </Button>

                <Button items={exportItems} onMenuClick={onClick}>
                    Export
                </Button>

                <Button disabled>Download - disabled</Button>
                <Button onMenuClick={onClick} items={importItems}>Import</Button>
                <Button menu={openMenu}>Open</Button>
            </div>
        )
    }
})
React.render(<App />, document.getElementById('content'))