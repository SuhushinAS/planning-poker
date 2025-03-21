import {SvgIcon} from 'modules/common/components/SvgIcon';
import {Table} from 'modules/common/components/Table';
import {ButtonSubmit} from 'modules/form/components/ButtonSubmit';
import {FormInput} from 'modules/form/components/FormInput';
import {useMessage} from 'modules/locale/hooks';
import {TTask} from 'modules/task/types';
import React, {useCallback} from 'react';
import {DefaultValues, FormProvider, SubmitHandler, useForm} from 'react-hook-form';

type Props = {
  defaultValues: DefaultValues<TTask>;
  onSubmit: SubmitHandler<TTask>;
};

export const TaskForm = ({defaultValues, onSubmit}: Props) => {
  const form = useForm<TTask>({defaultValues});
  const placeholder = useMessage('task.title');

  const onTaskFormSubmit = useCallback<SubmitHandler<TTask>>(
    async (event) => {
      await onSubmit(event);
      form.reset(defaultValues);
    },
    [defaultValues, form, onSubmit]
  );

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onTaskFormSubmit)}>
        <Table>
          <tr>
            <td className="Table__Cell Table__Cell_Title">
              <FormInput className="TaskForm__Input" name="title" placeholder={placeholder} />
            </td>
            <td className="Table__Cell Table__Cell_Control Table__Cell_Control_Fixed">
              <ButtonSubmit className="offset">
                <SvgIcon name="plus" />
              </ButtonSubmit>
            </td>
          </tr>
        </Table>
      </form>
    </FormProvider>
  );
};
