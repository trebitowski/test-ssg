'use client';

import { catchGlobalErrors } from '@/utils/error';
import { Form, init, LoginForm } from '@feathery/react';
import { FormContext } from '@feathery/react/dist/types/Form';
import { useEffect } from 'react';

const formOnLoad = (context: FormContext) => {
  const color = context.getStepProperties().backgroundColor;
  setTimeout(() => (document.body.style.backgroundColor = `#${color}`), 0);
};

const FeatheryForm = ({
  formId,
  useAuth = false,
  sdkKey,
  draft,
  parsedQueryParams,
  region,
  featheryOpts = {},
  customDomain
}: {
  formId: string;
  useAuth?: boolean;
  sdkKey: string;
  draft: boolean;
  parsedQueryParams: any;
  region: string;
  featheryOpts: any;
  customDomain: string;
}) => {
  useEffect(() => {
    catchGlobalErrors();
  }, []);

  init(sdkKey, { ...featheryOpts, _enterpriseRegion: region });

  const props = {
    formId: formId,
    style: { marginLeft: 'auto', marginRight: 'auto' },
    initialValues: parsedQueryParams,
    onLoad: formOnLoad,
    _draft: draft
  };

  return useAuth ? (
    <LoginForm formProps={props} _featheryHosted={!!customDomain} />
  ) : (
    <Form {...props} formId={props.formId} />
  );
};

export default FeatheryForm;
