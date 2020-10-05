import image from './assets/image.png';
import { TitleBlock, ImageBlock, ColumnsBlock, TextBlock } from './classes/blocks';

export const model = [
	new TitleBlock('Custom constuctor on native js', {
		tag: 'h2',
		styles: {
			background: 'linear-gradient(to right, #ff0099,#493240)',
			color: '#fff',
			padding: '1.5rem',
			'text-align': 'center',
		},
	}),
	new ImageBlock(image, {
		padding: '2rem 0',
		display: 'flex',
		'justify-content': 'center',
	}),
	new ColumnsBlock(['1111', '2222', '3333'], {
		tag: 'h2',
		styles: {
			background: 'linear-gradient(to right,#5096AF,#4A76A8)',
			'text-align': 'center',
		},
	}),
	new TextBlock('Footer content', {
		tag: 'h3',
		styles: {
			background: 'linear-gradient(to right,#4A76A8,#5096AF)',
			'text-align': 'center',
		},
	}),
];
