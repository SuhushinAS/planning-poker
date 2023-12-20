import React from 'react';
import {DefaultValues, FieldValues, FormProvider, SubmitHandler, useForm, UseFormProps} from 'react-hook-form';
import './Form.less';

type Props<Values extends FieldValues> = UseFormProps<Values> & {
  children: React.ReactNode;
  defaultValues?: DefaultValues<Values>;
  onSubmit: SubmitHandler<Values>;
};

export const Form = <Values extends FieldValues>(props: Props<Values>) => {
  const {children, defaultValues, onSubmit} = props;
  const form = useForm<Values>({defaultValues});

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>{children}</form>
    </FormProvider>
  );
};
