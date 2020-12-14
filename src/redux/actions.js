
let counter = 0;
let list = [];
export const  addCounter = () => ({
	type:  'ADD-TYPE', 
	payload: {
		counter: counter ,
	}
});

export const  toggleCounter = () => ({
	type:  'TOGGLE-TYPE', 
	payload: {
		counter: counter ,
	}
});

export const  zeroCounter = () => ({
	type:  'ZERO-TYPE', 
	payload: {
		counter: 0,
	}
});

export const  addListAction = (item) => ({
	type:  'ADDLIST-TYPE', 
	payload: {
		item: item,    // add item to lst
	}
});

export const clearListAction = () => ({
	type:  'CLSLIST-TYPE', 
})