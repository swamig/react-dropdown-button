'use strict';

var React       = require('react')
var SplitButton = require('react-split-button/src')

function getDOM(){
    return this.getDOMNode()
}

module.exports = React.createClass({

    displayName: 'ReactDropDownButton',

    render: function(){
        return React.createElement(SplitButton, React.__spread({arrowWrapperBorder: this.props.arrowWrapperBorder || '0px'},  this.props, {getAlignTarget: getDOM}))
    }
})