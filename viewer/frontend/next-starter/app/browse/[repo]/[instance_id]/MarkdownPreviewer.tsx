'use client'

import MarkdownPreview from '@uiw/react-markdown-preview';
import { useState } from 'react';

export default function MarkdownPreviewer({ markdown }: { markdown: string }) {
    const [showRaw, setShowRaw] = useState(false);
    const enable_debug = false;

    return (
        <div onClick={() => setShowRaw(!showRaw)}>
            {(showRaw && enable_debug) ? (
                <pre className='whitespace-pre-wrap'>{markdown}</pre>
            ) : (
                <MarkdownPreview source={markdown} />
            )}
        </div>
    );
}
