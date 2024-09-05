'use client'

import { parseDiff, Diff, Hunk } from 'react-diff-view';

function renderFile({ oldRevision, newRevision, type, hunks, oldPath, newPath }) {
    const fileName = newPath || oldPath;
    return (
        <div key={oldRevision + '-' + newRevision}>
            <h3 className="text-lg font-semibold mb-2">{fileName}</h3>
            <Diff viewType="unified" diffType={type} hunks={hunks} className="font-mono">
                {hunks => hunks.map(hunk => <Hunk key={hunk.content} hunk={hunk} />)}
            </Diff>
        </div>
    );
}

export default function DiffView({ diffText }: { diffText: string }) {
    const files = parseDiff(diffText);

    return (
        <div>
            {files.map(renderFile)}
        </div>
    );
}
