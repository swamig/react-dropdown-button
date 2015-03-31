# react-dropdown-button

> A carefully crafted drop-down button for React

[See drop-down demo.](http://zippyui.github.io/react-dropdown-button/)

## Install

```sh
$ npm install react-dropdown-button --save
```

## Description

The drop-down button uses two other React components:

 * [react-button](http://github.com/zippyui/react-button)
 * [react-menus](http://github.com/zippyui/react-menus)

## Changelog

See [Changelog](./CHANGELOG.md)

## Usage

```jsx

var DDButton = require('react-dropdown-button')

var saveItems = [
	{
		label: 'PDF'
	},
	'-', // a separator
	{
		label: '.DOCX'
	},
	{
		label: 'ODF',
		onClick: function(){
			console.log('save as ODF')
		}
	}
]

function onClick(event, itemProps){
	console.log('You clicked: ' + itemProps.data.label +
	 ' at index ' + itemProps.index)
}

<DDButton items={saveItems} onChildClick={onClick}>
	Save as
</DDButton>
```

Also see [zippyui/react-button](github.com/zippyui/react-button)


## Props

You have the same props as for the [react-button, so see docs](http://github.com/zippyui/react-button).
Besides the button specific props, you can specify the `items` prop as an array of objects to be passed to the menu component.

 * items: Array - an array of menu items for the menu of this drop-down button
 * menuProps: Object - props to be passed to the menu component
 * menu: ReactElement - instead of `menuProps`, you can directly pass in a menu instance

## Contributing

```sh
$ npm install
$ npm run dev # to start webpack-dev-server
$ npm run serve # to start http-server on port 9091
```

now navigate to [localhost:9091](http://localhost:9091)

## License

#### MIT