import { mode } from '@chakra-ui/theme-tools';
const Card = {
	baseStyle: (props: any) => ({
		p: '20px',
		display: 'flex',
		flexDirection: 'column',
		width: '100%',
		position: 'relative',
		borderRadius: '16px',
		minWidth: '0px',
		wordWrap: 'break-word',
		bg: mode('#ffffff', 'navy.800')(props),
		boxShadow: mode('0px 1px 11px 0px rgba(28, 35, 50, 0.04)', 'unset')(props),
		backgroundClip: 'border-box',
		border:"1px solid",
		borderColor: mode('#E2E8F0', 'rgba(255, 255, 255, 0.08)')(props), 
	})
};

export const CardComponent = {
	components: {
		Card
	}
};
