import { Extension } from '@tiptap/react';
import '@tiptap/extension-text-style';

declare module '@tiptap/core' {
	interface Commands<ReturnType> {
		lineHeight: {
			setLineHeight: (lineHeight: string) => ReturnType;
			unsetLineHeight: () => ReturnType;
		};
	}
}

export const LineHeightExtension = Extension.create({
	name: 'lineHeight',
	addOptions() {
		return {
			types: ['paragraph', 'heading'],
			defaultLineHeight: 'normal',
		};
	},
	addGlobalAttributes() {
		return [
			{
				types: this.options.types,
				attributes: {
					LineHeight: {
						default: this.options.defaultLineHeight,
						renderHTML: attributes => {
							if (!attributes.LineHeight) {
								return {};
							}
							return {
								style: `line-height: ${attributes.LineHeight}`,
							};
						},
						parseHTML: element => {
							return {
								LineHeight: element.style.lineHeight || this.options.defaultLineHeight,
							};
						},
					},
				},
			},
		];
	},
	addCommands() {
		return {
			setLineHeight:
				(LineHeight: string) =>
				({ tr, state, dispatch }: any) => {
					const { selection } = state;
					tr = tr.setSelection(selection);

					const { from, to } = selection;
					state.doc.nodesBetween(from, to, (node: any, pos: any) => {
						if (this.options.types.includes(node.type.name)) {
							tr = tr.setNodeMarkup(pos, undefined, {
								...node.attrs,
								LineHeight,
							});
						}
					});
					if (dispatch) dispatch(tr);
					return true;
				},
			unSetLineHeight:
				() =>
				({ tr, state, dispatch }: any) => {
					const { selection } = state;
					tr = tr.setSelection(selection);

					const { from, to } = selection;
					state.doc.nodesBetween(from, to, (node: any, pos: any) => {
						if (this.options.types.includes(node.type.name)) {
							tr = tr.setNodeMarkup(pos, undefined, {
								...node.attrs,
								LineHeight: this.options.defaultLineHeight,
							});
						}
					});
					if (dispatch) dispatch(tr);
					return true;
				},
		};
	},
});
