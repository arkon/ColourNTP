import { useState, useEffect, useCallback } from 'react';

import { getSettings } from '../../modules/browser';
import { loadFont } from '../../modules/webfont';

interface FontPreviewProps {
    font: string;
}

export function FontPreview({ font: initialFont }: FontPreviewProps) {
    const [font, setFont] = useState(initialFont);

    const fetchSettings = useCallback(async () => {
        const settings = await getSettings();
        loadFont(settings.fontWeb);
        setFont(settings.fontWeb);
    }, []);

    useEffect(() => {
        loadFont(initialFont);
    }, [initialFont]);

    useEffect(() => {
        fetchSettings();

        const messageListener = (request: { msg: string }) => {
            if (request.msg === 'saved') {
                fetchSettings();
            }
        };

        chrome.runtime.onMessage.addListener(messageListener);
        return () => {
            chrome.runtime.onMessage.removeListener(messageListener);
        };
    }, [fetchSettings]);

    return (
        <p>
            Preview: <span style={{ fontFamily: font }}>12:34:56</span>
        </p>
    );
}
