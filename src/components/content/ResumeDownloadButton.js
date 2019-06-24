import React from 'react';

import Button from '../form/Button';

const ResumeDownloadButton = ({ url }) => (
    <Button href={url}>
        Télécharger mon CV
    </Button>
);

export default ResumeDownloadButton;
