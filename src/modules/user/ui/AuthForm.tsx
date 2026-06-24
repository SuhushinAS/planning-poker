import { Table } from 'src/modules/common/ui/Table';
import { ButtonSubmit } from 'src/modules/form/ui/ButtonSubmit';
import { FormInput } from 'src/modules/form/ui/FormInput';
import { Label } from 'src/modules/form/ui/Label';
import { Message } from 'src/modules/locale/ui/Message';

export const AuthForm = () => (
  <div className="box">
    <Table
      title={
        <Label htmlFor="name">
          <Message id="user.name" />
        </Label>
      }
    >
      <tr>
        <td className="Form__Cell">
          <FormInput name="name" />
        </td>
      </tr>
      <tr>
        <td className="Form__Cell">
          <ButtonSubmit className="offset">
            <Message id="form.save" />
          </ButtonSubmit>
        </td>
      </tr>
    </Table>
  </div>
);
