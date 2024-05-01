import React, {ReactNode} from 'react';
import {DefaultValues, FieldValues, FormProvider, SubmitHandler, useForm, UseFormProps} from 'react-hook-form';

type Props<Values extends FieldValues> = UseFormProps<Values> & {
  children: ReactNode;
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
