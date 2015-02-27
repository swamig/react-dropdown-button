'use strict';

var React  = require('react')
var Button = require('react-button/src')
var assign = require('object-assign')
var cloneWithProps = require('react-clonewithprops')
var hasTouch = require('has-touch')

var Menu   = require('react-menus/src')
var MenuFactory = React.createFactory(Menu)

function emptyFn(){}

module.exports = React.createClass({

    displayName: 'ReactDropDownButton',

    getInitialState: function(){
    	return {
    	}
    },

    getDefaultProps: function(){
    	return {
    		defaultStyle: {
    			boxSizing: 'border-box',
    			verticalAlign: 'top',
    			//theme props
				padding: 5
    		},

    		// defaultOverStyle: {},

    		defaultOpenedStyle: {
    		    //theme properties
    		    background: 'rgb(118, 181, 231)',
    		    color: 'white'
    		},

    		defaultArrowStyle: {
				display  : 'inline-block',
				boxSizing: 'border-box',
				fontSize : '0.8em'
    		},

    		defaultMenuStyle: {},

    		// alignOffset: { left: 0, top: -1 },
    		enforceNonStatic: true,
    		arrowPosition: 'right'
    	}
    },

    render: function(){

    	var props = this.prepareProps(this.props, this.state)

        return React.createElement(Button, React.__spread({ref: "button"},  props))
    },

    prepareProps: function(thisProps, state) {
    	var props = assign({}, thisProps)

    	props['data-display-name'] = 'ReactDropDownButton'
    	props.style = this.prepareStyle(props)
    	props.onClick = this.handleClick.bind(this, props)
    	props.renderChildren = this.renderChildren.bind(this, props)

    	props.onDefaultStylesApplied = this.onDefaultStylesApplied.bind(this, props)
    	props.onStylesApplied = this.onStylesApplied.bind(this, props)

    	return props
    },

    prepareStyle: function(props){

    	var style = assign({}, props.defaultStyle, props.style)

    	delete props.defaultStyle

    	//enforce relative position so that menu gets rendered correctly
    	style.position = style.position == 'absolute'? style.position: 'relative'
    	style.overflow = 'visible'

    	return style
    },

    onDefaultStylesApplied: function(props, style) {
    	if (this.state.menu){
    		assign(style, props.defaultOpenedStyle)
    	}

    	;(this.props.onDefaultStylesApplied || emptyFn)(style)
    },

    onStylesApplied: function(props, style) {
    	if (this.state.menu){
    		assign(style, props.openedStyle)
    	}

    	;(this.props.onStylesApplied || emptyFn)(style)
    },

    renderChildren: function(props, children) {
    	var arrow = this.renderArrow(props)
    	var leftArrow
    	var rightArrow = arrow

    	if (props.arrowPosition != 'right'){
    		leftArrow = arrow
    		rightArrow = null
    	}
    	return [
    		leftArrow,
    		children,
    		this.renderMenu(props, this.state),
    		rightArrow
    	]
    },

    renderArrow: function(props) {
    	var arrow = props.arrow

    	if (props.renderArrow){
    		arrow = props.renderArrow(props)
    	}

    	if (arrow === false){
    		return
    	}

    	return arrow || this.getDefaultArrow(props)
    },

    getDefaultArrow: function(props) {

    	var otherSide = props.arrowPosition != 'right'? 'Right': 'Left'

    	var defaultArrowStyle = assign({}, props.defaultArrowStyle)
    	defaultArrowStyle['padding' + otherSide] = props.style.padding

    	var arrowStyle = assign({}, defaultArrowStyle, props.arrowStyle)

    	return React.createElement("span", {style: arrowStyle}, "▼")
    },

    handleClick: function(props) {

    	;(this.props.onClick || emptyFn).apply(null, [].slice.call(arguments, 1))

	    this.toggleMenu(props)
    },

    renderMenu: function(props, state) {
        if (state.menu){
            return state.menu
        }
    },

    toggleMenu: function(props) {
        if (this.state.menu){
            this.hideMenu()
        } else {
            this.showMenu(props)
        }
    },

    showMenu: function(props) {
        var target = props.getAlignTarget?
                        props.getAlignTarget.call(this):
                        this.getDOMNode()

        this.removeClickListener()

        document.addEventListener('click', this.clickEventListener = this.onDocumentClick)

        var menuProps = assign({}, props.menuProps)
        var menuStyle = assign({
			                    position: 'absolute',
			                    zIndex: 1
			                },
			                props.defaultMenuStyle,
			                menuProps.style,
			                props.menuStyle
		               )

        menuProps.style = menuStyle
        menuProps.alignPositions = props.alignPositions || menuProps.alignPositions || [
            'tl-bl',
            'tr-br',
            'bl-tl',
            'br-tr'
        ]

        assign(menuProps, {
			onClick    : this.onMenuItemClick.bind(this, props),
			alignOffset: props.alignOffset || menuProps.alignOffset,
			alignTo    : target,
			items      : menuProps.items || props.items
        })

        var menu

        if (props.menu){
            menu = cloneWithProps(props.menu, menuProps)
        } else {
            menu = (props.menuFactory || MenuFactory)(menuProps)

            if (menu === undefined){
                menu = MenuFactory(menuProps)
            }
        }

        this.setState({
            menu: menu
        })
    },

    isExpanderClick: function(event) {
        if (
            hasTouch &&
            event &&
            ((event.nativeEvent && event.nativeEvent.expanderClick) || event.expanderClick)
        ){
            return true
        }

        return false
    },

    onDocumentClick: function(event) {
        if (this.isExpanderClick(event)){
            return
        }

        this.hideMenu()
    },

    componentWillUnmount: function(){
        this.removeClickListener()
    },

    removeClickListener: function() {
        if (this.clickEventListener){
            document.removeEventListener('click', this.clickEventListener)
            this.clickEventListener = null
        }
    },

    hideMenu: function() {
        if (this.state.menu){
            this.removeClickListener()
            this.setState({
                menu: false
            })
        }
    },

    onMenuItemClick: function(props, event) {
        if (this.isExpanderClick(event)){
            return
        }

        if (this.props.menuProps){
        	;(this.props.menuProps.onClick || emptyFn)(event)
        }

        event.nativeEvent.preventButtonClick = true

        //when menu is hidden, mouseleave from button is not triggered, so we trigger it manually
        this.refs.button.handleMouseLeave(props, event)
        this.hideMenu()
    }
})