import { useCallback } from 'react';
import { DefaultValues, FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { SvgIcon } from 'src/modules/common/ui/SvgIcon';
import { Table } from 'src/modules/common/ui/Table';
import { ButtonSubmit } from 'src/modules/form/ui/ButtonSubmit';
import { FormInput } from 'src/modules/form/ui/FormInput';
import { useMessage } from 'src/modules/locale/lib/useMessage';
import { TTask } from 'src/modules/task/lib/types';

type Props = {
  defaultValues: DefaultValues<TTask>;
  onSubmit: SubmitHandler<TTask>;
};

export const TaskForm = ({ defaultValues, onSubmit }: Props) => {
  const form = useForm<TTask>({ defaultValues });
  const placeholder = useMessage('task.title');

  const onTaskFormSubmit = useCallback<SubmitHandler<TTask>>(
    (event) => {
      onSubmit(event);
      form.reset(defaultValues);
    },
    [defaultValues, form, onSubmit],
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
