import {Table} from 'modules/common/components/Table';
import {ButtonSubmit} from 'modules/form/components/ButtonSubmit';
import {Input} from 'modules/form/components/Input';
import {useMessage} from 'modules/locale/hooks';
import 'modules/task/components/TaskForm.less';
import {TTask} from 'modules/task/types';
import React, {useCallback} from 'react';
import {DefaultValues, FormProvider, SubmitHandler, useForm} from 'react-hook-form';

type Props = {
  defaultValues: DefaultValues<TTask>;
  onSubmit: SubmitHandler<TTask>;
};

export const TaskForm = (props: Props) => {
  const {defaultValues} = props;
  const form = useForm<TTask>({defaultValues});
  const placeholder = useMessage('task.title');

  const onSubmit = useCallback<SubmitHandler<TTask>>(
    async (event) => {
      await props.onSubmit(event);
      form.reset(defaultValues);
    },
    [defaultValues, form, props]
  );

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Table>
          <tr>
            <td className="TaskForm__Cell TaskForm__Cell_Title">
              <Input className="TaskForm__Input" name="title" placeholder={placeholder} />
            </td>
            <td className="TaskForm__Cell TaskForm__Cell_Control">
              <ButtonSubmit>+</ButtonSubmit>
            </td>
          </tr>
        </Table>
      </form>
    </FormProvider>
  );
};
