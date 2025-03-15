import React, {ReactNode} from 'react';
import {DefaultValues, FieldValues, FormProvider, SubmitHandler, useForm, UseFormProps} from 'react-hook-form';

type Props<Values extends FieldValues> = UseFormProps<Values> & {
  children: ReactNode;
  defaultValues?: DefaultValues<Values>;
  onSubmit: SubmitHandler<Values>;
};

export const Form = <Values extends FieldValues>({children, defaultValues, onSubmit}: Props<Values>) => {
  const form = useForm<Values>({defaultValues});

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>{children}</form>
    </FormProvider>
  );
};
