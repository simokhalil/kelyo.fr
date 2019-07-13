import React from 'react';
import { translate } from 'react-polyglot';

import Button from '../form/Button';

const ResumeDownloadButton = ({ url, t }) => (
    <Button href={url}>
        {t('resume.downloadResume')}
    </Button>
);

export default translate()(ResumeDownloadButton);
