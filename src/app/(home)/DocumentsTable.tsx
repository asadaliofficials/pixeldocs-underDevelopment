import React from 'react';
import { Doc } from '../../../convex/_generated/dataModel';
import { PaginationStatus } from 'convex/react';


interface Props {
	documents: Doc<'documents'>[] | undefined;
	status: PaginationStatus;
	loadMore: (numItems: number) => void;
}

const DocumentsTable = ({ documents, status, loadMore }: Props) => {
	return <div>{documents?.map(document => <div key={document._id}>{document.title}</div>)}</div>;
};

export default DocumentsTable;
