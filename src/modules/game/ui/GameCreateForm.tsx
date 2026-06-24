import { Table } from 'src/modules/common/ui/Table';
import { ButtonSubmit } from 'src/modules/form/ui/ButtonSubmit';
import { FormInput } from 'src/modules/form/ui/FormInput';
import { Label } from 'src/modules/form/ui/Label';
import { useMessage } from 'src/modules/locale/lib/useMessage';
import { Message } from 'src/modules/locale/ui/Message';

export const GameCreateForm = () => {
  const placeholder = useMessage('game.new.placeholder');

  return (
    <Table
      title={
        <Label htmlFor="title">
          <Message id="game.new.label" />
        </Label>
      }
    >
      <tr>
        <td className="Form__Cell">
          <FormInput name="title" placeholder={placeholder} required={true} />
        </td>
      </tr>
      <tr>
        <td className="Form__Cell">
          <ButtonSubmit className="offset">
            <Message id="game.new.action" />
          </ButtonSubmit>
        </td>
      </tr>
    </Table>
  );
};
