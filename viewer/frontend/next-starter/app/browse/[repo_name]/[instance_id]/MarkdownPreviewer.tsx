'use client'

import MarkdownPreview from '@uiw/react-markdown-preview';
import { useState } from 'react';
import { Button } from "@/components/ui/button";

export default function MarkdownPreviewer({ markdown, short = true }: { markdown: string, short?: boolean }) {
    const [showRaw, setShowRaw] = useState(false);
    const [showMore, setShowMore] = useState(false);
    const enable_debug = false;

    const lines = 20;
    const showMoreLength = markdown.split('\n').length - lines;
    const truncatedMarkdown = short && !showMore ? markdown.split('\n').slice(0, lines).join('\n') : markdown;

    return (
        <div>
            <div onClick={() => setShowRaw(!showRaw)}>
                {(showRaw && enable_debug) ? (
                    <pre className='whitespace-pre-wrap'>{truncatedMarkdown}</pre>
                ) : (
                    showMore ? <MarkdownPreview source={markdown} /> : <MarkdownPreview source={truncatedMarkdown} />
                )}
            </div>
            {short && showMoreLength > 0 && (
                !showMore ? (
                    <Button onClick={() => setShowMore(true)} className="mt-4">
                        Show More ({showMoreLength} lines)
                    </Button>
                ) : (
                    <Button onClick={() => setShowMore(false)} className="mt-4">
                        Show Less
                    </Button>
                )
            )}
        </div>
    );
}
