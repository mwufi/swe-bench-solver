'use client'

import { parseDiff, Diff, Hunk } from 'react-diff-view';

function renderFile({ oldRevision, newRevision, type, hunks, oldPath, newPath, baseUrl = null }: { oldRevision: string, newRevision: string, type: string, hunks: Hunk[], oldPath: string, newPath: string, baseUrl: string | null }) {
    const fileName = newPath || oldPath;
    const lineNumber = hunks[0].newStart;
    return (
        <div key={oldRevision + '-' + newRevision}>
            <h3 className="text-lg font-semibold mb-2">
                {fileName}
                {baseUrl && (
                    <a
                        href={`${baseUrl}/${fileName}#L${lineNumber}`.replace(/\/+/g, '/')}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-blue-500 hover:underline ml-2"
                    >
                        View on GitHub
                    </a>
                )}
            </h3>
            <Diff viewType="unified" diffType={type} hunks={hunks} className="font-mono">
                {hunks => hunks.map(hunk => <Hunk key={hunk.content} hunk={hunk} />)}
            </Diff>
        </div>
    );
}

export default function DiffView({ diffText, baseUrl = null }: { diffText: string, baseUrl: string | null }) {
    const files = parseDiff(diffText);

    return (
        <div>
            {files.map(file => renderFile({ ...file, baseUrl }))}
        </div>
    );
}
